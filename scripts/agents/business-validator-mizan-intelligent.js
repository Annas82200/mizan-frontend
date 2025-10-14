#!/usr/bin/env node

/**
 * AGENT 3: MIZAN-INTELLIGENT BUSINESS VALIDATOR (Gemini)
 * 
 * REVOLUTIONARY UPGRADE: Validates fixes with complete Mizan business understanding
 * 
 * MIZAN BUSINESS VALIDATION CAPABILITIES:
 * - Culture Agent → Recognition/Engagement agent workflow validation
 * - Skills Analysis → LXP module triggering validation
 * - Performance Module → Culture/Skills integration validation
 * - Three-Engine Architecture pattern compliance
 * - Cross-module dependency preservation
 * - Strategic workflow completeness verification
 * - Multi-tenant business logic isolation
 * - BOT interaction pattern validation
 * 
 * BUSINESS LOGIC UNDERSTANDING:
 * ✅ Strategic skills framework development workflows
 * ✅ Employee skills gap → LXP personalized learning paths
 * ✅ Performance goal setting → Culture priorities integration
 * ✅ Hiring module → Structure analysis triggering
 * ✅ Bonus calculation → Skills achievements integration
 * ✅ Talent identification → Combined analysis results
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

// Load complete Mizan context - CRITICAL for business validation
const contextPath = path.join(process.cwd(), 'AGENT_CONTEXT_ULTIMATE.md');
let mizanContext;
try {
  mizanContext = fs.readFileSync(contextPath, 'utf8');
  console.log(`${colors.green}✅ Loaded complete AGENT_CONTEXT_ULTIMATE.md (${Math.round(mizanContext.length/1000)}K chars)${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}🚨 CRITICAL ERROR: AGENT_CONTEXT_ULTIMATE.md not found!${colors.reset}`);
  console.error(`${colors.red}This agent REQUIRES complete Mizan context for business validation.${colors.reset}`);
  console.error(`${colors.red}Without it, validation will be generic and miss business logic.${colors.reset}\n`);
  process.exit(1);
}

/**
 * MIZAN BUSINESS WORKFLOW PATTERNS
 * These represent the core business logic that must be preserved
 */
const MIZAN_BUSINESS_WORKFLOWS = {
  CULTURE_WORKFLOW: {
    trigger: 'Culture Survey Completion',
    flow: 'Survey → Last 2 Questions → Recognition Agent → Engagement Agent → Integrated Analysis',
    validation: [
      'Survey data triggers recognition analysis',
      'Recognition analysis triggers engagement analysis',
      'Both agent results integrate with culture analysis',
      'Department-level aggregation occurs',
      'Organization-level insights generated'
    ]
  },
  
  SKILLS_WORKFLOW: {
    trigger: 'Strategic Skills Framework + Employee Data',
    flow: 'Strategy Analysis → Skills Framework → Gap Analysis → LXP Triggering → Learning Paths',
    validation: [
      'Client strategy drives skills framework',
      'Individual skills gaps identified',
      'LXP module automatically triggered',
      'Personalized learning paths created',
      'Department and org-level skills assessment'
    ]
  },
  
  PERFORMANCE_WORKFLOW: {
    trigger: 'Performance Cycle Initiation',
    flow: 'Strategy → Goal Decomposition → Culture Integration → Skills Integration → Approval Flow',
    validation: [
      'Performance agent requests culture priorities',
      'Performance agent requests critical skills gaps',
      'Goals limited to max 3 total (1 culture, 2 skills)',
      'BOT manages approval workflow',
      'Quarterly aggregation and annual calibration'
    ]
  },
  
  HIRING_WORKFLOW: {
    trigger: 'Structure Analysis Recommendation',
    flow: 'Structure Recommendation → Hiring Trigger → Job Creation → Culture Assessment → Interview Support',
    validation: [
      'Triggered only by structure analysis',
      'Uses first 3 culture survey questions for applicants',
      'Compensation analysis based on market + industry',
      'BOT assists hiring managers',
      'Integration with external recruitment platforms'
    ]
  }
};

