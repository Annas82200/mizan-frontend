#!/usr/bin/env node

/**
 * MIZAN VIOLATION DETECTOR v2.1 (FIXED FOR MONOREPO)
 * 
 * This script scans your codebase for violations of Mizan development rules.
 * NOW CORRECTLY HANDLES frontend/ and backend/ subdirectories!
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Load configuration
const configPath = path.join(process.cwd(), '.audit-config.json');
let config;

try {
  const configContent = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configContent);
  console.log(`${colors.blue}📋 Loaded configuration: ${config.projectName}${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}❌ Error: Could not find .audit-config.json${colors.reset}`);
  console.error(`${colors.yellow}Make sure you're running this from the project root.${colors.reset}`);
  process.exit(1);
}

// Storage for violations
const violations = [];
let filesScanned = 0;
let totalLines = 0;

/**
 * Recursively scan a directory for files
 * FIXED: Now preserves full path relative to project root
 */
function scanDirectory(dir) {
  let files;
  
  try {
    files = fs.readdirSync(dir);
  } catch (error) {
    console.warn(`${colors.yellow}⚠️  Cannot read directory: ${dir}${colors.reset}`);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(dir, file);
    // FIXED: Get path relative to PROJECT ROOT, not scan directory
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Skip excluded paths
    const shouldExclude = config.excludePaths.some(excluded => 
      relativePath.includes(excluded)
    );
    
    if (shouldExclude) {
      return;
    }

    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch (error) {
      return;
    }

    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      scanDirectory(filePath);
    } else {
      // Check if file extension is in our list
      const ext = path.extname(file);
      if (config.fileExtensions.includes(ext)) {
        scanFile(filePath, relativePath);
      }
    }
  });
}

/**
 * Scan a single file for violations
 * FIXED: Now uses correct relativePath from project root
 */
function scanFile(filePath, relativePath) {
  filesScanned++;
  
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`${colors.yellow}⚠️  Cannot read file: ${filePath}${colors.reset}`);
    return;
  }

  const lines = content.split('\n');
  totalLines += lines.length;

  // Check each rule
  Object.entries(config.rules).forEach(([ruleName, rule]) => {
    if (!rule.enabled) return;

    rule.patterns.forEach(pattern => {
      const regex = new RegExp(pattern, 'gi');
      
      lines.forEach((line, index) => {
        const matches = line.match(regex);
        if (matches) {
          // Check for exceptions
          let isException = false;
          if (rule.exceptions) {
            isException = rule.exceptions.some(exceptionPattern => {
              const exceptionRegex = new RegExp(exceptionPattern, 'gi');
              return exceptionRegex.test(line);
            });
          }
          
          if (!isException) {
            violations.push({
              file: relativePath,  // ✅ NOW CORRECT: Relative to project root!
              line: index + 1,
              content: line.trim(),
              rule: ruleName,
              severity: rule.severity,
              message: rule.message,
              pattern: pattern,
              priority: rule.priority || 'medium'
            });
          }
        }
      });
    });
  });
}

/**
 * Calculate code quality score
 */
function calculateScore() {
  const scoring = config.scoring;
  
  const critical = violations.filter(v => v.priority === 'critical');
  const high = violations.filter(v => v.priority === 'high');
  const medium = violations.filter(v => v.priority === 'medium');
  const low = violations.filter(v => v.priority === 'low');
  
  const criticalPenalty = critical.length * scoring.criticalWeight;
  const highPenalty = high.length * scoring.highWeight;
  const mediumPenalty = medium.length * scoring.mediumWeight;
  const lowPenalty = low.length * scoring.lowWeight;
  
  const totalPenalty = criticalPenalty + highPenalty + mediumPenalty + lowPenalty;
  const score = Math.max(0, scoring.maxScore - totalPenalty);
  
  return {
    score,
    critical: critical.length,
    high: high.length,
    medium: medium.length,
    low: low.length,
    totalViolations: violations.length,
    breakdown: {
      criticalPenalty,
      highPenalty,
      mediumPenalty,
      lowPenalty,
      totalPenalty
    }
  };
}

/**
 * Print results to console
 */
