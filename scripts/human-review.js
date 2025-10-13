#!/usr/bin/env node

/**
 * HUMAN REVIEW INTERFACE
 * 
 * Interactive CLI for reviewing agent decisions
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function humanReview() {
  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  let decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('🔍 Human Review Interface\n');
  console.log(`Total fixes: ${decisions.length}\n`);

  for (let i = 0; i < decisions.length; i++) {
    const item = decisions[i];
    
    console.log(`\n───────────────────────────────────────`);
    console.log(`Fix #${i + 1}: ${item.violation.file}:${item.violation.line}`);
    console.log(`Rule: ${item.violation.rule}`);
    console.log(`Agent 3: ${item.agent3Validation.recommendation}`);
    console.log(`Agent 4: ${item.agent4SecurityReview.recommendation}`);
    console.log(`Agent 5: ${item.agent5FinalDecision.finalDecision}`);
    
    if (item.confidenceMetrics) {
      console.log(`Confidence: ${(item.confidenceMetrics.finalConfidence * 100).toFixed(0)}% (${item.confidenceMetrics.level})`);
    }

    const answer = await new Promise(resolve => {
      rl.question(`\nYour decision (approve/reject/skip): `, resolve);
    });

    if (answer.toLowerCase() === 'approve') {
      item.humanReview = {
        decision: 'APPROVE',
        timestamp: new Date().toISOString()
      };
      item.agent5FinalDecision.finalDecision = 'APPROVE';
      console.log('   ✅ Approved by human');
    } else if (answer.toLowerCase() === 'reject') {
      item.humanReview = {
        decision: 'REJECT',
        timestamp: new Date().toISOString()
      };
      item.agent5FinalDecision.finalDecision = 'REJECT';
      console.log('   ❌ Rejected by human');
    } else {
      console.log('   ⏭️  Skipped - keeping agent decision');
    }
  }

  rl.close();

  fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));
  console.log(`\n✅ Human review complete!\n`);
}

if (require.main === module) {
  humanReview();
}

module.exports = { humanReview };