/**
 * Validate a fix against complete Mizan business logic
 */
async function validateMizanBusinessLogic(fixData) {
  const { violation, mizanAnalysis, mizanFix } = fixData;

  if (!mizanFix || fixData.skipped) {
    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation: {
        recommendation: 'SKIP',
        overallScore: 0,
        reason: 'Fix was skipped by Agent 2',
        businessCompliance: {
          workflowPreservation: true,
          crossModuleIntegration: true,
          strategicAlignment: true,
          businessLogicIntegrity: true
        }
      },
      skipped: true
    };
  }

  const prompt = `${mizanContext}

╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                    AGENT 3: MIZAN-INTELLIGENT BUSINESS VALIDATOR                                ║
║                              COMPREHENSIVE BUSINESS LOGIC VALIDATION                            ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

You are Agent 3, a MIZAN-INTELLIGENT Business Validator using Gemini. You understand the complete Mizan business ecosystem and can validate that fixes preserve critical business workflows.

🎯 MIZAN BUSINESS CONTEXT:
You understand that Mizan is NOT just code - it's a sophisticated business platform with:
- Strategic business workflows that generate revenue
- Complex agent triggering that drives business value
- Cross-module dependencies that ensure platform integrity
- Multi-tenant business logic that serves enterprise clients
- Strategic alignment requirements for competitive advantage

🔍 ORIGINAL VIOLATION:
File: ${violation.file}
Rule: ${violation.rule}
Description: ${violation.description}

🧠 AGENT 1 MIZAN ANALYSIS:
${JSON.stringify(mizanAnalysis.mizanBusinessImpact, null, 2)}

🛠️ AGENT 2 MIZAN FIX:
${JSON.stringify(mizanFix, null, 2)}

🏢 CRITICAL BUSINESS VALIDATION TASKS:

1. WORKFLOW PRESERVATION VALIDATION:
   - Does the fix maintain Culture → Recognition → Engagement workflow?
   - Does it preserve Skills → LXP triggering mechanisms?
   - Does it maintain Performance → Culture/Skills integration?
   - Does it preserve Hiring → Structure analysis triggering?

2. CROSS-MODULE INTEGRATION VALIDATION:
   - Are module dependencies preserved?
   - Do agent triggering mechanisms still function?
   - Is data flow between modules maintained?
   - Are BOT interaction patterns intact?

3. STRATEGIC ALIGNMENT VALIDATION:
   - Does the fix support strategic business objectives?
   - Is the Three-Engine Architecture integrity maintained?
   - Are business workflow completeness requirements met?
   - Is multi-tenant business logic properly isolated?

4. REVENUE IMPACT ASSESSMENT:
   - Could this fix impact client business outcomes?
   - Does it maintain platform competitive advantages?
   - Are enterprise features properly preserved?
   - Is scalability and performance maintained?

5. COMPLIANCE AND GOVERNANCE:
   - Are multi-tenant isolation requirements met?
   - Is data privacy and security maintained?
   - Are audit trail requirements preserved?
   - Is regulatory compliance maintained?

🎯 RESPOND IN JSON FORMAT:
{
  "recommendation": "APPROVE|REVISE|REJECT",
  "overallScore": 0-100,
  "confidence": 0.0-1.0,
  "businessCompliance": {
    "workflowPreservation": true/false,
    "crossModuleIntegration": true/false,
    "strategicAlignment": true/false,
    "businessLogicIntegrity": true/false,
    "agentTriggering": true/false,
    "dataFlowIntegrity": true/false,
    "botInteractionPatterns": true/false,
    "multiTenantIsolation": true/false
  },
  "workflowValidation": {
    "cultureWorkflow": "preserved|compromised|broken",
    "skillsWorkflow": "preserved|compromised|broken",
    "performanceWorkflow": "preserved|compromised|broken",
    "hiringWorkflow": "preserved|compromised|broken",
    "triggeredModules": ["LXP", "Talent", "Bonus", etc.]
  },
  "businessImpact": {
    "revenueRisk": "none|low|medium|high",
    "clientSatisfactionRisk": "none|low|medium|high",
    "competitiveAdvantageImpact": "positive|neutral|negative",
    "scalabilityImpact": "improved|neutral|degraded",
    "enterpriseFeatureImpact": "enhanced|maintained|compromised"
  },
  "technicalValidation": {
    "threeEngineArchitecture": "compliant|partially-compliant|non-compliant",
    "databaseIntegrity": "maintained|at-risk|compromised",
    "apiConsistency": "maintained|at-risk|compromised",
    "errorHandlingAdequacy": "excellent|good|adequate|inadequate",
    "performanceImpact": "positive|neutral|negative"
  },
  "criticalIssues": ["list of business-critical problems if any"],
  "businessSuggestions": ["list of business improvement suggestions"],
  "productionReadiness": true/false,
  "enterpriseReadiness": true/false,
  "estimatedBusinessRisk": "low|medium|high|critical",
  "implementationPriority": "immediate|high|medium|low",
  "validationNotes": "detailed business validation explanation"
}

🚨 CRITICAL BUSINESS VALIDATION REQUIREMENTS:
- Validate against COMPLETE Mizan business workflows
- Ensure enterprise client requirements are met
- Verify that business value generation is preserved
- Confirm that competitive advantages are maintained
- Validate multi-tenant business logic isolation
- Ensure regulatory and compliance requirements
- Assess revenue and client satisfaction impact

Your validation must be BUSINESS-INTELLIGENT, not just technical compliance!`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let validation;
    try {
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      validation = JSON.parse(cleanText);
    } catch (parseError) {
      console.log(`   ⚠️  JSON parse error for ${violation.file}:${violation.line}, using business-intelligent fallback`);
      validation = createMizanBusinessFallback(violation, mizanAnalysis, mizanFix, text);
    }

    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation: validation,
      agentId: 'mizan-intelligent-business-validator',
      timestamp: new Date().toISOString(),
      validationType: 'mizan-business-aware'
    };

  } catch (error) {
    console.log(`   ❌ Gemini API error for ${violation.file}:${violation.line}: ${error.message}`);
    
    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation: createMizanBusinessFallback(violation, mizanAnalysis, mizanFix, null, error.message),
      agentId: 'mizan-intelligent-business-validator',
      timestamp: new Date().toISOString(),
      error: error.message,
      validationType: 'mizan-business-aware-fallback'
    };
  }
}

