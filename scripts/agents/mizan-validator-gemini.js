#!/usr/bin/env node

/**
 * AGENT 3: MIZAN VALIDATOR (Gemini 2.5 Flash)
 * 
 * Validates fixes against Mizan development rules
 * Checks for compliance, quality, and completeness
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load agent context once
const contextPath = path.join(__dirname, 'AGENT_CONTEXT.md');
let agentContext;
try {
  agentContext = fs.readFileSync(contextPath, 'utf8');
  console.log('✅ Loaded AGENT_CONTEXT.md\n');
} catch (error) {
  console.error('❌ Error: Could not load AGENT_CONTEXT.md');
  console.error('   Make sure the file exists in scripts/agents/');
  process.exit(1);
}

/**
 * Validate a fix against Mizan rules using Gemini
 */
async function validateFix(fixData) {
  const { violation, agent1Analysis, agent2Fix } = fixData;

  const prompt = `${agentContext}

═══════════════════════════════════════════════════════
AGENT 3: MIZAN VALIDATOR - FIX COMPLIANCE CHECK
═══════════════════════════════════════════════════════

You are Agent 3 (Mizan Validator) using Gemini 2.5. Your job is to validate fixes against Mizan development rules.

ORIGINAL VIOLATION:
File: ${violation.file}
Line: ${violation.line}
Code: ${violation.content}
Rule: ${violation.rule}

AGENT 2'S FIX:
Fix Type: ${agent2Fix.fixType}
Confidence: ${(agent2Fix.confidence * 100).toFixed(0)}%
Description: ${agent2Fix.primaryFix.description}
Code: ${agent2Fix.primaryFix.code ? agent2Fix.primaryFix.code.substring(0, 200) : 'N/A'}...
Additional Files: ${agent2Fix.primaryFix.additionalFiles ? agent2Fix.primaryFix.additionalFiles.length : 0}

YOUR MISSION:
Validate this fix against ALL Mizan development rules:

1. ✅ NO MOCK DATA - Does the fix use real database queries?
2. ✅ NO PLACEHOLDERS - Are there any TODOs, FIXMEs, or placeholders?
3. ✅ NO 'any' TYPES - Does it use strict TypeScript types?
4. ✅ DRIZZLE ORM - Does it use Drizzle (not Prisma, not raw SQL)?
5. ✅ NEXT.JS APP ROUTER - Does it follow App Router patterns?
6. ✅ PROPER ERROR HANDLING - Does it have try/catch and error responses?
7. ✅ AUTHENTICATION - Does it check authentication where needed?
8. ✅ TENANT ISOLATION - Does it filter by tenantId for multi-tenant data?
9. ✅ CORRECT FILE PATHS - Are paths relative to project root?
10. ✅ COMPLETENESS - Is the fix production-ready and complete?

CRITICAL CHECKS:
- If confidence is below 80%, mark as NEEDS_REVISION
- If additionalFiles array is empty for complex fixes, mark as INCOMPLETE
- If mizanComplianceCheck is empty, mark as INCOMPLETE
- Check if Three-Engine Architecture is needed but missing (AI agents)

RESPOND IN VALID JSON (NO MARKDOWN, NO BACKTICKS):
{
  "agent": "Gemini 2.5 Flash (Mizan Validator)",
  "timestamp": "ISO-8601",
  "recommendation": "APPROVE|NEEDS_REVISION|REJECT",
  "overallScore": 85,
  "mizanCompliance": {
    "realDatabaseQueries": true,
    "noPlaceholders": true,
    "strictTypes": true,
    "usesDrizzleORM": true,
    "usesAppRouter": true,
    "properErrorHandling": true,
    "hasAuthentication": true,
    "hasTenantIsolation": true,
    "correctFilePaths": true,
    "isComplete": true
  },
  "violations": [
    {
      "rule": "Rule name that was violated",
      "severity": "CRITICAL|HIGH|MEDIUM|LOW",
      "description": "What's wrong",
      "location": "Where in the fix"
    }
  ],
  "strengths": [
    "What's good about this fix"
  ],
  "concerns": [
    "What needs attention or improvement"
  ],
  "confidence": 0.92,
  "reasoning": "Detailed explanation of your assessment"
}

RESPOND WITH ONLY THE JSON OBJECT, NOTHING ELSE.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    let cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }
    
    const validation = JSON.parse(jsonMatch[0]);
    
    return {
      agent: 'Gemini 2.5 Flash (Mizan Validator)',
      timestamp: new Date().toISOString(),
      ...validation
    };

  } catch (error) {
    console.error(`   ❌ Validation error: ${error.message}`);
    return {
      agent: 'Gemini 2.5 Flash (Mizan Validator)',
      timestamp: new Date().toISOString(),
      error: error.message,
      recommendation: 'NEEDS_REVIEW',
      overallScore: 0,
      mizanCompliance: {},
      violations: [{ 
        rule: 'VALIDATION_ERROR', 
        severity: 'CRITICAL',
        description: `Validation failed: ${error.message}`,
        location: 'N/A'
      }],
      confidence: 0,
      reasoning: `Validation failed: ${error.message}`
    };
  }
}

/**
 * Main function - validate all fixes
 */
async function validateFixes() {
  console.log('🤖 Agent 3: Mizan Validator (Gemini 2.5 Flash) Starting...\n');

  const fixesPath = path.join(process.cwd(), 'scripts', 'agent2-fixes.json');
  
  let fixes;
  try {
    fixes = JSON.parse(fs.readFileSync(fixesPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error: Could not read agent2-fixes.json');
    console.error('   Run fix-generator-claude.js (Agent 2) first');
    process.exit(1);
  }

  console.log(`📊 Found ${fixes.length} fixes to validate\n`);

  const validations = [];
  let approvedCount = 0;
  let needsRevisionCount = 0;
  let rejectedCount = 0;

  for (let i = 0; i < fixes.length; i++) {
    const fixData = fixes[i];
    
    console.log(`🔍 [${i + 1}/${fixes.length}] Validating: ${fixData.violation.file}:${fixData.violation.line}`);
    console.log(`   Fix Confidence: ${(fixData.agent2Fix.confidence * 100).toFixed(0)}%`);
    
    const validation = await validateFix(fixData);
    
    validations.push({
      ...fixData,
      agent3Validation: validation
    });

    // Display result
    if (validation.error) {
      console.log(`   ❌ Validation Error: ${validation.error}`);
      needsRevisionCount++;
    } else {
      const scoreColor = validation.overallScore >= 80 ? '✅' : 
                        validation.overallScore >= 60 ? '⚠️' : '❌';
      console.log(`   ${scoreColor} Score: ${validation.overallScore}/100`);
      console.log(`   📋 Recommendation: ${validation.recommendation}`);
      
      if (validation.violations && validation.violations.length > 0) {
        console.log(`   ⚠️  Violations: ${validation.violations.length}`);
        validation.violations.slice(0, 2).forEach(v => {
          console.log(`      - ${v.severity}: ${v.rule}`);
        });
      }
      
      if (validation.recommendation === 'APPROVE') {
        approvedCount++;
      } else if (validation.recommendation === 'NEEDS_REVISION') {
        needsRevisionCount++;
      } else {
        rejectedCount++;
      }
    }
    
    console.log('');

    // Rate limiting - 2 seconds between requests
    if (i < fixes.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Save results
  const resultsPath = path.join(process.cwd(), 'scripts', 'agent3-validations.json');
  fs.writeFileSync(resultsPath, JSON.stringify(validations, null, 2));

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 AGENT 3 (GEMINI) SUMMARY:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Approved: ${approvedCount}`);
  console.log(`⚠️  Needs Revision: ${needsRevisionCount}`);
  console.log(`❌ Rejected: ${rejectedCount}`);
  console.log(`📁 Total validated: ${fixes.length}`);
  console.log(`💾 Results saved: scripts/agent3-validations.json\n`);
  
  console.log('✅ Agent 3 (Gemini Mizan Validator) complete!\n');
  
  console.log('📋 Next steps:');
  console.log('   1. Review validations in scripts/agent3-validations.json');
  console.log('   2. Fix any NEEDS_REVISION items in Agent 2');
  console.log('   3. Run Agent 4 (GPT-4 Security): node scripts/agents/security-checker-gpt4.js\n');
}

// Run
if (require.main === module) {
  validateFixes();
}

module.exports = { validateFix, validateFixes };