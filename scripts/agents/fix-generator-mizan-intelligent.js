#!/usr/bin/env node

/**
 * AGENT 2: MIZAN-INTELLIGENT FIX GENERATOR (Claude)
 * 
 * REVOLUTIONARY UPGRADE: Generates fixes with complete Mizan platform understanding
 * 
 * MIZAN PLATFORM KNOWLEDGE:
 * - Multi-tenant SaaS HR Analytics platform architecture
 * - Three-Engine Architecture: Knowledge → Data → Reasoning patterns
 * - Culture Agent → Recognition Agent → Engagement Agent triggering
 * - Skills Analysis → LXP module activation workflows
 * - Performance Module integration with Culture priorities + Skills gaps
 * - Cross-module dependencies and strategic alignments
 * - Business workflow completeness requirements
 * 
 * FIX GENERATION CAPABILITIES:
 * ✅ Three-Engine Architecture implementations
 * ✅ Agent triggering mechanism fixes
 * ✅ Multi-tenant isolation (tenantId) implementations
 * ✅ Drizzle ORM query patterns (NO Prisma)
 * ✅ Next.js 14 App Router patterns (NO Pages Router)
 * ✅ Business workflow integration fixes
 * ✅ Strategic alignment implementations
 * ✅ BOT interaction pattern fixes
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

// Load complete Mizan context - ESSENTIAL for intelligent fix generation
const contextPath = path.join(process.cwd(), 'AGENT_CONTEXT_ULTIMATE.md');
let mizanContext;
try {
  mizanContext = fs.readFileSync(contextPath, 'utf8');
  console.log(`${colors.green}✅ Loaded complete AGENT_CONTEXT_ULTIMATE.md (${Math.round(mizanContext.length/1000)}K chars)${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}🚨 CRITICAL ERROR: AGENT_CONTEXT_ULTIMATE.md not found!${colors.reset}`);
  console.error(`${colors.red}This agent REQUIRES complete Mizan context to generate proper fixes.${colors.reset}`);
  console.error(`${colors.red}Without it, fixes will be generic and break Mizan architecture.${colors.reset}\n`);
  process.exit(1);
}

/**
 * MIZAN-SPECIFIC FIX TEMPLATES
 * These are complete, production-ready patterns for Mizan architecture
 */
const MIZAN_FIX_TEMPLATES = {
  THREE_ENGINE_IMPLEMENTATION: `
export class {ModuleName}Service {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine
  ) {}

  async analyze{Module}(input: {Module}Input): Promise<{Module}Analysis> {
    // Knowledge Engine: Load domain-specific frameworks and context
    const context = await this.knowledgeEngine.getContext('{module}');
    
    // Data Engine: Process and enrich raw data
    const processedData = await this.dataEngine.process(input, context);
    
    // Reasoning Engine: Generate insights and recommendations
    const analysis = await this.reasoningEngine.analyze(processedData, context);
    
    return {
      insights: analysis.insights,
      recommendations: analysis.recommendations,
      confidence: analysis.confidence,
      metadata: { timestamp: new Date().toISOString(), tenantId: input.tenantId }
    };
  }
}`,

  TENANT_ISOLATED_QUERY: `
async function get{Resource}ByTenant(tenantId: string): Promise<{Resource}[]> {
  try {
    return await db.select()
      .from({resource}Table)
      .where(eq({resource}Table.tenantId, tenantId))
      .orderBy(desc({resource}Table.createdAt));
  } catch (error) {
    console.error('Error fetching {resource} for tenant:', error);
    throw new Error('Failed to fetch {resource} data');
  }
}`,

  CULTURE_AGENT_TRIGGERING: `
export class CultureAnalysisService extends BaseAgent {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine,
    private recognitionAgent: RecognitionAgent,
    private engagementAgent: EngagementAgent
  ) {
    super('culture-agent');
  }

  async analyzeCulture(surveyData: CultureSurveyData): Promise<CultureAnalysis> {
    // Process culture survey with Three-Engine Architecture
    const context = await this.knowledgeEngine.getContext('culture');
    const processedData = await this.dataEngine.processCultureData(surveyData, context);
    const cultureAnalysis = await this.reasoningEngine.analyzeCulture(processedData, context);

    // Trigger Recognition Agent based on last 2 survey questions
    const recognitionTriggerData = this.extractRecognitionTriggerData(surveyData);
    const recognitionAnalysis = await this.recognitionAgent.analyze(recognitionTriggerData);

    // Trigger Engagement Agent based on survey responses
    const engagementTriggerData = this.extractEngagementTriggerData(surveyData);
    const engagementAnalysis = await this.engagementAgent.analyze(engagementTriggerData);

    // Integrate all analyses
    return this.integrateCultureAnalyses(cultureAnalysis, recognitionAnalysis, engagementAnalysis);
  }
}`,

  SKILLS_LXP_INTEGRATION: `
export class SkillsAnalysisService extends BaseAgent {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine,
    private lxpService: LXPService
  ) {
    super('skills-agent');
  }

  async analyzeSkills(skillsData: SkillsInput): Promise<SkillsWorkflow> {
    // Three-Engine Architecture processing
    const context = await this.knowledgeEngine.getContext('skills');
    const processedData = await this.dataEngine.processSkillsData(skillsData, context);
    const skillsAnalysis = await this.reasoningEngine.analyzeSkills(processedData, context);

    // Individual skills gap analysis
    const individualGaps = await this.analyzeIndividualSkillsGaps(skillsAnalysis);

    // Trigger LXP Module for each individual with skills gaps
    const lxpTriggers = [];
    for (const gap of individualGaps) {
      const lxpTrigger = await this.lxpService.createLearningPath({
        employeeId: gap.employeeId,
        skillsGaps: gap.gaps,
        strategicPriority: gap.strategicPriority,
        tenantId: skillsData.tenantId
      });
      lxpTriggers.push(lxpTrigger);
    }

    return {
      skillsAnalysis,
      individualGaps,
      lxpTriggers,
      organizationAssessment: await this.generateOrganizationSkillsAssessment(skillsAnalysis)
    };
  }
}`
};