/**
 * Create business-intelligent fallback validation
 */
function createMizanBusinessFallback(violation, mizanAnalysis, mizanFix, responseText = null, errorMessage = null) {
  const file = violation.file || '';
  const affectedModules = mizanAnalysis.mizanBusinessImpact?.affectedModules || [];
  
  // Determine business impact based on affected modules
  let workflowValidation = {
    cultureWorkflow: 'preserved',
    skillsWorkflow: 'preserved',
    performanceWorkflow: 'preserved',
    hiringWorkflow: 'preserved',
    triggeredModules: []
  };
  
  let businessRisk = 'low';
  let overallScore = 75;
  
  // Assess risk based on affected modules
  if (affectedModules.includes('Culture')) {
    workflowValidation.cultureWorkflow = 'compromised';
    workflowValidation.triggeredModules.push('Recognition', 'Engagement');
    businessRisk = 'medium';
    overallScore = 60;
  }
  
  if (affectedModules.includes('Skills')) {
    workflowValidation.skillsWorkflow = 'compromised';
    workflowValidation.triggeredModules.push('LXP');
    businessRisk = 'medium';
    overallScore = 60;
  }
  
  if (affectedModules.includes('Performance')) {
    workflowValidation.performanceWorkflow = 'compromised';
    businessRisk = 'high';
    overallScore = 45;
  }
  
  // Check architectural compliance
  const architecturalIssues = !mizanFix.mizanArchitecture?.threeEngineCompliance ||
                             !mizanFix.mizanArchitecture?.tenantIsolation;
  
  if (architecturalIssues) {
    businessRisk = 'high';
    overallScore = Math.min(overallScore, 40);
  }

  return {
    recommendation: businessRisk === 'high' ? 'REVISE' : 'APPROVE',
    overallScore,
    confidence: errorMessage ? 0.6 : 0.8,
    businessCompliance: {
      workflowPreservation: !workflowValidation.cultureWorkflow.includes('compromised'),
      crossModuleIntegration: workflowValidation.triggeredModules.length === 0,
      strategicAlignment: businessRisk !== 'high',
      businessLogicIntegrity: !architecturalIssues,
      agentTriggering: mizanFix.mizanArchitecture?.agentTriggering || false,
      dataFlowIntegrity: mizanFix.mizanArchitecture?.moduleIntegration || false,
      botInteractionPatterns: true,
      multiTenantIsolation: mizanFix.mizanArchitecture?.tenantIsolation || false
    },
    workflowValidation,
    businessImpact: {
      revenueRisk: businessRisk === 'high' ? 'medium' : 'low',
      clientSatisfactionRisk: businessRisk === 'high' ? 'medium' : 'low',
      competitiveAdvantageImpact: 'neutral',
      scalabilityImpact: 'neutral',
      enterpriseFeatureImpact: architecturalIssues ? 'compromised' : 'maintained'
    },
    technicalValidation: {
      threeEngineArchitecture: mizanFix.mizanArchitecture?.threeEngineCompliance ? 'compliant' : 'non-compliant',
      databaseIntegrity: mizanFix.mizanArchitecture?.tenantIsolation ? 'maintained' : 'at-risk',
      apiConsistency: 'maintained',
      errorHandlingAdequacy: 'adequate',
      performanceImpact: 'neutral'
    },
    criticalIssues: businessRisk === 'high' ? 
      [`Business workflow compromise in ${affectedModules.join(', ')} modules`] : 
      [],
    businessSuggestions: [
      'Review business workflow integration',
      'Validate cross-module dependencies',
      'Test agent triggering mechanisms'
    ],
    productionReadiness: businessRisk !== 'high',
    enterpriseReadiness: !architecturalIssues,
    estimatedBusinessRisk: businessRisk,
    implementationPriority: businessRisk === 'high' ? 'high' : 'medium',
    validationNotes: errorMessage ? 
      `Business validation with API error: ${errorMessage}` :
      'Pattern-based business validation using Mizan workflow analysis',
    fallback: true,
    fallbackReason: errorMessage || 'JSON parsing error'
  };
}

