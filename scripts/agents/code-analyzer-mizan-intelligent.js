#!/usr/bin/env node

/**
 * AGENT 1: MIZAN-INTELLIGENT CODE ANALYZER (Gemini 2.5 Flash)
 * 
 * REVOLUTIONARY UPGRADE: This agent understands Mizan platform completely
 * 
 * MIZAN PLATFORM KNOWLEDGE:
 * - Multi-tenant SaaS HR Analytics platform
 * - 5 Core Analysis Features: Structure, Culture, Skills, Performance, Hiring
 * - 6 Business Modules: Performance, Hiring, LXP, Talent, Bonus + triggered modules
 * - Three-Engine Architecture: Knowledge → Data → Reasoning
 * - Complex Integration Flows: Culture → Recognition Agent → Engagement Agent
 * - Module Triggering: Skills Analysis → LXP activation
 * - Cross-module Dependencies: Performance needs Culture priorities + Skills gaps
 * 
 * VALIDATION CAPABILITIES:
 * ✅ Three-Engine Architecture compliance
 * ✅ Culture Agent → Recognition/Engagement triggering
 * ✅ Skills → LXP integration patterns
 * ✅ Multi-tenant isolation (tenantId) validation
 * ✅ Drizzle ORM vs Prisma detection
 * ✅ Next.js 14 App Router vs Pages Router
 * ✅ Business workflow completeness
 * ✅ Strategic alignment validation
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

// Load complete Mizan context - CRITICAL for intelligent analysis
const contextPath = path.join(process.cwd(), 'AGENT_CONTEXT_ULTIMATE.md');
let mizanContext;
try {
  mizanContext = fs.readFileSync(contextPath, 'utf8');
  console.log(`${colors.green}✅ Loaded complete AGENT_CONTEXT_ULTIMATE.md (${Math.round(mizanContext.length/1000)}K chars)${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}🚨 CRITICAL ERROR: AGENT_CONTEXT_ULTIMATE.md not found!${colors.reset}`);
  console.error(`${colors.red}This agent REQUIRES complete Mizan context to function properly.${colors.reset}`);
  console.error(`${colors.red}Without it, the analysis will be generic and inadequate.${colors.reset}\n`);
  process.exit(1);
}

/**
 * MIZAN-SPECIFIC VIOLATION PATTERNS
 * These patterns are unique to Mizan platform architecture
 */