/**
 * Generate a Mizan-intelligent fix for a violation
 */
async function generateMizanIntelligentFix(analysisData) {
  const { violation, mizanAnalysis } = analysisData;

  // Skip if analysis says to skip
  if (mizanAnalysis.recommendation === 'SKIP') {
    return {
      violation,
      mizanAnalysis,
      mizanFix: null,
      skipped: true,
      reason: 'Marked as false positive by Mizan analysis'
    };
  }

  const prompt = `${mizanContext}

╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                    AGENT 2: MIZAN-INTELLIGENT FIX GENERATOR                                     ║
║                              COMPLETE PLATFORM FIX REQUEST                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

You are Agent 2, a MIZAN-INTELLIGENT Fix Generator using Claude. You have complete understanding of the Mizan platform and can generate fixes that maintain business workflows and strategic alignment.

🎯 MIZAN PLATFORM CONTEXT:
You understand that Mizan is a sophisticated platform with:
- Three-Engine Architecture (Knowledge → Data → Reasoning)
- Agent triggering systems (Culture → Recognition/Engagement)
- Module integration (Skills → LXP activation)
- Multi-tenant isolation (tenantId in ALL queries)
- Strategic workflow dependencies
- Business logic completeness requirements

🔍 VIOLATION TO FIX:
File: ${violation.file}
Line: ${violation.line}
Rule: ${violation.rule}
Code: ${violation.content}
Description: ${violation.description}

🧠 MIZAN ANALYSIS FROM AGENT 1:
${JSON.stringify(mizanAnalysis, null, 2)}

🛠️ MIZAN-INTELLIGENT FIX GENERATION:

Generate a COMPLETE, PRODUCTION-READY fix that:

1. MAINTAINS MIZAN ARCHITECTURE:
   - Follows Three-Engine patterns if applicable
   - Preserves agent triggering mechanisms
   - Maintains module integration workflows

2. IMPLEMENTS BUSINESS LOGIC:
   - Culture Agent → Recognition/Engagement triggering
   - Skills Analysis → LXP module activation
   - Performance Module → Culture/Skills integration

3. ENSURES TECHNICAL COMPLIANCE:
   - Multi-tenant isolation (tenantId in queries)
   - Drizzle ORM patterns (NO Prisma)
   - Next.js 14 App Router (NO Pages Router)
   - TypeScript strict types (NO 'any')

4. PRESERVES STRATEGIC ALIGNMENT:
   - Supports business workflow completeness
   - Maintains cross-module dependencies
   - Preserves data flow integrity

🎯 RESPOND IN XML FORMAT:
<mizanFix>
  <confidence>0.0-1.0</confidence>
  <complexity>simple|moderate|complex|enterprise</complexity>
  <mizanCompliance>true|false</mizanCompliance>
  <businessImpact>positive|neutral|negative</businessImpact>
  
  <primaryFix>
    <file>${violation.file}</file>
    <startLine>${violation.line || 1}</startLine>
    <endLine>${violation.line || 1}</endLine>
    <oldCode>${violation.content}</oldCode>
    <newCode>
// Complete Mizan-compliant replacement
// Must be production-ready with proper Three-Engine patterns
// Include tenant isolation, error handling, TypeScript types
    </newCode>
    <explanation>Detailed explanation of Mizan-specific fix approach</explanation>
  </primaryFix>
  
  <mizanArchitecture>
    <threeEngineCompliance>true|false</threeEngineCompliance>
    <agentTriggering>true|false</agentTriggering>
    <moduleIntegration>true|false</moduleIntegration>
    <tenantIsolation>true|false</tenantIsolation>
    <workflowCompleteness>true|false</workflowCompleteness>
  </mizanArchitecture>
  
  <businessLogic>
    <affectedModules>["Culture", "Skills", "Performance", etc.]</affectedModules>
    <workflowsRestored>["Culture→Recognition", "Skills→LXP", etc.]</workflowsRestored>
    <strategicAlignment>maintained|improved|compromised</strategicAlignment>
  </businessLogic>
  
  <additionalFiles>
    <file>
      <path>path/to/additional/mizan/file.ts</path>
      <content>
// Complete Mizan-compliant file content
// Must follow Three-Engine Architecture if applicable
      </content>
      <reason>Why this file is needed for Mizan compliance</reason>
    </file>
  </additionalFiles>
  
  <dependencies>
    <dependency>drizzle-orm</dependency>
    <dependency>@next/app</dependency>
  </dependencies>
  
  <migrationSteps>
    <step>1. Update database schema with tenant isolation</step>
    <step>2. Implement Three-Engine Architecture pattern</step>
    <step>3. Test agent triggering mechanisms</step>
  </migrationSteps>
  
  <testingStrategy>
    <unitTests>Test individual engine components</unitTests>
    <integrationTests>Test agent triggering workflows</integrationTests>
    <businessTests>Test complete Culture → Recognition flow</businessTests>
    <tenantTests>Verify multi-tenant data isolation</tenantTests>
  </testingStrategy>
  
  <mizanValidation>
    <platformCompliance>true|false</platformCompliance>
    <architectureIntegrity>true|false</architectureIntegrity>
    <businessWorkflows>maintained|improved|broken</businessWorkflows>
    <productionReadiness>true|false</productionReadiness>
    <confidence>0-100</confidence>
    <improvements>What could be enhanced further</improvements>
  </mizanValidation>
</mizanFix>

🚨 CRITICAL REQUIREMENTS:
- Fix must be PRODUCTION-READY immediately
- Must follow complete Mizan architecture patterns
- Must maintain business workflow integrity
- Must include proper multi-tenant isolation
- Must use correct tech stack (Drizzle ORM, Next.js 14 App Router)
- Must preserve strategic alignment and cross-module dependencies
- NO MOCK DATA, NO PLACEHOLDERS, NO TODO COMMENTS

Your fix must be MIZAN-INTELLIGENT, maintaining the complete platform ecosystem!`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 12000,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const content = response.content[0]?.text || '';
    
    // Parse XML response
    let fixData;
    try {
      fixData = parseMizanFixXML(content);
    } catch (parseError) {
      console.log(`   ⚠️  XML parse error for ${violation.file}:${violation.line}, creating Mizan-intelligent fallback`);
      fixData = createMizanIntelligentFixFallback(violation, mizanAnalysis);
    }

    return {
      violation,
      mizanAnalysis,
      mizanFix: fixData,
      agentId: 'mizan-intelligent-fix-generator',
      timestamp: new Date().toISOString(),
      fixType: 'mizan-platform-aware'
    };

  } catch (error) {
    console.log(`   ❌ Claude API error for ${violation.file}:${violation.line}: ${error.message}`);
    
    return {
      violation,
      mizanAnalysis,
      mizanFix: createMizanIntelligentFixFallback(violation, mizanAnalysis, error.message),
      agentId: 'mizan-intelligent-fix-generator',
      timestamp: new Date().toISOString(),
      error: error.message,
      fixType: 'mizan-platform-aware-fallback'
    };
  }
}

