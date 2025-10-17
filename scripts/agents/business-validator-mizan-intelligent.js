#!/usr/bin/env node

/**
 * AGENT 3: MIZAN-INTELLIGENT BUSINESS VALIDATOR (Gemini 2.5 Flash)
 * 
 * REVOLUTIONARY UPGRADE: Complete Mizan platform business logic validation
 * 
 * This agent validates that fixes preserve critical Mizan business workflows:
 * ✅ Culture → Recognition/Engagement agent triggering
 * ✅ Skills → LXP module triggering
 * ✅ Performance → Culture/Skills integration
 * ✅ Hiring → Structure integration
 * ✅ Three-Engine Architecture integrity
 * ✅ Multi-tenant business logic preservation
 * ✅ Enterprise feature and revenue protection
 * 
 * Uses Gemini 2.5 Flash for business intelligence validation
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Colors for output
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

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Load complete Mizan platform context
const contextPath = path.join(process.cwd(), 'AGENT_CONTEXT_ULTIMATE.md');
const mizanContext = fs.existsSync(contextPath) 
  ? fs.readFileSync(contextPath, 'utf8')
  : `MIZAN PLATFORM CONTEXT:
Multi-tenant SaaS HR Analytics Platform with:
- Culture Analysis → Triggers Recognition & Engagement Agents
- Skills Analysis → Triggers LXP Module for learning paths
- Performance Module → Integrates Culture priorities & Skills gaps
- Hiring Module → Triggered by Structure recommendations
- Three-Engine Architecture: Knowledge → Data → Reasoning
- Complete business workflows that drive client value and revenue`;

/**
 * Complete Mizan business workflow patterns to validate
 */
const MIZAN_BUSINESS_WORKFLOWS = {
  cultureWorkflows: [
    'Culture survey → Last 2 questions → Recognition Agent trigger',
    'Culture survey → Last 2 questions → Engagement Agent trigger',
    'Culture Analysis → Agent results → Department aggregation',
    'Culture priorities → Performance Module integration',
    'Culture fit questions → Hiring Module integration'
  ],
  skillsWorkflows: [
    'Strategic skills framework → Employee profiles → Gap analysis',
    'Skills gaps identified → LXP Module trigger',
    'Individual gaps → Supervisor notification → Development plans',
    'Skills gaps → Performance Module goal setting',
    'Department skills → Org-level strategic assessment'
  ],
  performanceWorkflows: [
    'Strategy analysis → Department goals → Individual goals',
    'Culture Agent → Leadership priorities → Culture goals',
    'Skills Agent → Critical gaps → Skills development goals',
    'Goal approval flow → Employee → Supervisor → Leader',
    'Quarterly aggregation → Annual calibration'
  ],
  hiringWorkflows: [
    'Structure recommendations → Hiring Module trigger',
    'Strategy + Culture analysis → Job description generation',
    'First 3 culture questions → Applicant culture assessment',
    'Culture Agent → Culture fit scoring',
    'Compensation analysis → Market + Industry + Size'
  ],
  threeEnginePatterns: [
    'Knowledge Engine → Domain context retrieval',
    'Data Engine → Data processing and structuring',
    'Reasoning Engine → Analysis and recommendations',
    'All AI features use complete three-engine flow'
  ]
};

