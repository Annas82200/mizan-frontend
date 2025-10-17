#!/usr/bin/env node

/**
 * MIZAN VIOLATION FILTER SERVICE
 * 
 * Intermediate validation service to filter violations between agents
 * Ensures only real violations reach the fix generator
 * 
 * COMPLIANT WITH: AGENT_CONTEXT_ULTIMATE.md
 * - Filters false positives from audit results
 * - Respects Agent 1's SKIP recommendations
 * - Validates violations against known patterns
 * - Ensures 100% accuracy before fix generation
 */

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
  bold: '\x1b[1m',
  magenta: '\x1b[35m'
};

/**
 * Known false positive patterns that should be filtered
 * These are legitimate code patterns incorrectly flagged as violations
 */
const FALSE_POSITIVE_PATTERNS = {
  // CSS class patterns (Tailwind, etc.)
  CSS_CLASSES: [
    /placeholder:[\w-]+/, // Tailwind placeholder pseudo-class
    /hover:[\w-]+/,       // Tailwind hover pseudo-class
    /focus:[\w-]+/,       // Tailwind focus pseudo-class
    /className.*placeholder/, // React className with placeholder styles
    /class.*placeholder/,     // HTML class with placeholder styles
  ],
  
  // HTML attributes
  HTML_ATTRIBUTES: [
    /<input.*placeholder=/,
    /<textarea.*placeholder=/,
    /placeholder\s*=\s*["']/,
    /placeholder\?\s*:\s*string/, // TypeScript interface property
  ],
  
  // TypeScript patterns
  TYPESCRIPT_PATTERNS: [
    /interface.*\{[\s\S]*placeholder\?\s*:\s*string/, // Interface with placeholder property
    /type.*=.*\{[\s\S]*placeholder\?\s*:\s*string/,   // Type with placeholder property
    /export\s+default\s+function.*\{$/,               // Default export functions
    /export\s+function.*\{$/,                         // Named export functions
  ],
  
  // Legitimate test patterns (in test files only)
  TEST_PATTERNS: [
    /describe\(.*test/i,
    /it\(.*should/i,
    /expect\(.*mock/i,
    /jest\.mock/,
  ],
  
  // Documentation and comments that are OK
  ALLOWED_COMMENTS: [
    /\/\/\s*@ts-expect-error/, // TypeScript directive
    /\/\/\s*@ts-nocheck/,       // TypeScript directive
    /\/\/\s*eslint-disable/,    // ESLint directive
    /\/\*\*[\s\S]*\*\//,        // JSDoc comments
  ]
};

/**
 * Check if a violation is a false positive
 */
function isFalsePositive(violation) {
  const { file, content, type } = violation;
  
  // Check file path exclusions
  if (file.includes('node_modules/') || 
      file.includes('.next/') ||
      file.includes('dist/') ||
      file.includes('build/') ||
      file.includes('.d.ts')) {
    return true;
  }
  
  // Check CSS class false positives
  if (type === 'mock-data' || type === 'placeholder-content') {
    for (const pattern of FALSE_POSITIVE_PATTERNS.CSS_CLASSES) {
      if (pattern.test(content)) {
        return true;
      }
    }
    
    for (const pattern of FALSE_POSITIVE_PATTERNS.HTML_ATTRIBUTES) {
      if (pattern.test(content)) {
        return true;
      }
    }
  }
  
  // Check TypeScript false positives
  if (type === 'typescript') {
    for (const pattern of FALSE_POSITIVE_PATTERNS.TYPESCRIPT_PATTERNS) {
      if (pattern.test(content)) {
        return true;
      }
    }
  }
  
  // Check test file patterns (only in test files)
  if (file.includes('.test.') || file.includes('.spec.') || file.includes('__tests__')) {
    for (const pattern of FALSE_POSITIVE_PATTERNS.TEST_PATTERNS) {
      if (pattern.test(content)) {
        return true;
      }
    }
  }
  
  // Check allowed comments
  for (const pattern of FALSE_POSITIVE_PATTERNS.ALLOWED_COMMENTS) {
    if (pattern.test(content)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Filter violations based on Agent 1 analysis
 */
function filterByAgent1Analysis(violations, agent1Analyses) {
  const filtered = [];
  const skipped = [];
  
  for (const violation of violations) {
    // Find corresponding Agent 1 analysis
    const analysis = agent1Analyses.find(a => 
      a.violation.file === violation.file && 
      a.violation.line === violation.line
    );
    
    if (analysis) {
      // Check Agent 1's recommendation
      if (analysis.mizanAnalysis.recommendation === 'SKIP') {
        skipped.push({
          violation,
          reason: 'Agent 1 marked as SKIP',
          analysis: analysis.mizanAnalysis.reasoning
        });
        continue;
      }
      
      // Check if Agent 1 marked as false positive
      if (analysis.mizanAnalysis.isRealViolation === false) {
        skipped.push({
          violation,
          reason: 'Agent 1 marked as false positive',
          analysis: analysis.mizanAnalysis.reasoning
        });
        continue;
      }
      
      // Check confidence level
      if (analysis.mizanAnalysis.confidence < 0.5) {
        skipped.push({
          violation,
          reason: 'Low confidence from Agent 1',
          confidence: analysis.mizanAnalysis.confidence
        });
        continue;
      }
    }
    
    // Additional false positive check
    if (isFalsePositive(violation)) {
      skipped.push({
        violation,
        reason: 'Identified as false positive by filter service'
      });
      continue;
    }
    
    // This is a real violation that should be fixed
    filtered.push(violation);
  }
  
  return { filtered, skipped };
}

/**
 * Main filtering function
 */
async function filterViolations() {
  console.log(`${colors.cyan}${colors.bold}🔍 MIZAN VIOLATION FILTER SERVICE${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  try {
    // Load violations from audit
    const violationsPath = path.join(process.cwd(), 'scripts/violations.json');
    if (!fs.existsSync(violationsPath)) {
      console.log(`${colors.yellow}⚠️  No violations file found. Run audit first.${colors.reset}`);
      return;
    }
    
    const violations = JSON.parse(fs.readFileSync(violationsPath, 'utf8'));
    console.log(`📊 Loaded ${violations.length} violations from audit\n`);
    
    // Load Agent 1 analyses if available
    const agent1Path = path.join(process.cwd(), 'scripts/agents/agent1-mizan-analyses.json');
    let agent1Analyses = [];
    
    if (fs.existsSync(agent1Path)) {
      const agent1Data = JSON.parse(fs.readFileSync(agent1Path, 'utf8'));
      agent1Analyses = agent1Data.mizanAnalyses || [];
      console.log(`📊 Loaded ${agent1Analyses.length} analyses from Agent 1\n`);
    }
    
    // Filter violations
    const { filtered, skipped } = filterByAgent1Analysis(violations, agent1Analyses);
    
    // Report results
    console.log(`${colors.green}✅ Filtering Complete:${colors.reset}`);
    console.log(`  Original violations: ${violations.length}`);
    console.log(`  Filtered (real): ${colors.green}${filtered.length}${colors.reset}`);
    console.log(`  Skipped (false): ${colors.yellow}${skipped.length}${colors.reset}\n`);
    
    // Show skip reasons summary
    if (skipped.length > 0) {
      console.log(`${colors.yellow}📋 Skip Reasons:${colors.reset}`);
      const reasonCounts = {};
      skipped.forEach(s => {
        reasonCounts[s.reason] = (reasonCounts[s.reason] || 0) + 1;
      });
      
      Object.entries(reasonCounts).forEach(([reason, count]) => {
        console.log(`  ${reason}: ${count}`);
      });
      console.log();
    }
    
    // Save filtered violations
    const filteredPath = path.join(process.cwd(), 'scripts/violations-filtered.json');
    fs.writeFileSync(filteredPath, JSON.stringify(filtered, null, 2));
    console.log(`${colors.green}✅ Saved ${filtered.length} real violations to: violations-filtered.json${colors.reset}`);
    
    // Save skip report
    const skipReportPath = path.join(process.cwd(), 'scripts/violations-skipped.json');
    fs.writeFileSync(skipReportPath, JSON.stringify(skipped, null, 2));
    console.log(`${colors.yellow}📊 Saved skip report to: violations-skipped.json${colors.reset}\n`);
    
    // Return results for use by other scripts
    return {
      original: violations,
      filtered,
      skipped,
      stats: {
        originalCount: violations.length,
        filteredCount: filtered.length,
        skippedCount: skipped.length,
        reductionPercent: Math.round((skipped.length / violations.length) * 100)
      }
    };
    
  } catch (error) {
    console.error(`${colors.red}❌ Error filtering violations: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Export for use by other scripts
module.exports = {
  filterViolations,
  isFalsePositive,
  filterByAgent1Analysis
};

// Run if called directly
if (require.main === module) {
  filterViolations().then(results => {
    if (results) {
      console.log(`${colors.cyan}🚀 Filter service completed successfully!${colors.reset}`);
      console.log(`${colors.cyan}Reduced violations by ${results.stats.reductionPercent}%${colors.reset}\n`);
    }
  });
}