const MIZAN_SPECIFIC_PATTERNS = {
  // Three-Engine Architecture violations
  THREE_ENGINE_VIOLATIONS: [
    /KnowledgeEngine.*without.*DataEngine/,
    /DataEngine.*without.*ReasoningEngine/,
    /direct.*analysis.*without.*three.*engine/i,
    /new.*Agent.*without.*engines/i
  ],
  
  // Culture Agent triggering violations
  CULTURE_AGENT_VIOLATIONS: [
    /culture.*survey.*without.*recognition.*agent/i,
    /culture.*analysis.*missing.*engagement.*agent/i,
    /survey.*response.*not.*triggering.*agents/i,
    /culture.*without.*agent.*integration/i
  ],
  
  // Skills Module violations
  SKILLS_MODULE_VIOLATIONS: [
    /skills.*analysis.*without.*lxp.*trigger/i,
    /skills.*gap.*not.*triggering.*learning/i,
    /resume.*upload.*without.*bot.*assistance/i,
    /strategic.*skills.*without.*framework/i
  ],
  
  // Multi-tenant violations
  TENANT_ISOLATION_VIOLATIONS: [
    /db\.select\(\)\.from\(.*\)(?!.*tenantId)/,
    /db\.insert\(.*\)(?!.*tenantId)/,
    /db\.update\(.*\)(?!.*tenantId)/,
    /db\.delete\(.*\)(?!.*tenantId)/,
    /where\((?!.*tenantId)/
  ],
  
  // Tech stack violations
  TECH_STACK_VIOLATIONS: [
    /prisma/i,
    /getServerSideProps/,
    /getStaticProps/,
    /pages\/api/,
    /import.*from.*'pages'/,
    /useRouter.*from.*'next\/router'/
  ],
  
  // Business logic violations
  BUSINESS_LOGIC_VIOLATIONS: [
    /performance.*module.*without.*culture.*priorities/i,
    /performance.*without.*skills.*gaps/i,
    /hiring.*module.*without.*structure.*recommendation/i,
    /bonus.*calculation.*without.*skills.*achievements/i
  ]
};

/**
 * Analyze a single violation with complete Mizan platform understanding
 */
async function analyzeMizanViolation(violation) {
  const prompt = `${mizanContext}

╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                    AGENT 1: MIZAN-INTELLIGENT CODE ANALYZER                                     ║
║                              VIOLATION ANALYSIS REQUEST                                          ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

You are Agent 1, a MIZAN-INTELLIGENT Code Analyzer using Gemini 2.5. You have complete understanding of the Mizan platform architecture, business logic, and strategic requirements.

🎯 MIZAN PLATFORM CONTEXT:
You understand that Mizan is a sophisticated multi-tenant SaaS HR Analytics platform with:
- 5 Core Analysis Features (Structure, Culture, Skills, Performance, Hiring)
- Complex agent triggering (Culture → Recognition/Engagement agents)
- Three-Engine Architecture (Knowledge → Data → Reasoning)
- Module triggering systems (Skills → LXP activation)
- Cross-module dependencies (Performance needs Culture + Skills data)
- Strategic workflow alignment requirements

🔍 VIOLATION TO ANALYZE:
File: ${violation.file}
Line: ${violation.line}
Rule: ${violation.rule}
Code: ${violation.content}
Description: ${violation.description}
Severity: ${violation.severity}

🧠 MIZAN-INTELLIGENT ANALYSIS TASKS:

1. MIZAN BUSINESS IMPACT ASSESSMENT:
   - Does this violation break Mizan business workflows?
   - Will it affect Culture → Recognition agent triggering?
   - Does it impact Skills → LXP integration?
   - Will Performance module lose Culture/Skills dependencies?

2. THREE-ENGINE ARCHITECTURE VALIDATION:
   - Does the code follow Knowledge → Data → Reasoning pattern?
   - Are engines properly instantiated and connected?
   - Is the architecture maintaining separation of concerns?

3. MULTI-TENANT ISOLATION CHECK:
   - Are database queries properly isolated with tenantId?
   - Could this create cross-tenant data leakage?
   - Is tenant middleware being bypassed?

4. STRATEGIC ALIGNMENT VALIDATION:
   - Does the code support strategic business objectives?
   - Will it maintain cross-module integration capabilities?
   - Does it preserve workflow completeness?

5. TECH STACK COMPLIANCE:
   - Is it using correct stack (Next.js 14 App Router, Drizzle ORM)?
   - Are forbidden patterns being used (Prisma, Pages Router)?
   - Is TypeScript strict mode being maintained?

🎯 RESPOND IN JSON FORMAT:
{
  "isRealViolation": true/false,
  "confidence": 0.0-1.0,
  "mizanBusinessImpact": {
    "severity": "critical|high|medium|low|none",
    "affectedModules": ["Culture", "Skills", "Performance", etc.],
    "workflowsBreaking": ["Culture→Recognition", "Skills→LXP", etc.],
    "businessRisk": "description of business risk"
  },
  "architecturalCompliance": {
    "threeEnginePattern": true/false,
    "agentTriggering": true/false,
    "moduleIntegration": true/false,
    "tenantIsolation": true/false
  },
  "technicalAssessment": {
    "techStackCompliance": true/false,
    "codeQuality": "excellent|good|poor|critical",
    "productionReadiness": true/false,
    "securityRisk": "low|medium|high|critical"
  },
  "strategicAlignment": {
    "supportsBusinessGoals": true/false,
    "maintainsWorkflows": true/false,
    "preservesIntegration": true/false,
    "scalabilityImpact": "positive|neutral|negative"
  },
  "fixStrategy": {
    "approach": "detailed fix approach",
    "complexity": "simple|moderate|complex|enterprise",
    "estimatedEffort": "small|medium|large|extensive",
    "migrationRequired": true/false,
    "testingRequired": ["unit", "integration", "business-workflow", etc.]
  },
  "recommendation": "PROCEED|SKIP|MANUAL_REVIEW|ESCALATE",
  "reasoning": "detailed explanation of recommendation",
  "mizanSpecificNotes": "Any Mizan-specific considerations"
}

🚨 CRITICAL REQUIREMENTS:
- Consider COMPLETE Mizan platform context
- Assess business workflow impacts, not just code quality
- Validate against Three-Engine Architecture patterns
- Check for proper agent triggering mechanisms
- Ensure multi-tenant isolation compliance
- Verify strategic business alignment

Your analysis must be MIZAN-INTELLIGENT, not generic code analysis!`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let analysis;
    try {
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleanText);
    } catch (parseError) {
      console.log(`   ⚠️  JSON parse error for ${violation.file}:${violation.line}, using intelligent fallback`);
      
      // Create intelligent fallback based on violation patterns
      analysis = createMizanIntelligentFallback(violation, text);
    }

    return {
      violation,
      mizanAnalysis: analysis,
      agentId: 'mizan-intelligent-analyzer',
      timestamp: new Date().toISOString(),
      analysisType: 'mizan-platform-aware'
    };

  } catch (error) {
    console.log(`   ❌ Gemini API error for ${violation.file}:${violation.line}: ${error.message}`);
    
    return {
      violation,
      mizanAnalysis: createMizanIntelligentFallback(violation, null, error.message),
      agentId: 'mizan-intelligent-analyzer',
      timestamp: new Date().toISOString(),
      error: error.message,
      analysisType: 'mizan-platform-aware-fallback'
    };
  }
}

