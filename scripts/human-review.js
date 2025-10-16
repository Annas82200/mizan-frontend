#!/usr/bin/env node

/**
 * MIZAN INTERACTIVE HUMAN REVIEW
 * 
 * Interactive CLI for reviewing and approving agent-generated fixes
 * Provides human oversight for automated quality improvements
 * 
 * COMPLIANT WITH: AGENT_CONTEXT_ULTIMATE.md
 * - Production-ready code only
 * - Complete error handling
 * - No placeholders or mock data
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for terminal output
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
 * Main human review function
 * Presents each fix for human approval/rejection
 */
async function humanReview() {
  console.log(`\n${colors.cyan}${colors.bold}╔═══════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}║       MIZAN INTERACTIVE HUMAN REVIEW                              ║${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}║       Review and Approve Agent-Generated Fixes                    ║${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}╚═══════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  const decisionsPath = path.join(process.cwd(), 'scripts', 'agents', 'agent5-final-decisions.json');
  
  if (!fs.existsSync(decisionsPath)) {
    console.log(`${colors.yellow}⚠️  No agent5-final-decisions.json found${colors.reset}`);
    console.log(`${colors.yellow}The 5-agent pipeline must run first to generate fix recommendations.${colors.reset}\n`);
    process.exit(0);
  }

  let decisions;
  try {
    decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Could not parse decisions file: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  if (!Array.isArray(decisions) || decisions.length === 0) {
    console.log(`${colors.green}✅ No fixes to review - all clear!${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`${colors.cyan}📊 Total fixes to review: ${decisions.length}${colors.reset}`);
  console.log(`${colors.cyan}Commands: approve (a/y/yes) | reject (r/n/no) | skip (s)${colors.reset}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let approved = 0;
  let rejected = 0;
  let skipped = 0;

  for (let i = 0; i < decisions.length; i++) {
    const item = decisions[i];
    
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bold}Fix #${i + 1} of ${decisions.length}${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    // Violation details
    console.log(`${colors.bold}📁 File:${colors.reset} ${item.violation.file}:${item.violation.line || 'unknown'}`);
    console.log(`${colors.bold}⚠️  Rule:${colors.reset} ${item.violation.rule}`);
    console.log(`${colors.bold}🔴 Severity:${colors.reset} ${item.violation.severity}\n`);
    
    // Original code
    console.log(`${colors.bold}Original Code:${colors.reset}`);
    const originalCode = item.violation.content || 'N/A';
    console.log(`   ${colors.yellow}${originalCode.substring(0, 150)}${originalCode.length > 150 ? '...' : ''}${colors.reset}\n`);
    
    // Proposed fix preview
    if (item.agent2Fix?.primaryFix?.newCode) {
      console.log(`${colors.bold}Proposed Fix:${colors.reset}`);
      const fixCode = item.agent2Fix.primaryFix.newCode;
      const fixPreview = fixCode.substring(0, 200);
      console.log(`   ${colors.green}${fixPreview}${fixCode.length > 200 ? '...' : ''}${colors.reset}\n`);
      
      if (item.agent2Fix.primaryFix.explanation) {
        console.log(`${colors.bold}Explanation:${colors.reset}`);
        console.log(`   ${item.agent2Fix.primaryFix.explanation.substring(0, 200)}...\n`);
      }
    }
    
    // Agent recommendations
    console.log(`${colors.bold}Agent Recommendations:${colors.reset}`);
    const agent3Rec = item.agent3Validation?.recommendation || 'N/A';
    const agent4Rec = item.agent4SecurityReview?.recommendation || 'N/A';
    const agent5Rec = item.agent5FinalDecision?.finalDecision || 'N/A';
    
    const agent3Color = agent3Rec === 'APPROVE' ? colors.green : agent3Rec === 'REJECT' ? colors.red : colors.yellow;
    const agent4Color = agent4Rec === 'APPROVE' ? colors.green : agent4Rec === 'REJECT' ? colors.red : colors.yellow;
    const agent5Color = agent5Rec === 'APPROVE' ? colors.green : agent5Rec === 'REJECT' ? colors.red : colors.yellow;
    
    console.log(`   Agent 3 (Business): ${agent3Color}${agent3Rec}${colors.reset}`);
    console.log(`   Agent 4 (Security): ${agent4Color}${agent4Rec}${colors.reset}`);
    console.log(`   Agent 5 (Final): ${agent5Color}${agent5Rec}${colors.reset}`);
    
    // Confidence score
    if (item.confidenceMetrics) {
      const confidence = (item.confidenceMetrics.finalConfidence * 100).toFixed(0);
      const confColor = confidence >= 90 ? colors.green : confidence >= 75 ? colors.yellow : colors.red;
      console.log(`   ${colors.bold}Confidence:${colors.reset} ${confColor}${confidence}%${colors.reset} (${item.confidenceMetrics.level})`);
    }
    
    console.log('');

    // Get human decision
    const answer = await new Promise(resolve => {
      rl.question(`${colors.bold}Your decision (${colors.green}approve${colors.reset}/${colors.red}reject${colors.reset}/${colors.yellow}skip${colors.reset}): ${colors.reset}`, resolve);
    });

    const decision = answer.toLowerCase().trim();
    
    // Process decision
    if (decision === 'approve' || decision === 'a' || decision === 'y' || decision === 'yes') {
      item.humanReview = {
        decision: 'APPROVE',
        reviewer: 'human',
        timestamp: new Date().toISOString()
      };
      item.agent5FinalDecision.finalDecision = 'APPROVE';
      console.log(`   ${colors.green}✅ APPROVED by human reviewer${colors.reset}\n`);
      approved++;
      
    } else if (decision === 'reject' || decision === 'r' || decision === 'n' || decision === 'no') {
      item.humanReview = {
        decision: 'REJECT',
        reviewer: 'human',
        timestamp: new Date().toISOString()
      };
      item.agent5FinalDecision.finalDecision = 'REJECT';
      console.log(`   ${colors.red}❌ REJECTED by human reviewer${colors.reset}\n`);
      rejected++;
      
    } else {
      item.humanReview = {
        decision: 'SKIP',
        reviewer: 'human',
        timestamp: new Date().toISOString(),
        note: 'Keeping agent recommendation'
      };
      console.log(`   ${colors.yellow}⏭️  SKIPPED - Keeping agent decision (${agent5Rec})${colors.reset}\n`);
      skipped++;
    }
  }

  rl.close();

  // Save updated decisions with human reviews
  try {
    fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));
    
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bold}📊 HUMAN REVIEW SUMMARY${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    console.log(`   ${colors.green}✅ Approved: ${approved}${colors.reset}`);
    console.log(`   ${colors.red}❌ Rejected: ${rejected}${colors.reset}`);
    console.log(`   ${colors.yellow}⏭️  Skipped: ${skipped}${colors.reset}`);
    console.log(`   ${colors.cyan}📋 Total Reviewed: ${decisions.length}${colors.reset}\n`);
    console.log(`${colors.green}✅ Human review decisions saved successfully!${colors.reset}\n`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Could not save decisions: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  process.exit(0);
}

// Run human review when executed directly
if (require.main === module) {
  humanReview().catch(error => {
    console.error(`${colors.red}💥 Human review crashed: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { humanReview };

