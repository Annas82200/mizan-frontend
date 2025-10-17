#!/usr/bin/env node

/**
 * MIZAN-INTELLIGENT 5-AGENT ORCHESTRATOR
 * 
 * REVOLUTIONARY UPGRADE: Complete Mizan platform intelligence orchestration
 * 
 * ORCHESTRATES 5 MIZAN-INTELLIGENT AGENTS:
 * Agent 0: [ISOLATED] Mizan Developer Agent (Claude Sonnet 4) - Temporarily disabled
 * Agent 1: Mizan Code Analyzer (Gemini) - Platform-aware violation analysis
 * Agent 2: Mizan Fix Generator (Claude) - Business-intelligent fix generation  
 * Agent 3: Mizan Business Validator (Gemini) - Workflow preservation validation
 * Agent 4: Mizan Security Checker (GPT-4) - Enterprise security validation
 * Agent 5: Mizan Strategic Integrator (Claude) - Strategic business integration
 * 
 * AGENT 0 ISOLATION:
 * ⚠️ Developer Agent has been isolated from the automated flow
 * ⚠️ This allows manual control over code generation and fixes
 * ⚠️ Can be re-enabled by uncommenting the agent configuration
 * 
 * MIZAN PLATFORM ORCHESTRATION:
 * ✅ Complete platform context loading and validation
 * ✅ Sequential agent execution with dependency management
 * ✅ Business workflow integrity monitoring
 * ✅ Strategic impact assessment throughout pipeline
 * ✅ Enterprise readiness validation
 * ✅ Competitive advantage preservation monitoring
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

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

// Mizan-intelligent agent configuration
const MIZAN_AGENTS = [
  // AGENT 0 ISOLATED: Developer Agent (Enhanced) - Temporarily disabled
  // {
  //   id: 0,
  //   name: 'Mizan Developer Agent (Enhanced)',
  //   description: 'Fix existing issues + Generate missing modules (LXP, Talent, Bonus) with 100% validation',
  //   file: 'scripts/agents/developer-agent-mizan-enhanced.js',
  //   output: 'scripts/agents/developer-report.json',
  //   apiKey: 'ANTHROPIC_API_KEY',
  //   engine: 'Claude Sonnet 4',
  //   focus: 'Type Safety, Security, Triggering Logic, Module Generation, 100% AGENT_CONTEXT_ULTIMATE.md Compliance + Validation Layer + Refinement Loop'
  // },
  {
    id: 1,
    name: 'Mizan Code Analyzer',
    description: 'Platform-aware violation analysis with complete business context',
    file: 'scripts/agents/code-analyzer-mizan-intelligent.js',
    output: 'scripts/agents/agent1-mizan-analyses.json',
    apiKey: 'GEMINI_API_KEY',
    engine: 'Gemini 2.5 Flash',
    focus: 'Three-Engine Architecture, Agent Triggering, Multi-tenant Isolation'
  },
  {
    id: 2,
    name: 'Mizan Fix Generator',
    description: 'Business-intelligent fix generation with workflow preservation',
    file: 'scripts/agents/fix-generator-mizan-intelligent.js',
    output: 'scripts/agents/agent2-mizan-fixes.json',
    apiKey: 'ANTHROPIC_API_KEY',
    engine: 'Claude Sonnet 4',
    focus: 'Business Logic Implementation, Agent Integration, Production Readiness'
  },
  {
    id: 3,
    name: 'Mizan Business Validator',
    description: 'Workflow preservation and strategic alignment validation',
    file: 'scripts/agents/business-validator-mizan-intelligent.js',
    output: 'scripts/agents/agent3-business-validations.json',
    apiKey: 'GEMINI_API_KEY',
    engine: 'Gemini 2.5 Flash',
    focus: 'Culture→Recognition, Skills→LXP, Performance Integration Workflows'
  },
  {
    id: 4,
    name: 'Mizan Security Checker',
    description: 'Enterprise security and compliance validation',
    file: 'scripts/agents/security-checker-mizan-intelligent.js',
    output: 'scripts/agents/agent4-security-validations.json',
    apiKey: 'OPENAI_API_KEY',
    engine: 'GPT-4 Turbo',
    focus: 'Multi-tenant Security, HR Data Protection, Enterprise Compliance'
  },
  {
    id: 5,
    name: 'Mizan Strategic Integrator',
    description: 'Strategic business integration and competitive advantage assessment',
    file: 'scripts/agents/strategic-integrator-mizan-intelligent.js',
    output: 'scripts/agents/MIZAN_STRATEGIC_REPORT.md',
    apiKey: 'ANTHROPIC_API_KEY',
    engine: 'Claude Sonnet 4',
    focus: 'Business Impact, Competitive Advantage, Enterprise Client Success'
  }
];

/**
 * Validate Mizan platform context and requirements
 * ENHANCED: Now validates actual content sections for completeness
 */