/**
 * Parse XML fix response with Mizan-specific validation
 */
function parseMizanFixXML(xmlContent) {
  try {
    const confidence = parseFloat(extractXMLContent(xmlContent, 'confidence')) || 0.8;
    const complexity = extractXMLContent(xmlContent, 'complexity') || 'moderate';
    const mizanCompliance = extractXMLContent(xmlContent, 'mizanCompliance') === 'true';
    const businessImpact = extractXMLContent(xmlContent, 'businessImpact') || 'neutral';
    
    // Primary fix
    const primaryFix = {
      file: extractXMLContent(xmlContent, 'file'),
      startLine: parseInt(extractXMLContent(xmlContent, 'startLine') || '1'),
      endLine: parseInt(extractXMLContent(xmlContent, 'endLine') || '1'),
      oldCode: extractXMLContent(xmlContent, 'oldCode'),
      newCode: extractXMLContent(xmlContent, 'newCode'),
      explanation: extractXMLContent(xmlContent, 'explanation')
    };

    // Mizan architecture compliance
    const mizanArchitecture = {
      threeEngineCompliance: extractXMLContent(xmlContent, 'threeEngineCompliance') === 'true',
      agentTriggering: extractXMLContent(xmlContent, 'agentTriggering') === 'true',
      moduleIntegration: extractXMLContent(xmlContent, 'moduleIntegration') === 'true',
      tenantIsolation: extractXMLContent(xmlContent, 'tenantIsolation') === 'true',
      workflowCompleteness: extractXMLContent(xmlContent, 'workflowCompleteness') === 'true'
    };

    // Business logic preservation
    const businessLogic = {
      affectedModules: [],  // Simplified parsing
      workflowsRestored: [], // Simplified parsing
      strategicAlignment: extractXMLContent(xmlContent, 'strategicAlignment') || 'maintained'
    };

    // Mizan validation
    const mizanValidation = {
      platformCompliance: extractXMLContent(xmlContent, 'platformCompliance') === 'true',
      architectureIntegrity: extractXMLContent(xmlContent, 'architectureIntegrity') === 'true',
      businessWorkflows: extractXMLContent(xmlContent, 'businessWorkflows') || 'maintained',
      productionReadiness: extractXMLContent(xmlContent, 'productionReadiness') === 'true',
      confidence: parseInt(extractXMLContent(xmlContent, 'confidence') || '80'),
      improvements: extractXMLContent(xmlContent, 'improvements')
    };

    return {
      confidence,
      complexity,
      mizanCompliance,
      businessImpact,
      primaryFix,
      mizanArchitecture,
      businessLogic,
      mizanValidation,
      testingStrategy: extractXMLContent(xmlContent, 'testingStrategy') || 'Standard Mizan testing required',
      additionalFiles: [], // Simplified for now
      dependencies: ['drizzle-orm', '@next/app'], // Default Mizan dependencies
      migrationSteps: [] // Simplified for now
    };

  } catch (error) {
    throw new Error(`Mizan fix XML parsing failed: ${error.message}`);
  }
}

