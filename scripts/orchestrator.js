#!/usr/bin/env node

/**
 * MASTER ORCHESTRATOR - AUTO-FIX LOOP
 * 
 * This script runs the complete 5-agent pipeline and automatically
 * applies approved fixes in a continuous loop until all violations are fixed.
 * 
 * Safety features:
 * - Backup before each apply
 * - Dry-run mode
 * - Manual approval checkpoints
 * - Rollback capability
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  MAX_ITERATIONS: 10,          // Max number of fix cycles
  BATCH_SIZE: 10,               // How many violations per batch
  AUTO_APPLY: false,             // Set to false for manual approval
  CREATE_BACKUPS: true,         // Always backup before applying
  DRY_RUN: true,               // Set to true to see what would happen without applying
  MIN_CONFIDENCE: 0.85,         // Minimum confidence to auto-apply
  MIN_SECURITY_SCORE: 80,       // Minimum security score
  REQUIRE_ALL_AGENTS_PASS: true // Require approval from all agents
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

/**
 * Main orchestrator function
 */
async function runOrchestrator() {
  console.log(`${colors.cyan}${colors.bold}`);
  console.log('═══════════════════════════════════════════════════════');
  console.log('  MIZAN AUTO-FIX ORCHESTRATOR - CONTINUOUS MODE');
  console.log('═══════════════════════════════════════════════════════');
  console.log(colors.reset + '\n');

  // Display configuration
  displayConfig();

  let iteration = 0;
  let totalFixesApplied = 0;
  let continueLoop = true;

  while (continueLoop && iteration < CONFIG.MAX_ITERATIONS) {
    iteration++;
    
    console.log(`\n${colors.cyan}${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.cyan}${colors.bold}  ITERATION ${iteration}/${CONFIG.MAX_ITERATIONS}${colors.reset}`);
    console.log(`${colors.cyan}${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    // STEP 1: Run audit
    console.log(`${colors.blue}🔍 STEP 1: Running violation audit...${colors.reset}`);
    const auditResults = await runAudit();
    
    if (!auditResults.hasViolations) {
      console.log(`${colors.green}${colors.bold}✅ NO VIOLATIONS FOUND! Your code is clean!${colors.reset}\n`);
      continueLoop = false;
      break;
    }

    console.log(`   Found ${auditResults.violationCount} violations (${auditResults.criticalCount} critical, ${auditResults.highCount} high priority)\n`);

    // STEP 2: Run 5-agent pipeline
    console.log(`${colors.blue}🤖 STEP 2: Running 5-agent pipeline...${colors.reset}`);
    const pipelineResults = await run5AgentPipeline();

    if (pipelineResults.error) {
      console.log(`${colors.red}❌ Pipeline error: ${pipelineResults.error}${colors.reset}\n`);
      continueLoop = false;
      break;
    }

    console.log(`   Pipeline complete! ${pipelineResults.approvedFixes} fixes approved\n`);

    // STEP 3: Identify auto-appliable fixes
    console.log(`${colors.blue}✅ STEP 3: Identifying safe fixes to apply...${colors.reset}`);
    const safeFixes = identifySafeFixes(pipelineResults);

    if (safeFixes.length === 0) {
      console.log(`${colors.yellow}⚠️  No fixes meet auto-apply criteria this iteration${colors.reset}`);
      console.log(`   Criteria: Confidence ${CONFIG.MIN_CONFIDENCE * 100}%, Security ${CONFIG.MIN_SECURITY_SCORE}+, All agents pass\n`);
      
      // Check if there are fixes that need manual review
      if (pipelineResults.needsReviewFixes > 0) {
        console.log(`${colors.yellow}📋 ${pipelineResults.needsReviewFixes} fixes need manual review${colors.reset}`);
        console.log(`   Check scripts/FINAL_REPORT.md for details\n`);
      }
      
      continueLoop = false;
      break;
    }

    console.log(`   ${safeFixes.length} fixes are safe to apply automatically\n`);

    // Display fixes to be applied
    displayFixesSummary(safeFixes);

    // STEP 4: Apply fixes (with safety checks)
    if (!CONFIG.DRY_RUN) {
      if (!CONFIG.AUTO_APPLY) {
        const shouldApply = await askForConfirmation(
          `Apply ${safeFixes.length} fixes automatically? (y/n): `
        );
        
        if (!shouldApply) {
          console.log(`${colors.yellow}⏸️  Paused. Fixes not applied. Exiting loop.${colors.reset}\n`);
          continueLoop = false;
          break;
        }
      }

      console.log(`${colors.blue}🔧 STEP 4: Applying fixes...${colors.reset}\n`);
      
      const applyResults = await applyFixes(safeFixes);
      totalFixesApplied += applyResults.successCount;

      console.log(`   Applied ${applyResults.successCount}/${safeFixes.length} fixes successfully\n`);

      if (applyResults.failureCount > 0) {
        console.log(`${colors.red}   ⚠️  ${applyResults.failureCount} fixes failed to apply${colors.reset}`);
        console.log(`   Check scripts/apply-log.json for details\n`);
      }

    } else {
      console.log(`${colors.yellow}🔍 DRY RUN: Would have applied ${safeFixes.length} fixes${colors.reset}\n`);
    }

    // STEP 5: Verify fixes worked
    console.log(`${colors.blue}✓ STEP 5: Verifying fixes...${colors.reset}`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Give filesystem time to settle
    
    const verifyResults = await runAudit();
    const violationsFixed = auditResults.violationCount - verifyResults.violationCount;

    console.log(`   Violations before: ${auditResults.violationCount}`);
    console.log(`   Violations after: ${verifyResults.violationCount}`);
    console.log(`   ${colors.green}Fixed in this iteration: ${violationsFixed}${colors.reset}\n`);

    // Check if we should continue
    if (verifyResults.violationCount === 0) {
      console.log(`${colors.green}${colors.bold}🎉 ALL VIOLATIONS FIXED!${colors.reset}\n`);
      continueLoop = false;
    } else if (violationsFixed === 0) {
      console.log(`${colors.yellow}⚠️  No progress this iteration. Stopping to avoid infinite loop.${colors.reset}\n`);
      continueLoop = false;
    }

    // Wait between iterations
    if (continueLoop) {
      console.log(`${colors.cyan}⏳ Waiting 5 seconds before next iteration...${colors.reset}\n`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Final summary
  displayFinalSummary(iteration, totalFixesApplied);
}

/**
 * Display configuration
 */
function displayConfig() {
  console.log(`${colors.blue}📋 Configuration:${colors.reset}`);
  console.log(`   Max iterations: ${CONFIG.MAX_ITERATIONS}`);
  console.log(`   Batch size: ${CONFIG.BATCH_SIZE}`);
  console.log(`   Auto-apply: ${CONFIG.AUTO_APPLY ? '✅ YES' : '❌ NO (manual approval)'}`);
  console.log(`   Dry run: ${CONFIG.DRY_RUN ? '✅ YES (no changes)' : '❌ NO (will apply fixes)'}`);
  console.log(`   Create backups: ${CONFIG.CREATE_BACKUPS ? '✅ YES' : '❌ NO'}`);
  console.log(`   Min confidence: ${CONFIG.MIN_CONFIDENCE * 100}%`);
  console.log(`   Min security score: ${CONFIG.MIN_SECURITY_SCORE}`);
  console.log('');
}

/**
 * Run the audit script
 */
async function runAudit() {
  try {
    console.log('   Running audit-violations.js...');
    execSync('node scripts/audit-violations.js', { stdio: 'pipe' });

    const auditReport = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'scripts', 'audit-report.json'), 'utf8')
    );

    const criticalAndHigh = auditReport.violations.filter(v => 
      v.priority === 'critical' || v.priority === 'high'
    );

    return {
      hasViolations: auditReport.violations.length > 0,
      violationCount: auditReport.violations.length,
      criticalCount: auditReport.violations.filter(v => v.priority === 'critical').length,
      highCount: auditReport.violations.filter(v => v.priority === 'high').length,
      criticalAndHighCount: criticalAndHigh.length
    };

  } catch (error) {
    console.error(`   ${colors.red}❌ Audit failed: ${error.message}${colors.reset}`);
    return { hasViolations: false, violationCount: 0, error: error.message };
  }
}

/**
 * Run the complete 5-agent pipeline
 */
async function run5AgentPipeline() {
  try {
    // Agent 1: Code Analyzer
    console.log('   🤖 Agent 1 (Gemini): Analyzing violations...');
    execSync('node scripts/agents/code-analyzer-gemini.js', { stdio: 'pipe' });

    // Agent 2: Fix Generator
    console.log('   🤖 Agent 2 (Claude): Generating fixes...');
    execSync('node scripts/agents/fix-generator-claude.js', { stdio: 'pipe' });

    // Agent 3: Mizan Validator
    console.log('   🤖 Agent 3 (Gemini): Validating fixes...');
    execSync('node scripts/agents/mizan-validator-gemini.js', { stdio: 'pipe' });

    // Agent 4: Security Checker
    console.log('   🤖 Agent 4 (GPT-4o): Checking security...');
    execSync('node scripts/agents/security-checker-gpt4.js', { stdio: 'pipe' });

    // Agent 5: Final Integrator
    console.log('   🤖 Agent 5 (Claude): Generating report...');
    execSync('node scripts/agents/final-integrator-claude.js', { stdio: 'pipe' });

    // Read results
    const securityData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'scripts', 'agent4-security.json'), 'utf8')
    );

    const approved = securityData.filter(d => 
      d.agent3Validation.recommendation === 'APPROVE'
    ).length;

    const needsReview = securityData.filter(d =>
      d.agent3Validation.recommendation === 'NEEDS_REVISION'
    ).length;

    return {
      success: true,
      approvedFixes: approved,
      needsReviewFixes: needsReview,
      totalFixes: securityData.length,
      data: securityData
    };

  } catch (error) {
    console.error(`   ${colors.red}❌ Pipeline failed: ${error.message}${colors.reset}`);
    return { success: false, error: error.message };
  }
}

/**
 * Identify fixes that are safe to auto-apply
 */
function identifySafeFixes(pipelineResults) {
  if (!pipelineResults.data) return [];

  return pipelineResults.data.filter(fix => {
    // Check 1: Agent 3 approved
    const agent3Approved = fix.agent3Validation.recommendation === 'APPROVE';
    
    // Check 2: Agent 3 score
    const agent3Score = fix.agent3Validation.overallScore >= CONFIG.MIN_SECURITY_SCORE;
    
    // Check 3: Agent 2 confidence
    const agent2Confidence = fix.agent2Fix.confidence >= CONFIG.MIN_CONFIDENCE;
    
    // Check 4: Agent 4 security
    const agent4Safe = fix.agent4Security.securityRating === 'SECURE' || 
                       fix.agent4Security.securityRating === 'MODERATE_RISK';
    
    // Check 5: No critical vulnerabilities
    const noCriticalVulns = !fix.agent4Security.vulnerabilities || 
                           !fix.agent4Security.vulnerabilities.some(v => v.severity === 'CRITICAL');
    
    // All checks must pass
    if (CONFIG.REQUIRE_ALL_AGENTS_PASS) {
      return agent3Approved && agent3Score && agent2Confidence && agent4Safe && noCriticalVulns;
    } else {
      // Relaxed mode: at least Agent 3 approval and Agent 2 confidence
      return agent3Approved && agent2Confidence;
    }
  });
}

/**
 * Display summary of fixes to be applied
 */
function displayFixesSummary(fixes) {
  console.log(`${colors.cyan}   Fixes to be applied:${colors.reset}\n`);
  
  fixes.forEach((fix, index) => {
    const confidence = (fix.agent2Fix.confidence * 100).toFixed(0);
    const score = fix.agent3Validation.overallScore;
    
    console.log(`   ${index + 1}. ${fix.violation.file}:${fix.violation.line}`);
    console.log(`      Rule: ${fix.violation.rule}`);
    console.log(`      Confidence: ${confidence}% | Score: ${score}/100 | Security: ${fix.agent4Security.securityRating}`);
  });
  
  console.log('');
}

/**
 * Apply fixes to actual files
 */
async function applyFixes(fixes) {
  let successCount = 0;
  let failureCount = 0;
  const results = [];

  // Create backup if enabled
  if (CONFIG.CREATE_BACKUPS) {
    await createBackup();
  }

  for (const fix of fixes) {
    try {
      console.log(`   📝 Applying: ${fix.violation.file}:${fix.violation.line}`);
      
      const result = await applySingleFix(fix);
      
      if (result.success) {
        successCount++;
        console.log(`      ${colors.green}✓ Applied successfully${colors.reset}`);
      } else {
        failureCount++;
        console.log(`      ${colors.red}✗ Failed: ${result.error}${colors.reset}`);
      }
      
      results.push({ fix, result });

    } catch (error) {
      failureCount++;
      console.log(`      ${colors.red}✗ Error: ${error.message}${colors.reset}`);
      results.push({ fix, result: { success: false, error: error.message } });
    }
  }

  // Save apply log
  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'apply-log.json'),
    JSON.stringify(results, null, 2)
  );

  return { successCount, failureCount, results };
}

/**
 * Apply a single fix to a file
 */
async function applySingleFix(fix) {
  try {
    const filePath = path.join(process.cwd(), fix.violation.file);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'File not found' };
    }

    // Read current content
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Get the line to replace
    const lineIndex = fix.violation.line - 1;
    const originalLine = lines[lineIndex];

    // Verify it matches the violation (safety check)
    if (!originalLine.includes(fix.violation.content.substring(0, 20))) {
      return { 
        success: false, 
        error: 'Line content changed since audit (safety check failed)' 
      };
    }

    // Replace the line with the fix
    lines[lineIndex] = fix.agent2Fix.primaryFix.code;

    // Write back to file
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');

    // Create additional files if any
    if (fix.agent2Fix.primaryFix.additionalFiles) {
      for (const additionalFile of fix.agent2Fix.primaryFix.additionalFiles) {
        const additionalPath = path.join(process.cwd(), additionalFile.path);
        
        // Create directory if it doesn't exist
        const dir = path.dirname(additionalPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write file
        fs.writeFileSync(additionalPath, additionalFile.content, 'utf8');
      }
    }

    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Create backup of entire codebase
 */
async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups', `backup-${timestamp}`);

  console.log(`   💾 Creating backup: ${backupDir}`);

  try {
    // Create backups directory if it doesn't exist
    if (!fs.existsSync(path.join(process.cwd(), 'backups'))) {
      fs.mkdirSync(path.join(process.cwd(), 'backups'));
    }

    // Copy entire project (excluding node_modules, .git, backups)
    execSync(`rsync -av --exclude 'node_modules' --exclude '.git' --exclude 'backups' . "${backupDir}"`, {
      cwd: process.cwd(),
      stdio: 'pipe'
    });

    console.log(`   ${colors.green}✓ Backup created${colors.reset}\n`);

  } catch (error) {
    console.error(`   ${colors.red}⚠️  Backup failed: ${error.message}${colors.reset}`);
    console.error(`   ${colors.yellow}Continuing without backup...${colors.reset}\n`);
  }
}

/**
 * Ask for user confirmation (if manual mode)
 */
async function askForConfirmation(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    readline.question(question, answer => {
      readline.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Display final summary
 */
function displayFinalSummary(iterations, totalFixed) {
  console.log(`\n${colors.cyan}${colors.bold}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}  ORCHESTRATOR COMPLETE${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.green}✅ Iterations completed: ${iterations}${colors.reset}`);
  console.log(`${colors.green}✅ Total fixes applied: ${totalFixed}${colors.reset}\n`);
  
  console.log(`${colors.blue}📋 Next steps:${colors.reset}`);
  console.log(`   1. Run tests to verify fixes work correctly`);
  console.log(`   2. Review FINAL_REPORT.md for any remaining issues`);
  console.log(`   3. Commit changes to git\n`);
  
  if (CONFIG.DRY_RUN) {
    console.log(`${colors.yellow}⚠️  This was a DRY RUN - no changes were actually made${colors.reset}\n`);
  }
}

// Run orchestrator
if (require.main === module) {
  runOrchestrator().catch(error => {
    console.error(`${colors.red}${colors.bold}❌ Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { runOrchestrator };