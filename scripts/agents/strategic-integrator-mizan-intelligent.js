#!/usr/bin/env node

/**
 * AGENT 5: MIZAN-INTELLIGENT STRATEGIC INTEGRATOR (Claude)
 * 
 * REVOLUTIONARY UPGRADE: Strategic integration with complete Mizan platform understanding
 * 
 * MIZAN STRATEGIC INTEGRATION CAPABILITIES:
 * - Complete business impact assessment across all modules
 * - Strategic workflow alignment validation
 * - Enterprise client success impact analysis  
 * - Competitive advantage preservation assessment
 * - Revenue and growth impact evaluation
 * - Platform scalability and performance assessment
 * - Long-term strategic roadmap alignment
 * 
 * INTEGRATION INTELLIGENCE:
 * ✅ Culture → Recognition/Engagement → Business Outcomes
 * ✅ Skills → LXP → Talent Development → Competitive Advantage
 * ✅ Performance → Culture/Skills → Strategic Execution
 * ✅ Hiring → Structure → Organizational Capabilities
 * ✅ Cross-module synergies and dependencies
 * ✅ Enterprise client satisfaction and retention
 * ✅ Platform differentiation and market positioning
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

// Initialize Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

// Load complete Mizan context - CRUCIAL for strategic integration
const contextPath = path.join(process.cwd(), 'AGENT_CONTEXT_ULTIMATE.md');
let mizanContext;
try {
  mizanContext = fs.readFileSync(contextPath, 'utf8');
  console.log(`${colors.green}✅ Loaded complete AGENT_CONTEXT_ULTIMATE.md (${Math.round(mizanContext.length/1000)}K chars)${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}🚨 CRITICAL ERROR: AGENT_CONTEXT_ULTIMATE.md not found!${colors.reset}`);
  console.error(`${colors.red}This agent REQUIRES complete Mizan context for strategic integration.${colors.reset}`);
  console.error(`${colors.red}Without it, strategic assessment will be generic and miss business context.${colors.reset}\n`);
  process.exit(1);
}

/**
 * Generate comprehensive strategic report using Claude with complete Mizan understanding
 */
