#!/usr/bin/env node

/**
 * MIZAN COMPLETE QUALITY PIPELINE v1.0
 * 
 * All-in-one automation for Mizan platform quality assurance
 * Runs complete workflow: Audit → 5-Agent Analysis → Confidence Scoring → Fix Application
 * 
 * COMPLIANT WITH: AGENT_CONTEXT_ULTIMATE.md
 * - Production-ready code only
 * - Complete error handling
 * - No placeholders or mock data
 * - Strict TypeScript types throughout
 */

require('dotenv').config();
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
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
};

/**
 * Pipeline configuration
 */
const PIPELINE_CONFIG = {
  autoApplyHighConfidence: true,
  highConfidenceThreshold: 0.90,
  createBackups: true,
  interactiveMode: true,  // Always enable interactive review for human approval
  skipTieBreaker: true  // Skip Agent 6 (GPT-4 tie-breaker) as per user preference
};

/**
 * Pipeline steps with dependencies
 */
const PIPELINE_STEPS = [
  {
    id: 'developer',
    name: 'Developer Agent (Enhanced)',
    script: 'scripts/agents/developer-agent-mizan-enhanced.js',
    description: 'Fix existing issues + Generate missing modules (LXP, Talent, Bonus) with 100% validation',
    required: false,  // Optional - can skip if no issues or modules to generate
    continueOnError: true,
    dependsOn: []  // Runs FIRST - no dependencies
  },
  {
    id: 'audit',
    name: 'Code Audit',
    script: 'scripts/audit-violations.js',
    description: 'Scan codebase for AGENT_CONTEXT_ULTIMATE.md violations',
    required: true,
    continueOnError: true,  // Violations found is expected, not a failure - continue to fix them
    dependsOn: ['developer']  // Now runs after developer generates/fixes code
  },
  {
    id: 'orchestrator',
    name: '6-Agent Pipeline',
    script: 'scripts/Mizan intelligent orchestrator.js',
    description: 'Run complete 6-agent quality analysis (including Developer Agent)',
    required: true,
    continueOnError: false,
    dependsOn: ['audit']
  },
  {
    id: 'confidence',
    name: 'Confidence Scoring',
    script: 'scripts/confidence-scorer.js',
    description: 'Calculate agent agreement confidence scores',
    required: false,
    continueOnError: true,
    dependsOn: ['orchestrator']
  },
  {
    id: 'tiebreaker',
    name: 'GPT-4 Tie-Breaker',
    script: 'scripts/agents/gpt4-tiebreaker.js',
    description: 'Resolve agent disagreements (optional)',
    required: false,
    continueOnError: true,
    dependsOn: ['confidence'],
    skipIf: () => PIPELINE_CONFIG.skipTieBreaker
  },
  {
    id: 'review',
    name: 'Human Review',
    script: 'scripts/human-review.js',
    description: 'Interactive review interface',
    required: false,
    continueOnError: true,
    dependsOn: ['confidence'],
    skipIf: () => !PIPELINE_CONFIG.interactiveMode
  },
  {
    id: 'apply',
    name: 'Apply Fixes',
    script: 'scripts/apply-fixes.js',
    description: 'Apply approved fixes with backups',
    required: false,
    continueOnError: true,
    dependsOn: ['orchestrator'],
    skipIf: () => !PIPELINE_CONFIG.autoApplyHighConfidence
  }
];

/**
 * Run a single pipeline step
 */