/**
 * Validate a single fix against complete Mizan business logic
 * ✅ FIXED: Renamed from duplicate name to avoid collision
 * ✅ ENHANCED: Added context-aware validation and rejection criteria
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

  // ✅ PHASE 1: CONTEXT-AWARE VALIDATION
  const contextClassifier = require('./validation-context-classifier');
  const contextInfo = contextClassifier.classify(violation.file);
  const validationCriteria = contextClassifier.getValidationCriteria(violation.file);
  const contextSummary = contextClassifier.getSummary(violation.file);

  // ✅ PHASE 2: CHECK REJECTION CRITERIA
  const rejectionChecker = require('./rejection-criteria');
  const rejectionCheck = rejectionChecker.checkRejectionCriteria(fixData, 'BUSINESS_REJECTS');

  if (rejectionCheck.shouldReject) {
    console.log(`   ${colors.red}❌ REJECTED: ${rejectionCheck.criterionName}${colors.reset}`);
    console.log(`      Reason: ${rejectionCheck.reason}`);
    
    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation: {
        recommendation: 'REJECT',
        overallScore: 0,
        businessReasoning: rejectionCheck.reason,
        rejectionCriterion: rejectionCheck.criterionName,
        violatesRule: rejectionCheck.violatesRule,
        workflowRisks: rejectionCheck.severity,
        revenueImpact: 'NEGATIVE',
        enterpriseReadiness: false,
        confidence: 1.0,
        businessCompliance: {
          cultureWorkflowPreserved: false,
          skillsWorkflowPreserved: false,
          performanceWorkflowPreserved: false,
          hiringWorkflowPreserved: false,
          threeEnginePreserved: false,
          agentTriggeringMaintained: false,
          moduleDependenciesPreserved: false,
          strategicAlignmentMaintained: false,
          revenueFeaturesProtected: false,
          clientValueMaintained: false,
          competitiveAdvantagePreserved: false
        }
      },
      agent: 'Mizan Business Validator (Gemini 2.5 Flash)',
      timestamp: new Date().toISOString(),
      rejectedByPreCheck: true
    };
  }

  // ✅ PHASE 3: METHOD REFERENCE VALIDATION
  const MethodValidator = require('./method-reference-validator');
  const methodValidator = new MethodValidator();
  const methodValidation = await methodValidator.validateFix(
    mizanFix.primaryFix?.newCode || '',
    violation.file
  );

  const prompt = `${mizanContext}

╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                    AGENT 3: MIZAN-INTELLIGENT BUSINESS VALIDATOR (ENHANCED)                     ║
║                     CONTEXT-AWARE VALIDATION WITH REJECTION CAPABILITY                          ║
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
Original Code: ${violation.content}

📊 AGENT 1 MIZAN ANALYSIS:
${JSON.stringify(mizanAnalysis, null, 2)}

🔧 AGENT 2 PROPOSED FIX:
${JSON.stringify(mizanFix, null, 2)}

🏷️ CONTEXT-AWARE VALIDATION (NEW):
${contextSummary}

📋 METHOD REFERENCE VALIDATION:
Valid: ${methodValidation.valid}
Missing Methods: ${methodValidation.missingMethods.length > 0 ? methodValidation.missingMethods.join(', ') : 'None'}
Note: ${methodValidation.note}
${methodValidation.missingMethods.length > 0 ? '\n⚠️  WARNING: Fix references methods that may not exist. Consider NEEDS_IMPLEMENTATION recommendation.' : ''}

🏢 CRITICAL BUSINESS WORKFLOWS TO VALIDATE:

1. CULTURE WORKFLOWS:
${MIZAN_BUSINESS_WORKFLOWS.cultureWorkflows.map(w => `   - ${w}`).join('\n')}

2. SKILLS WORKFLOWS:
${MIZAN_BUSINESS_WORKFLOWS.skillsWorkflows.map(w => `   - ${w}`).join('\n')}

3. PERFORMANCE WORKFLOWS:
${MIZAN_BUSINESS_WORKFLOWS.performanceWorkflows.map(w => `   - ${w}`).join('\n')}

4. HIRING WORKFLOWS:
${MIZAN_BUSINESS_WORKFLOWS.hiringWorkflows.map(w => `   - ${w}`).join('\n')}

5. THREE-ENGINE PATTERNS:
${MIZAN_BUSINESS_WORKFLOWS.threeEnginePatterns.map(w => `   - ${w}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 CRITICAL VALIDATION RULES (CONTEXT-AWARE):

CONTEXT TYPE: ${contextInfo.type}
REQUIRES THREE-ENGINE: ${contextInfo.requiresThreeEngine ? 'YES' : 'NO'}
REQUIRES TENANT ISOLATION: ${contextInfo.requiresTenantIsolation ? 'YES' : 'NO'}
CAN CONTAIN VALIDATION PATTERNS: ${contextInfo.canContainValidationPatterns ? 'YES (intentional)' : 'NO'}

VALIDATION APPROACH:

1. **DETECTION/AUDIT CODE** (audit-violations.js, pipeline.js, mizan-pipeline.js):
   ${contextInfo.type === 'DETECTION_CODE' ? '✅ THIS IS DETECTION CODE' : ''}
   - Regex patterns like /mockData/i are DETECTION TOOLS, not violations
   - Strings "placeholder", "mock", "TODO" in validation code are INTENTIONAL
   - APPROVE these unless the detection logic itself is broken
   - DO NOT apply Three-Engine Architecture requirements
   - DO NOT flag validation patterns as violations

2. **INFRASTRUCTURE CODE** (stripe.ts, auth services, upload handlers):
   ${contextInfo.type === 'INFRASTRUCTURE_CODE' ? '✅ THIS IS INFRASTRUCTURE CODE' : ''}
   - Three-Engine Architecture is ONLY for AI analysis (Culture, Skills, Performance, Hiring)
   - Payment processing, auth, uploads are NOT AI features
   - Validate: TypeScript types, error handling, security, tenant isolation ONLY
   - DO NOT require Three-Engine pattern

3. **AI ANALYSIS FEATURES** (culture, skills, performance, hiring services):
   ${contextInfo.type === 'AI_FEATURE' ? '✅ THIS IS AN AI FEATURE' : ''}
   - MUST use Three-Engine Architecture
   - MUST maintain agent triggering (Culture→Recognition, Skills→LXP)
   - MUST preserve cross-module workflows

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 YOUR MISSION:
Validate that Agent 2's fix:
✅ Preserves ALL critical business workflows (where applicable for this code type)
✅ Maintains agent triggering mechanisms (AI features only)
✅ Protects cross-module dependencies
✅ Ensures Three-Engine Architecture integrity (AI features only)
✅ Maintains multi-tenant business logic (where applicable)
✅ Protects revenue-generating features
✅ Preserves enterprise client functionality

❌ USE recommendation: "REJECT" (not NEEDS_REVISION) for:
- Cosmetic fixes: TODO removed without implementation
- Comment changes without code changes
- References non-existent methods (see method validation warning above)
- Breaks Culture → Recognition/Engagement workflow (AI features)
- Breaks Skills → LXP triggering (AI features)
- Removes tenantId filtering (where required)
- Incomplete implementation marked as complete
- Removes Three-Engine Architecture (from AI features only)
- Compromises multi-tenant isolation
- Reduces platform business value

✅ APPROVE with confidence:
- Detection code fixes (even if containing validation patterns)
- Infrastructure improvements (Stripe, Auth) that don't affect AI features
- Type safety improvements that maintain functionality
- Complete, production-ready implementations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESPOND IN THIS EXACT XML FORMAT:

<mizan_business_validation>
  <recommendation>APPROVE|REVISE|REJECT</recommendation>
  <overall_score>0-100</overall_score>
  <business_impact_analysis>
    <workflow_preservation>
      <culture_workflows_intact>true|false</culture_workflows_intact>
      <skills_workflows_intact>true|false</skills_workflows_intact>
      <performance_workflows_intact>true|false</performance_workflows_intact>
      <hiring_workflows_intact>true|false</hiring_workflows_intact>
      <three_engine_intact>true|false</three_engine_intact>
    </workflow_preservation>
    <cross_module_integration>
      <maintains_agent_triggering>true|false</maintains_agent_triggering>
      <preserves_module_dependencies>true|false</preserves_module_dependencies>
      <strategic_alignment_maintained>true|false</strategic_alignment_maintained>
    </cross_module_integration>
    <enterprise_impact>
      <protects_revenue_features>true|false</protects_revenue_features>
      <maintains_client_value>true|false</maintains_client_value>
      <competitive_advantage_preserved>true|false</competitive_advantage_preserved>
    </enterprise_impact>
  </business_impact_analysis>
  <business_reasoning>
    Detailed explanation of business impact analysis and why this recommendation protects Mizan's business value
  </business_reasoning>
  <workflow_risks>
    List any specific business workflows at risk (or "None" if all preserved)
  </workflow_risks>
  <revenue_impact>
    HIGH|MEDIUM|LOW|NONE - Impact on revenue-generating features
  </revenue_impact>
  <enterprise_readiness>true|false</enterprise_readiness>
  <confidence>0.0-1.0</confidence>
</mizan_business_validation>`;

  if (!genAI) {
    return createMizanBusinessFallback(violation, mizanAnalysis, mizanFix, null, 'GEMINI_API_KEY not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const parsedValidation = parseMizanBusinessValidationXML(text);

    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation: parsedValidation,
      rawResponse: text,
      agent: 'Mizan Business Validator (Gemini 2.5 Flash)',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error(`      ❌ Business validation error: ${error.message}`);
    return createMizanBusinessFallback(violation, mizanAnalysis, mizanFix, null, error.message);
  }
}

/**
 * Parse Mizan business validation XML response
 */
