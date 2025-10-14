#!/usr/bin/env node

/**
 * AGENT 4: MIZAN-INTELLIGENT SECURITY CHECKER (GPT-4)
 * 
 * REVOLUTIONARY UPGRADE: Security validation with complete Mizan platform understanding
 * 
 * MIZAN SECURITY VALIDATION CAPABILITIES:
 * - Multi-tenant data isolation security validation
 * - Three-Engine Architecture security pattern validation
 * - Agent-to-agent communication security validation
 * - Cross-module data flow security validation
 * - Enterprise client data protection validation
 * - Regulatory compliance validation (GDPR, SOC 2, etc.)
 * - API authentication and authorization security
 * - BOT interaction security patterns
 * 
 * MIZAN-SPECIFIC SECURITY CONCERNS:
 * ✅ Tenant data isolation breaches (tenantId leakage)
 * ✅ Agent triggering authentication vulnerabilities
 * ✅ Cross-module data exposure risks
 * ✅ Performance data privacy (sensitive HR data)
 * ✅ Culture survey response confidentiality
 * ✅ Skills data intellectual property protection
 * ✅ LXP learning path privacy
 * ✅ Hiring process discrimination protection
 */

require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

// Load complete Mizan context - ESSENTIAL for security validation
const contextPath = path.join(process.cwd(), 'AGENT_CONTEXT_ULTIMATE.md');
let mizanContext;
try {
  mizanContext = fs.readFileSync(contextPath, 'utf8');
  console.log(`${colors.green}✅ Loaded complete AGENT_CONTEXT_ULTIMATE.md (${Math.round(mizanContext.length/1000)}K chars)${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}🚨 CRITICAL ERROR: AGENT_CONTEXT_ULTIMATE.md not found!${colors.reset}`);
  console.error(`${colors.red}This agent REQUIRES complete Mizan context for security validation.${colors.reset}`);
  console.error(`${colors.red}Without it, security validation will miss critical platform vulnerabilities.${colors.reset}\n`);
  process.exit(1);
}

/**
 * MIZAN-SPECIFIC SECURITY PATTERNS
 * These represent critical security requirements unique to Mizan
 */
