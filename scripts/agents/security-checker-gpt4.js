#!/usr/bin/env node

/**
 * AGENT 4: SECURITY CHECKER (GPT-4o)
 * 
 * Validates fixes for security vulnerabilities, authentication issues,
 * and potential attack vectors
 */

require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
 * Perform security analysis on a fix using GPT-4o
 */
async function performSecurityCheck(validationData) {
  const { violation, agent2Fix, agent3Validation } = validationData;

  const prompt = `${agentContext}

═══════════════════════════════════════════════════════
AGENT 4: SECURITY CHECKER - VULNERABILITY ANALYSIS
═══════════════════════════════════════════════════════

You are Agent 4 (Security Checker) using GPT-4o. Your job is to perform deep security analysis on code fixes.

ORIGINAL VIOLATION:
File: ${violation.file}
Line: ${violation.line}
Rule: ${violation.rule}

AGENT 3'S VALIDATION:
Recommendation: ${agent3Validation.recommendation}
Score: ${agent3Validation.overallScore}/100
Mizan Compliance: ${JSON.stringify(agent3Validation.mizanCompliance, null, 2)}

AGENT 2'S FIX:
${JSON.stringify(agent2Fix.primaryFix, null, 2).substring(0, 1500)}

YOUR MISSION:
Perform comprehensive security analysis on this fix. Check for:

1. 🔒 AUTHENTICATION VULNERABILITIES
   - Missing authentication checks
   - Weak session management
   - Token validation issues
   - Credential exposure

2. 🛡️ AUTHORIZATION ISSUES
   - Missing role-based access control
   - Privilege escalation risks
   - Inadequate permission checks
   - Broken access control

3. 🔐 DATA SECURITY
   - SQL injection risks (even with ORM)
   - XSS vulnerabilities
   - Data exposure in logs/errors
   - Sensitive data in plaintext

4. 🏢 MULTI-TENANT SECURITY
   - Tenant isolation failures
   - Cross-tenant data leakage
   - Missing tenant ID validation
   - Shared resource access issues

5. 🚨 INPUT VALIDATION
   - Missing input sanitization
   - Type coercion issues
   - Buffer overflow risks
   - Path traversal vulnerabilities

6. ⚡ RATE LIMITING & DOS
   - Missing rate limiting
   - Resource exhaustion risks
   - Infinite loops
   - Uncontrolled recursion

7. 🔑 SECRETS MANAGEMENT
   - Hardcoded credentials
   - API keys in code
   - Environment variable exposure
   - Secrets in logs

8. 📊 ERROR HANDLING SECURITY
   - Information disclosure in errors
   - Stack traces exposed
   - Sensitive data in error messages

RESPOND IN VALID JSON (NO MARKDOWN, NO BACKTICKS):
{
  "agent": "GPT-4o (Security Checker)",
  "timestamp": "ISO-8601",
  "securityRating": "SECURE|MODERATE_RISK|HIGH_RISK|CRITICAL",
  "overallRiskScore": 15,
  "vulnerabilities": [
    {
      "type": "SQL_INJECTION|XSS|AUTH_BYPASS|etc",
      "severity": "CRITICAL|HIGH|MEDIUM|LOW",
      "location": "Where in the code",
      "description": "Detailed vulnerability description",
      "impact": "What could happen if exploited",
      "remediation": "How to fix it",
      "cwe": "CWE-89",
      "cvss": 8.5
    }
  ],
  "securityStrengths": [
    "What security measures are well implemented"
  ],
  "recommendations": [
    "Additional security improvements"
  ],
  "exploitScenarios": [
    {
      "scenario": "Attack scenario description",
      "likelihood": "HIGH|MEDIUM|LOW",
      "impact": "CRITICAL|HIGH|MEDIUM|LOW"
    }
  ],
  "confidence": 0.92,
  "reasoning": "Detailed security analysis reasoning"
}

RESPOND WITH ONLY THE JSON OBJECT, NOTHING ELSE.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an expert security auditor specializing in web application security, OWASP Top 10, and secure coding practices.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const responseText = response.choices[0].message.content;
    
    // Parse JSON
    let cleanText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from GPT-4 response');
    }
    
    const securityCheck = JSON.parse(jsonMatch[0]);
    
    return {
      agent: 'GPT-4o (Security Checker)',
      timestamp: new Date().toISOString(),
      ...securityCheck
    };

  } catch (error) {
    console.error(`   ❌ Security check error: ${error.message}`);
    return {
      agent: 'GPT-4o (Security Checker)',
      timestamp: new Date().toISOString(),
      error: error.message,
      securityRating: 'UNKNOWN',
      overallRiskScore: 100,
      vulnerabilities: [{ 
        type: 'CHECK_FAILED', 
        severity: 'HIGH',
        description: `Security check failed: ${error.message}`,
        location: 'N/A'
      }],
      confidence: 0,
      reasoning: `Security check failed: ${error.message}`
    };
  }
}

/**
 * Main function - perform security checks on all validated fixes
 */
async function performSecurityChecks() {
  console.log('🔒 Agent 4: Security Checker (GPT-4o) Starting...\n');

  const validationsPath = path.join(process.cwd(), 'scripts', 'agent3-validations.json');
  
  let validations;
  try {
    validations = JSON.parse(fs.readFileSync(validationsPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error: Could not read agent3-validations.json');
    console.error('   Run mizan-validator-gemini.js (Agent 3) first');
    process.exit(1);
  }

  console.log(`📊 Found ${validations.length} fixes to security check\n`);

  const securityChecks = [];
  let secureCount = 0;
  let moderateRiskCount = 0;
  let highRiskCount = 0;
  let criticalCount = 0;

  for (let i = 0; i < validations.length; i++) {
    const validation = validations[i];
    
    console.log(`🔍 [${i + 1}/${validations.length}] Security checking: ${validation.violation.file}:${validation.violation.line}`);
    console.log(`   Agent 3 Score: ${validation.agent3Validation.overallScore}/100`);
    console.log(`   Agent 3 Verdict: ${validation.agent3Validation.recommendation}`);
    
    const securityCheck = await performSecurityCheck(validation);
    
    securityChecks.push({
      ...validation,
      agent4Security: securityCheck
    });

    // Display result
    if (securityCheck.error) {
      console.log(`   ❌ Security Check Error: ${securityCheck.error}`);
      criticalCount++;
    } else {
      const ratingEmoji = {
        'SECURE': '✅',
        'MODERATE_RISK': '⚠️',
        'HIGH_RISK': '🔴',
        'CRITICAL': '💀'
      }[securityCheck.securityRating] || '❓';
      
      console.log(`   ${ratingEmoji} Security Rating: ${securityCheck.securityRating}`);
      console.log(`   📊 Risk Score: ${securityCheck.overallRiskScore}/100`);
      
      if (securityCheck.vulnerabilities && securityCheck.vulnerabilities.length > 0) {
        console.log(`   ⚠️  Vulnerabilities: ${securityCheck.vulnerabilities.length}`);
        securityCheck.vulnerabilities.slice(0, 2).forEach(v => {
          console.log(`      - ${v.severity}: ${v.type}`);
        });
      } else {
        console.log(`   ✅ No vulnerabilities found`);
      }
      
      // Count by rating
      if (securityCheck.securityRating === 'SECURE') {
        secureCount++;
      } else if (securityCheck.securityRating === 'MODERATE_RISK') {
        moderateRiskCount++;
      } else if (securityCheck.securityRating === 'HIGH_RISK') {
        highRiskCount++;
      } else if (securityCheck.securityRating === 'CRITICAL') {
        criticalCount++;
      }
    }
    
    console.log('');

    // Rate limiting - 3 seconds between requests
    if (i < validations.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Save results
  const resultsPath = path.join(process.cwd(), 'scripts', 'agent4-security.json');
  fs.writeFileSync(resultsPath, JSON.stringify(securityChecks, null, 2));

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🔒 AGENT 4 (GPT-4o) SECURITY SUMMARY:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Secure: ${secureCount}`);
  console.log(`⚠️  Moderate Risk: ${moderateRiskCount}`);
  console.log(`🔴 High Risk: ${highRiskCount}`);
  console.log(`💀 Critical: ${criticalCount}`);
  console.log(`📁 Total checked: ${validations.length}`);
  console.log(`💾 Results saved: scripts/agent4-security.json\n`);
  
  console.log('✅ Agent 4 (GPT-4o Security Checker) complete!\n');
  
  console.log('📋 Next steps:');
  console.log('   1. Review security findings in scripts/agent4-security.json');
  console.log('   2. Fix any HIGH_RISK or CRITICAL vulnerabilities');
  console.log('   3. Run Agent 5 (Final Integrator): node scripts/agents/final-integrator-claude.js\n');
}

// Run
if (require.main === module) {
  performSecurityChecks();
}

module.exports = { performSecurityCheck, performSecurityChecks };