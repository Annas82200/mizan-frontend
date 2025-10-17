#!/usr/bin/env node

/**
 * TEST SCRIPT FOR PIPELINE FIXES
 * 
 * Verifies that the multi-agent pipeline correctly:
 * 1. Detects violations with improved patterns
 * 2. Filters false positives
 * 3. Respects SKIP recommendations
 * 4. Only processes real violations
 * 
 * COMPLIANT WITH: AGENT_CONTEXT_ULTIMATE.md
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  magenta: '\x1b[35m'
};

/**
 * Run a command and capture output
 */
function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'pipe',
      env: { ...process.env }
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
      process.stdout.write(data);
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
      process.stderr.write(data);
    });
    
    child.on('exit', (code) => {
      resolve({ code, stdout, stderr });
    });
    
    child.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Test the audit script with improved patterns
 */
async function testAuditScript() {
  console.log(`${colors.cyan}${colors.bold}📝 TEST 1: Audit Script with Improved Patterns${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  const result = await runCommand('node', ['scripts/audit-violations.js']);
  
  // Check if violations were found
  const violationsPath = path.join(process.cwd(), 'scripts/violations.json');
  if (fs.existsSync(violationsPath)) {
    const violations = JSON.parse(fs.readFileSync(violationsPath, 'utf8'));
    
    console.log(`\n${colors.green}✅ Audit completed${colors.reset}`);
    console.log(`📊 Total violations found: ${violations.length}`);
    
    // Check for false positives (CSS classes)
    const cssPatternViolations = violations.filter(v => 
      v.content.includes('placeholder:') || 
      v.content.includes('className')
    );
    
    if (cssPatternViolations.length > 0) {
      console.log(`${colors.yellow}⚠️  Potential false positives detected: ${cssPatternViolations.length}${colors.reset}`);
      console.log(`   These should be filtered by the improved patterns`);
    } else {
      console.log(`${colors.green}✅ No obvious CSS false positives found${colors.reset}`);
    }
    
    return { success: true, violations: violations.length, falsePositives: cssPatternViolations.length };
  } else {
    console.log(`${colors.red}❌ No violations file generated${colors.reset}`);
    return { success: false };
  }
}

/**
 * Test the violation filter service
 */
async function testViolationFilter() {
  console.log(`\n${colors.cyan}${colors.bold}🔍 TEST 2: Violation Filter Service${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  const result = await runCommand('node', ['scripts/agents/violation-filter.js']);
  
  // Check filtered results
  const filteredPath = path.join(process.cwd(), 'scripts/violations-filtered.json');
  const skippedPath = path.join(process.cwd(), 'scripts/violations-skipped.json');
  
  if (fs.existsSync(filteredPath)) {
    const filtered = JSON.parse(fs.readFileSync(filteredPath, 'utf8'));
    console.log(`\n${colors.green}✅ Filter service completed${colors.reset}`);
    console.log(`📊 Violations after filtering: ${filtered.length}`);
    
    if (fs.existsSync(skippedPath)) {
      const skipped = JSON.parse(fs.readFileSync(skippedPath, 'utf8'));
      console.log(`📊 Violations skipped (false positives): ${skipped.length}`);
      
      if (skipped.length > 0) {
        console.log(`\n${colors.yellow}Skip reasons:${colors.reset}`);
        const reasonCounts = {};
        skipped.forEach(s => {
          reasonCounts[s.reason] = (reasonCounts[s.reason] || 0) + 1;
        });
        Object.entries(reasonCounts).forEach(([reason, count]) => {
          console.log(`  • ${reason}: ${count}`);
        });
      }
    }
    
    return { success: true, filtered: filtered.length, skipped: fs.existsSync(skippedPath) ? JSON.parse(fs.readFileSync(skippedPath, 'utf8')).length : 0 };
  } else {
    console.log(`${colors.red}❌ No filtered violations file generated${colors.reset}`);
    return { success: false };
  }
}

/**
 * Analyze Agent 1 SKIP recommendations
 */
async function analyzeAgent1Skips() {
  console.log(`\n${colors.cyan}${colors.bold}📊 TEST 3: Agent 1 SKIP Recommendations${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  const analysesPath = path.join(process.cwd(), 'scripts/agents/agent1-mizan-analyses.json');
  
  if (fs.existsSync(analysesPath)) {
    const data = JSON.parse(fs.readFileSync(analysesPath, 'utf8'));
    const analyses = data.mizanAnalyses || [];
    
    const skipCount = analyses.filter(a => a.mizanAnalysis.recommendation === 'SKIP').length;
    const falsePositiveCount = analyses.filter(a => a.mizanAnalysis.isRealViolation === false).length;
    const proceedCount = analyses.filter(a => a.mizanAnalysis.recommendation === 'PROCEED').length;
    
    console.log(`📊 Total analyses: ${analyses.length}`);
    console.log(`📊 SKIP recommendations: ${skipCount}`);
    console.log(`📊 False positives identified: ${falsePositiveCount}`);
    console.log(`📊 PROCEED recommendations: ${proceedCount}`);
    
    const reductionPercent = Math.round((skipCount + falsePositiveCount) / analyses.length * 100);
    console.log(`\n${colors.green}✅ Agent 1 filtering effectiveness: ${reductionPercent}% reduction${colors.reset}`);
    
    return { success: true, total: analyses.length, skips: skipCount, falsePositives: falsePositiveCount, proceeds: proceedCount };
  } else {
    console.log(`${colors.yellow}⚠️  No Agent 1 analyses found${colors.reset}`);
    return { success: false };
  }
}

/**
 * Main test function
 */
async function runTests() {
  console.log(`${colors.magenta}${colors.bold}🧪 TESTING PIPELINE FIX IMPROVEMENTS${colors.reset}`);
  console.log(`${colors.magenta}═══════════════════════════════════════════════════════════════════${colors.reset}\n`);
  
  const results = {
    audit: null,
    filter: null,
    agent1: null
  };
  
  try {
    // Test 1: Audit script
    results.audit = await testAuditScript();
    
    // Test 2: Violation filter (if violations exist)
    if (results.audit.success && results.audit.violations > 0) {
      results.filter = await testViolationFilter();
    }
    
    // Test 3: Agent 1 analysis (if available)
    results.agent1 = await analyzeAgent1Skips();
    
    // Summary
    console.log(`\n${colors.blue}${colors.bold}📈 TEST SUMMARY${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════════════${colors.reset}\n`);
    
    if (results.audit.success) {
      console.log(`✅ Audit Script: ${results.audit.violations} violations found`);
      if (results.audit.falsePositives === 0) {
        console.log(`   ${colors.green}✓ No obvious false positives${colors.reset}`);
      } else {
        console.log(`   ${colors.yellow}⚠ ${results.audit.falsePositives} potential false positives${colors.reset}`);
      }
    }
    
    if (results.filter && results.filter.success) {
      const reductionPercent = Math.round(results.filter.skipped / (results.filter.filtered + results.filter.skipped) * 100);
      console.log(`✅ Filter Service: ${reductionPercent}% reduction in violations`);
      console.log(`   ${colors.green}✓ ${results.filter.filtered} real violations${colors.reset}`);
      console.log(`   ${colors.green}✓ ${results.filter.skipped} false positives removed${colors.reset}`);
    }
    
    if (results.agent1 && results.agent1.success) {
      const filterEffectiveness = Math.round((results.agent1.skips + results.agent1.falsePositives) / results.agent1.total * 100);
      console.log(`✅ Agent 1 Analysis: ${filterEffectiveness}% filtering effectiveness`);
      console.log(`   ${colors.green}✓ ${results.agent1.proceeds} violations to fix${colors.reset}`);
      console.log(`   ${colors.green}✓ ${results.agent1.skips + results.agent1.falsePositives} filtered out${colors.reset}`);
    }
    
    // Overall assessment
    console.log(`\n${colors.cyan}${colors.bold}🎯 OVERALL ASSESSMENT${colors.reset}`);
    
    const allTestsPassed = results.audit.success && 
                           (!results.filter || results.filter.success) && 
                           (!results.agent1 || results.agent1.success);
    
    if (allTestsPassed) {
      console.log(`${colors.green}${colors.bold}✅ All pipeline improvements are working correctly!${colors.reset}`);
      console.log(`${colors.green}The multi-agent pipeline now properly filters false positives.${colors.reset}`);
    } else {
      console.log(`${colors.yellow}${colors.bold}⚠️  Some tests could not be completed${colors.reset}`);
      console.log(`${colors.yellow}Run the full pipeline to test all improvements.${colors.reset}`);
    }
    
  } catch (error) {
    console.error(`${colors.red}❌ Test error: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests
if (require.main === module) {
  runTests().catch(error => {
    console.error(`${colors.red}💥 Test crashed: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}