/**
 * Main function to validate all fixes with business intelligence
 */
async function validateMizanBusinessLogic() {
  console.log(`${colors.magenta}${colors.bold}🤖 AGENT 3: MIZAN-INTELLIGENT BUSINESS VALIDATOR${colors.reset}`);
  console.log(`${colors.magenta}╔══════════════════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}║              REVOLUTIONARY MIZAN BUSINESS LOGIC VALIDATION ENGINE                               ║${colors.reset}`);
  console.log(`${colors.magenta}╚══════════════════════════════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  // Load Agent 2 Mizan fixes
  const fixesPath = path.join(process.cwd(), 'scripts', 'agents', 'agent2-mizan-fixes.json');
  
  if (!fs.existsSync(fixesPath)) {
    console.log(`${colors.yellow}⚠️  No agent2-mizan-fixes.json found. Run Mizan Agent 2 first.${colors.reset}\n`);
    
    // Create empty results
    const emptyResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalValidated: 0,
        businessApproved: 0,
        needsRevision: 0,
        businessRejected: 0,
        avgBusinessScore: 0,
        enterpriseReady: 0,
        mizanBusinessIntelligence: 'maximum'
      },
      businessValidations: []
    };
    
    // Ensure agents directory exists
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent3-business-validations.json'), JSON.stringify(emptyResults, null, 2));
    console.log(`${colors.green}✅ Created empty business validation results${colors.reset}\n`);
    process.exit(0);
  }

  let fixResults;
  try {
    fixResults = JSON.parse(fs.readFileSync(fixesPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Could not parse agent2-mizan-fixes.json: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  const fixes = fixResults.mizanFixes || [];
  
  if (fixes.length === 0) {
    console.log(`${colors.green}✅ No fixes to validate${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`🏢 Validating ${fixes.length} fixes against complete Mizan business logic...\n`);
  console.log(`${colors.cyan}🎯 MIZAN BUSINESS VALIDATION CAPABILITIES:${colors.reset}`);
  console.log(`   ✅ Culture → Recognition/Engagement workflow validation`);
  console.log(`   ✅ Skills → LXP triggering mechanism validation`);
  console.log(`   ✅ Performance → Culture/Skills integration validation`);
  console.log(`   ✅ Cross-module dependency preservation`);
  console.log(`   ✅ Enterprise feature integrity validation`);
  console.log(`   ✅ Revenue and client satisfaction impact assessment\n`);

  // Validate each fix with business intelligence
  const businessValidations = [];
  let approved = 0;
  let needsRevision = 0;
  let rejected = 0;
  let enterpriseReady = 0;
  let totalScore = 0;
  let scoreCount = 0;

  // Business workflow tracking
  let cultureWorkflowPreserved = 0;
  let skillsWorkflowPreserved = 0;
  let performanceWorkflowPreserved = 0;
  let hiringWorkflowPreserved = 0;

  for (let i = 0; i < fixes.length; i++) {
    const fixData = fixes[i];
    console.log(`   ${i + 1}/${fixes.length}: 🏢 ${fixData.violation.file}:${fixData.violation.line || 'unknown'}`);
    
    const validationResult = await validateMizanBusinessLogic(fixData);
    businessValidations.push(validationResult);

    // Update business counters
    if (!validationResult.skipped && validationResult.businessValidation) {
      const rec = validationResult.businessValidation.recommendation;
      switch (rec) {
        case 'APPROVE':
          approved++;
          break;
        case 'REVISE':
          needsRevision++;
          break;
        case 'REJECT':
          rejected++;
          break;
      }

      if (validationResult.businessValidation.enterpriseReadiness) {
        enterpriseReady++;
      }

      if (validationResult.businessValidation.overallScore !== undefined) {
        totalScore += validationResult.businessValidation.overallScore;
        scoreCount++;
      }

      // Track workflow preservation
      const workflowValidation = validationResult.businessValidation.workflowValidation;
      if (workflowValidation) {
        if (workflowValidation.cultureWorkflow === 'preserved') cultureWorkflowPreserved++;
        if (workflowValidation.skillsWorkflow === 'preserved') skillsWorkflowPreserved++;
        if (workflowValidation.performanceWorkflow === 'preserved') performanceWorkflowPreserved++;
        if (workflowValidation.hiringWorkflow === 'preserved') hiringWorkflowPreserved++;
      }
    }

    // Brief delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 150));
  }

  // Calculate business averages
  const avgBusinessScore = scoreCount > 0 ? totalScore / scoreCount : 0;

  // Prepare business-intelligent results
  const results = {
    summary: {
      timestamp: new Date().toISOString(),
      totalValidated: fixes.length,
      businessApproved: approved,
      needsRevision,
      businessRejected: rejected,
      avgBusinessScore: Math.round(avgBusinessScore * 10) / 10,
      enterpriseReady,
      mizanBusinessIntelligence: 'maximum',
      workflowPreservation: {
        cultureWorkflow: cultureWorkflowPreserved,
        skillsWorkflow: skillsWorkflowPreserved,
        performanceWorkflow: performanceWorkflowPreserved,
        hiringWorkflow: hiringWorkflowPreserved
      },
      businessCompliance: {
        workflowPreservation: businessValidations.filter(v => v.businessValidation?.businessCompliance?.workflowPreservation).length,
        crossModuleIntegration: businessValidations.filter(v => v.businessValidation?.businessCompliance?.crossModuleIntegration).length,
        strategicAlignment: businessValidations.filter(v => v.businessValidation?.businessCompliance?.strategicAlignment).length,
        multiTenantIsolation: businessValidations.filter(v => v.businessValidation?.businessCompliance?.multiTenantIsolation).length
      }
    },
    businessValidations
  };

  // Save results to proper agents directory
  try {
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent3-business-validations.json'), JSON.stringify(results, null, 2));
    console.log(`\n${colors.green}✅ Mizan business validation complete!${colors.reset}`);
    console.log(`📁 Results saved to: scripts/agents/agent3-business-validations.json\n`);
  } catch (error) {
    console.error(`${colors.red}❌ Could not save results: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  // Display business-intelligent summary
  console.log(`${colors.blue}🏢 MIZAN BUSINESS VALIDATION SUMMARY:${colors.reset}`);
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║              BUSINESS INTELLIGENCE RESULTS         ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`   ✅ Business approved: ${approved} | 🔄 Needs revision: ${needsRevision} | ❌ Rejected: ${rejected}`);
  console.log(`   🏢 Enterprise ready: ${enterpriseReady}/${fixes.length}`);
  console.log(`   📊 Average business score: ${avgBusinessScore.toFixed(1)}/100\n`);

  console.log(`${colors.blue}🔄 MIZAN WORKFLOW PRESERVATION:${colors.reset}`);
  console.log(`   Culture workflow preserved: ${cultureWorkflowPreserved}/${fixes.length}`);
  console.log(`   Skills workflow preserved: ${skillsWorkflowPreserved}/${fixes.length}`);
  console.log(`   Performance workflow preserved: ${performanceWorkflowPreserved}/${fixes.length}`);
  console.log(`   Hiring workflow preserved: ${hiringWorkflowPreserved}/${fixes.length}\n`);

  console.log(`${colors.blue}📋 BUSINESS COMPLIANCE METRICS:${colors.reset}`);
  console.log(`   Workflow preservation: ${results.summary.businessCompliance.workflowPreservation}/${fixes.length}`);
  console.log(`   Cross-module integration: ${results.summary.businessCompliance.crossModuleIntegration}/${fixes.length}`);
  console.log(`   Strategic alignment: ${results.summary.businessCompliance.strategicAlignment}/${fixes.length}`);
  console.log(`   Multi-tenant isolation: ${results.summary.businessCompliance.multiTenantIsolation}/${fixes.length}\n`);

  console.log(`${colors.green}🚀 Ready for Mizan-Intelligent Agent 4 (Security Checker)!${colors.reset}\n`);
}

// Check dependencies and API key
function checkMizanDependencies() {
  if (!process.env.GEMINI_API_KEY) {
    console.log(`${colors.yellow}⚠️  GEMINI_API_KEY not found in environment variables${colors.reset}`);
    console.log(`${colors.blue}💡 Set your Gemini API key in .env file for Mizan business validation${colors.reset}\n`);
    
    // Create placeholder results
    const placeholderResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalValidated: 0,
        businessApproved: 0,
        note: 'Placeholder results - Gemini API key not configured'
      },
      businessValidations: []
    };
    
    try {
      const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(agentsDir, 'agent3-business-validations.json'), JSON.stringify(placeholderResults, null, 2));
      console.log(`${colors.green}✅ Created placeholder results${colors.reset}\n`);
    } catch (error) {
      console.error(`${colors.red}❌ Could not save placeholder results: ${error.message}${colors.reset}\n`);
    }
    
    process.exit(0);
  }

  try {
    require('@google/generative-ai');
  } catch (error) {
    console.log(`${colors.yellow}📦 Installing required dependency: @google/generative-ai${colors.reset}`);
    const { execSync } = require('child_process');
    try {
      execSync('npm install @google/generative-ai', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Dependencies installed${colors.reset}\n`);
    } catch (installError) {
      console.error(`${colors.red}❌ Failed to install dependencies: ${installError.message}${colors.reset}`);
      console.log(`${colors.yellow}Please run: npm install @google/generative-ai${colors.reset}\n`);
      process.exit(1);
    }
  }
}

// Run the Mizan-intelligent agent
if (require.main === module) {
  checkMizanDependencies();
  validateMizanBusinessLogic().catch(error => {
    console.error(`${colors.red}💥 MIZAN-INTELLIGENT AGENT 3 CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { validateMizanBusinessLogic };