function printResults() {
  console.log(`${colors.cyan}${colors.bold}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}   MIZAN CODE AUDIT RESULTS${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}═══════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.blue}📊 Scan Summary:${colors.reset}`);
  console.log(`   Files scanned: ${filesScanned}`);
  console.log(`   Lines scanned: ${totalLines.toLocaleString()}`);
  console.log('');

  if (violations.length === 0) {
    console.log(`${colors.green}${colors.bold}✅ NO VIOLATIONS FOUND!${colors.reset}`);
    console.log(`${colors.green}Your code follows all Mizan development rules.${colors.reset}\n`);
    
    const { score } = calculateScore();
    console.log(`${colors.green}${colors.bold}💯 Code Quality Score: ${score}/100${colors.reset}\n`);
    return;
  }

  // Group violations by priority
  const critical = violations.filter(v => v.priority === 'critical');
  const high = violations.filter(v => v.priority === 'high');
  const medium = violations.filter(v => v.priority === 'medium');
  const low = violations.filter(v => v.priority === 'low');

  // Print critical violations
  if (critical.length > 0) {
    console.log(`${colors.red}${colors.bold}🔴 CRITICAL VIOLATIONS (${critical.length}):${colors.reset}\n`);
    
    critical.slice(0, 10).forEach((violation, index) => {
      console.log(`${colors.red}${index + 1}. ${violation.file}:${violation.line}${colors.reset}`);
      console.log(`   ${colors.yellow}→ ${violation.message}${colors.reset}`);
      console.log(`   ${colors.magenta}Code: ${violation.content}${colors.reset}`);
      console.log('');
    });
    
    if (critical.length > 10) {
      console.log(`${colors.yellow}   ... and ${critical.length - 10} more critical violations${colors.reset}\n`);
    }
  }

  // Print high priority violations
  if (high.length > 0) {
    console.log(`${colors.red}${colors.bold}🟠 HIGH PRIORITY VIOLATIONS (${high.length}):${colors.reset}\n`);
    
    high.slice(0, 5).forEach((violation, index) => {
      console.log(`${colors.red}${index + 1}. ${violation.file}:${violation.line}${colors.reset}`);
      console.log(`   ${colors.yellow}→ ${violation.message}${colors.reset}`);
      console.log(`   ${colors.magenta}Code: ${violation.content}${colors.reset}`);
      console.log('');
    });
    
    if (high.length > 5) {
      console.log(`${colors.yellow}   ... and ${high.length - 5} more high priority violations${colors.reset}\n`);
    }
  }

  // Print summary for medium and low
  if (medium.length > 0) {
    console.log(`${colors.yellow}🟡 Medium Priority: ${medium.length} violations${colors.reset}`);
  }
  
  if (low.length > 0) {
    console.log(`${colors.yellow}⚪ Low Priority: ${low.length} violations${colors.reset}`);
  }
  
  if (medium.length > 0 || low.length > 0) {
    console.log(`${colors.blue}   (See audit-report.json for full details)${colors.reset}\n`);
  }

  // Calculate and print score
  const { score, critical: critCount, high: highCount, medium: medCount, low: lowCount, totalViolations, breakdown } = calculateScore();
  
  console.log(`${colors.cyan}${colors.bold}═══════════════════════════════════════════════════════${colors.reset}\n`);
  console.log(`${colors.bold}📊 Code Quality Score: ${score}/100${colors.reset}`);
  console.log(`   🔴 Critical: ${critCount} (-${breakdown.criticalPenalty} points)`);
  console.log(`   🟠 High: ${highCount} (-${breakdown.highPenalty} points)`);
  console.log(`   🟡 Medium: ${medCount} (-${breakdown.mediumPenalty} points)`);
  console.log(`   ⚪ Low: ${lowCount} (-${breakdown.lowPenalty} points)`);
  console.log(`   Total violations: ${totalViolations}`);
  console.log('');

  // Determine pass/fail
  const thresholds = config.scoring.thresholds;
  
  if (score >= thresholds.excellent) {
    console.log(`${colors.green}${colors.bold}✅ EXCELLENT - AUDIT PASSED${colors.reset}`);
    console.log(`${colors.green}Outstanding code quality!${colors.reset}\n`);
    process.exit(0);
  } else if (score >= thresholds.good) {
    console.log(`${colors.green}${colors.bold}✅ GOOD - AUDIT PASSED${colors.reset}`);
    console.log(`${colors.green}Good code quality with minor issues.${colors.reset}\n`);
    process.exit(0);
  } else if (score >= thresholds.acceptable) {
    console.log(`${colors.yellow}${colors.bold}⚠️  ACCEPTABLE - AUDIT PASSED WITH WARNINGS${colors.reset}`);
    console.log(`${colors.yellow}Consider fixing priority issues.${colors.reset}\n`);
    process.exit(0);
  } else if (score >= thresholds.poor) {
    console.log(`${colors.red}${colors.bold}⚠️  POOR - REVIEW NEEDED${colors.reset}`);
    console.log(`${colors.red}Significant issues found. Fix critical and high priority violations.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.red}${colors.bold}❌ CRITICAL - AUDIT FAILED${colors.reset}`);
    console.log(`${colors.red}Fix critical violations before committing code.${colors.reset}\n`);
    process.exit(1);
  }
}

/**
 * Save violations to JSON file
 */
function saveReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: calculateScore(),
    violations: violations,
    filesScanned,
    totalLines
  };

  const reportPath = path.join(process.cwd(), 'scripts', 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`${colors.blue}📄 Detailed report saved to: scripts/audit-report.json${colors.reset}\n`);
}

// MAIN EXECUTION
console.log(`${colors.cyan}${colors.bold}🔍 Starting Mizan Code Audit...${colors.reset}\n`);

const startTime = Date.now();

// Scan frontend and backend
const foldersToScan = ['frontend/src', 'backend'];

foldersToScan.forEach(folder => {
  const folderPath = path.join(process.cwd(), folder);
  if (fs.existsSync(folderPath)) {
    console.log(`${colors.blue}Scanning: ${folder}${colors.reset}`);
    scanDirectory(folderPath);
  } else {
    console.log(`${colors.yellow}⚠️  Folder not found: ${folder}${colors.reset}`);
  }
});

const endTime = Date.now();
const duration = ((endTime - startTime) / 1000).toFixed(2);

console.log(`${colors.green}✓ Scan completed in ${duration}s${colors.reset}\n`);

// Save report
saveReport();

// Print results
printResults();