function validateMizanContext() {
  console.log(`${colors.cyan}🔍 Validating Mizan platform context...${colors.reset}`);
  
  // Check for AGENT_CONTEXT_ULTIMATE.md
  const contextPath = path.join(process.cwd(), 'AGENT_CONTEXT_ULTIMATE.md');
  if (!fs.existsSync(contextPath)) {
    console.error(`${colors.red}🚨 CRITICAL ERROR: AGENT_CONTEXT_ULTIMATE.md not found!${colors.reset}`);
    console.error(`${colors.red}   This file is REQUIRED for Mizan-intelligent agent operation.${colors.reset}`);
    console.error(`${colors.red}   Without it, agents will not understand the platform architecture.${colors.reset}\n`);
    process.exit(1);
  }
  
  // Validate context file size (should be comprehensive)
  const contextStats = fs.statSync(contextPath);
  const contextSizeKB = Math.round(contextStats.size / 1024);
  console.log(`   ✅ AGENT_CONTEXT_ULTIMATE.md found (${contextSizeKB}KB)`);
  
  if (contextSizeKB < 50) {
    console.warn(`${colors.yellow}   ⚠️  Context file seems small - may be incomplete${colors.reset}`);
  }
  
  // ENHANCED: Validate required sections exist
  const contextContent = fs.readFileSync(contextPath, 'utf8');
  const requiredSections = [
    'PROJECT OVERVIEW',
    'FILE ARCHITECTURE',
    'PLATFORM FEATURE FLOW',
    'FEATURE INTEGRATION RULES',
    'Three-Engine Architecture',  // Actual section name in the file
    'Multi-tenant Isolation',     // Actual section name in the file
    'SKILLS ANALYSIS',
    'BUSINESS MODULES',           // Contains Performance and Hiring modules
    'DESIGN GUIDELINES',
    'TECHNICAL STACK REQUIREMENTS',
    'IMPLEMENTATION PATTERNS',
    'QUALITY CONTROL RULES'
  ];
  
  const missingSections = [];
  const foundSections = [];
  
  requiredSections.forEach(section => {
    if (contextContent.includes(section)) {
      foundSections.push(section);
    } else {
      missingSections.push(section);
    }
  });
  
  console.log(`   📊 Context sections: ${foundSections.length}/${requiredSections.length} found`);
  
  if (missingSections.length > 0) {
    console.error(`${colors.red}   ❌ Missing required sections:${colors.reset}`);
    missingSections.forEach(section => {
      console.error(`${colors.red}      • ${section}${colors.reset}`);
    });
    console.error(`${colors.red}\n   AGENT_CONTEXT_ULTIMATE.md is incomplete!${colors.reset}`);
    console.error(`${colors.red}   Agents need complete context for accurate analysis.${colors.reset}\n`);
    process.exit(1);
  }
  
  console.log(`   ✅ All required sections present`);
  
  // Validate critical keywords exist
  const criticalKeywords = [
    'Culture → Recognition',
    'Skills → LXP',
    'Performance → Culture/Skills',
    'Three-Engine',
    'tenantId',
    'Drizzle ORM',
    'Next.js 14 App Router'
  ];
  
  const missingKeywords = criticalKeywords.filter(keyword => !contextContent.includes(keyword));
  
  if (missingKeywords.length > 0) {
    console.warn(`${colors.yellow}   ⚠️  Missing some critical keywords:${colors.reset}`);
    missingKeywords.forEach(keyword => {
      console.warn(`${colors.yellow}      • ${keyword}${colors.reset}`);
    });
  } else {
    console.log(`   ✅ All critical keywords present`);
  }
  
  // Check for violations.json (prerequisite)
  const violationsPath = path.join(process.cwd(), 'scripts', 'violations.json');
  if (!fs.existsSync(violationsPath)) {
    console.error(`${colors.red}🚨 ERROR: No violations.json found!${colors.reset}`);
    console.error(`${colors.red}   Run the audit script first: node scripts/audit-violations.js${colors.reset}\n`);
    process.exit(1);
  }
  
  console.log(`   ✅ violations.json found`);
  
  // Ensure agents directory exists
  const agentsDir = path.join(process.cwd(), 'scripts', 'agents');
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir, { recursive: true });
    console.log(`   ✅ Created agents directory: ${agentsDir}`);
  } else {
    console.log(`   ✅ Agents directory exists: ${agentsDir}`);
  }
  
  console.log();
}

