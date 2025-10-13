#!/usr/bin/env node

/**
 * FULL PROJECT AUDIT WITH AUTO-APPLY
 * 
 * Runs complete multi-agent pipeline and applies all approved fixes
 */

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

async function runCommand(command, description) {
  console.log(`${colors.blue}${colors.bold}▶ ${description}...${colors.reset}`);
  try {
    const { stdout, stderr } = await execPromise(command);
    console.log(stdout);
    if (stderr) console.error(stderr);
    console.log(`${colors.green}✅ ${description} complete${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.yellow}⚠️  ${description} had issues${colors.reset}`);
    console.error(error.message);
    return false;
  }
}

async function fullAudit() {
  console.log(`${colors.blue}${colors.bold}
╔════════════════════════════════════════════════════════╗
║     MIZAN FULL PROJECT AUDIT & AUTO-FIX SYSTEM        ║
╚════════════════════════════════════════════════════════╝
${colors.reset}\n`);

  const pipeline = [
    { cmd: 'node scripts/audit-violations.js', desc: 'Agent 1: Detecting Violations' },
    { cmd: 'node scripts/agents/code-analyzer.js', desc: 'Agent 1: Analyzing Code' },
    { cmd: 'node scripts/agents/fix-generator.js', desc: 'Agent 2: Generating Fixes' },
    { cmd: 'node scripts/agents/mizan-validator.js', desc: 'Agent 3: Validating Fixes' },
    { cmd: 'node scripts/agents/security-checker.js', desc: 'Agent 4: Security Review' },
    { cmd: 'node scripts/agents/final-consensus.js', desc: 'Agent 5: Final Decision' },
    { cmd: 'node scripts/confidence-scorer.js', desc: 'Calculating Confidence Scores' },
    { cmd: 'node scripts/apply-fixes.js', desc: 'Applying Approved Fixes' }
  ];

  let successCount = 0;
  const startTime = Date.now();

  for (const step of pipeline) {
    const success = await runCommand(step.cmd, step.desc);
    if (success) successCount++;
  }

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);

  console.log(`${colors.blue}${colors.bold}
╔════════════════════════════════════════════════════════╗
║                  AUDIT COMPLETE                        ║
╚════════════════════════════════════════════════════════╝
${colors.reset}`);
  console.log(`${colors.green}✅ Completed ${successCount}/${pipeline.length} steps${colors.reset}`);
  console.log(`${colors.blue}⏱️  Total time: ${duration} minutes${colors.reset}\n`);
}

if (require.main === module) {
  fullAudit();
}

module.exports = { fullAudit };