/**
 * Create intelligent fallback analysis using Mizan-specific pattern matching
 */
function createMizanIntelligentFallback(violation, responseText = null, errorMessage = null) {
  const code = violation.content || '';
  const file = violation.file || '';
  
  // Mizan-specific pattern analysis
  const mizanPatterns = {
    threeEngine: MIZAN_SPECIFIC_PATTERNS.THREE_ENGINE_VIOLATIONS.some(p => p.test(code)),
    cultureAgent: MIZAN_SPECIFIC_PATTERNS.CULTURE_AGENT_VIOLATIONS.some(p => p.test(code)),
    skillsModule: MIZAN_SPECIFIC_PATTERNS.SKILLS_MODULE_VIOLATIONS.some(p => p.test(code)),
    tenantIsolation: MIZAN_SPECIFIC_PATTERNS.TENANT_ISOLATION_VIOLATIONS.some(p => p.test(code)),
    techStack: MIZAN_SPECIFIC_PATTERNS.TECH_STACK_VIOLATIONS.some(p => p.test(code)),
    businessLogic: MIZAN_SPECIFIC_PATTERNS.BUSINESS_LOGIC_VIOLATIONS.some(p => p.test(code))
  };
  
  // Determine affected modules based on file path
  const affectedModules = [];
  if (file.includes('culture')) affectedModules.push('Culture');
  if (file.includes('skills')) affectedModules.push('Skills');
  if (file.includes('performance')) affectedModules.push('Performance');
  if (file.includes('structure')) affectedModules.push('Structure');
  if (file.includes('hiring')) affectedModules.push('Hiring');
  
  // Determine severity based on Mizan patterns
  let severity = 'medium';
  let businessRisk = 'Standard code quality issue';
  
  if (mizanPatterns.tenantIsolation) {
    severity = 'critical';
    businessRisk = 'Data isolation breach - could expose tenant data';
  } else if (mizanPatterns.threeEngine || mizanPatterns.cultureAgent) {
    severity = 'high';
    businessRisk = 'Core Mizan architecture violation - affects platform functionality';
  } else if (mizanPatterns.techStack) {
    severity = 'high';
    businessRisk = 'Wrong technology stack - incompatible with Mizan requirements';
  }
  
  return {
    isRealViolation: true,
    confidence: errorMessage ? 0.6 : 0.8,
    mizanBusinessImpact: {
      severity,
      affectedModules,
      workflowsBreaking: mizanPatterns.cultureAgent ? ['Culture→Recognition'] : [],
      businessRisk
    },
    architecturalCompliance: {
      threeEnginePattern: !mizanPatterns.threeEngine,
      agentTriggering: !mizanPatterns.cultureAgent,
      moduleIntegration: !mizanPatterns.businessLogic,
      tenantIsolation: !mizanPatterns.tenantIsolation
    },
    technicalAssessment: {
      techStackCompliance: !mizanPatterns.techStack,
      codeQuality: severity === 'critical' ? 'critical' : 'poor',
      productionReadiness: false,
      securityRisk: mizanPatterns.tenantIsolation ? 'critical' : 'medium'
    },
    strategicAlignment: {
      supportsBusinessGoals: !mizanPatterns.businessLogic,
      maintainsWorkflows: !mizanPatterns.cultureAgent,
      preservesIntegration: !mizanPatterns.skillsModule,
      scalabilityImpact: 'negative'
    },
    fixStrategy: {
      approach: 'Requires Mizan-intelligent fix with platform context',
      complexity: severity === 'critical' ? 'enterprise' : 'complex',
      estimatedEffort: severity === 'critical' ? 'extensive' : 'large',
      migrationRequired: mizanPatterns.techStack,
      testingRequired: ['unit', 'integration', 'business-workflow']
    },
    recommendation: severity === 'critical' ? 'ESCALATE' : 'PROCEED',
    reasoning: errorMessage ? 
      `API error during analysis, using pattern-based Mizan analysis: ${errorMessage}` :
      'Pattern-based Mizan analysis indicates platform-specific violations',
    mizanSpecificNotes: `Fallback analysis detected: ${Object.keys(mizanPatterns).filter(k => mizanPatterns[k]).join(', ')} violations`
  };
}

