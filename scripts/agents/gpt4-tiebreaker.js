#!/usr/bin/env node

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
  console.log('🎯 Agent 6: GPT-4 Tie-Breaker Starting...\n');

  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  let decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));

  // Filter for disagreements
  const disagreements = decisions.filter(d => 
    d.agent3Validation.recommendation !== d.agent4SecurityReview.recommendation
  );

  console.log(`📊 Found ${disagreements.length} disagreements to review\n`);

  for (const item of disagreements) {
    const prompt = `You are a senior technical architect reviewing a code fix.

AGENT 3 (Mizan Validator - Claude) SAYS:
${JSON.stringify(item.agent3Validation, null, 2)}

AGENT 4 (Security Checker - Gemini) SAYS:
${JSON.stringify(item.agent4SecurityReview, null, 2)}

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
}`;

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

      console.log(`   ✅ Reviewed: ${item.violation.file}`);
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  // Save enhanced decisions
  fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));
  console.log(`\n✅ Agent 6 complete!\n`);
}

if (require.main === module) {
  tieBreaker();
}

module.exports = { tieBreaker };