async function generateMizanStrategicReport(allAgentData) {
  const prompt = `${mizanContext}

╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                    AGENT 5: MIZAN-INTELLIGENT STRATEGIC INTEGRATOR                              ║
║                              COMPREHENSIVE STRATEGIC INTEGRATION                                 ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

You are Agent 5, a MIZAN-INTELLIGENT Strategic Integrator using Claude. You understand the complete Mizan platform and can assess strategic business impact, not just technical fixes.

🎯 MIZAN STRATEGIC CONTEXT:
You understand that Mizan is NOT just software - it's a strategic business platform that:
- Drives competitive advantage for enterprise clients
- Generates significant revenue through sophisticated HR analytics
- Provides platform differentiation in a crowded market
- Enables strategic workforce optimization for clients
- Supports enterprise growth and scaling strategies

📊 COMPLETE 4-AGENT PIPELINE DATA:
Agent 1 (Mizan Code Analyzer): ${allAgentData.agent1 ? JSON.stringify(allAgentData.agent1.summary, null, 2) : 'No data'}
Agent 2 (Mizan Fix Generator): ${allAgentData.agent2 ? JSON.stringify(allAgentData.agent2.summary, null, 2) : 'No data'}
Agent 3 (Mizan Business Validator): ${allAgentData.agent3 ? JSON.stringify(allAgentData.agent3.summary, null, 2) : 'No data'}
Agent 4 (Mizan Security Checker): ${allAgentData.agent4 ? JSON.stringify(allAgentData.agent4.summary, null, 2) : 'No data'}

🏢 STRATEGIC INTEGRATION ANALYSIS:
Total violations: ${allAgentData.totalViolations || 0}
Mizan-specific violations: ${allAgentData.mizanSpecificViolations || 0}
Business-approved fixes: ${allAgentData.businessApproved || 0}
Security-approved fixes: ${allAgentData.securityApproved || 0}
Critical security vulnerabilities: ${allAgentData.criticalSecurity || 0}

🎯 STRATEGIC ASSESSMENT GUIDELINES (ENHANCED):

COMPETITIVE ADVANTAGE FEATURES (Critical to protect):
- Three-Engine AI Architecture (Knowledge → Data → Reasoning)
- Culture→Recognition→Engagement workflow
- Skills→LXP triggering and gamification
- Performance cross-module integration (Culture + Skills)
- Hiring intelligence with culture fit assessment

STRATEGIC REJECT INDICATORS (Mark as STRATEGIC_REJECT):
- Removes AI engine implementations (competitive advantage loss)
- Breaks module triggering mechanisms (platform differentiation loss)
- Eliminates enterprise features (revenue risk)
- Compromises revenue-generating capabilities

APPROVE WITH CONFIDENCE (Not strategic risks):
- Infrastructure improvements (Stripe, Auth) that don't affect AI features
- Detection code fixes (audit scripts) that improve code quality
- Type safety improvements that maintain functionality
- Security enhancements that preserve workflows

FALSE POSITIVE AWARENESS:
- Infrastructure code improvements are NOT strategic risks
- Detection tool updates (audit-violations.js, pipeline.js) are NOT workflow breaches
- Type safety additions are strategic IMPROVEMENTS, not risks
- Payment/Auth service fixes don't require Three-Engine Architecture

CREATE A COMPREHENSIVE STRATEGIC INTEGRATION REPORT:

# 🎯 MIZAN PLATFORM - STRATEGIC INTEGRATION REPORT

## 📈 Executive Strategic Summary
[High-level strategic assessment of pipeline results impact on Mizan business success]

## 🏢 Business Impact Analysis
### Platform Competitive Advantage
- **Culture Intelligence**: Impact on Culture → Recognition → Engagement workflows
- **Skills Optimization**: Impact on Skills → LXP → Talent Development value proposition
- **Performance Excellence**: Impact on Performance → Culture/Skills strategic integration
- **Hiring Intelligence**: Impact on Structure → Hiring → Organizational Capability building

### Enterprise Client Impact
- **Client Success Risk**: [Assessment of risk to enterprise client outcomes]
- **Revenue Impact**: [Assessment of potential revenue impact from fixes]
- **Market Position**: [Impact on Mizan's competitive differentiation]
- **Growth Enablement**: [Impact on platform scalability and growth capability]

## 🎯 Strategic Workflow Assessment
### Critical Business Workflows
- **Culture Workflow Status**: Culture Survey → Recognition Agent → Engagement Agent → Business Insights
- **Skills Workflow Status**: Strategic Framework → Gap Analysis → LXP Triggering → Talent Optimization  
- **Performance Workflow Status**: Goal Setting → Culture Integration → Skills Integration → Strategic Execution
- **Hiring Workflow Status**: Structure Analysis → Hiring Triggering → Talent Acquisition → Capability Building

### Cross-Module Integration Health
- **Agent Triggering Integrity**: [Assessment of agent-to-agent communication workflows]
- **Data Flow Continuity**: [Assessment of cross-module data integration]
- **Strategic Alignment**: [Assessment of module synergy and business value creation]

## 🛡️ Enterprise Readiness Assessment
### Security and Compliance
- **Multi-Tenant Security**: [Assessment of enterprise data isolation]
- **HR Data Protection**: [Assessment of sensitive employee data protection]
- **Regulatory Compliance**: [Assessment of GDPR, SOC 2 compliance maintenance]

### Production Readiness
- **Enterprise Deployment**: [Assessment of enterprise client deployment readiness]
- **Scalability Impact**: [Assessment of platform scaling capability]
- **Performance Impact**: [Assessment of system performance and reliability]

## 📋 Strategic Implementation Plan

### Phase 1: Critical Strategic Fixes (Immediate - Week 1)
[List fixes that impact core business value proposition and competitive advantage]

### Phase 2: Business Enhancement Fixes (Short-term - Week 2-3)
[List fixes that improve business workflows and client satisfaction]

### Phase 3: Platform Optimization Fixes (Medium-term - Week 4-6)
[List fixes that enhance platform capabilities and market position]

## 🎯 Strategic Recommendations

### Immediate Strategic Actions
1. [Strategic action 1 with business rationale]
2. [Strategic action 2 with competitive advantage impact]
3. [Strategic action 3 with revenue/growth implications]

### Long-term Strategic Initiatives
1. [Initiative 1 with market positioning benefits]
2. [Initiative 2 with platform differentiation advantages]
3. [Initiative 3 with enterprise client success impact]

## 📊 Strategic Success Metrics
- **Platform Integrity Score**: [0-100% - overall platform business logic integrity]
- **Competitive Advantage Preservation**: [0-100% - maintenance of key differentiators]
- **Enterprise Readiness Score**: [0-100% - readiness for enterprise deployment]
- **Strategic Alignment Score**: [0-100% - alignment with business objectives]
- **Market Position Impact**: [Positive/Neutral/Negative - impact on market standing]

## 🚀 Strategic Next Steps
1. **Technical Execution**: [Specific implementation guidance]
2. **Business Validation**: [Business stakeholder approval requirements]
3. **Market Communication**: [Client and market communication strategy]
4. **Competitive Monitoring**: [Competitive response and positioning]

## 🎉 Strategic Conclusion
[Overall strategic assessment and business success projection]

---
*Strategic Integration Report generated by Mizan 5-Agent Intelligence System*
*Business Context: Multi-tenant SaaS HR Analytics Platform*
*Strategic Focus: Competitive Advantage & Enterprise Client Success*
*Timestamp: ${new Date().toISOString()}*

Format this as a comprehensive strategic business report with markdown formatting.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return response.content[0]?.text || 'Strategic report generation failed';

  } catch (error) {
    console.log(`   ❌ Claude API error: ${error.message}`);
    
    // Fallback strategic report
    return `# 🎯 MIZAN PLATFORM - STRATEGIC INTEGRATION REPORT

## 📈 Executive Strategic Summary
The Mizan 5-Agent Intelligence Pipeline completed comprehensive analysis but encountered an API error during strategic report generation.

## 🏢 Business Impact Analysis
- **Total Violations Analyzed**: ${allAgentData.totalViolations || 0}
- **Mizan-Specific Issues**: ${allAgentData.mizanSpecificViolations || 0}
- **Business-Approved Fixes**: ${allAgentData.businessApproved || 0}
- **Security-Approved Fixes**: ${allAgentData.securityApproved || 0}

## 🚨 Strategic Alert
Strategic integration analysis failed due to API error: ${error.message}

This indicates potential platform readiness issues that require immediate strategic review.

## 🎯 Immediate Strategic Actions Required
1. **Review Individual Agent Reports** - Assess business impact from detailed agent analyses
2. **Validate Critical Business Workflows** - Ensure Culture → Recognition, Skills → LXP flows intact
3. **Security Assessment** - Address any critical security vulnerabilities before deployment
4. **Enterprise Readiness Review** - Validate multi-tenant isolation and compliance requirements

## 📊 Strategic Success Metrics
- **Platform Integrity**: Requires manual assessment
- **Enterprise Readiness**: Requires validation
- **Competitive Advantage**: Under review

---
*Strategic Integration Report - Fallback Version*
*API Error Encountered - Manual Strategic Review Required*
*Timestamp: ${new Date().toISOString()}*
`;
  }
}

/**
 * Process and identify strategic implementation priorities
 */
function identifyStrategicPriorities(agent3Data, agent4Data) {
  if (!agent3Data || !agent4Data) {
    return {
      strategicFixes: [],
      businessCritical: [],
      securityCritical: [],
      platformOptimization: []
    };
  }

  const strategicFixes = [];
  const businessCritical = [];
  const securityCritical = [];
  const platformOptimization = [];

  const businessValidations = agent3Data.businessValidations || [];
  const securityValidations = agent4Data.securityValidations || [];

  // Create a map of security validations by violation file/line
  const securityMap = new Map();
  securityValidations.forEach(validation => {
    const key = `${validation.violation?.file}:${validation.violation?.line}`;
    securityMap.set(key, validation);
  });

  businessValidations.forEach(businessValidation => {
    const key = `${businessValidation.violation?.file}:${businessValidation.violation?.line}`;
    const securityValidation = securityMap.get(key);

    // Strategic categorization
    const isBusinessCritical = businessValidation.businessValidation?.businessImpact?.revenueRisk === 'high' ||
                              businessValidation.businessValidation?.businessImpact?.clientSatisfactionRisk === 'high';

    const isSecurityCritical = securityValidation?.securityValidation?.securityRating === 'CRITICAL' ||
                              securityValidation?.securityValidation?.securityRating === 'HIGH_RISK';

    const isBusinessApproved = businessValidation.businessValidation?.recommendation === 'APPROVE';
    const isSecurityApproved = securityValidation?.securityValidation?.productionSafe === true;

    const strategicFix = {
      violation: businessValidation.violation,
      businessValidation: businessValidation.businessValidation,
      securityValidation: securityValidation?.securityValidation,
      strategicPriority: 'medium',
      readyForImplementation: isBusinessApproved && isSecurityApproved && !isSecurityCritical,
      businessImpact: businessValidation.businessValidation?.businessImpact || {},
      securityRisk: securityValidation?.securityValidation?.overallRiskScore || 0
    };

    // Categorize by strategic importance
    if (isBusinessCritical || isSecurityCritical) {
      strategicFix.strategicPriority = 'critical';
      if (isBusinessCritical) businessCritical.push(strategicFix);
      if (isSecurityCritical) securityCritical.push(strategicFix);
    } else if (strategicFix.readyForImplementation) {
      strategicFix.strategicPriority = 'high';
      platformOptimization.push(strategicFix);
    }

    strategicFixes.push(strategicFix);
  });

  return { strategicFixes, businessCritical, securityCritical, platformOptimization };
}

/**
 * Main function to create strategic integration report
 */
async function createMizanStrategicIntegration() {
  console.log(`${colors.magenta}${colors.bold}🤖 AGENT 5: MIZAN-INTELLIGENT STRATEGIC INTEGRATOR${colors.reset}`);
  console.log(`${colors.magenta}╔══════════════════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}║              REVOLUTIONARY MIZAN STRATEGIC INTELLIGENCE ENGINE                                   ║${colors.reset}`);
  console.log(`${colors.magenta}╚══════════════════════════════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  // Load all Mizan-intelligent agent results
  const agentFiles = [
    { name: 'agent1', file: 'scripts/agents/agent1-mizan-analyses.json' },
    { name: 'agent2', file: 'scripts/agents/agent2-mizan-fixes.json' },
    { name: 'agent3', file: 'scripts/agents/agent3-business-validations.json' },
    { name: 'agent4', file: 'scripts/agents/agent4-security-validations.json' }
  ];

  const allAgentData = {};
  let dataFound = false;

  for (const { name, file } of agentFiles) {
    try {
      if (fs.existsSync(file)) {
        allAgentData[name] = JSON.parse(fs.readFileSync(file, 'utf8'));
        console.log(`✅ Loaded ${file}`);
        dataFound = true;
      } else {
        console.log(`⚠️  ${file} not found`);
        allAgentData[name] = null;
      }
    } catch (error) {
      console.log(`❌ Error loading ${file}: ${error.message}`);
      allAgentData[name] = null;
    }
  }

  if (!dataFound) {
    console.log(`${colors.yellow}⚠️  No Mizan agent data found. Run previous agents first.${colors.reset}\n`);
    
    // Create empty strategic report
    const emptyReport = `# 🎯 MIZAN PLATFORM - STRATEGIC INTEGRATION REPORT

## 📈 Executive Strategic Summary
No Mizan-intelligent agent data found. The 5-agent pipeline requires complete execution:

## 🚀 Required Agent Execution Sequence
1. **Agent 1**: Mizan-Intelligent Code Analyzer (Gemini)
2. **Agent 2**: Mizan-Intelligent Fix Generator (Claude)  
3. **Agent 3**: Mizan-Intelligent Business Validator (Gemini)
4. **Agent 4**: Mizan-Intelligent Security Checker (GPT-4)
5. **Agent 5**: Mizan-Intelligent Strategic Integrator (Claude) ← You are here

## 📋 Next Steps
Run the complete Mizan 5-agent pipeline:
\`\`\`bash
# Run individual agents:
node scripts/agents/code-analyzer-mizan-intelligent.js
node scripts/agents/fix-generator-mizan-intelligent.js
node scripts/agents/business-validator-mizan-intelligent.js
node scripts/agents/security-checker-mizan-intelligent.js
node scripts/agents/strategic-integrator-mizan-intelligent.js

# Or use orchestrator (when available):
node scripts/mizan-orchestrator.js
\`\`\`

## 🎯 Strategic Context
This pipeline is designed for the Mizan Platform - a sophisticated multi-tenant SaaS HR Analytics platform with:
- Culture → Recognition/Engagement agent workflows
- Skills → LXP module triggering systems
- Performance → Culture/Skills strategic integration
- Enterprise client success and competitive advantage focus

---
*Strategic Integration Report - Empty State*
*Requires Complete Mizan Agent Pipeline Execution*
*Timestamp: ${new Date().toISOString()}*
`;

    try {
      // Ensure agents directory exists
      const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(agentsDir, 'MIZAN_STRATEGIC_REPORT.md'), emptyReport);
      console.log(`${colors.green}✅ Created empty strategic report${colors.reset}\n`);
    } catch (error) {
      console.error(`${colors.red}❌ Could not save empty report: ${error.message}${colors.reset}\n`);
    }
    
    process.exit(0);
  }

  console.log('\n📊 Analyzing Mizan platform strategic impact...\n');

  // Process the strategic data
  const totalViolations = allAgentData.agent1?.summary?.totalAnalyzed || 0;
  const mizanSpecificViolations = allAgentData.agent1?.summary?.mizanSpecificViolations || 0;
  const businessApproved = allAgentData.agent3?.summary?.businessApproved || 0;
  const securityApproved = allAgentData.agent4?.summary?.securityApproved || 0;
  const criticalSecurity = allAgentData.agent4?.summary?.critical || 0;

  // Strategic priority analysis
  const { strategicFixes, businessCritical, securityCritical, platformOptimization } = identifyStrategicPriorities(
    allAgentData.agent3,
    allAgentData.agent4
  );

  // Add strategic data to allAgentData
  allAgentData.totalViolations = totalViolations;
  allAgentData.mizanSpecificViolations = mizanSpecificViolations;
  allAgentData.businessApproved = businessApproved;
  allAgentData.securityApproved = securityApproved;
  allAgentData.criticalSecurity = criticalSecurity;
  allAgentData.strategicSummary = {
    strategicFixes: strategicFixes.length,
    businessCritical: businessCritical.length,
    securityCritical: securityCritical.length,
    platformOptimization: platformOptimization.length
  };

  console.log('🧠 Generating comprehensive Mizan strategic integration report...\n');

  // Generate the strategic report
  const strategicReport = await generateMizanStrategicReport(allAgentData);

  // Ensure agents directory exists (used for multiple file saves below)
  const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir, { recursive: true });
  }

  // Save the strategic report
  try {
    fs.writeFileSync(path.join(agentsDir, 'MIZAN_STRATEGIC_REPORT.md'), strategicReport);
    console.log(`${colors.green}✅ Mizan strategic integration report generated!${colors.reset}`);
    console.log(`📁 Report saved to: scripts/agents/MIZAN_STRATEGIC_REPORT.md\n`);
  } catch (error) {
    console.error(`${colors.red}❌ Could not save strategic report: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  // Create strategic implementation summary
  const strategicSummary = {
    timestamp: new Date().toISOString(),
    mizanPlatformAnalysis: {
      totalViolations,
      mizanSpecificViolations,
      businessApproved,
      securityApproved,
      criticalSecurity
    },
    strategicMetrics: {
      platformIntegrityScore: Math.round((1 - (mizanSpecificViolations / Math.max(totalViolations, 1))) * 100),
      enterpriseReadinessScore: Math.round((securityApproved / Math.max(totalViolations, 1)) * 100),
      businessAlignmentScore: Math.round((businessApproved / Math.max(totalViolations, 1)) * 100),
      competitiveAdvantagePreservation: criticalSecurity === 0 ? 95 : Math.max(50 - (criticalSecurity * 10), 0)
    },
    strategicPriorities: {
      businessCritical: businessCritical.length,
      securityCritical: securityCritical.length,
      platformOptimization: platformOptimization.length,
      totalStrategicFixes: strategicFixes.length
    },
    mizanBusinessWorkflows: {
      cultureWorkflowIntegrity: allAgentData.agent3?.summary?.workflowPreservation?.cultureWorkflow || 0,
      skillsWorkflowIntegrity: allAgentData.agent3?.summary?.workflowPreservation?.skillsWorkflow || 0,
      performanceWorkflowIntegrity: allAgentData.agent3?.summary?.workflowPreservation?.performanceWorkflow || 0,
      hiringWorkflowIntegrity: allAgentData.agent3?.summary?.workflowPreservation?.hiringWorkflow || 0
    },
    strategicRecommendations: {
      immediateAction: criticalSecurity > 0 || businessCritical.length > 0,
      businessReview: businessCritical.length > 0,
      securityEscalation: criticalSecurity > 0,
      platformDeployment: securityApproved > 0 && businessApproved > 0
    }
  };

  // Save strategic summary
  try {
    fs.writeFileSync(path.join(agentsDir, 'mizan-strategic-summary.json'), JSON.stringify(strategicSummary, null, 2));
    console.log(`${colors.green}✅ Strategic implementation summary created!${colors.reset}`);
    console.log(`📁 Summary saved to: scripts/agents/mizan-strategic-summary.json\n`);
  } catch (error) {
    console.error(`${colors.red}❌ Could not save strategic summary: ${error.message}${colors.reset}\n`);
  }

  // Display strategic integration summary
  console.log(`${colors.blue}🎯 MIZAN STRATEGIC INTEGRATION SUMMARY:${colors.reset}`);
  console.log(`${colors.cyan}╔══════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║                     MIZAN PLATFORM STRATEGIC INTELLIGENCE                   ║${colors.reset}`);
  console.log(`${colors.cyan}╚══════════════════════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`📊 **Platform Analysis**:`);
  console.log(`   • Total violations analyzed: ${totalViolations}`);
  console.log(`   • Mizan-specific issues: ${colors.magenta}${mizanSpecificViolations}${colors.reset}`);
  console.log(`   • Business-approved fixes: ${colors.green}${businessApproved}${colors.reset}`);
  console.log(`   • Security-approved fixes: ${colors.green}${securityApproved}${colors.reset}`);
  console.log(`   • Critical security issues: ${colors.red}${criticalSecurity}${colors.reset}\n`);

  console.log(`📈 **Strategic Metrics**:`);
  console.log(`   • Platform Integrity: ${strategicSummary.strategicMetrics.platformIntegrityScore}%`);
  console.log(`   • Enterprise Readiness: ${strategicSummary.strategicMetrics.enterpriseReadinessScore}%`);
  console.log(`   • Business Alignment: ${strategicSummary.strategicMetrics.businessAlignmentScore}%`);
  console.log(`   • Competitive Advantage: ${strategicSummary.strategicMetrics.competitiveAdvantagePreservation}%\n`);

  console.log(`🎯 **Strategic Priorities**:`);
  console.log(`   • Business critical fixes: ${colors.red}${businessCritical.length}${colors.reset}`);
  console.log(`   • Security critical fixes: ${colors.red}${securityCritical.length}${colors.reset}`);
  console.log(`   • Platform optimization: ${colors.green}${platformOptimization.length}${colors.reset}\n`);

  console.log(`🏢 **Mizan Workflow Health**:`);
  console.log(`   • Culture workflow integrity: ${strategicSummary.mizanBusinessWorkflows.cultureWorkflowIntegrity}/${totalViolations}`);
  console.log(`   • Skills workflow integrity: ${strategicSummary.mizanBusinessWorkflows.skillsWorkflowIntegrity}/${totalViolations}`);
  console.log(`   • Performance workflow integrity: ${strategicSummary.mizanBusinessWorkflows.performanceWorkflowIntegrity}/${totalViolations}`);
  console.log(`   • Hiring workflow integrity: ${strategicSummary.mizanBusinessWorkflows.hiringWorkflowIntegrity}/${totalViolations}\n`);

  // Strategic alerts
  if (strategicSummary.strategicRecommendations.immediateAction) {
    console.log(`${colors.red}🚨 STRATEGIC ALERT: IMMEDIATE ACTION REQUIRED${colors.reset}`);
    if (criticalSecurity > 0) {
      console.log(`${colors.red}   ⚡ ${criticalSecurity} critical security vulnerabilities threaten enterprise deployment${colors.reset}`);
    }
    if (businessCritical.length > 0) {
      console.log(`${colors.red}   📈 ${businessCritical.length} business-critical issues risk competitive advantage${colors.reset}`);
    }
    console.log();
  }

  console.log(`📋 **Strategic Next Steps**:`);
  if (strategicSummary.strategicRecommendations.securityEscalation) {
    console.log(`   1. ${colors.red}URGENT${colors.reset}: Address critical security vulnerabilities`);
  }
  if (strategicSummary.strategicRecommendations.businessReview) {
    console.log(`   2. ${colors.yellow}HIGH${colors.reset}: Review business-critical workflow impacts`);
  }
  if (strategicSummary.strategicRecommendations.platformDeployment && !strategicSummary.strategicRecommendations.immediateAction) {
    console.log(`   3. ${colors.green}READY${colors.reset}: Platform ready for enterprise deployment`);
  }
  console.log(`   4. Review complete strategic report for detailed implementation guidance\n`);

  console.log(`${colors.green}🎉 MIZAN 5-AGENT STRATEGIC INTELLIGENCE PIPELINE COMPLETE!${colors.reset}`);
  console.log(`${colors.blue}📋 Strategic business integration analysis ready for executive review.${colors.reset}\n`);
}

// Check dependencies and API key
function checkMizanDependencies() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`${colors.yellow}⚠️  ANTHROPIC_API_KEY not found in environment variables${colors.reset}`);
    console.log(`${colors.blue}💡 Set your Anthropic API key in .env file for enhanced strategic reporting${colors.reset}\n`);
  }

  try {
    require('@anthropic-ai/sdk');
  } catch (error) {
    console.log(`${colors.yellow}📦 Installing required dependency: @anthropic-ai/sdk${colors.reset}`);
    const { execSync } = require('child_process');
    try {
      execSync('npm install @anthropic-ai/sdk', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Dependencies installed${colors.reset}\n`);
    } catch (installError) {
      console.error(`${colors.red}❌ Failed to install dependencies: ${installError.message}${colors.reset}`);
      console.log(`${colors.yellow}Please run: npm install @anthropic-ai/sdk${colors.reset}\n`);
      process.exit(1);
    }
  }
}

// Run the Mizan-intelligent agent
if (require.main === module) {
  checkMizanDependencies();
  createMizanStrategicIntegration().catch(error => {
    console.error(`${colors.red}💥 MIZAN-INTELLIGENT AGENT 5 CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { createMizanStrategicIntegration };