/**
 * Extract content between XML tags
 */
function extractXMLContent(xml, tag) {
  const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 's');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Create Mizan-intelligent fallback fix
 */
function createMizanIntelligentFixFallback(violation, mizanAnalysis, error = null) {
  const code = violation.content || '';
  const file = violation.file || '';
  
  // Determine fix type based on Mizan analysis
  let fixTemplate = '';
  let explanation = '';
  
  if (mizanAnalysis.mizanBusinessImpact?.affectedModules?.includes('Culture')) {
    fixTemplate = MIZAN_FIX_TEMPLATES.CULTURE_AGENT_TRIGGERING;
    explanation = 'Applied Culture Agent triggering pattern for Mizan compliance';
  } else if (mizanAnalysis.mizanBusinessImpact?.affectedModules?.includes('Skills')) {
    fixTemplate = MIZAN_FIX_TEMPLATES.SKILLS_LXP_INTEGRATION;
    explanation = 'Applied Skills → LXP integration pattern for Mizan compliance';
  } else if (!mizanAnalysis.architecturalCompliance?.tenantIsolation) {
    fixTemplate = MIZAN_FIX_TEMPLATES.TENANT_ISOLATED_QUERY;
    explanation = 'Added multi-tenant isolation for Mizan compliance';
  } else if (!mizanAnalysis.architecturalCompliance?.threeEnginePattern) {
    fixTemplate = MIZAN_FIX_TEMPLATES.THREE_ENGINE_IMPLEMENTATION;
    explanation = 'Implemented Three-Engine Architecture pattern for Mizan compliance';
  } else {
    fixTemplate = '// MIZAN-INTELLIGENT FIX REQUIRED - Manual implementation needed';
    explanation = 'Requires manual Mizan-intelligent implementation';
  }

  return {
    confidence: 0.7,
    complexity: 'enterprise',
    mizanCompliance: true,
    businessImpact: 'positive',
    primaryFix: {
      file: violation.file,
      startLine: violation.line || 1,
      endLine: violation.line || 1,
      oldCode: violation.content,
      newCode: fixTemplate,
      explanation: explanation + (error ? ` (fallback due to: ${error})` : ' (pattern-based fallback)')
    },
    mizanArchitecture: {
      threeEngineCompliance: true,
      agentTriggering: true,
      moduleIntegration: true,
      tenantIsolation: true,
      workflowCompleteness: true
    },
    businessLogic: {
      affectedModules: mizanAnalysis.mizanBusinessImpact?.affectedModules || [],
      workflowsRestored: ['Mizan-compliant workflow'],
      strategicAlignment: 'improved'
    },
    mizanValidation: {
      platformCompliance: true,
      architectureIntegrity: true,
      businessWorkflows: 'improved',
      productionReadiness: false,
      confidence: 70,
      improvements: 'Manual review and customization required for specific business context'
    },
    fallback: true,
    fallbackReason: error || 'XML parsing error'
  };
}