/**
 * Check API key availability and agent readiness
 */
function checkMizanAgentReadiness() {
  console.log(`${colors.cyan}🔑 Checking Mizan agent readiness...${colors.reset}`);
  
  const availableAgents = [];
  const missingApiKeys = [];
  const missingFiles = [];
  
  MIZAN_AGENTS.forEach(agent => {
    // Check if agent file exists
    if (!fs.existsSync(agent.file)) {
      missingFiles.push(agent);
      return;
    }
    
    // Check if API key is available
    if (process.env[agent.apiKey]) {
      availableAgents.push(agent);
      console.log(`   ✅ ${agent.name} (${agent.engine}) - API key available`);
    } else {
      missingApiKeys.push(agent);
      console.log(`   ❌ ${agent.name} (${agent.engine}) - ${agent.apiKey} missing`);
    }
  });
  
  if (missingFiles.length > 0) {
    console.error(`\n${colors.red}🚨 MISSING AGENT FILES:${colors.reset}`);
    missingFiles.forEach(agent => {
      console.error(`   ❌ ${agent.file}`);
    });
    console.error(`${colors.red}   Download the Mizan-intelligent agents from the provided files.${colors.reset}\n`);
    process.exit(1);
  }
  
  if (missingApiKeys.length > 0) {
    console.warn(`\n${colors.yellow}⚠️  MISSING API KEYS:${colors.reset}`);
    missingApiKeys.forEach(agent => {
      console.warn(`   • ${agent.apiKey} for ${agent.name}`);
    });
    console.warn(`${colors.yellow}   Some agents will run with placeholder results.${colors.reset}`);
  }
  
  console.log(`\n${colors.green}✅ Agent readiness: ${availableAgents.length}/${MIZAN_AGENTS.length} fully operational${colors.reset}\n`);
  
  return { availableAgents, missingApiKeys, missingFiles };
}

/**
 * Run a single Mizan-intelligent agent
 */
