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
 */
const MOCK_DATA_PATTERNS = [
  // Mock data declarations
  /const\s+mock\w*/i,
  /let\s+mock\w*/i,
  /var\s+mock\w*/i,
  
  // Example names from the rules
  /"john\.?doe"/i,
  /"jane\.?smith"/i,
  /'john\.?doe'/i,
  /'jane\.?smith'/i,
  
  // Example domains
  /example\.com/,
  /test@test\./,
  /@example\./,
  
  // Mock data structures
  /mockData/i,
  /mockUser/i,
  /mockResponse/i,
  /fake.*data/i,
  /dummy.*data/i,
  /placeholder.*data/i,
  /sample.*data/i,
  
  // Array patterns with mock data (from the rules)
  /\[\s*\{\s*id:\s*1\s*,/,
  /\[\s*\{\s*name:\s*["'].*["']\s*,.*email:\s*["'].*@.*["']/
];

/**
 * RULE 2: NO TODO COMMENTS OR PLACEHOLDERS
 * FIXED: No longer includes console.log as violation
 */
const PLACEHOLDER_PATTERNS = [
  // TODO comments (explicitly forbidden)
  /\/\/\s*TODO/i,
  /\/\/\s*FIXME/i,
  /\/\/\s*HACK/i,
  /\/\/\s*XXX/i,
  
  // Placeholder comments
  /\/\/.*implement.*later/i,
  /\/\/.*placeholder/i,
  /\/\/.*replace.*with/i,
  /\/\/.*coming.*soon/i,
  /\/\/.*phase.*2/i,
  
  // REMOVED: console.log is legitimate logging, NOT a placeholder!
  // /console\.log\(/,  ← THIS WAS THE PROBLEM!
  
  // Error throws for unimplemented features
  /throw\s+new\s+Error\s*\(\s*["']Not\s+implemented/i,
  /throw\s+new\s+Error\s*\(\s*["']TODO/i,
  
  // Actual placeholders in strings
  /["']placeholder["']/i,
  /["'].*coming\s+soon.*["']/i
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
  /<any>/
];

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
      checkViolation(filePath, lineNumber, line, trimmedLine, PLACEHOLDER_PATTERNS, 'placeholder', 'critical', 'NO TODO COMMENTS OR PLACEHOLDERS');
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
 * Check a line against violation patterns
 */
function checkViolation(filePath, lineNumber, originalLine, trimmedLine, patterns, type, severity, rule) {
  patterns.forEach(pattern => {
    if (pattern.test(trimmedLine)) {
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