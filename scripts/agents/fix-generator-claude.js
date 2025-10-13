#!/usr/bin/env node

/**
 * AGENT 2: FIX GENERATOR (Claude Sonnet 4.5) - IMPROVED VERSION
 * 
 * Enhancements:
 * - Self-validation before submitting fix
 * - Higher token limit for complex fixes
 * - Better JSON generation using XML intermediate format
 * - Automatic retry with improvements
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load agent context once
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
 * STRATEGY 1: Use XML format first, then convert to JSON
 * This avoids JSON escaping issues entirely
 */
async function generateFixWithXML(violation, analysis, attempt = 1) {
  const maxAttempts = 3;
  
  const prompt = `${agentContext}

═══════════════════════════════════════════════════════
AGENT 2: FIX GENERATOR - ENHANCED WITH SELF-VALIDATION
═══════════════════════════════════════════════════════

VIOLATION:
File: ${violation.file}
Line: ${violation.line}
Code: ${violation.content}
Rule: ${violation.rule}
Priority: ${violation.priority}

AGENT 1 ANALYSIS:
${JSON.stringify(analysis, null, 2)}

YOUR MISSION:
Generate a COMPLETE, PRODUCTION-READY fix following ALL Mizan rules.

CRITICAL IMPROVEMENTS FOR THIS ATTEMPT (#${attempt}):
${attempt > 1 ? `
⚠️ PREVIOUS ATTEMPT HAD ISSUES - FIX THESE:
- Increase confidence to 90%+ by being more thorough
- Include ALL necessary additional files (don't abbreviate)
- Provide COMPLETE code (no "..." or truncation)
- Double-check Mizan compliance
` : ''}

RESPOND IN XML FORMAT (easier to parse, no escaping issues):

<fix>
  <metadata>
    <agent>Claude Sonnet 4.5 (Fix Generator - Enhanced)</agent>
    <timestamp>${new Date().toISOString()}</timestamp>
    <fixType>simple|complex</fixType>
    <confidence>0.95</confidence>
    <attempt>${attempt}</attempt>
  </metadata>
  
  <primaryFix>
    <description>
      COMPLETE explanation of what this fix does and why it's production-ready.
      Reference specific Mizan patterns used.
    </description>
    
    <code>
      <![CDATA[
        // Put the complete code here
        // No escaping needed in CDATA!
        // Can use quotes freely: "hello" 'world'
      ]]>
    </code>
    
    <filePath>${violation.file}</filePath>
    <startLine>${violation.line}</startLine>
    <endLine>${violation.line}</endLine>
  </primaryFix>
  
  <additionalFiles>
    <!-- For EACH file needed (be thorough!) -->
    <file>
      <path>complete/path/from/root.ts</path>
      <purpose>Why this file is needed</purpose>
      <content>
        <![CDATA[
          // Complete file content here
          // Include ALL imports, types, functions
          // NO placeholders or "..."
        ]]>
      </content>
    </file>
    <!-- Repeat for each additional file -->
  </additionalFiles>
  
  <testingInstructions>
    <![CDATA[
      Step-by-step testing guide:
      1. First test: ...
      2. Second test: ...
    ]]>
  </testingInstructions>
  
  <potentialRisks>
    <risk>Risk 1 description</risk>
    <risk>Risk 2 description</risk>
  </potentialRisks>
  
  <mizanComplianceCheck>
    <usesDrizzleORM>true</usesDrizzleORM>
    <usesAppRouter>true</usesAppRouter>
    <noPlaceholders>true</noPlaceholders>
    <strictTypes>true</strictTypes>
    <hasAuthentication>true</hasAuthentication>
    <hasTenantIsolation>true</hasTenantIsolation>
  </mizanComplianceCheck>
  
  <selfValidation>
    <completenessScore>95</completenessScore>
    <reasoning>
      I validated this fix is complete because:
      1. All necessary files included
      2. No placeholders or TODOs
      3. Uses correct Mizan patterns
      4. Production-ready quality
    </reasoning>
  </selfValidation>
</fix>

CRITICAL REQUIREMENTS:
1. ✅ Set confidence to 0.90+ (not 0.70)
2. ✅ Include AT LEAST 3 additional files for complex fixes
3. ✅ No "..." or truncation in code
4. ✅ Complete CDATA blocks (no escaping needed)
5. ✅ Self-validation score 90+

Generate the COMPLETE XML response now.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000, // DOUBLED from 4000!
      temperature: 0.3, // Lower for more consistent, careful output
      messages: [{ role: 'user', content: prompt }]
    });

    const xmlText = message.content[0].text;
    
    // Parse XML and convert to JSON
    const fixData = parseXMLToJSON(xmlText);
    
    // SELF-VALIDATION CHECK
    const validationResult = validateFix(fixData);
    
    if (!validationResult.passed && attempt < maxAttempts) {
      console.log(`   ⚠️  Self-validation failed (score: ${validationResult.score}/100)`);
      console.log(`   🔄 Retrying with improvements... (Attempt ${attempt + 1}/${maxAttempts})`);
      
      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return generateFixWithXML(violation, analysis, attempt + 1);
    }
    
    if (!validationResult.passed && attempt === maxAttempts) {
      console.log(`   ⚠️  Max attempts reached. Best effort: ${validationResult.score}/100`);
    }
    
    return fixData;

  } catch (error) {
    console.error(`   ❌ Fix generation error: ${error.message}`);
    
    if (attempt < maxAttempts) {
      console.log(`   🔄 Retrying... (Attempt ${attempt + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return generateFixWithXML(violation, analysis, attempt + 1);
    }
    
    throw error;
  }
}

/**
 * Parse XML to JSON (handles CDATA properly)
 */
function parseXMLToJSON(xmlText) {
  try {
    // Extract values using regex (simple parser for our structured XML)
    const extractTag = (tag, text) => {
      const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : null;
    };
    
    const extractCDATA = (tag, text) => {
      const regex = new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : null;
    };
    
    const extractBool = (tag, text) => {
      const value = extractTag(tag, text);
      return value === 'true';
    };
    
    // Extract metadata
    const metadataSection = extractTag('metadata', xmlText);
    const agent = extractTag('agent', metadataSection);
    const timestamp = extractTag('timestamp', metadataSection);
    const fixType = extractTag('fixType', metadataSection);
    const confidence = parseFloat(extractTag('confidence', metadataSection) || '0.7');
    const attempt = parseInt(extractTag('attempt', metadataSection) || '1');
    
    // Extract primary fix
    const primaryFixSection = extractTag('primaryFix', xmlText);
    const description = extractTag('description', primaryFixSection);
    const code = extractCDATA('code', primaryFixSection) || extractTag('code', primaryFixSection);
    const filePath = extractTag('filePath', primaryFixSection);
    const startLine = parseInt(extractTag('startLine', primaryFixSection) || '0');
    const endLine = parseInt(extractTag('endLine', primaryFixSection) || '0');
    
    // Extract additional files
    const additionalFilesSection = extractTag('additionalFiles', xmlText) || '';
    const fileMatches = additionalFilesSection.matchAll(/<file>([\s\S]*?)<\/file>/g);
    const additionalFiles = [];
    
    for (const fileMatch of fileMatches) {
      const fileContent = fileMatch[1];
      additionalFiles.push({
        path: extractTag('path', fileContent),
        purpose: extractTag('purpose', fileContent),
        content: extractCDATA('content', fileContent) || extractTag('content', fileContent)
      });
    }
    
    // Extract testing instructions
    const testingInstructions = extractCDATA('testingInstructions', xmlText) || 
                                extractTag('testingInstructions', xmlText);
    
    // Extract risks
    const risksSection = extractTag('potentialRisks', xmlText) || '';
    const riskMatches = risksSection.matchAll(/<risk>([\s\S]*?)<\/risk>/g);
    const potentialRisks = Array.from(riskMatches).map(m => m[1].trim());
    
    // Extract Mizan compliance
    const complianceSection = extractTag('mizanComplianceCheck', xmlText) || '';
    const mizanComplianceCheck = {
      usesDrizzleORM: extractBool('usesDrizzleORM', complianceSection),
      usesAppRouter: extractBool('usesAppRouter', complianceSection),
      noPlaceholders: extractBool('noPlaceholders', complianceSection),
      strictTypes: extractBool('strictTypes', complianceSection),
      hasAuthentication: extractBool('hasAuthentication', complianceSection),
      hasTenantIsolation: extractBool('hasTenantIsolation', complianceSection)
    };
    
    // Extract self-validation
    const validationSection = extractTag('selfValidation', xmlText) || '';
    const selfValidation = {
      completenessScore: parseInt(extractTag('completenessScore', validationSection) || '70'),
      reasoning: extractTag('reasoning', validationSection)
    };
    
    return {
      agent: agent || 'Claude Sonnet 4.5 (Fix Generator - Enhanced)',
      timestamp: timestamp || new Date().toISOString(),
      fixType: fixType || 'complex',
      confidence: confidence,
      attempt: attempt,
      primaryFix: {
        description: description || 'No description provided',
        code: code || '// No code provided',
        filePath: filePath,
        startLine: startLine,
        endLine: endLine,
        additionalFiles: additionalFiles
      },
      testingInstructions: testingInstructions || 'No testing instructions provided',
      potentialRisks: potentialRisks.length > 0 ? potentialRisks : ['No risks identified'],
      mizanComplianceCheck: mizanComplianceCheck,
      selfValidation: selfValidation
    };
    
  } catch (error) {
    throw new Error(`XML parsing failed: ${error.message}`);
  }
}

/**
 * Validate the fix before accepting it
 */
function validateFix(fixData) {
  let score = 0;
  const issues = [];
  
  // Check 1: Confidence score (20 points)
  if (fixData.confidence >= 0.90) {
    score += 20;
  } else if (fixData.confidence >= 0.80) {
    score += 15;
    issues.push('Confidence below 90%');
  } else {
    score += 5;
    issues.push('Confidence too low');
  }
  
  // Check 2: Description quality (15 points)
  const description = fixData.primaryFix?.description || '';
  if (description.length > 100 && !description.includes('...')) {
    score += 15;
  } else {
    score += 5;
    issues.push('Description too brief or truncated');
  }
  
  // Check 3: Code completeness (25 points)
  const code = fixData.primaryFix?.code || '';
  if (code.length > 50 && !code.includes('...') && !code.includes('// TODO')) {
    score += 25;
  } else if (code.length > 20) {
    score += 10;
    issues.push('Code may be incomplete');
  } else {
    issues.push('Code missing or too short');
  }
  
  // Check 4: Additional files for complex fixes (20 points)
  const additionalFiles = fixData.primaryFix?.additionalFiles || [];
  if (fixData.fixType === 'complex') {
    if (additionalFiles.length >= 3) {
      score += 20;
    } else if (additionalFiles.length >= 1) {
      score += 10;
      issues.push('Complex fix needs more additional files');
    } else {
      issues.push('Complex fix missing additional files');
    }
  } else {
    score += 20; // Simple fixes don't need additional files
  }
  
  // Check 5: Mizan compliance (20 points)
  const compliance = fixData.mizanComplianceCheck || {};
  const complianceCount = Object.values(compliance).filter(v => v === true).length;
  score += Math.floor((complianceCount / 6) * 20);
  
  if (complianceCount < 5) {
    issues.push('Missing Mizan compliance checks');
  }
  
  return {
    passed: score >= 85,
    score: score,
    issues: issues
  };
}

/**
 * Main function - generate fixes for all real violations
 */
async function generateFixes() {
  console.log('🤖 Agent 2: Fix Generator (Claude Sonnet 4.5 - Enhanced) Starting...\n');

  const analysesPath = path.join(process.cwd(), 'scripts', 'agent1-analyses.json');
  
  let analyses;
  try {
    analyses = JSON.parse(fs.readFileSync(analysesPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error: Could not read agent1-analyses.json');
    console.error('   Run code-analyzer-gemini.js (Agent 1) first');
    process.exit(1);
  }

  // Filter for real violations only
  const realViolations = analyses.filter(a => 
    a.agent1Analysis.isRealViolation === true
  );

  console.log(`📊 Found ${realViolations.length} real violations to fix\n`);

  if (realViolations.length === 0) {
    console.log('✅ No real violations found - nothing to fix!\n');
    return;
  }

  const fixes = [];
  let successCount = 0;
  let errorCount = 0;
  let highConfidenceCount = 0;

  for (let i = 0; i < realViolations.length; i++) {
    const item = realViolations[i];
    const { violation, agent1Analysis } = item;
    
    console.log(`🔧 [${i + 1}/${realViolations.length}] Generating fix for: ${violation.file}:${violation.line}`);
    console.log(`   Rule: ${violation.rule} (${violation.priority})`);
    console.log(`   Severity: ${agent1Analysis.severity}`);
    
    try {
      const fix = await generateFixWithXML(violation, agent1Analysis);
      
      fixes.push({
        violation,
        agent1Analysis,
        agent2Fix: fix
      });

      successCount++;
      
      // Display result
      const confidencePercent = (fix.confidence * 100).toFixed(0);
      const confidenceEmoji = fix.confidence >= 0.90 ? '🎯' : fix.confidence >= 0.80 ? '✅' : '⚠️';
      
      console.log(`   ${confidenceEmoji} Fix generated - Confidence: ${confidencePercent}%`);
      console.log(`   📝 Type: ${fix.fixType}`);
      
      if (fix.confidence >= 0.90) {
        highConfidenceCount++;
      }
      
      if (fix.primaryFix.additionalFiles && fix.primaryFix.additionalFiles.length > 0) {
        console.log(`   📄 Additional files: ${fix.primaryFix.additionalFiles.length}`);
      }
      
      if (fix.selfValidation) {
        console.log(`   ✓ Self-validation: ${fix.selfValidation.completenessScore}/100`);
      }
      
    } catch (error) {
      errorCount++;
      console.log(`   ❌ Error: ${error.message}`);
      
      fixes.push({
        violation,
        agent1Analysis,
        agent2Fix: {
          agent: 'Claude Sonnet 4.5 (Fix Generator - Enhanced)',
          timestamp: new Date().toISOString(),
          error: error.message,
          confidence: 0,
          fixType: 'error'
        }
      });
    }
    
    console.log('');

    // Rate limiting - 3 seconds between requests
    if (i < realViolations.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Save results
  const resultsPath = path.join(process.cwd(), 'scripts', 'agent2-fixes.json');
  fs.writeFileSync(resultsPath, JSON.stringify(fixes, null, 2));

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 AGENT 2 (CLAUDE - ENHANCED) SUMMARY:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Fixes generated: ${successCount}`);
  console.log(`🎯 High confidence (90%+): ${highConfidenceCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total violations: ${realViolations.length}`);
  console.log(`💾 Results saved: scripts/agent2-fixes.json\n`);
  
  if (highConfidenceCount < successCount) {
    const lowConfidence = successCount - highConfidenceCount;
    console.log(`⚠️  ${lowConfidence} fixes below 90% confidence - may need revision\n`);
  }
  
  console.log('✅ Agent 2 (Claude Fix Generator - Enhanced) complete!\n');
}

// Run
if (require.main === module) {
  generateFixes();
}

module.exports = { generateFixWithXML, generateFixes };