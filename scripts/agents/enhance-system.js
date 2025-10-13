#!/usr/bin/env node

/**
 * MULTI-AGENT SYSTEM ENHANCEMENTS
 * 
 * Adds GPT-4, improves validation, and creates specialized agents
 */

const fs = require('fs');
const path = require('path');

function enhanceSystem() {
  console.log('🚀 Enhancing Multi-Agent System...\n');

  // Enhancement 1: Add Agent 6 (GPT-4 as tie-breaker)
  console.log('📋 Creating Agent 6: GPT-4 Tie-Breaker...');

  const agent6Code = `#!/usr/bin/env node

/**
 * AGENT 6: GPT-4 TIE-BREAKER (Optional - requires OpenAI API key)
 * 
 * Reviews fixes where Agent 3 and Agent 4 disagree
 */

require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// Only run if OpenAI API key exists
if (!process.env.OPENAI_API_KEY) {
  console.log('⚠️  OpenAI API key not found - skipping Agent 6');
  console.log('   Add OPENAI_API_KEY to .env to enable GPT-4 tie-breaker');
  process.exit(0);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function tieBreaker() {
  console.log('🎯 Agent 6: GPT-4 Tie-Breaker Starting...\\n');

  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  let decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));

  // Filter for disagreements
  const disagreements = decisions.filter(d => 
    d.agent3Validation.recommendation !== d.agent4SecurityReview.recommendation
  );

  console.log(\`📊 Found \${disagreements.length} disagreements to review\\n\`);

  for (const item of disagreements) {
    const prompt = \`You are a senior technical architect reviewing a code fix.

AGENT 3 (Mizan Validator - Claude) SAYS:
\${JSON.stringify(item.agent3Validation, null, 2)}

AGENT 4 (Security Checker - Gemini) SAYS:
\${JSON.stringify(item.agent4SecurityReview, null, 2)}

As a neutral third party, provide your assessment:
1. Which agent has the stronger argument?
2. Are the security concerns blocking or addressable?
3. What's your recommendation?

Respond in JSON:
{
  "recommendation": "APPROVE|REJECT",
  "reasoning": "Your analysis",
  "priority": "Which concerns are most critical",
  "suggestedPath": "How to proceed"
}\`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });

      const gptResponse = JSON.parse(completion.choices[0].message.content);
      item.agent6TieBreaker = {
        agent: 'GPT-4 (Tie-Breaker)',
        timestamp: new Date().toISOString(),
        ...gptResponse
      };

      console.log(\`   ✅ Reviewed: \${item.violation.file}\`);
    } catch (error) {
      console.error(\`   ❌ Error: \${error.message}\`);
    }
  }

  // Save enhanced decisions
  fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));
  console.log(\`\\n✅ Agent 6 complete!\\n\`);
}

if (require.main === module) {
  tieBreaker();
}

module.exports = { tieBreaker };
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'agents', 'gpt4-tiebreaker.js'),
    agent6Code
  );

  console.log('   ✅ Agent 6 created\n');

  // Enhancement 2: Confidence scoring system
  console.log('📋 Creating confidence scoring system...');

  const confidenceCode = `#!/usr/bin/env node

/**
 * CONFIDENCE SCORER
 * 
 * Analyzes multi-agent agreement and assigns confidence scores
 */

const fs = require('fs');
const path = require('path');

function calculateConfidence() {
  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  let decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));

  for (const item of decisions) {
    const agent3Conf = item.agent3Validation.confidence || 0;
    const agent4Conf = item.agent4SecurityReview.confidenceScore || 0;
    const agent5Conf = item.agent5FinalDecision.confidence || 0;

    // Calculate weighted confidence
    const avgConfidence = (agent3Conf + agent4Conf + agent5Conf) / 3;
    
    // Agreement bonus
    const agreement = item.agent5FinalDecision.agentAgreement.consensus ? 0.1 : 0;
    
    // Final confidence
    const finalConfidence = Math.min(1.0, avgConfidence + agreement);

    item.confidenceMetrics = {
      agent3Confidence: agent3Conf,
      agent4Confidence: agent4Conf,
      agent5Confidence: agent5Conf,
      averageConfidence: avgConfidence,
      agreementBonus: agreement,
      finalConfidence: finalConfidence,
      level: finalConfidence >= 0.9 ? 'very-high' :
             finalConfidence >= 0.8 ? 'high' :
             finalConfidence >= 0.7 ? 'medium' : 'low'
    };
  }

  fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));
  console.log('✅ Confidence scores calculated\\n');
}

if (require.main === module) {
  calculateConfidence();
}

module.exports = { calculateConfidence };
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'confidence-scorer.js'),
    confidenceCode
  );

  console.log('   ✅ Confidence scorer created\n');

  // Enhancement 3: Human review interface
  console.log('📋 Creating human review interface...');

  const reviewCode = `#!/usr/bin/env node

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

  console.log('🔍 Human Review Interface\\n');
  console.log(\`Total fixes: \${decisions.length}\\n\`);

  for (let i = 0; i < decisions.length; i++) {
    const item = decisions[i];
    
    console.log(\`\\n───────────────────────────────────────\`);
    console.log(\`Fix #\${i + 1}: \${item.violation.file}:\${item.violation.line}\`);
    console.log(\`Rule: \${item.violation.rule}\`);
    console.log(\`Agent 3: \${item.agent3Validation.recommendation}\`);
    console.log(\`Agent 4: \${item.agent4SecurityReview.recommendation}\`);
    console.log(\`Agent 5: \${item.agent5FinalDecision.finalDecision}\`);
    
    if (item.confidenceMetrics) {
      console.log(\`Confidence: \${(item.confidenceMetrics.finalConfidence * 100).toFixed(0)}% (\${item.confidenceMetrics.level})\`);
    }

    const answer = await new Promise(resolve => {
      rl.question(\`\\nYour decision (approve/reject/skip): \`, resolve);
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
  console.log(\`\\n✅ Human review complete!\\n\`);
}

if (require.main === module) {
  humanReview();
}

module.exports = { humanReview };
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'human-review.js'),
    reviewCode
  );

  console.log('   ✅ Human review interface created\n');

  console.log('🎉 System enhancements complete!\n');
  console.log('New capabilities:');
  console.log('  - Agent 6: GPT-4 tie-breaker (optional)');
  console.log('  - Confidence scoring across all agents');
  console.log('  - Human review interface for final decisions\n');
}

// Run the enhancement
if (require.main === module) {
  enhanceSystem();
}

module.exports = { enhanceSystem };