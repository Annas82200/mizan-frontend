#!/usr/bin/env node

/**
 * AGENT 1: CODE ANALYZER (Gemini 2.5 Flash)
 * 
 * Analyzes violations to determine if they're real issues
 * Uses AGENT_CONTEXT.md for accurate analysis
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
 * Analyze a single violation using Gemini with full context
 */
async function analyzeViolation(violation) {
  const prompt = `${agentContext}

═══════════════════════════════════════════════════════
AGENT 1: CODE ANALYZER - VIOLATION ANALYSIS
═══════════════════════════════════════════════════════

You are Agent 1 (Code Analyzer) using Gemini 2.5. Your job is to analyze code violations and determine if they are real issues or false positives.

VIOLATION TO ANALYZE:
File: ${violation.file}
Line: ${violation.line}
Code: ${violation.content}
Rule: ${violation.rule}
Message: ${violation.message}
Priority: ${violation.priority}

ANALYSIS TASKS:
1. Determine if this is a REAL violation or FALSE POSITIVE
2. Assess the severity and production impact
3. Provide confidence score (0.0 to 1.0)
4. Suggest high-level fix approach
5. Consider the file location and project structure (refer to AGENT_CONTEXT)

IMPORTANT CONSIDERATIONS:
- Check if the file path matches the project structure in AGENT_CONTEXT
- Consider if this violates any of the 5 Mizan Development Rules
- Think about production impact (security, stability, user experience)
- For test files (__tests__/), mock data is ACCEPTABLE
- For TODO comments, check if they indicate incomplete implementation

RESPOND IN VALID JSON (NO MARKDOWN, NO BACKTICKS):
{
  "isRealViolation": true,
  "severity": "CRITICAL|HIGH|MEDIUM|LOW",
  "impact": "Clear description of production impact if not fixed",
  "fixApproach": "High-level approach to fix this violation (2-3 steps)",
  "confidence": 0.95,
  "reasoning": "Detailed explanation of why this is/isn't a real violation",
  "suggestedCode": "Brief code example if applicable (optional)"
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
    
    const analysis = JSON.parse(jsonMatch[0]);
    
    return {
      agent: 'Gemini 2.5 Flash (Code Analyzer)',
      timestamp: new Date().toISOString(),
      ...analysis
    };

  } catch (error) {
    console.error(`   ❌ Analysis error: ${error.message}`);
    return {
      agent: 'Gemini 2.5 Flash (Code Analyzer)',
      error: error.message,
      isRealViolation: true, // Assume real to be safe
      severity: violation.priority.toUpperCase(),
      impact: 'Analysis failed - manual review required',
      fixApproach: 'Manual review and fix needed',
      confidence: 0.5,
      reasoning: `Analysis failed: ${error.message}`
    };
  }
}

/**
 * Main function - analyze critical and high priority violations
 */
async function analyzeViolations() {
  console.log('🤖 Agent 1: Code Analyzer (Gemini 2.5 Flash) Starting...\n');

  const auditReportPath = path.join(process.cwd(), 'scripts', 'audit-report.json');
  
  let auditReport;
  try {
    auditReport = JSON.parse(fs.readFileSync(auditReportPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error: Could not read audit-report.json');
    console.error('   Run audit-violations.js first');
    process.exit(1);
  }

  // Filter critical and high priority violations
  const violations = auditReport.violations.filter(v => 
    v.priority === 'critical' || v.priority === 'high'
  );

  console.log(`📊 Found ${violations.length} critical/high priority violations\n`);

  // Limit to first 10 for testing (to save API costs)
  const violationsToAnalyze = violations.slice(0, 10);
  console.log(`📝 Analyzing first ${violationsToAnalyze.length} violations\n`);

  const analyses = [];
  let realViolations = 0;
  let falsePositives = 0;

  for (let i = 0; i < violationsToAnalyze.length; i++) {
    const violation = violationsToAnalyze[i];
    
    console.log(`🔍 [${i + 1}/${violationsToAnalyze.length}] ${violation.file}:${violation.line}`);
    console.log(`   Rule: ${violation.rule} (${violation.priority})`);
    
    const analysis = await analyzeViolation(violation);
    
    analyses.push({
      violation,
      agent1Analysis: analysis
    });

    // Display result with safe property access
    if (analysis.isRealViolation) {
      realViolations++;
      const confidence = ((analysis.confidence || 0.5) * 100).toFixed(0);
      console.log(`   ✅ Real violation - Confidence: ${confidence}%`);
      console.log(`   🎯 Severity: ${analysis.severity}`);
      
      const impact = analysis.impact || 'Impact assessment unavailable';
      console.log(`   💥 Impact: ${impact.substring(0, 60)}...`);
      
      const fixApproach = analysis.fixApproach || 'Fix approach not provided';
      console.log(`   💡 Fix: ${fixApproach.substring(0, 60)}...`);
    } else {
      falsePositives++;
      const confidence = ((analysis.confidence || 0.5) * 100).toFixed(0);
      console.log(`   ⚠️  False positive - Confidence: ${confidence}%`);
      console.log(`   📝 Reasoning: ${(analysis.reasoning || 'N/A').substring(0, 60)}...`);
    }
    
    console.log('');

    // Rate limiting - 2 seconds between requests
    if (i < violationsToAnalyze.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Save results
  const resultsPath = path.join(process.cwd(), 'scripts', 'agent1-analyses.json');
  fs.writeFileSync(resultsPath, JSON.stringify(analyses, null, 2));

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 AGENT 1 (GEMINI) SUMMARY:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Real violations: ${realViolations}`);
  console.log(`⚠️  False positives: ${falsePositives}`);
  console.log(`📁 Analyzed: ${violationsToAnalyze.length}/${violations.length} total`);
  console.log(`💾 Results saved: scripts/agent1-analyses.json\n`);
  
  if (violations.length > 10) {
    console.log(`ℹ️  Note: Only analyzed first 10 violations to save API costs`);
    console.log(`   To analyze all ${violations.length} violations, modify the script\n`);
  }
  
  console.log('✅ Agent 1 (Gemini Code Analyzer) complete!\n');
}

// Run
if (require.main === module) {
  analyzeViolations();
}

module.exports = { analyzeViolation, analyzeViolations };