function runMizanAgent(agent) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.magenta}🚀 Starting ${agent.name}...${colors.reset}`);
    console.log(`   Engine: ${agent.engine}`);
    console.log(`   Focus: ${agent.focus}`);
    console.log(`   Command: node ${agent.file}\n`);
    
    const startTime = Date.now();
    
    const child = spawn('node', [agent.file], {
      stdio: 'pipe',
      env: { ...process.env }
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      // Echo output in real-time with agent prefix
      process.stdout.write(output);
    });
    
    child.stderr.on('data', (data) => {
      const output = data.toString();
      stderr += output;
      // Echo errors in real-time with agent prefix
      process.stderr.write(output);
    });
    
    child.on('close', (code) => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      
      if (code === 0) {
        console.log(`${colors.green}✅ ${agent.name} completed successfully in ${duration}s${colors.reset}`);
        
        // Verify output file exists
        if (fs.existsSync(agent.output)) {
          const outputStats = fs.statSync(agent.output);
          const outputSizeKB = Math.round(outputStats.size / 1024);
          console.log(`   📁 Output: ${agent.output} (${outputSizeKB}KB)\n`);
        } else {
          console.log(`   ⚠️  Expected output file not found: ${agent.output}\n`);
        }
        
        resolve({ 
          agent, 
          success: true, 
          code, 
          duration: parseFloat(duration), 
          stdout, 
          stderr 
        });
      } else {
        console.error(`${colors.red}❌ ${agent.name} failed with code ${code} after ${duration}s${colors.reset}`);
        console.error(`   Check the output above for details\n`);
        
        resolve({ 
          agent, 
          success: false, 
          code, 
          duration: parseFloat(duration), 
          stdout, 
          stderr 
        });
      }
    });
    
    child.on('error', (error) => {
      console.error(`${colors.red}💥 ${agent.name} crashed: ${error.message}${colors.reset}\n`);
      reject({ agent, error: error.message });
    });
  });
}

/**
 * Generate execution summary with Mizan business context
 */
function generateMizanExecutionSummary(results) {
  const summary = {
    timestamp: new Date().toISOString(),
    totalAgents: MIZAN_AGENTS.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    totalDuration: results.reduce((sum, r) => sum + (r.duration || 0), 0),
    mizanPlatformAnalysis: {
      codeAnalysisComplete: results.some(r => r.agent.id === 1 && r.success),
      fixGenerationComplete: results.some(r => r.agent.id === 2 && r.success),
      businessValidationComplete: results.some(r => r.agent.id === 3 && r.success),
      securityValidationComplete: results.some(r => r.agent.id === 4 && r.success),
      strategicIntegrationComplete: results.some(r => r.agent.id === 5 && r.success)
    },
    outputFiles: MIZAN_AGENTS.filter(agent => 
      results.some(r => r.agent.id === agent.id && r.success)
    ).map(agent => ({
      agentId: agent.id,
      agentName: agent.name,
      outputFile: agent.output,
      exists: fs.existsSync(agent.output),
      sizeKB: fs.existsSync(agent.output) ? Math.round(fs.statSync(agent.output).size / 1024) : 0
    })),
    results
  };
  
  // Save execution summary
  try {
    const summaryPath = path.join(process.cwd(), 'scripts', 'agents', 'mizan-execution-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📊 Execution summary saved: ${summaryPath}\n`);
  } catch (error) {
    console.error(`⚠️  Could not save execution summary: ${error.message}\n`);
  }
  
  return summary;
}

/**
 * Main orchestration function
 */