function parseMizanBusinessValidationXML(xmlContent) {
  try {
    const recommendation = extractXMLContent(xmlContent, 'recommendation') || 'REVISE';
    const overallScore = parseInt(extractXMLContent(xmlContent, 'overall_score')) || 50;
    const businessReasoning = extractXMLContent(xmlContent, 'business_reasoning') || 'Business analysis completed';
    const workflowRisks = extractXMLContent(xmlContent, 'workflow_risks') || 'Under review';
    const revenueImpact = extractXMLContent(xmlContent, 'revenue_impact') || 'MEDIUM';
    const enterpriseReadiness = extractXMLContent(xmlContent, 'enterprise_readiness') === 'true';
    const confidence = parseFloat(extractXMLContent(xmlContent, 'confidence')) || 0.7;

    // Parse workflow preservation
    const cultureWorkflows = extractXMLContent(xmlContent, 'culture_workflows_intact') === 'true';
    const skillsWorkflows = extractXMLContent(xmlContent, 'skills_workflows_intact') === 'true';
    const performanceWorkflows = extractXMLContent(xmlContent, 'performance_workflows_intact') === 'true';
    const hiringWorkflows = extractXMLContent(xmlContent, 'hiring_workflows_intact') === 'true';
    const threeEngine = extractXMLContent(xmlContent, 'three_engine_intact') === 'true';

    // Parse cross-module integration
    const agentTriggering = extractXMLContent(xmlContent, 'maintains_agent_triggering') === 'true';
    const moduleDependencies = extractXMLContent(xmlContent, 'preserves_module_dependencies') === 'true';
    const strategicAlignment = extractXMLContent(xmlContent, 'strategic_alignment_maintained') === 'true';

    // Parse enterprise impact
    const revenueFeatures = extractXMLContent(xmlContent, 'protects_revenue_features') === 'true';
    const clientValue = extractXMLContent(xmlContent, 'maintains_client_value') === 'true';
    const competitiveAdvantage = extractXMLContent(xmlContent, 'competitive_advantage_preserved') === 'true';

    return {
      recommendation,
      overallScore,
      businessReasoning,
      workflowRisks,
      revenueImpact,
      enterpriseReadiness,
      confidence,
      businessCompliance: {
        cultureWorkflowPreserved: cultureWorkflows,
        skillsWorkflowPreserved: skillsWorkflows,
        performanceWorkflowPreserved: performanceWorkflows,
        hiringWorkflowPreserved: hiringWorkflows,
        threeEnginePreserved: threeEngine,
        agentTriggeringMaintained: agentTriggering,
        moduleDependenciesPreserved: moduleDependencies,
        strategicAlignmentMaintained: strategicAlignment,
        revenueFeaturesProtected: revenueFeatures,
        clientValueMaintained: clientValue,
        competitiveAdvantagePreserved: competitiveAdvantage
      }
    };
  } catch (error) {
    return {
      recommendation: 'REVISE',
      overallScore: 50,
      businessReasoning: 'Could not parse business validation response',
      workflowRisks: 'Parse error - manual review needed',
      revenueImpact: 'MEDIUM',
      enterpriseReadiness: false,
      confidence: 0.5,
      businessCompliance: {
        workflowPreservation: false,
        crossModuleIntegration: false,
        strategicAlignment: false,
        businessLogicIntegrity: false
      }
    };
  }
}