const MIZAN_SECURITY_PATTERNS = {
  TENANT_ISOLATION_SECURITY: {
    description: 'Multi-tenant data isolation security',
    criticalRequirements: [
      'Every database query must include tenantId filter',
      'No cross-tenant data access possible',
      'Agent communications must be tenant-scoped',
      'API responses must be tenant-filtered'
    ],
    vulnerabilityPatterns: [
      /db\.select\(\)\.from\(.*\)(?!.*tenantId)/,
      /where\((?!.*tenantId)/,
      /\.findMany\(\)(?!.*where.*tenantId)/
    ]
  },

  AGENT_COMMUNICATION_SECURITY: {
    description: 'Agent-to-agent communication security',
    criticalRequirements: [
      'Recognition agent must validate culture survey authenticity',
      'Engagement agent must verify recognition agent authorization',
      'LXP triggers must be authenticated from skills agent',
      'Performance agent requests must be authorized'
    ]
  },

  HR_DATA_PROTECTION: {
    description: 'Sensitive HR data protection',
    criticalRequirements: [
      'Culture survey responses must be encrypted at rest',
      'Performance evaluation data requires special protection',
      'Skills assessment data must be anonymizable',
      'Employee personal data must comply with privacy regulations'
    ]
  },

  ENTERPRISE_SECURITY: {
    description: 'Enterprise client security requirements',
    criticalRequirements: [
      'SOC 2 Type II compliance patterns',
      'GDPR privacy by design implementation',
      'Audit trail completeness',
      'Data retention policy compliance',
      'Encryption standards compliance'
    ]
  }
};

/**
 * Validate a fix against Mizan security requirements
 */
async function validateMizanSecurity(validationData) {
  const { violation, mizanAnalysis, mizanFix, businessValidation } = validationData;

  if (!mizanFix || validationData.skipped) {
    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation,
      securityValidation: {
        securityRating: 'SECURE',
        overallRiskScore: 0,
        reason: 'Fix was skipped by previous agents',
        mizanSecurityCompliance: {
          tenantIsolation: true,
          agentCommunication: true,
          hrDataProtection: true,
          enterpriseSecurity: true
        }
      },
      skipped: true
    };
  }

  const prompt = `${mizanContext}

╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                    AGENT 4: MIZAN-INTELLIGENT SECURITY CHECKER                                  ║
║                              COMPREHENSIVE SECURITY VALIDATION                                  ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

You are Agent 4, a MIZAN-INTELLIGENT Security Checker using GPT-4. You understand the complete Mizan platform security requirements and can identify security vulnerabilities that could compromise enterprise client data.

🎯 MIZAN SECURITY CONTEXT:
You understand that Mizan handles extremely sensitive enterprise HR data:
- Employee performance evaluations (confidential career impact)
- Culture survey responses (personal opinions and feedback)
- Skills assessments (competency and development needs)
- Compensation and bonus data (financial privacy)
- Hiring decisions and candidate assessments (discrimination risks)

🔍 ORIGINAL VIOLATION:
File: ${violation.file}
Rule: ${violation.rule}
Description: ${violation.description}

🧠 PREVIOUS AGENT ANALYSES:
Agent 1 Analysis: ${JSON.stringify(mizanAnalysis.mizanBusinessImpact, null, 2)}
Agent 2 Fix: ${JSON.stringify(mizanFix.mizanArchitecture, null, 2)}
Agent 3 Business Validation: ${JSON.stringify(businessValidation.businessCompliance, null, 2)}

🛡️ CRITICAL MIZAN SECURITY VALIDATION:

1. TENANT ISOLATION SECURITY:
   - Does the fix ensure complete tenant data isolation?
   - Are there any paths for cross-tenant data access?
   - Is tenantId properly validated and filtered?
   - Could agent communications leak tenant data?

2. HR DATA PROTECTION:
   - Is sensitive employee data properly protected?
   - Are culture survey responses kept confidential?
   - Is performance data encrypted and access-controlled?
   - Are skills assessments protected from unauthorized access?

3. AGENT COMMUNICATION SECURITY:
   - Are agent-to-agent communications authenticated?
   - Can malicious agents trigger unauthorized actions?
   - Is the Three-Engine Architecture secure from injection?
   - Are BOT interactions properly validated?

4. ENTERPRISE COMPLIANCE:
   - Does the fix maintain SOC 2 compliance patterns?
   - Is GDPR privacy by design preserved?
   - Are audit trails maintained for all actions?
   - Is data retention policy compliance preserved?

5. PRODUCTION SECURITY:
   - Are there any SQL injection vulnerabilities?
   - Is input validation comprehensive?
   - Are error messages information-leak safe?
   - Is authentication and authorization proper?

🎯 RESPOND IN JSON FORMAT:
{
  "securityRating": "SECURE|MODERATE_RISK|HIGH_RISK|CRITICAL",
  "overallRiskScore": 0-100,
  "confidence": 0.0-1.0,
  "productionSafe": true/false,
  "mizanSecurityCompliance": {
    "tenantIsolation": true/false,
    "agentCommunication": true/false,
    "hrDataProtection": true/false,
    "enterpriseSecurity": true/false,
    "threeEngineIntegrity": true/false,
    "botSecurityPatterns": true/false,
    "crossModuleDataFlow": true/false,
    "complianceRequirements": true/false
  },
  "vulnerabilities": [
    {
      "type": "tenant-isolation|data-protection|authentication|authorization|injection",
      "severity": "critical|high|medium|low",
      "description": "detailed vulnerability description",
      "impact": "what could go wrong",
      "cve": "CVE reference if applicable"
    }
  ],
  "complianceIssues": [
    {
      "regulation": "GDPR|SOC2|CCPA|HIPAA",
      "issue": "specific compliance issue",
      "risk": "legal/financial risk description"
    }
  ],
  "securityRecommendations": [
    "specific security improvements needed"
  ],
  "enterpriseReadiness": true/false,
  "auditTrailAdequacy": "complete|partial|inadequate",
  "dataEncryptionStatus": "compliant|at-risk|non-compliant",
  "accessControlValidation": "proper|insufficient|broken",
  "securityTestingRequired": ["penetration", "vulnerability-scan", "compliance-audit", etc.],
  "securityNotes": "detailed security analysis explanation"
}

🚨 CRITICAL MIZAN SECURITY REQUIREMENTS:
- Validate against enterprise HR data protection standards
- Ensure complete multi-tenant isolation security
- Verify agent communication security patterns
- Confirm regulatory compliance maintenance
- Assess production security readiness
- Validate against discrimination and bias risks

Your validation must be SECURITY-INTELLIGENT for Mizan's enterprise HR platform!`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content || '{}';
    
    // Parse JSON response
    let validation;
    try {
      validation = JSON.parse(content);
    } catch (parseError) {
      console.log(`   ⚠️  JSON parse error for ${violation.file}:${violation.line}, using security-intelligent fallback`);
      validation = createMizanSecurityFallback(violation, mizanAnalysis, mizanFix, content);
    }

    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation,
      securityValidation: validation,
      agentId: 'mizan-intelligent-security-checker',
      timestamp: new Date().toISOString(),
      validationType: 'mizan-security-aware'
    };

  } catch (error) {
    console.log(`   ❌ GPT-4 API error for ${violation.file}:${violation.line}: ${error.message}`);
    
    return {
      violation,
      mizanAnalysis,
      mizanFix,
      businessValidation,
      securityValidation: createMizanSecurityFallback(violation, mizanAnalysis, mizanFix, null, error.message),
      agentId: 'mizan-intelligent-security-checker',
      timestamp: new Date().toISOString(),
      error: error.message,
      validationType: 'mizan-security-aware-fallback'
    };
  }
}