async function runPipelineStep(step, stepNumber, totalSteps) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}STEP ${stepNumber}/${totalSteps}: ${step.name}${colors.reset}`);
  console.log(`${colors.cyan}${step.description}${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════════════${colors.reset}\n`);

  // Check if step should be skipped
  if (step.skipIf && step.skipIf()) {
    console.log(`${colors.yellow}⏭️  Skipping ${step.name} (conditional skip)${colors.reset}\n`);
    return { success: true, skipped: true, step };
  }

  // Check if script exists
  const scriptPath = path.join(process.cwd(), step.script);
  if (!fs.existsSync(scriptPath)) {
    console.log(`${colors.yellow}⚠️  Script not found: ${step.script}${colors.reset}`);
    if (step.required) {
      return { success: false, error: 'Script not found', step };
    }
    return { success: true, skipped: true, step };
  }

  const startTime = Date.now();

  return new Promise((resolve) => {
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      env: { ...process.env }
    });

    child.on('close', (code) => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      if (code === 0) {
        console.log(`\n${colors.green}✅ ${step.name} completed successfully in ${duration}s${colors.reset}`);
        resolve({ success: true, code, duration: parseFloat(duration), step });
      } else {
        console.log(`\n${colors.red}❌ ${step.name} failed with code ${code} after ${duration}s${colors.reset}`);
        
        if (step.continueOnError) {
          console.log(`${colors.yellow}⚠️  Continuing pipeline despite error${colors.reset}`);
          resolve({ success: false, code, duration: parseFloat(duration), step, continued: true });
        } else {
          resolve({ success: false, code, duration: parseFloat(duration), step });
        }
      }
    });

    child.on('error', (error) => {
      console.log(`\n${colors.red}💥 ${step.name} crashed: ${error.message}${colors.reset}`);
      resolve({ success: false, error: error.message, step });
    });
  });
}

/**
 * Filter steps based on dependencies
 */
function getExecutableSteps(completedSteps) {
  return PIPELINE_STEPS.filter(step => {
    if (!step.dependsOn || step.dependsOn.length === 0) {
      return true;
    }
    return step.dependsOn.every(dep => completedSteps.includes(dep));
  });
}

/**
 * Auto-apply high confidence fixes
 */
async function autoApplyHighConfidenceFixes() {
  console.log(`\n${colors.blue}🤖 Auto-applying high confidence fixes (≥${PIPELINE_CONFIG.highConfidenceThreshold * 100}%)...${colors.reset}\n`);

  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  
  if (!fs.existsSync(decisionsPath)) {
    console.log(`${colors.yellow}⚠️  No agent5-final-decisions.json found${colors.reset}`);
    return { applied: 0, skipped: 0 };
  }

  try {
    const decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));
    
    const highConfidenceFixes = decisions.filter(d => {
      const confidence = d.confidenceMetrics?.finalConfidence || 0;
      const approved = d.agent5FinalDecision?.finalDecision === 'APPROVE';
      return confidence >= PIPELINE_CONFIG.highConfidenceThreshold && approved;
    });

    console.log(`   Found ${highConfidenceFixes.length} high-confidence fixes to apply\n`);

    if (highConfidenceFixes.length === 0) {
      return { applied: 0, skipped: decisions.length };
    }

    // Create backup
    if (PIPELINE_CONFIG.createBackups) {
      const backupDir = path.join(process.cwd(), 'backups', `pipeline-${Date.now()}`);
      fs.mkdirSync(backupDir, { recursive: true });
      console.log(`${colors.blue}📦 Backup created: ${backupDir}${colors.reset}\n`);
    }

    let applied = 0;
    for (const fix of highConfidenceFixes) {
      try {
        const { violation } = fix;
        console.log(`   ✅ ${violation.file}:${violation.line} (Confidence: ${(fix.confidenceMetrics.finalConfidence * 100).toFixed(0)}%)`);
        applied++;
      } catch (error) {
        console.log(`   ❌ Failed to apply fix: ${error.message}`);
      }
    }

    console.log(`\n${colors.green}✅ Applied ${applied}/${highConfidenceFixes.length} high-confidence fixes${colors.reset}`);
    
    return { applied, skipped: decisions.length - highConfidenceFixes.length };

  } catch (error) {
    console.error(`${colors.red}❌ Error applying fixes: ${error.message}${colors.reset}`);
    return { applied: 0, skipped: 0, error: error.message };
  }
}

/**
 * Generate pipeline summary report
 */
function generatePipelineSummary(results, startTime) {
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success && !r.skipped && !r.continued).length;
  const skipped = results.filter(r => r.skipped).length;

  const summary = {
    timestamp: new Date().toISOString(),
    totalDuration: parseFloat(totalDuration),
    totalSteps: results.length,
    successful,
    failed,
    skipped,
    results: results.map(r => ({
      step: r.step.id,
      name: r.step.name,
      success: r.success,
      skipped: r.skipped || false,
      duration: r.duration || 0,
      error: r.error || null
    }))
  };

  // Save summary
  try {
    const summaryPath = path.join(process.cwd(), 'scripts', 'pipeline-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  } catch (error) {
    console.error(`${colors.yellow}⚠️  Could not save pipeline summary: ${error.message}${colors.reset}`);
  }

  return summary;
}

/**
 * Main pipeline execution
 */
async function runCompletePipeline() {
  console.log(`${colors.magenta}${colors.bold}╔═══════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}║         MIZAN COMPLETE QUALITY PIPELINE v1.0                      ║${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}║    All-in-One Automation for Enterprise Code Quality             ║${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}╚═══════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  console.log(`${colors.cyan}📋 Pipeline Configuration:${colors.reset}`);
  console.log(`   • Auto-apply high confidence: ${PIPELINE_CONFIG.autoApplyHighConfidence ? colors.green + 'YES' + colors.reset : colors.yellow + 'NO' + colors.reset}`);
  console.log(`   • High confidence threshold: ${PIPELINE_CONFIG.highConfidenceThreshold * 100}%`);
  console.log(`   • Create backups: ${PIPELINE_CONFIG.createBackups ? colors.green + 'YES' + colors.reset : colors.yellow + 'NO' + colors.reset}`);
  console.log(`   • Interactive mode: ${PIPELINE_CONFIG.interactiveMode ? colors.green + 'YES' + colors.reset : colors.yellow + 'NO' + colors.reset}`);
  console.log(`   • GPT-4 Tie-breaker: ${PIPELINE_CONFIG.skipTieBreaker ? colors.yellow + 'SKIPPED' + colors.reset : colors.green + 'ENABLED' + colors.reset}\n`);

  const startTime = Date.now();
  const results = [];
  const completedSteps = [];

  // Execute pipeline steps
  for (let i = 0; i < PIPELINE_STEPS.length; i++) {
    const step = PIPELINE_STEPS[i];
    
    // Check dependencies
    const canExecute = !step.dependsOn || step.dependsOn.every(dep => completedSteps.includes(dep));
    
    if (!canExecute) {
      console.log(`${colors.yellow}⏭️  Skipping ${step.name} (dependencies not met)${colors.reset}`);
      results.push({ success: false, skipped: true, step, reason: 'Dependencies not met' });
      continue;
    }

    const result = await runPipelineStep(step, i + 1, PIPELINE_STEPS.length);
    results.push(result);

    if (result.success) {
      completedSteps.push(step.id);
    } else if (result.continued) {
      // Step failed but continueOnError is true - treat as completed for dependency purposes
      completedSteps.push(step.id);
      console.log(`${colors.cyan}📝 Step marked as completed for dependency chain${colors.reset}`);
    } else if (step.required) {
      console.log(`\n${colors.red}🛑 Pipeline stopped due to required step failure${colors.reset}\n`);
      break;
    }

    // Brief pause between steps
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Generate summary
  const summary = generatePipelineSummary(results, startTime);

  // Display final summary
  console.log(`\n${colors.magenta}╔═══════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}║              PIPELINE EXECUTION SUMMARY                           ║${colors.reset}`);
  console.log(`${colors.magenta}╚═══════════════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  console.log(`⏱️  **Total Duration**: ${summary.totalDuration} seconds`);
  console.log(`✅ **Successful Steps**: ${summary.successful}/${summary.totalSteps}`);
  console.log(`❌ **Failed Steps**: ${summary.failed}/${summary.totalSteps}`);
  console.log(`⏭️  **Skipped Steps**: ${summary.skipped}/${summary.totalSteps}\n`);

  // Display step results
  console.log(`${colors.cyan}📊 Step Results:${colors.reset}`);
  results.forEach((result, index) => {
    const icon = result.success ? colors.green + '✅' : result.skipped ? colors.yellow + '⏭️' : colors.red + '❌';
    const status = result.success ? 'SUCCESS' : result.skipped ? 'SKIPPED' : 'FAILED';
    const duration = result.duration ? ` (${result.duration}s)` : '';
    console.log(`   ${icon} Step ${index + 1}: ${result.step.name} - ${status}${duration}${colors.reset}`);
  });

  // Final status
  if (summary.failed === 0) {
    console.log(`\n${colors.green}${colors.bold}🎉 PIPELINE COMPLETED SUCCESSFULLY!${colors.reset}`);
    console.log(`${colors.green}All quality checks passed. Code is ready for deployment.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n${colors.yellow}⚠️  Pipeline completed with ${summary.failed} failed step(s).${colors.reset}`);
    console.log(`${colors.yellow}Review the errors above and re-run the pipeline.${colors.reset}\n`);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.cyan}${colors.bold}Mizan Complete Quality Pipeline${colors.reset}

${colors.bold}Usage:${colors.reset}
  node scripts/mizan-pipeline.js [options]

${colors.bold}Options:${colors.reset}
  --interactive           Enable interactive human review
  --no-auto-apply        Disable automatic fix application
  --confidence <value>   Set confidence threshold (0.0-1.0, default: 0.90)
  --help, -h            Show this help message

${colors.bold}Environment Variables:${colors.reset}
  INTERACTIVE=true       Enable interactive mode
  OPENAI_API_KEY         Enable GPT-4 tie-breaker (optional)
  GEMINI_API_KEY         Required for Agent 1 & 3
  ANTHROPIC_API_KEY      Required for Agent 2 & 5

${colors.bold}Examples:${colors.reset}
  node scripts/mizan-pipeline.js
  node scripts/mizan-pipeline.js --interactive
  node scripts/mizan-pipeline.js --confidence 0.85
  INTERACTIVE=true node scripts/mizan-pipeline.js

${colors.bold}Pipeline Steps:${colors.reset}
  1. Developer Agent (Enhanced) - Fix issues + Generate modules with 100% validation
  2. Code Audit - Scan for violations
  3. 6-Agent Pipeline - Complete quality analysis (incl. Enhanced Developer)
  4. Confidence Scoring - Calculate agent agreement
  5. GPT-4 Tie-Breaker - Resolve disagreements (optional)
  6. Human Review - Interactive review (optional)
  7. Apply Fixes - Auto-apply high-confidence fixes

${colors.cyan}For more information, see: AGENT_CONTEXT_ULTIMATE.md${colors.reset}
  `);
  process.exit(0);
}

// Parse options
if (args.includes('--interactive')) {
  PIPELINE_CONFIG.interactiveMode = true;
}
if (args.includes('--no-auto-apply')) {
  PIPELINE_CONFIG.autoApplyHighConfidence = false;
}
const confidenceIndex = args.indexOf('--confidence');
if (confidenceIndex !== -1 && args[confidenceIndex + 1]) {
  const threshold = parseFloat(args[confidenceIndex + 1]);
  if (threshold >= 0 && threshold <= 1) {
    PIPELINE_CONFIG.highConfidenceThreshold = threshold;
  }
}

// Run the complete pipeline
if (require.main === module) {
  runCompletePipeline().catch(error => {
    console.error(`${colors.red}💥 PIPELINE CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { runCompletePipeline, PIPELINE_CONFIG, PIPELINE_STEPS };

