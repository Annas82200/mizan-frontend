#!/usr/bin/env node

/**
 * AGENT 5: FINAL INTEGRATOR (Claude Sonnet 4.5)
 * 
 * Synthesizes all agent outputs, generates final report,
 * and creates implementation plan
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load agent context
const contextPath = path.join(__dirname, 'AGENT_CONTEXT.md');
let agentContext;
try {
  agentContext = fs.readFileSync(contextPath, 'utf8');
  console.log('✅ Loaded AGENT_CONTEXT.md\n');
} catch (error) {
  console.error('❌ Error: Could not load AGENT_CONTEXT.md');
  process.exit(1);
}

/**
 * Generate final integration report and implementation plan
 */
async function generateFinalReport(allData) {
  const prompt = `${agentContext}

═══════════════════════════════════════════════════════
AGENT 5: FINAL INTEGRATOR - SYNTHESIS & IMPLEMENTATION
═══════════════════════════════════════════════════════

You are Agent 5 (Final Integrator) using Claude Sonnet 4.5. Your job is to synthesize all agent outputs and create an actionable implementation plan.

COMPLETE PIPELINE DATA:
${JSON.stringify(allData, null, 2).substring(0, 8000)}

YOUR MISSION:
Create a comprehensive final report that includes:

1. EXECUTIVE SUMMARY
   - Overall pipeline success rate
   - Total violations found vs fixed
   - Quality metrics
   - Security posture

2. FIX CATEGORIZATION
   - Ready to implement (APPROVED + SECURE)
   - Needs security fixes (APPROVED + vulnerabilities)
   - Needs revision (NEEDS_REVISION)
   - Failed (errors)

3. IMPLEMENTATION PRIORITY MATRIX
   Prioritize fixes by:
   - Business impact (HIGH/MEDIUM/LOW)
   - Security risk (CRITICAL/HIGH/MEDIUM/LOW)
   - Implementation complexity (SIMPLE/MODERATE/COMPLEX)
   - Dependencies (what depends on what)

4. IMPLEMENTATION ROADMAP
   Phase 1 (Immediate): Critical + High Impact + Secure
   Phase 2 (Short-term): Medium Impact + Minor security fixes
   Phase 3 (Long-term): Low Impact + Complex changes

5. TESTING STRATEGY
   - Unit tests needed
   - Integration tests needed
   - Security tests needed
   - Database migrations required

6. RISK ASSESSMENT
   - Implementation risks
   - Rollback plans
   - Monitoring requirements

7. DETAILED FIX SUMMARIES
   For each fix provide:
   - What it does
   - Files changed/created
   - Database changes needed
   - Security considerations
   - Testing checklist
   - Estimated effort

RESPOND IN MARKDOWN FORMAT:
Generate a comprehensive, well-structured report in Markdown that developers can use as their implementation guide.

Include:
- Clear headings and sections
- Tables for fix categorization
- Priority matrix
- Step-by-step implementation instructions
- Code snippets where helpful
- Warnings and gotchas

Make it actionable, detailed, and production-ready!`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    return message.content[0].text;

  } catch (error) {
    console.error(`   ❌ Report generation error: ${error.message}`);
    return `# Error Generating Report\n\n${error.message}`;
  }
}

/**
 * Main function - integrate all agent outputs
 */
async function integratePipeline() {
  console.log('📊 Agent 5: Final Integrator (Claude Sonnet 4.5) Starting...\n');

  const securityPath = path.join(process.cwd(), 'scripts', 'agent4-security.json');
  
  let securityData;
  try {
    securityData = JSON.parse(fs.readFileSync(securityPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error: Could not read agent4-security.json');
    console.error('   Run security-checker-gpt4.js (Agent 4) first');
    process.exit(1);
  }

  console.log(`📊 Integrating pipeline results for ${securityData.length} fixes...\n`);

  // Calculate statistics
  const stats = {
    total: securityData.length,
    approved: securityData.filter(d => d.agent3Validation.recommendation === 'APPROVE').length,
    needsRevision: securityData.filter(d => d.agent3Validation.recommendation === 'NEEDS_REVISION').length,
    secure: securityData.filter(d => d.agent4Security.securityRating === 'SECURE').length,
    vulnerabilities: securityData.reduce((sum, d) => sum + (d.agent4Security.vulnerabilities?.length || 0), 0),
    readyToImplement: securityData.filter(d => 
      d.agent3Validation.recommendation === 'APPROVE' && 
      d.agent4Security.securityRating === 'SECURE'
    ).length
  };

  console.log('📈 Pipeline Statistics:');
  console.log(`   Total Violations: ${stats.total}`);
  console.log(`   Agent 3 Approved: ${stats.approved}`);
  console.log(`   Agent 3 Needs Revision: ${stats.needsRevision}`);
  console.log(`   Agent 4 Secure: ${stats.secure}`);
  console.log(`   Total Vulnerabilities: ${stats.vulnerabilities}`);
  console.log(`   ✅ Ready to Implement: ${stats.readyToImplement}\n`);

  console.log('🤖 Generating final integration report with Claude...\n');

  const finalReport = await generateFinalReport(securityData);

  // Save markdown report
  const reportPath = path.join(process.cwd(), 'scripts', 'FINAL_REPORT.md');
  fs.writeFileSync(reportPath, finalReport);

  // Save JSON summary
  const summaryPath = path.join(process.cwd(), 'scripts', 'pipeline-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    fixes: securityData.map(d => ({
      file: d.violation.file,
      line: d.violation.line,
      agent3Score: d.agent3Validation.overallScore,
      agent3Verdict: d.agent3Validation.recommendation,
      agent4Rating: d.agent4Security.securityRating,
      agent4RiskScore: d.agent4Security.overallRiskScore,
      readyToImplement: d.agent3Validation.recommendation === 'APPROVE' && 
                       d.agent4Security.securityRating === 'SECURE'
    }))
  }, null, 2));

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 AGENT 5 (CLAUDE) INTEGRATION COMPLETE:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Ready to Implement: ${stats.readyToImplement}/${stats.total}`);
  console.log(`📄 Final Report: scripts/FINAL_REPORT.md`);
  console.log(`📊 Pipeline Summary: scripts/pipeline-summary.json`);
  console.log(`🔒 Security Data: scripts/agent4-security.json\n`);
  
  console.log('🎉 5-AGENT PIPELINE COMPLETE!\n');
  
  console.log('📋 Next steps:');
  console.log('   1. Read FINAL_REPORT.md for implementation plan');
  console.log('   2. Implement fixes in priority order');
  console.log('   3. Run tests after each implementation');
  console.log('   4. Monitor for issues in production\n');
}

// Run
if (require.main === module) {
  integratePipeline();
}

module.exports = { integratePipeline };