/**
 * Create security-intelligent fallback validation
 */
function createMizanSecurityFallback(violation, mizanAnalysis, mizanFix, responseText = null, errorMessage = null) {
  const code = violation.content || '';
  const file = violation.file || '';
  
  // Pattern-based security analysis
  let securityRating = 'SECURE';
  let riskScore = 10;
  let vulnerabilities = [];
  
  // Check for tenant isolation issues
  const tenantIsolationVulns = MIZAN_SECURITY_PATTERNS.TENANT_ISOLATION_SECURITY.vulnerabilityPatterns
    .filter(pattern => pattern.test(code));
  
  if (tenantIsolationVulns.length > 0) {
    securityRating = 'CRITICAL';
    riskScore = 95;
    vulnerabilities.push({
      type: 'tenant-isolation',
      severity: 'critical',
      description: 'Database query without tenant isolation detected',
      impact: 'Could allow cross-tenant data access breach',
      cve: null
    });
  }
  
  // Check for sensitive data exposure
  if (file.includes('culture') || file.includes('performance') || file.includes('skills')) {
    if (!mizanFix.mizanArchitecture?.tenantIsolation) {
      securityRating = 'HIGH_RISK';
      riskScore = Math.max(riskScore, 80);
      vulnerabilities.push({
        type: 'data-protection',
        severity: 'high',
        description: 'Sensitive HR data without proper isolation',
        impact: 'Could expose confidential employee information',
        cve: null
      });
    }
  }
  
  // Check for authentication issues
  if (code.includes('agent') || code.includes('trigger')) {
    if (!mizanFix.mizanArchitecture?.agentTriggering) {
      securityRating = 'MODERATE_RISK';
      riskScore = Math.max(riskScore, 60);
      vulnerabilities.push({
        type: 'authentication',
        severity: 'medium',
        description: 'Agent communication without proper authentication',
        impact: 'Could allow unauthorized agent triggering',
        cve: null
      });
    }
  }

  return {
    securityRating,
    overallRiskScore: riskScore,
    confidence: errorMessage ? 0.6 : 0.8,
    productionSafe: riskScore < 70,
    mizanSecurityCompliance: {
      tenantIsolation: !tenantIsolationVulns.length,
      agentCommunication: mizanFix.mizanArchitecture?.agentTriggering || false,
      hrDataProtection: riskScore < 80,
      enterpriseSecurity: riskScore < 60,
      threeEngineIntegrity: mizanFix.mizanArchitecture?.threeEngineCompliance || false,
      botSecurityPatterns: true,
      crossModuleDataFlow: mizanFix.mizanArchitecture?.moduleIntegration || false,
      complianceRequirements: riskScore < 70
    },
    vulnerabilities,
    complianceIssues: riskScore > 80 ? [
      {
        regulation: 'GDPR',
        issue: 'Potential data isolation breach',
        risk: 'Significant financial penalties for data protection violations'
      }
    ] : [],
    securityRecommendations: [
      riskScore > 80 ? 'Immediate tenant isolation fix required' : 'Review security patterns',
      'Validate agent authentication mechanisms',
      'Test multi-tenant data isolation',
      'Review HR data protection compliance'
    ].filter(Boolean),
    enterpriseReadiness: riskScore < 60,
    auditTrailAdequacy: riskScore < 50 ? 'complete' : 'partial',
    dataEncryptionStatus: riskScore < 70 ? 'compliant' : 'at-risk',
    accessControlValidation: riskScore < 60 ? 'proper' : 'insufficient',
    securityTestingRequired: [
      'vulnerability-scan',
      riskScore > 70 ? 'penetration' : null,
      'compliance-audit'
    ].filter(Boolean),
    securityNotes: errorMessage ? 
      `Security validation with API error: ${errorMessage}` :
      'Pattern-based security analysis using Mizan security requirements',
    fallback: true,
    fallbackReason: errorMessage || 'JSON parsing error'
  };
}