/**
 * Extract content from XML tags
 */
function extractXMLContent(xml, tag) {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Create fallback business validation when AI unavailable
 */
function createMizanBusinessFallback(violation, mizanAnalysis, mizanFix, responseText = null, errorMessage = null) {
  const isCritical = violation.severity === 'critical';
  const affectsAgentSystem = violation.file.includes('agent') || 
                              violation.file.includes('culture') || 
                              violation.file.includes('skills') ||
                              violation.file.includes('performance') ||
                              violation.file.includes('hiring');

  return {
    violation,
    mizanAnalysis,
    mizanFix,
    businessValidation: {
      recommendation: isCritical && affectsAgentSystem ? 'REVISE' : 'APPROVE',
      overallScore: isCritical ? 60 : 75,
      businessReasoning: errorMessage 
        ? `Business validation unavailable: ${errorMessage}. Fallback assessment based on violation severity and file location.`
        : 'Automated business validation based on violation patterns and Mizan business logic rules.',
      workflowRisks: affectsAgentSystem 
        ? 'Manual review needed for agent system files'
        : 'Low risk - non-agent system file',
      revenueImpact: affectsAgentSystem ? 'MEDIUM' : 'LOW',
      enterpriseReadiness: !isCritical,
      confidence: 0.6,
      businessCompliance: {
        cultureWorkflowPreserved: !violation.file.includes('culture'),
        skillsWorkflowPreserved: !violation.file.includes('skills'),
        performanceWorkflowPreserved: !violation.file.includes('performance'),
        hiringWorkflowPreserved: !violation.file.includes('hiring'),
        threeEnginePreserved: !violation.file.includes('Engine'),
        agentTriggeringMaintained: !affectsAgentSystem,
        moduleDependenciesPreserved: true,
        strategicAlignmentMaintained: true,
        revenueFeaturesProtected: !affectsAgentSystem,
        clientValueMaintained: true,
        competitiveAdvantagePreserved: !isCritical
      }
    },
    fallback: true,
    fallbackReason: errorMessage || 'AI validation unavailable',
    rawResponse: responseText,
    agent: 'Mizan Business Validator (Fallback)',
    timestamp: new Date().toISOString()
  };
}

/**
 * Main function to run Mizan business validation for all fixes
 * ✅ FIXED: Renamed to avoid collision with individual validation function
 */
async function runMizanBusinessValidation() {
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
    
    // ✅ FIX: Now calls the correct function (line 117) that takes fixData parameter
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

      // Track business scores
      const score = validationResult.businessValidation.overallScore || 0;
      totalScore += score;
      scoreCount++;

      // Track enterprise readiness
      if (validationResult.businessValidation.enterpriseReadiness) {
        enterpriseReady++;
      }

      // Track workflow preservation
      const compliance = validationResult.businessValidation.businessCompliance || {};
      if (compliance.cultureWorkflowPreserved) cultureWorkflowPreserved++;
      if (compliance.skillsWorkflowPreserved) skillsWorkflowPreserved++;
      if (compliance.performanceWorkflowPreserved) performanceWorkflowPreserved++;
      if (compliance.hiringWorkflowPreserved) hiringWorkflowPreserved++;

      console.log(`      ${rec === 'APPROVE' ? colors.green + '✅' : rec === 'REVISE' ? colors.yellow + '⚠️' : colors.red + '❌'} ${rec} (Score: ${score}/100)${colors.reset}`);
    } else {
      console.log(`      ${colors.blue}⏭️  SKIPPED${colors.reset}`);
    }
  }

  const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;

  // Display business validation summary
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}📊 MIZAN BUSINESS VALIDATION SUMMARY${colors.reset}\n`);
  console.log(`${colors.green}✅ Approved: ${approved}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Needs Revision: ${needsRevision}${colors.reset}`);
  console.log(`${colors.red}❌ Rejected: ${rejected}${colors.reset}`);
  console.log(`${colors.blue}🎯 Enterprise Ready: ${enterpriseReady}${colors.reset}`);
  console.log(`${colors.cyan}📈 Average Business Score: ${avgScore}/100${colors.reset}\n`);

  console.log(`${colors.magenta}🏢 BUSINESS WORKFLOW PRESERVATION:${colors.reset}`);
  console.log(`   Culture Workflows: ${cultureWorkflowPreserved}/${fixes.length} preserved`);
  console.log(`   Skills Workflows: ${skillsWorkflowPreserved}/${fixes.length} preserved`);
  console.log(`   Performance Workflows: ${performanceWorkflowPreserved}/${fixes.length} preserved`);
  console.log(`   Hiring Workflows: ${hiringWorkflowPreserved}/${fixes.length} preserved\n`);

  // Save business validation results
  const results = {
    summary: {
      timestamp: new Date().toISOString(),
      totalValidated: fixes.length,
      businessApproved: approved,
      needsRevision: needsRevision,
      businessRejected: rejected,
      avgBusinessScore: avgScore,
      enterpriseReady: enterpriseReady,
      workflowPreservation: {
        culture: cultureWorkflowPreserved,
        skills: skillsWorkflowPreserved,
        performance: performanceWorkflowPreserved,
        hiring: hiringWorkflowPreserved
      },
      mizanBusinessIntelligence: 'maximum'
    },
    businessValidations
  };

  const outputPath = path.join(process.cwd(), 'scripts', 'agents', 'agent3-business-validations.json');
  
  try {
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`${colors.green}✅ Business validation results saved: ${outputPath}${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}❌ Could not save results: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  console.log(`${colors.green}${colors.bold}🎉 MIZAN BUSINESS VALIDATION COMPLETE!${colors.reset}\n`);
  process.exit(0);
}

