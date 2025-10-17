#!/usr/bin/env node

/**
 * CORRECTED MIZAN AUDIT SCRIPT - FIXED VERSION
 * 
 * This script implements the EXACT rules from Agent_context_ultimate.md
 * FIXED: No longer flags legitimate console.log statements as violations
 * 
 * Rules implemented (from MIZAN ZERO TOLERANCE RULES):
 * 1. NO PLACEHOLDER DATA - EVER
 * 2. NO TODO COMMENTS OR PLACEHOLDERS  
 * 3. ALL DATABASE QUERIES MUST BE REAL
 * 4. COMPLETE FEATURE IMPLEMENTATION
 * 5. PROPER ERROR HANDLING
 * 
 * Usage: node scripts/audit-violations.js
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
  bold: '\x1b[1m'
};

// Violation storage
const violations = [];
let filesScanned = 0;
let totalLines = 0;

/**
 * RULE 1: NO PLACEHOLDER DATA - EVER
 * These patterns are from Agent_context_ultimate.md examples
 * IMPROVED: More precise patterns to avoid false positives
 */
const MOCK_DATA_PATTERNS = [
  // Mock data declarations (more precise)
  /(?:const|let|var)\s+mock[A-Z]\w*\s*=/i,
  /(?:const|let|var)\s+\w*Mock\s*=/i,
  /(?:const|let|var)\s+\w*mock\w*\s*=\s*\{/i,
  
  // Example names from the rules (in string context only)
  /["']john\.?doe["']/i,
  /["']jane\.?smith["']/i,
  /["']test\.?user["']/i,
  
  // Example domains (more precise)
  /["'].*example\.com["']/,
  /["']test@test\./,
  /["'].*@example\./,
  
  // Mock data structures (avoid CSS classes and legitimate uses)
  // Exclude CSS class patterns like "placeholder:text-gray"
  /(?<![\w-])(?:mock_?(?:user|employee|company|tenant)|todo_?implement|fixme|tbd|coming_?soon)(?![\w-])/i,
  /\bmockData\b/i,
  /\bfakeData\b/i,
  /\bdummyData\b/i,
  /\btestData\b(?!\w)/i,
  /\bsampleData\b/i,
  /mockResponse\s*[:=]/i,
  
  // Array patterns with obvious mock data
  /\[\s*\{\s*id:\s*[1-3]\s*,\s*name:\s*["']Test/,
  /\[\s*\{\s*name:\s*["'](?:John|Jane|Test).*["']\s*,.*email:\s*["'].*@(?:example|test)\./
];

/**
 * RULE 2: NO TODO COMMENTS OR PLACEHOLDERS
 * FIXED: No longer includes console.log as violation
 * IMPROVED: More precise patterns to avoid CSS and HTML attributes
 */
const PLACEHOLDER_PATTERNS = [
  // TODO comments (explicitly forbidden)
  /\/\/\s*TODO(?:\s|:|$)/i,
  /\/\/\s*FIXME(?:\s|:|$)/i,
  /\/\/\s*HACK(?:\s|:|$)/i,
  /\/\/\s*XXX(?:\s|:|$)/i,
  /\/\*.*TODO.*\*\//i,
  /\/\*.*FIXME.*\*\//i,
  
  // Placeholder comments (more precise)
  /\/\/.*implement.*later/i,
  /\/\/.*placeholder(?!\w)/i,
  /\/\/.*replace.*with.*actual/i,
  /\/\/.*coming.*soon/i,
  /\/\/.*phase.*[2-9]/i,
  /\/\/.*not.*implemented/i,
  
  // Error throws for unimplemented features
  /throw\s+new\s+Error\s*\(\s*["']Not\s+implemented/i,
  /throw\s+new\s+Error\s*\(\s*["']TODO/i,
  
  // Actual placeholders in strings (exclude CSS classes and HTML attributes)
  // Don't match CSS classes like "placeholder:text-gray" or HTML placeholder attributes
  /(?<![\w-:])["']placeholder["'](?![\w-:])/i,
  /["'].*coming\s+soon.*["']/i,
  /return\s+["']TODO["']/i,
  /return\s+["']PLACEHOLDER["']/i
];

/**
 * RULE 3: ALL DATABASE QUERIES MUST BE REAL
 * Mock API responses are forbidden
 */
const FAKE_API_PATTERNS = [
  // Mock API responses (from the rules)
  /return\s*\{\s*data:\s*\[\]\s*,\s*success:\s*true\s*\}/,
  /return\s*\{\s*success:\s*true\s*,.*data:\s*\[\]/,
  
  // Fake promises
  /Promise\.resolve\(\{\s*data:\s*\[\]/,
  /Promise\.resolve\(\[\]/,
  
  // Hardcoded responses
  /const\s+response\s*=\s*\{.*data:\s*\[\].*\}/,
  /return\s*\[\];\s*\/\/.*mock/i
];

/**
 * RULE 4: COMPLETE FEATURE IMPLEMENTATION  
 * No partial implementations
 */
const INCOMPLETE_PATTERNS = [
  // Incomplete implementations
  /\/\/.*coming.*soon/i,
  /\/\/.*not.*ready/i,
  /\/\/.*disabled/i,
  /\/\/.*commenting.*out/i,
  
  // Function stubs
  /function.*\{\s*\/\/.*todo/i,
  /=>\s*\{\s*\/\/.*todo/i,
  /function.*\{\s*return;\s*\}/,
  /=>\s*\{\s*return;\s*\}/
];

/**
 * RULE 5: PROPER ERROR HANDLING
 * Async functions must have try/catch
 */
const ERROR_HANDLING_PATTERNS = [
  // Missing try/catch in async functions (simplified check)
  /async.*function.*\{[^{}]*await[^{}]*\}(?!.*catch)/s,
  /async.*=>[^{}]*await[^{}]*(?!.*catch)/s
];

/**
 * TypeScript violations
 */
const TYPESCRIPT_VIOLATIONS = [
  // Any type usage
  /:\s*any\b/,
  /as\s+any\b/,
  // Function without return type
  /function\s+\w+\([^)]*\)\s*\{/
];

/**
 * Process violation match and return structured violation object
 * Compliant with AGENT_CONTEXT_ULTIMATE.md - production-ready, no 'any' types
 */
function processViolation(violation) {
  if (!violation || typeof violation !== 'object') {
    throw new Error('Invalid violation object provided');
  }

  return {
    file: violation.groups?.file || '',
    line: parseInt(violation.groups?.line || '0', 10),
    rule: violation.groups?.rule || 'UNKNOWN',
    code: violation.match || '',
    description: violation.groups?.description || '',
    severity: determineSeverity(violation.groups?.rule || '')
  };
}

/**
 * Determine severity level based on rule type
 * Returns: 'critical', 'high', 'medium', or 'low'
 */
function determineSeverity(rule) {
  if (typeof rule !== 'string') {
    return 'low';
  }
  const criticalRules = ['TENANT_ISOLATION', 'THREE_ENGINE_ARCHITECTURE'];
  const highRules = ['STRICT_TYPESCRIPT_TYPES', 'PRODUCTION_READY'];
  const mediumRules = ['ERROR_HANDLING', 'DRIZZLE_ORM'];
  
  if (criticalRules.includes(rule)) return 'critical';
  if (highRules.includes(rule)) return 'high';
  if (mediumRules.includes(rule)) return 'medium';
  return 'low';
}

/**
 * Directory patterns to scan
 */
const SCAN_PATTERNS = [
  'frontend/src/**/*.{ts,tsx,js,jsx}',
  'backend/src/**/*.{ts,js}',
  'scripts/**/*.{ts,js}'
];

/**
 * Directories to exclude from scanning
 */
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  'coverage',
  '*.d.ts'
];

/**
 * Get all files to scan
 */
function getFilesToScan() {
  const glob = require('glob');
  const files = [];
  
  SCAN_PATTERNS.forEach(pattern => {
    try {
      const found = glob.sync(pattern, {
        ignore: EXCLUDE_PATTERNS.map(p => `**/${p}/**`)
      });
      files.push(...found);
    } catch (error) {
      // Pattern might not match any files, continue
    }
  });
  
  return [...new Set(files)]; // Remove duplicates
}

/**
 * Scan a single file for violations
 */
function scanFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    filesScanned++;
    totalLines += lines.length;

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();

      // Skip empty lines and pure whitespace
      if (!trimmedLine) return;

      // Check each violation type
      checkViolation(filePath, lineNumber, line, trimmedLine, MOCK_DATA_PATTERNS, 'mock-data', 'critical', 'NO PLACEHOLDER DATA - EVER');
      checkViolation(filePath, lineNumber, line, trimmedLine, PLACEHOLDER_PATTERNS, 'placeholder-content', 'critical', 'NO TODO COMMENTS OR PLACEHOLDERS');
      checkViolation(filePath, lineNumber, line, trimmedLine, FAKE_API_PATTERNS, 'fake-api', 'critical', 'ALL DATABASE QUERIES MUST BE REAL');
      checkViolation(filePath, lineNumber, line, trimmedLine, INCOMPLETE_PATTERNS, 'incomplete', 'high', 'COMPLETE FEATURE IMPLEMENTATION');
      checkViolation(filePath, lineNumber, line, trimmedLine, ERROR_HANDLING_PATTERNS, 'error-handling', 'medium', 'PROPER ERROR HANDLING');
      checkViolation(filePath, lineNumber, line, trimmedLine, TYPESCRIPT_VIOLATIONS, 'typescript', 'low', 'STRICT TYPESCRIPT TYPES');
    });

  } catch (error) {
    console.warn(`Warning: Could not scan ${filePath}: ${error.message}`);
  }
}

/**
 * Check if a potential violation is actually a false positive
 * COMPLIANT WITH: AGENT_CONTEXT_ULTIMATE.md
 */
function isFalsePositive(filePath, line, type, pattern) {
  const trimmedLine = line.trim();
  
  // CSS class false positives
  if (type === 'mock-data' || type === 'placeholder-content') {
    // Check if this is a CSS class definition or usage
    if (trimmedLine.includes('className') || 
        trimmedLine.includes('class=') ||
        trimmedLine.includes('classList') ||
        trimmedLine.includes('tailwind') ||
        trimmedLine.includes('placeholder:') || // Tailwind CSS placeholder pseudo-class
        trimmedLine.match(/["']\s*[\w-]+:[\w-]+/)) { // CSS pseudo-class pattern
      return true;
    }
    
    // Check if this is an HTML placeholder attribute
    if (trimmedLine.match(/<\w+.*placeholder=["']/)) {
      return true;
    }
    
    // Check if this is a legitimate TypeScript interface property
    if (trimmedLine.match(/^\s*placeholder\??\s*:\s*string/)) {
      return true;
    }
  }
  
  // TypeScript false positives
  if (type === 'typescript') {
    // Function signatures without body are OK in .d.ts files or interfaces
    if (filePath.endsWith('.d.ts') || trimmedLine.includes('interface') || trimmedLine.includes('declare')) {
      return true;
    }
    
    // Generic components with default props are OK
    if (trimmedLine.includes('= ""') && trimmedLine.includes('Props')) {
      return true;
    }
  }
  
  // File-specific exclusions
  if (filePath.includes('node_modules/') || 
      filePath.includes('.next/') ||
      filePath.includes('dist/') ||
      filePath.includes('build/')) {
    return true;
  }
  
  return false;
}

/**
 * Check a line against violation patterns
 */
function checkViolation(filePath, lineNumber, originalLine, trimmedLine, patterns, type, severity, rule) {
  patterns.forEach(pattern => {
    if (pattern.test(trimmedLine)) {
      // Check for false positives before adding violation
      if (!isFalsePositive(filePath, originalLine, type, pattern)) {
        violations.push({
          type,
          severity,
          file: filePath,
          line: lineNumber,
          content: originalLine.trim(),
          description: `RULE VIOLATION: ${rule}`,
          rule: rule
        });
      }
    }
  });
}

/**
 * Main audit function
 */
async function runAudit() {
  console.log(`${colors.cyan}${colors.bold}🔍 MIZAN CODE AUDIT - CORRECTED VERSION${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  const files = getFilesToScan();
  
  if (files.length === 0) {
    console.log(`${colors.yellow}⚠️  No files found to scan${colors.reset}`);
    
    // Create empty results for orchestrator
    const outputPath = 'scripts/violations.json';
    try {
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
    } catch (error) {
      console.warn(`Warning: Could not write ${outputPath}: ${error.message}`);
    }
    
    process.exit(0);
  }

  console.log(`📂 Scanning ${files.length} files...`);
  console.log(`📁 Patterns: ${SCAN_PATTERNS.join(', ')}`);
  console.log('');

  // Scan all files
  files.forEach(scanFile);

  // Group violations by severity
  const critical = violations.filter(v => v.severity === 'critical');
  const high = violations.filter(v => v.severity === 'high');
  const medium = violations.filter(v => v.severity === 'medium');
  const low = violations.filter(v => v.severity === 'low');

  // Report results
  if (violations.length === 0) {
    console.log(`${colors.green}${colors.bold}🎉 NO VIOLATIONS FOUND!${colors.reset}`);
    console.log(`${colors.green}✅ All ${filesScanned} files (${totalLines} lines) are clean!${colors.reset}\n`);
  } else {
    console.log(`${colors.red}${colors.bold}⚠️  FOUND ${violations.length} VIOLATIONS:${colors.reset}\n`);
    
    if (critical.length > 0) {
      console.log(`${colors.red}🔴 CRITICAL (${critical.length}):${colors.reset}`);
      critical.slice(0, 5).forEach((v, i) => {
        console.log(`   ${i + 1}. ${v.file}:${v.line}`);
        console.log(`      ${v.description}`);
        console.log(`      Code: ${v.content.substring(0, 80)}${v.content.length > 80 ? '...' : ''}\n`);
      });
      if (critical.length > 5) {
        console.log(`   ... and ${critical.length - 5} more critical violations\n`);
      }
    }
    
    if (high.length > 0) {
      console.log(`${colors.yellow}🟠 HIGH PRIORITY (${high.length}):${colors.reset}`);
      high.slice(0, 3).forEach((v, i) => {
        console.log(`   ${i + 1}. ${v.file}:${v.line}`);
        console.log(`      ${v.description}`);
        console.log(`      Code: ${v.content.substring(0, 80)}${v.content.length > 80 ? '...' : ''}\n`);
      });
      if (high.length > 3) {
        console.log(`   ... and ${high.length - 3} more high priority violations\n`);
      }
    }
    
    if (medium.length > 0) {
      console.log(`${colors.blue}🟡 MEDIUM PRIORITY (${medium.length}):${colors.reset}`);
      medium.slice(0, 3).forEach((v, i) => {
        console.log(`   ${i + 1}. ${v.file}:${v.line} - ${v.description}`);
      });
      if (medium.length > 3) {
        console.log(`   ... and ${medium.length - 3} more medium priority violations`);
      }
      console.log();
    }
    
    if (low.length > 0) {
      console.log(`${colors.blue}🔵 LOW PRIORITY (${low.length}):${colors.reset}`);
      console.log(`   Mostly TypeScript 'any' type usage\n`);
    }
  }

  // Save results for orchestrator
  const results = {
    summary: {
      timestamp: new Date().toISOString(),
      totalViolations: violations.length,
      criticalCount: critical.length,
      highCount: high.length,
      mediumCount: medium.length,
      lowCount: low.length,
      filesScanned,
      totalLines
    },
    violations
  };

  // Save to files
  try {
    if (!fs.existsSync('scripts')) {
      fs.mkdirSync('scripts', { recursive: true });
    }
    
    fs.writeFileSync('scripts/violations.json', JSON.stringify(violations, null, 2));
    fs.writeFileSync('scripts/audit-report.json', JSON.stringify(results, null, 2));
    console.log(`📁 Results saved to: scripts/violations.json & scripts/audit-report.json`);
  } catch (error) {
    console.error(`❌ Could not save results: ${error.message}`);
  }

  if (violations.length > 0) {
    console.log(`\n${colors.blue}🚀 Ready for 5-agent orchestrator processing!${colors.reset}\n`);
    // Exit with error code so orchestrator knows violations exist
    process.exit(1);
  } else {
    console.log(`\n${colors.green}🚀 No violations - orchestrator not needed!${colors.reset}\n`);
    process.exit(0);
  }
}

// Install required dependencies if missing
function checkDependencies() {
  try {
    require('glob');
  } catch (error) {
    console.log(`${colors.yellow}📦 Installing required dependency: glob${colors.reset}`);
    const { execSync } = require('child_process');
    try {
      execSync('npm install glob', { stdio: 'inherit' });
      console.log(`${colors.green}✅ Dependencies installed${colors.reset}\n`);
    } catch (installError) {
      console.error(`${colors.red}❌ Failed to install glob: ${installError.message}${colors.reset}`);
      console.log(`${colors.yellow}Please run: npm install glob${colors.reset}\n`);
      process.exit(1);
    }
  }
}

// Run the audit
if (require.main === module) {
  checkDependencies();
  runAudit().catch(error => {
    console.error(`${colors.red}💥 AUDIT CRASHED: ${error.message}${colors.reset}`);
    console.error(`${colors.red}Stack: ${error.stack}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { runAudit };