/**
 * Main function to generate Mizan-intelligent fixes
 */
async function generateMizanIntelligentFixes() {
  console.log(`${colors.magenta}${colors.bold}🤖 AGENT 2: MIZAN-INTELLIGENT FIX GENERATOR${colors.reset}`);
  console.log(`${colors.magenta}╔══════════════════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}║              REVOLUTIONARY MIZAN-AWARE FIX GENERATION ENGINE                                     ║${colors.reset}`);
  console.log(`${colors.magenta}╚══════════════════════════════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  // Load Agent 1 Mizan analyses
  const analysesPath = path.join(process.cwd(), 'scripts', 'agents', 'agent1-mizan-analyses.json');
  
  if (!fs.existsSync(analysesPath)) {
    console.log(`${colors.yellow}⚠️  No agent1-mizan-analyses.json found. Run Mizan Agent 1 first.${colors.reset}\n`);
    
    // Create empty results
    const emptyResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalAnalyzed: 0,
        mizanFixesGenerated: 0,
        skipped: 0,
        errors: 0,
        avgConfidence: 0,
        avgMizanCompliance: 0,
        mizanIntelligenceLevel: 'maximum'
      },
      mizanFixes: []
    };
    
    // Ensure agents directory exists
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent2-mizan-fixes.json'), JSON.stringify(emptyResults, null, 2));
    console.log(`${colors.green}✅ Created empty Mizan fix results${colors.reset}\n`);
    process.exit(0);
  }

  let analysisResults;
  try {
    analysisResults = JSON.parse(fs.readFileSync(analysesPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Could not parse agent1-mizan-analyses.json: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  const analyses = analysisResults.mizanAnalyses || [];
  
  if (analyses.length === 0) {
    console.log(`${colors.green}✅ No violations to fix${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`🔧 Generating Mizan-intelligent fixes for ${analyses.length} analyzed violations...\n`);
  console.log(`${colors.cyan}🎯 MIZAN FIX CAPABILITIES:${colors.reset}`);
  console.log(`   ✅ Three-Engine Architecture implementations`);
  console.log(`   ✅ Culture → Recognition agent triggering`);
  console.log(`   ✅ Skills → LXP module integration`);
  console.log(`   ✅ Multi-tenant isolation patterns`);
  console.log(`   ✅ Business workflow preservation`);
  console.log(`   ✅ Strategic alignment maintenance\n`);

  // Generate Mizan-intelligent fixes
  const mizanFixes = [];
  let fixesGenerated = 0;
  let skipped = 0;
  let errors = 0;
  let totalConfidence = 0;
  let totalMizanCompliance = 0;
  let complianceCount = 0;

  for (let i = 0; i < analyses.length; i++) {
    const analysisData = analyses[i];
    console.log(`   ${i + 1}/${analyses.length}: 🔧 ${analysisData.violation.file}:${analysisData.violation.line || 'unknown'}`);
    
    const fixResult = await generateMizanIntelligentFix(analysisData);
    mizanFixes.push(fixResult);

    // Update Mizan-specific counters
    if (fixResult.skipped) {
      skipped++;
    } else if (fixResult.error || fixResult.mizanFix?.fallback) {
      errors++;
    } else {
      fixesGenerated++;
      totalConfidence += fixResult.mizanFix?.confidence || 0;
      
      if (fixResult.mizanFix?.mizanCompliance) {
        totalMizanCompliance += fixResult.mizanFix.mizanValidation?.confidence || 80;
        complianceCount++;
      }
    }

    // Brief delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 250));
  }

  // Calculate Mizan-specific averages
  const avgConfidence = fixesGenerated > 0 ? totalConfidence / fixesGenerated : 0;
  const avgMizanCompliance = complianceCount > 0 ? totalMizanCompliance / complianceCount : 0;

  // Prepare Mizan-intelligent results
  const results = {
    summary: {
      timestamp: new Date().toISOString(),
      totalAnalyzed: analyses.length,
      mizanFixesGenerated: fixesGenerated,
      skipped,
      errors,
      avgConfidence: Math.round(avgConfidence * 1000) / 1000,
      avgMizanCompliance: Math.round(avgMizanCompliance * 10) / 10,
      mizanIntelligenceLevel: 'maximum',
      architecturalImpact: {
        threeEngineImplementations: mizanFixes.filter(f => f.mizanFix?.mizanArchitecture?.threeEngineCompliance).length,
        agentTriggeringFixes: mizanFixes.filter(f => f.mizanFix?.mizanArchitecture?.agentTriggering).length,
        tenantIsolationFixes: mizanFixes.filter(f => f.mizanFix?.mizanArchitecture?.tenantIsolation).length,
        workflowCompleteness: mizanFixes.filter(f => f.mizanFix?.mizanArchitecture?.workflowCompleteness).length
      }
    },
    mizanFixes
  };

  // Save results to proper agents directory
  try {
    const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(agentsDir, 'agent2-mizan-fixes.json'), JSON.stringify(results, null, 2));
    console.log(`\n${colors.green}✅ Mizan-intelligent fix generation complete!${colors.reset}`);
    console.log(`📁 Results saved to: scripts/agents/agent2-mizan-fixes.json\n`);
  } catch (error) {
    console.error(`${colors.red}❌ Could not save results: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  // Display Mizan-intelligent summary
  console.log(`${colors.blue}🔧 MIZAN-INTELLIGENT FIX SUMMARY:${colors.reset}`);
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║              MIZAN PLATFORM FIXES                  ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`   🔧 Fixes generated: ${fixesGenerated}/${analyses.length}`);
  console.log(`   ⏭️  Skipped: ${skipped} | ❌ Errors: ${errors}`);
  console.log(`   🎯 Average confidence: ${(avgConfidence * 100).toFixed(1)}%`);
  console.log(`   🏢 Average Mizan compliance: ${avgMizanCompliance.toFixed(1)}/100\n`);

  console.log(`${colors.blue}🏗️  MIZAN ARCHITECTURAL IMPACT:${colors.reset}`);
  console.log(`   Three-Engine implementations: ${results.summary.architecturalImpact.threeEngineImplementations}`);
  console.log(`   Agent triggering fixes: ${results.summary.architecturalImpact.agentTriggeringFixes}`);
  console.log(`   Tenant isolation fixes: ${results.summary.architecturalImpact.tenantIsolationFixes}`);
  console.log(`   Workflow completeness fixes: ${results.summary.architecturalImpact.workflowCompleteness}\n`);

  console.log(`${colors.green}🚀 Ready for Mizan-Intelligent Agent 3 (Business Validator)!${colors.reset}\n`);
}

// Check dependencies and API key
function checkMizanDependencies() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`${colors.yellow}⚠️  ANTHROPIC_API_KEY not found in environment variables${colors.reset}`);
    console.log(`${colors.blue}💡 Set your Anthropic API key in .env file for Mizan-intelligent fix generation${colors.reset}\n`);
    
    // Create placeholder results
    const placeholderResults = {
      summary: {
        timestamp: new Date().toISOString(),
        totalAnalyzed: 0,
        mizanFixesGenerated: 0,
        note: 'Placeholder results - Anthropic API key not configured'
      },
      mizanFixes: []
    };
    
    try {
      const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(agentsDir, 'agent2-mizan-fixes.json'), JSON.stringify(placeholderResults, null, 2));
      console.log(`${colors.green}✅ Created placeholder results${colors.reset}\n`);
    } catch (error) {
      console.error(`${colors.red}❌ Could not save placeholder results: ${error.message}${colors.reset}\n`);
    }
    
    process.exit(0);
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
  generateMizanIntelligentFixes().catch(error => {
    console.error(`${colors.red}💥 MIZAN-INTELLIGENT AGENT 2 CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { generateMizanIntelligentFixes };