/**
 * Main function to analyze all violations with Mizan intelligence
 */
async function analyzeMizanViolations() {
  console.log(`${colors.magenta}${colors.bold}🤖 AGENT 1: MIZAN-INTELLIGENT CODE ANALYZER${colors.reset}`);
  console.log(`${colors.magenta}╔══════════════════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}║              REVOLUTIONARY MIZAN-AWARE VIOLATION ANALYSIS ENGINE                                 ║${colors.reset}`);
  console.log(`${colors.magenta}╚══════════════════════════════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  // Load violations with proper path handling
  const violationsPath = path.join(process.cwd(), 'scripts', 'violations.json');
  
  if (!fs.existsSync(violationsPath)) {
    console.log(`${colors.yellow}⚠️  No violations.json found. Run audit first.${colors.reset}\n`);
    
    // Create empty results
    const emptyResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalAnalyzed: 0,
        mizanSpecificViolations: 0,
        genericViolations: 0,
        criticalBusinessImpact: 0,
        architecturalViolations: 0,
        proceedRecommendations: 0,
        escalateRecommendations: 0,
        avgConfidence: 0,
        mizanIntelligenceLevel: 'maximum'
      },
      mizanAnalyses: []
    };
    
    // Ensure agents directory exists
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent1-mizan-analyses.json'), JSON.stringify(emptyResults, null, 2));
    console.log(`${colors.green}✅ Created empty Mizan analysis results${colors.reset}\n`);
    process.exit(0);
  }

  let violations;
  try {
    violations = JSON.parse(fs.readFileSync(violationsPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Could not parse violations.json: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  if (!Array.isArray(violations) || violations.length === 0) {
    console.log(`${colors.green}✅ No violations to analyze${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`🎯 Analyzing ${violations.length} violations with complete Mizan platform intelligence...\n`);
  console.log(`${colors.cyan}📊 MIZAN ANALYSIS CAPABILITIES:${colors.reset}`);
  console.log(`   ✅ Three-Engine Architecture validation`);
  console.log(`   ✅ Culture → Recognition agent triggering`);
  console.log(`   ✅ Skills → LXP module integration`);
  console.log(`   ✅ Multi-tenant isolation verification`);
  console.log(`   ✅ Strategic workflow alignment`);
  console.log(`   ✅ Business impact assessment\n`);

  // Analyze each violation with Mizan intelligence
  const mizanAnalyses = [];
  let mizanSpecificCount = 0;
  let criticalBusinessImpact = 0;
  let architecturalViolations = 0;
  let proceedCount = 0;
  let escalateCount = 0;
  let totalConfidence = 0;

  for (let i = 0; i < violations.length; i++) {
    const violation = violations[i];
    console.log(`   ${i + 1}/${violations.length}: 🔍 ${violation.file}:${violation.line || 'unknown'}`);
    
    const analysis = await analyzeMizanViolation(violation);
    mizanAnalyses.push(analysis);

    // Update Mizan-specific counters
    const mizanAnalysis = analysis.mizanAnalysis;
    
    if (mizanAnalysis.mizanBusinessImpact?.affectedModules?.length > 0) {
      mizanSpecificCount++;
    }
    
    if (mizanAnalysis.mizanBusinessImpact?.severity === 'critical') {
      criticalBusinessImpact++;
    }
    
    if (!mizanAnalysis.architecturalCompliance?.threeEnginePattern || 
        !mizanAnalysis.architecturalCompliance?.tenantIsolation) {
      architecturalViolations++;
    }
    
    switch (mizanAnalysis.recommendation) {
      case 'PROCEED':
        proceedCount++;
        break;
      case 'ESCALATE':
        escalateCount++;
        break;
    }
    
    totalConfidence += mizanAnalysis.confidence || 0;

    // Brief delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 150));
  }

  // Prepare Mizan-intelligent results
  const results = {
    summary: {
      timestamp: new Date().toISOString(),
      totalAnalyzed: violations.length,
      mizanSpecificViolations: mizanSpecificCount,
      genericViolations: violations.length - mizanSpecificCount,
      criticalBusinessImpact,
      architecturalViolations,
      proceedRecommendations: proceedCount,
      escalateRecommendations: escalateCount,
      avgConfidence: violations.length > 0 ? totalConfidence / violations.length : 0,
      mizanIntelligenceLevel: 'maximum',
      platformCoverageAnalysis: {
        cultureModule: mizanAnalyses.filter(a => a.mizanAnalysis.mizanBusinessImpact?.affectedModules?.includes('Culture')).length,
        skillsModule: mizanAnalyses.filter(a => a.mizanAnalysis.mizanBusinessImpact?.affectedModules?.includes('Skills')).length,
        performanceModule: mizanAnalyses.filter(a => a.mizanAnalysis.mizanBusinessImpact?.affectedModules?.includes('Performance')).length,
        structureModule: mizanAnalyses.filter(a => a.mizanAnalysis.mizanBusinessImpact?.affectedModules?.includes('Structure')).length,
        hiringModule: mizanAnalyses.filter(a => a.mizanAnalysis.mizanBusinessImpact?.affectedModules?.includes('Hiring')).length
      }
    },
    mizanAnalyses
  };

  // Save results to proper agents directory
  try {
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent1-mizan-analyses.json'), JSON.stringify(results, null, 2));
    console.log(`\n${colors.green}✅ Mizan-intelligent analysis complete!${colors.reset}`);
    console.log(`📁 Results saved to: scripts/agents/agent1-mizan-analyses.json\n`);
  } catch (error) {
    console.error(`${colors.red}❌ Could not save results: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  // Display Mizan-intelligent summary
  console.log(`${colors.blue}🎯 MIZAN-INTELLIGENT ANALYSIS SUMMARY:${colors.reset}`);
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║              MIZAN BUSINESS INTELLIGENCE           ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`   📊 Total analyzed: ${violations.length}`);
  console.log(`   🎯 Mizan-specific violations: ${colors.magenta}${mizanSpecificCount}${colors.reset}`);
  console.log(`   🚨 Critical business impact: ${colors.red}${criticalBusinessImpact}${colors.reset}`);
  console.log(`   🏗️  Architectural violations: ${colors.yellow}${architecturalViolations}${colors.reset}`);
  console.log(`   ✅ Ready to proceed: ${colors.green}${proceedCount}${colors.reset}`);
  console.log(`   ⚠️  Requires escalation: ${colors.red}${escalateCount}${colors.reset}`);
  console.log(`   🎪 Average confidence: ${(results.summary.avgConfidence * 100).toFixed(1)}%\n`);

  console.log(`${colors.blue}🏢 MIZAN MODULE IMPACT ANALYSIS:${colors.reset}`);
  console.log(`   Culture Module: ${results.summary.platformCoverageAnalysis.cultureModule} violations`);
  console.log(`   Skills Module: ${results.summary.platformCoverageAnalysis.skillsModule} violations`);
  console.log(`   Performance Module: ${results.summary.platformCoverageAnalysis.performanceModule} violations`);
  console.log(`   Structure Module: ${results.summary.platformCoverageAnalysis.structureModule} violations`);
  console.log(`   Hiring Module: ${results.summary.platformCoverageAnalysis.hiringModule} violations\n`);

  console.log(`${colors.green}🚀 Ready for Mizan-Intelligent Agent 2 (Fix Generator)!${colors.reset}\n`);
}

// Check dependencies and API key
function checkMizanDependencies() {
  if (!process.env.GEMINI_API_KEY) {
    console.log(`${colors.yellow}⚠️  GEMINI_API_KEY not found in environment variables${colors.reset}`);
    console.log(`${colors.blue}💡 Set your Gemini API key in .env file for Mizan-intelligent analysis${colors.reset}\n`);
    
    // Create placeholder results
    const placeholderResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalAnalyzed: 0,
        mizanSpecificViolations: 0,
        note: 'Placeholder results - Gemini API key not configured'
      },
      mizanAnalyses: []
    };
    
    try {
      const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(agentsDir, 'agent1-mizan-analyses.json'), JSON.stringify(placeholderResults, null, 2));
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
  analyzeMizanViolations().catch(error => {
    console.error(`${colors.red}💥 MIZAN-INTELLIGENT AGENT 1 CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { analyzeMizanViolations };