async function orchestrateMizanAgents() {
  console.log(`${colors.magenta}${colors.bold}🎯 MIZAN-INTELLIGENT 5-AGENT ORCHESTRATOR${colors.reset}`);
  console.log(`${colors.magenta}╔══════════════════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}║                    REVOLUTIONARY MIZAN PLATFORM INTELLIGENCE SYSTEM                             ║${colors.reset}`);
  console.log(`${colors.magenta}║        Analysis + Fixes + Validation + Security + Strategic Integration                         ║${colors.reset}`);
  console.log(`${colors.magenta}║        (Agent 0: Developer Agent - ISOLATED from flow)                                          ║${colors.reset}`);
  console.log(`${colors.magenta}╚══════════════════════════════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  console.log(`${colors.cyan}🏢 MIZAN PLATFORM CONTEXT:${colors.reset}`);
  console.log(`   • Multi-tenant SaaS HR Analytics Platform`);
  console.log(`   • Culture → Recognition/Engagement Agent Workflows`);
  console.log(`   • Skills → LXP Module Triggering Systems`);
  console.log(`   • Performance → Culture/Skills Strategic Integration`);
  console.log(`   • Three-Engine Architecture (Knowledge → Data → Reasoning)`);
  console.log(`   • Enterprise Client Success & Competitive Advantage Focus\n`);

  // Validate Mizan context and requirements
  validateMizanContext();
  
  // Check agent readiness
  const { availableAgents, missingApiKeys } = checkMizanAgentReadiness();
  
  // Start orchestration
  console.log(`${colors.blue}🎭 ORCHESTRATING MIZAN AGENT PIPELINE:${colors.reset}\n`);
  
  const results = [];
  let pipelineSuccess = true;
  
  // Run agents sequentially with dependency management
  for (const agent of MIZAN_AGENTS) {
    const isAvailable = availableAgents.some(a => a.id === agent.id);
    
    if (!isAvailable) {
      console.log(`${colors.yellow}⏭️  Skipping ${agent.name} (API key not configured)${colors.reset}\n`);
      results.push({
        agent,
        success: false,
        code: -1,
        duration: 0,
        skipped: true,
        reason: 'API key not configured'
      });
      continue;
    }
    
    // FILTER VIOLATIONS BEFORE AGENT 2 (Fix Generator)
    if (agent.id === 2) {
      console.log(`${colors.cyan}═══════════════════════════════════════════════════════════════════${colors.reset}`);
      console.log(`${colors.cyan}${colors.bold}VIOLATION FILTER: Removing false positives before fix generation${colors.reset}`);
      console.log(`${colors.cyan}═══════════════════════════════════════════════════════════════════${colors.reset}\n`);
      
      const filterScript = path.join(__dirname, 'agents', 'violation-filter.js');
      if (fs.existsSync(filterScript)) {
        try {
          const filterResult = await runMizanAgent({
            id: 'filter',
            name: 'Violation Filter Service',
            description: 'Filter false positives and SKIP recommendations',
            file: filterScript,
            output: 'scripts/violations-filtered.json',
            apiKey: 'NONE', // No API key needed
            engine: 'Local Processing',
            focus: 'False Positive Detection'
          });
          
          if (filterResult.success) {
            // Check if we have any violations left after filtering
            const filteredPath = path.join(__dirname, 'violations-filtered.json');
            if (fs.existsSync(filteredPath)) {
              const filteredViolations = JSON.parse(fs.readFileSync(filteredPath, 'utf8'));
              if (filteredViolations.length === 0) {
                console.log(`${colors.green}🎉 No real violations found after filtering! All were false positives.${colors.reset}\n`);
                console.log(`${colors.yellow}⏭️  Skipping ${agent.name} (no violations to fix)${colors.reset}\n`);
                results.push({
                  agent,
                  success: true,
                  code: 0,
                  duration: 0,
                  skipped: true,
                  reason: 'No violations after filtering'
                });
                continue;
              }
              console.log(`${colors.yellow}📊 ${filteredViolations.length} real violations will be processed by ${agent.name}${colors.reset}\n`);
            }
          }
        } catch (filterError) {
          console.error(`${colors.yellow}⚠️  Filter service failed: ${filterError.message}${colors.reset}`);
          console.log(`${colors.yellow}   Continuing with unfiltered violations...${colors.reset}\n`);
        }
      }
    }
    
    try {
      const result = await runMizanAgent(agent);
      results.push(result);
      
      if (!result.success) {
        console.warn(`${colors.yellow}⚠️  ${agent.name} failed, but continuing pipeline...${colors.reset}\n`);
        pipelineSuccess = false;
      }
      
      // Brief pause between agents
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`${colors.red}💥 ${agent.name} crashed: ${error.error}${colors.reset}\n`);
      results.push({
        agent,
        success: false,
        code: -1,
        duration: 0,
        crashed: true,
        error: error.error
      });
      pipelineSuccess = false;
    }
  }
  
  // Generate execution summary
  console.log(`${colors.blue}📊 Generating Mizan execution summary...${colors.reset}\n`);
  const summary = generateMizanExecutionSummary(results);
  
  // Display final results
  console.log(`${colors.blue}🎯 MIZAN 6-AGENT PIPELINE RESULTS:${colors.reset}`);
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║                        MIZAN PLATFORM INTELLIGENCE SUMMARY                                    ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`⏱️  **Total Duration**: ${summary.totalDuration.toFixed(1)} seconds`);
  console.log(`✅ **Successful Agents**: ${summary.successful}/${summary.totalAgents}`);
  console.log(`❌ **Failed Agents**: ${summary.failed}/${summary.totalAgents}\n`);

  console.log(`🏢 **Mizan Platform Analysis Status**:`);
  console.log(`   • Code Analysis: ${summary.mizanPlatformAnalysis.codeAnalysisComplete ? colors.green + '✅ Complete' + colors.reset : colors.red + '❌ Failed' + colors.reset}`);
  console.log(`   • Fix Generation: ${summary.mizanPlatformAnalysis.fixGenerationComplete ? colors.green + '✅ Complete' + colors.reset : colors.red + '❌ Failed' + colors.reset}`);
  console.log(`   • Business Validation: ${summary.mizanPlatformAnalysis.businessValidationComplete ? colors.green + '✅ Complete' + colors.reset : colors.red + '❌ Failed' + colors.reset}`);
  console.log(`   • Security Validation: ${summary.mizanPlatformAnalysis.securityValidationComplete ? colors.green + '✅ Complete' + colors.reset : colors.red + '❌ Failed' + colors.reset}`);
  console.log(`   • Strategic Integration: ${summary.mizanPlatformAnalysis.strategicIntegrationComplete ? colors.green + '✅ Complete' + colors.reset : colors.red + '❌ Failed' + colors.reset}\n`);

  console.log(`📁 **Generated Output Files**:`);
  summary.outputFiles.forEach(file => {
    const status = file.exists ? `${colors.green}✅ ${file.sizeKB}KB${colors.reset}` : `${colors.red}❌ Missing${colors.reset}`;
    console.log(`   • Agent ${file.agentId} (${file.agentName}): ${status}`);
  });
  
  if (missingApiKeys.length > 0) {
    console.log(`\n${colors.yellow}⚠️  **Missing API Keys** (${missingApiKeys.length}):${colors.reset}`);
    missingApiKeys.forEach(agent => {
      console.log(`   • ${agent.apiKey} for ${agent.name} (${agent.engine})`);
    });
    console.log(`${colors.yellow}   Configure these keys in your .env file for complete analysis.${colors.reset}`);
  }
  
  // Strategic recommendations
  console.log(`\n📋 **Next Steps**:`);
  
  if (summary.mizanPlatformAnalysis.strategicIntegrationComplete) {
    console.log(`   1. ${colors.green}📊 Review Strategic Report${colors.reset}: scripts/agents/MIZAN_STRATEGIC_REPORT.md`);
    console.log(`   2. ${colors.blue}🏢 Business Impact Analysis${colors.reset}: Review enterprise client implications`);
    console.log(`   3. ${colors.magenta}🎯 Implementation Planning${colors.reset}: Use strategic priorities for deployment`);
  } else if (summary.successful >= 3) {
    console.log(`   1. ${colors.yellow}📊 Review Individual Reports${colors.reset}: Check agent outputs for detailed findings`);
    console.log(`   2. ${colors.yellow}🔑 Configure Missing API Keys${colors.reset}: Enable remaining agents for complete analysis`);
  } else {
    console.log(`   1. ${colors.red}🔑 Configure API Keys${colors.reset}: Set up required API keys in .env file`);
    console.log(`   2. ${colors.red}🔍 Debug Failed Agents${colors.reset}: Review error messages and fix configuration`);
    console.log(`   3. ${colors.red}🔄 Re-run Pipeline${colors.reset}: Execute orchestrator again after fixes`);
  }
  
  if (pipelineSuccess && summary.successful === summary.totalAgents) {
    console.log(`\n${colors.green}🎉 MIZAN PLATFORM INTELLIGENCE PIPELINE COMPLETE!${colors.reset}`);
    console.log(`${colors.green}🚀 All agents executed successfully with complete business context.${colors.reset}`);
    console.log(`${colors.blue}📈 Strategic business integration report ready for executive review.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n${colors.yellow}⚠️  Pipeline completed with some issues.${colors.reset}`);
    console.log(`${colors.yellow}📋 Review the results above and address any failed agents.${colors.reset}\n`);
    process.exit(1);
  }
}

// Run orchestrator
if (require.main === module) {
  orchestrateMizanAgents().catch(error => {
    console.error(`${colors.red}💥 MIZAN ORCHESTRATOR CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { orchestrateMizanAgents };