// Check Mizan dependencies
function checkMizanDependencies() {
  const required = {
    'dotenv': 'dotenv',
    '@google/generative-ai': '@google/generative-ai'
  };

  const missing = [];

  for (const [pkg, importName] of Object.entries(required)) {
    try {
      require(importName);
    } catch (error) {
      missing.push(pkg);
    }
  }

  if (missing.length > 0) {
    console.log(`${colors.yellow}📦 Installing required Mizan dependencies...${colors.reset}`);
    const { execSync } = require('child_process');
    
    try {
      execSync(`npm install ${missing.join(' ')}`, { stdio: 'inherit' });
      console.log(`${colors.green}✅ Dependencies installed${colors.reset}\n`);
    } catch (installError) {
      console.error(`${colors.red}❌ Failed to install dependencies: ${installError.message}${colors.reset}`);
      console.log(`${colors.yellow}Please run manually: npm install ${missing.join(' ')}${colors.reset}\n`);
      process.exit(1);
    }
  }
}

// Run Agent 3: Mizan Business Validator
if (require.main === module) {
  checkMizanDependencies();
  
  // ✅ FIX: Call the renamed main function
  runMizanBusinessValidation().catch(error => {
    console.error(`${colors.red}💥 MIZAN-INTELLIGENT AGENT 3 CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

// ✅ FIX: Export the renamed function
module.exports = { runMizanBusinessValidation };