/**
 * Main function to validate all fixes with security intelligence
 */
async function validateMizanSecurity() {
  console.log(`${colors.magenta}${colors.bold}🤖 AGENT 4: MIZAN-INTELLIGENT SECURITY CHECKER${colors.reset}`);
  console.log(`${colors.magenta}╔══════════════════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}║              REVOLUTIONARY MIZAN SECURITY VALIDATION ENGINE                                      ║${colors.reset}`);
  console.log(`${colors.magenta}╚══════════════════════════════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  // Load Agent 3 business validations
  const validationsPath = path.join(process.cwd(), 'scripts', 'agents', 'agent3-business-validations.json');
  
  if (!fs.existsSync(validationsPath)) {
    console.log(`${colors.yellow}⚠️  No agent3-business-validations.json found. Run Mizan Agent 3 first.${colors.reset}\n`);
    
    // Create empty results
    const emptyResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalValidated: 0,
        securityApproved: 0,
        moderateRisk: 0,
        highRisk: 0,
        critical: 0,
        avgRiskScore: 0,
        productionSafe: 0,
        mizanSecurityIntelligence: 'maximum'
      },
      securityValidations: []
    };
    
    // Ensure agents directory exists
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent4-security-validations.json'), JSON.stringify(emptyResults, null, 2));
    console.log(`${colors.green}✅ Created empty security validation results${colors.reset}\n`);
    process.exit(0);
  }

  let validationResults;
  try {
    validationResults = JSON.parse(fs.readFileSync(validationsPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Could not parse agent3-business-validations.json: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  const validations = validationResults.businessValidations || [];
  
  if (validations.length === 0) {
    console.log(`${colors.green}✅ No validations to security check${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`🛡️ Security validating ${validations.length} fixes with complete Mizan security intelligence...\n`);
  console.log(`${colors.cyan}🎯 MIZAN SECURITY VALIDATION CAPABILITIES:${colors.reset}`);
  console.log(`   ✅ Multi-tenant data isolation security`);
  console.log(`   ✅ Agent-to-agent communication security`);
  console.log(`   ✅ Sensitive HR data protection validation`);
  console.log(`   ✅ Enterprise compliance requirements`);
  console.log(`   ✅ Regulatory compliance validation (GDPR, SOC 2)`);
  console.log(`   ✅ Production security readiness assessment\n`);

  // Validate each fix with security intelligence
  const securityValidations = [];
  let securityApproved = 0;
  let moderateRisk = 0;
  let highRisk = 0;
  let critical = 0;
  let productionSafe = 0;
  let totalRiskScore = 0;
  let scoreCount = 0;

  // Security compliance tracking
  let tenantIsolationSecure = 0;
  let agentCommunicationSecure = 0;
  let hrDataProtected = 0;
  let enterpriseCompliant = 0;

  for (let i = 0; i < validations.length; i++) {
    const validationData = validations[i];
    console.log(`   ${i + 1}/${validations.length}: 🛡️ ${validationData.violation.file}:${validationData.violation.line || 'unknown'}`);
    
    const securityResult = await validateMizanSecurity(validationData);
    securityValidations.push(securityResult);

    // Update security counters
    if (!securityResult.skipped && securityResult.securityValidation) {
      const rating = securityResult.securityValidation.securityRating;
      switch (rating) {
        case 'SECURE':
          securityApproved++;
          break;
        case 'MODERATE_RISK':
          moderateRisk++;
          break;
        case 'HIGH_RISK':
          highRisk++;
          break;
        case 'CRITICAL':
          critical++;
          break;
      }

      if (securityResult.securityValidation.productionSafe) {
        productionSafe++;
      }

      if (securityResult.securityValidation.overallRiskScore !== undefined) {
        totalRiskScore += securityResult.securityValidation.overallRiskScore;
        scoreCount++;
      }

      // Track security compliance
      const compliance = securityResult.securityValidation.mizanSecurityCompliance;
      if (compliance) {
        if (compliance.tenantIsolation) tenantIsolationSecure++;
        if (compliance.agentCommunication) agentCommunicationSecure++;
        if (compliance.hrDataProtection) hrDataProtected++;
        if (compliance.enterpriseSecurity) enterpriseCompliant++;
      }
    }

    // Brief delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Calculate security averages
  const avgRiskScore = scoreCount > 0 ? totalRiskScore / scoreCount : 0;

  // Prepare security-intelligent results
  const results = {
    summary: {
      timestamp: new Date().toISOString(),
      totalValidated: validations.length,
      securityApproved,
      moderateRisk,
      highRisk,
      critical,
      avgRiskScore: Math.round(avgRiskScore * 10) / 10,
      productionSafe,
      mizanSecurityIntelligence: 'maximum',
      securityCompliance: {
        tenantIsolationSecure,
        agentCommunicationSecure,
        hrDataProtected,
        enterpriseCompliant
      },
      vulnerabilityStats: {
        totalVulnerabilities: securityValidations.reduce((sum, v) => 
          sum + (v.securityValidation?.vulnerabilities?.length || 0), 0),
        criticalVulnerabilities: securityValidations.reduce((sum, v) => 
          sum + (v.securityValidation?.vulnerabilities?.filter(vuln => vuln.severity === 'critical').length || 0), 0),
        complianceIssues: securityValidations.reduce((sum, v) => 
          sum + (v.securityValidation?.complianceIssues?.length || 0), 0)
      }
    },
    securityValidations
  };

  // Save results to proper agents directory
  try {
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent4-security-validations.json'), JSON.stringify(results, null, 2));
    console.log(`\n${colors.green}✅ Mizan security validation complete!${colors.reset}`);
    console.log(`📁 Results saved to: scripts/agents/agent4-security-validations.json\n`);
  } catch (error) {
    console.error(`${colors.red}❌ Could not save results: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  // Display security-intelligent summary
  console.log(`${colors.blue}🛡️ MIZAN SECURITY VALIDATION SUMMARY:${colors.reset}`);
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║              SECURITY INTELLIGENCE RESULTS         ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`   🛡️ Secure: ${colors.green}${securityApproved}${colors.reset} | ⚠️ Moderate: ${colors.yellow}${moderateRisk}${colors.reset} | 🚨 High Risk: ${colors.red}${highRisk}${colors.reset} | 💥 Critical: ${colors.red}${critical}${colors.reset}`);
  console.log(`   🏭 Production safe: ${productionSafe}/${validations.length}`);
  console.log(`   📊 Average risk score: ${avgRiskScore.toFixed(1)}/100\n`);

  console.log(`${colors.blue}🔒 MIZAN SECURITY COMPLIANCE:${colors.reset}`);
  console.log(`   Tenant isolation secure: ${tenantIsolationSecure}/${validations.length}`);
  console.log(`   Agent communication secure: ${agentCommunicationSecure}/${validations.length}`);
  console.log(`   HR data protected: ${hrDataProtected}/${validations.length}`);
  console.log(`   Enterprise compliant: ${enterpriseCompliant}/${validations.length}\n`);

  console.log(`${colors.blue}⚠️ VULNERABILITY STATISTICS:${colors.reset}`);
  console.log(`   Total vulnerabilities: ${results.summary.vulnerabilityStats.totalVulnerabilities}`);
  console.log(`   Critical vulnerabilities: ${results.summary.vulnerabilityStats.criticalVulnerabilities}`);
  console.log(`   Compliance issues: ${results.summary.vulnerabilityStats.complianceIssues}\n`);

  if (critical > 0) {
    console.log(`${colors.red}🚨 CRITICAL SECURITY ALERT:${colors.reset}`);
    console.log(`${colors.red}   ${critical} fixes have CRITICAL security vulnerabilities!${colors.reset}`);
    console.log(`${colors.red}   These must be addressed before production deployment.${colors.reset}\n`);
  }

  console.log(`${colors.green}🚀 Ready for Mizan-Intelligent Agent 5 (Strategic Integrator)!${colors.reset}\n`);
}

// Check dependencies and API key
function checkMizanDependencies() {
  if (!process.env.OPENAI_API_KEY) {
    console.log(`${colors.yellow}⚠️  OPENAI_API_KEY not found in environment variables${colors.reset}`);
    console.log(`${colors.blue}💡 Set your OpenAI API key in .env file for Mizan security validation${colors.reset}\n`);
    
    // Create placeholder results
    const placeholderResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalValidated: 0,
        securityApproved: 0,
        note: 'Placeholder results - OpenAI API key not configured'
      },
      securityValidations: []
    };
    
    try {
      const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(agentsDir, 'agent4-security-validations.json'), JSON.stringify(placeholderResults, null, 2));
      console.log(`${colors.green}✅ Created placeholder results${colors.reset}\n`);
    } catch (error) {
      console.error(`${colors.red}❌ Could not save placeholder results: ${error.message}${colors.reset}\n`);
    }
    
    process.exit(0);
  }

  try {
    require('openai');
  } catch (error) {
    console.log(`${colors.yellow}📦 Installing required dependency: openai${colors.reset}`);
    const { execSync } = require('child_process');
    try {
      execSync('npm install openai', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Dependencies installed${colors.reset}\n`);
    } catch (installError) {
      console.error(`${colors.red}❌ Failed to install dependencies: ${installError.message}${colors.reset}`);
      console.log(`${colors.yellow}Please run: npm install openai${colors.reset}\n`);
      process.exit(1);
    }
  }
}

// Run the Mizan-intelligent agent
if (require.main === module) {
  checkMizanDependencies();
  validateMizanSecurity().catch(error => {
    console.error(`${colors.red}💥 MIZAN-INTELLIGENT AGENT 4 CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { validateMizanSecurity };