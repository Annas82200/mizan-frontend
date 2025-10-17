#!/usr/bin/env node

/**
 * MIZAN CODE VALIDATOR
 * 
 * Validates generated code against AGENT_CONTEXT_ULTIMATE.md requirements
 * Ensures 100% compliance before code is written to files
 * 
 * This module performs comprehensive checks on generated code:
 * - No 'any' types
 * - Tenant isolation present
 * - Error handling implemented
 * - No mock data or placeholders
 * - Three-Engine Architecture (for AI services)
 * - Production-ready patterns
 */

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
 * Check if 'any' type is allowed in this specific context
 * Generic components and utility functions may legitimately use 'any'
 */
function shouldAllowAnyType(code, match, fileName, matchIndex) {
  // Get surrounding context (200 chars before and after)
  const contextStart = Math.max(0, matchIndex - 200);
  const contextEnd = Math.min(code.length, matchIndex + 200);
  const context = code.substring(contextStart, contextEnd);
  
  // Allow for generic component props with explicit TypeScript generics
  if (fileName.includes('Component.tsx') || fileName.includes('Component.ts')) {
    // Check if this is part of a generic type parameter like <T = any>
    if (context.includes('<T =') || context.includes('<T=') || 
        context.match(/<[A-Z]\s*=\s*Record<string,\s*unknown>/)) {
      return true;
    }
    
    // Check if interface/type uses generic parameter T
    if (context.includes('interface') && context.includes('Props') && 
        (context.includes('<T>') || context.includes('<T = Record'))) {
      return true;
    }
  }
  
  // Allow for event handlers with unknown callback signatures
  if (context.includes('onClick') || context.includes('onChange') || 
      context.includes('onSubmit') || context.includes('callback')) {
    // But only if using proper TypeScript event types or generic T
    if (context.includes('Event') || context.includes('<T>') || 
        context.includes('unknown') || context.includes('Record')) {
      return true;
    }
  }
  
  // Allow for utility/helper functions explicitly marked as generic
  if (context.includes('generic') || context.includes('utility')) {
    return true;
  }
  
  // DO NOT allow 'any' anywhere else
  return false;
}

/**
 * Validate generated code against AGENT_CONTEXT_ULTIMATE.md rules
 */
function validateCode(code, fileName, codeType = 'general') {
  const violations = [];
  const warnings = [];
  
  // Check 1: No 'any' types (CRITICAL) - with context awareness
  const anyTypeRegex = /:\s*any[\s,\)\{]/g;
  const anyMatches = [...code.matchAll(anyTypeRegex)];
  const forbiddenAnyMatches = anyMatches.filter(m => 
    !shouldAllowAnyType(code, m, fileName, m.index)
  );
  
  if (forbiddenAnyMatches.length > 0) {
    violations.push({
      rule: 'STRICT_TYPESCRIPT_TYPES',
      severity: 'critical',
      type: 'any_types',
      count: forbiddenAnyMatches.length,
      message: `Found ${forbiddenAnyMatches.length} 'any' type(s) - FORBIDDEN by AGENT_CONTEXT_ULTIMATE.md`,
      locations: forbiddenAnyMatches.map(m => getLineNumber(code, m.index)),
      suggestion: 'Replace with specific TypeScript interfaces or use TypeScript generics like <T = Record<string, unknown>>'
    });
  }
  
  // If any types were allowed, add a warning
  const allowedCount = anyMatches.length - forbiddenAnyMatches.length;
  if (allowedCount > 0) {
    warnings.push({
      rule: 'TYPESCRIPT_GENERICS',
      severity: 'info',
      type: 'allowed_any_types',
      count: allowedCount,
      message: `Allowed ${allowedCount} 'any' type(s) in generic/component context`,
      suggestion: 'Consider using TypeScript generics <T> for better type safety'
    });
  }
  
  // Check 2: Tenant isolation (CRITICAL for backend code)
  if (codeType === 'backend' || fileName.includes('routes') || fileName.includes('service')) {
    const hasDatabaseQuery = code.includes('db.select') || code.includes('db.insert') || 
                            code.includes('db.update') || code.includes('db.delete');
    const hasTenantIsolation = code.includes('tenantId') && code.includes('eq(');
    
    if (hasDatabaseQuery && !hasTenantIsolation) {
      violations.push({
        rule: 'TENANT_ISOLATION',
        severity: 'critical',
        type: 'missing_tenant_isolation',
        message: 'Database queries must include tenantId filtering - REQUIRED for multi-tenant isolation',
        suggestion: 'Add: .where(eq(table.tenantId, user.tenantId))'
      });
    }
  }
  
  // Check 3: Error handling for async functions (CRITICAL)
  const asyncFunctionRegex = /async\s+(?:function\s+\w+|[\w]+)\s*\(/g;
  const asyncMatches = [...code.matchAll(asyncFunctionRegex)];
  const tryCatchRegex = /try\s*\{/g;
  const tryCatchMatches = [...code.matchAll(tryCatchRegex)];
  
  if (asyncMatches.length > 0 && tryCatchMatches.length < asyncMatches.length) {
    violations.push({
      rule: 'ERROR_HANDLING',
      severity: 'critical',
      type: 'missing_error_handling',
      message: `Found ${asyncMatches.length} async function(s) but only ${tryCatchMatches.length} try-catch block(s)`,
      suggestion: 'Wrap all async operations in try-catch blocks'
    });
  }
  
  // Check 4: No mock data or placeholders (CRITICAL)
  const forbiddenPatterns = [
    { pattern: /mock\s*(?:data|user|response)/gi, name: 'mock data' },
    { pattern: /placeholder|TODO|FIXME|@ts-ignore/gi, name: 'placeholders/TODOs' },
    { pattern: /\bany\s*=\s*['"]sample/gi, name: 'sample data' },
    { pattern: /\/\/\s*TODO:/gi, name: 'TODO comments' }
  ];
  
  for (const { pattern, name } of forbiddenPatterns) {
    const matches = [...code.matchAll(pattern)];
    if (matches.length > 0) {
      violations.push({
        rule: 'NO_MOCK_DATA',
        severity: 'critical',
        type: 'mock_or_placeholder',
        pattern: name,
        count: matches.length,
        message: `Found ${matches.length} instance(s) of ${name} - FORBIDDEN`,
        locations: matches.map(m => getLineNumber(code, m.index)),
        matches: matches.map(m => ({
          text: m[0],
          line: getLineNumber(code, m.index),
          context: getLineContext(code, m.index)
        }))
      });
    }
  }
  
  // Check 5: Three-Engine Architecture (for AI services)
  if (codeType === 'service' && (fileName.includes('agent') || fileName.includes('Service'))) {
    const hasKnowledgeEngine = code.includes('KnowledgeEngine') || code.includes('knowledgeEngine');
    const hasDataEngine = code.includes('DataEngine') || code.includes('dataEngine');
    const hasReasoningEngine = code.includes('ReasoningEngine') || code.includes('reasoningEngine');
    
    if (!hasKnowledgeEngine || !hasDataEngine || !hasReasoningEngine) {
      violations.push({
        rule: 'THREE_ENGINE_ARCHITECTURE',
        severity: 'high',
        type: 'missing_three_engine',
        message: 'AI services must implement Three-Engine Architecture (Knowledge + Data + Reasoning)',
        missing: [
          !hasKnowledgeEngine && 'KnowledgeEngine',
          !hasDataEngine && 'DataEngine',
          !hasReasoningEngine && 'ReasoningEngine'
        ].filter(Boolean)
      });
    }
  }
  
  // Check 6: Proper imports and dependencies
  if (code.includes('db.') && !code.includes('import') && !code.includes('from') && !code.includes('db/')) {
    warnings.push({
      rule: 'IMPORTS',
      severity: 'medium',
      type: 'missing_imports',
      message: 'Database operations found but imports may be missing',
      suggestion: 'Verify: import { db } from \'@/db\' or similar'
    });
  }
  
  // Check 7: Zod validation (for API routes)
  if ((codeType === 'backend' || fileName.includes('route')) && code.includes('req.body')) {
    const hasZodValidation = code.includes('zod') || code.includes('.parse(') || code.includes('schema');
    
    if (!hasZodValidation) {
      warnings.push({
        rule: 'INPUT_VALIDATION',
        severity: 'high',
        type: 'missing_validation',
        message: 'API routes should validate input with Zod schemas',
        suggestion: 'Add Zod schema validation for request body'
      });
    }
  }
  
  // Check 8: Production-ready patterns
  const productionChecks = {
    hasProperLogging: code.includes('console.error') || code.includes('logger'),
    hasProperTyping: !code.includes('as any') && !code.includes('// @ts-ignore'),
    noHardcodedValues: !code.includes('localhost') && !code.includes('127.0.0.1'),
    hasEnvironmentVars: code.includes('process.env') || !code.includes('api_key')
  };
  
  for (const [check, passes] of Object.entries(productionChecks)) {
    if (!passes) {
      warnings.push({
        rule: 'PRODUCTION_READY',
        severity: 'medium',
        type: check,
        message: `Production pattern check failed: ${check}`
      });
    }
  }
  
  // Calculate compliance score
  const criticalViolations = violations.filter(v => v.severity === 'critical').length;
  const highViolations = violations.filter(v => v.severity === 'high').length;
  const totalIssues = violations.length + warnings.length;
  
  // Compliance formula: Start at 100, deduct points
  let complianceScore = 100;
  complianceScore -= criticalViolations * 25; // Critical = -25 points each
  complianceScore -= highViolations * 10;     // High = -10 points each
  complianceScore -= warnings.length * 5;     // Warning = -5 points each
  complianceScore = Math.max(0, complianceScore);
  
  const result = {
    compliant: violations.length === 0,
    complianceScore,
    violations,
    warnings,
    summary: {
      totalIssues,
      critical: criticalViolations,
      high: highViolations,
      warnings: warnings.length,
      linesOfCode: code.split('\n').length
    }
  };
  
  return result;
}

/**
 * Get line number for a string position
 */
function getLineNumber(code, position) {
  const lines = code.substring(0, position).split('\n');
  return lines.length;
}

/**
 * Get the full line of code where the violation occurs
 */
function getLineContext(code, position) {
  const lines = code.split('\n');
  const lineNumber = getLineNumber(code, position);
  if (lineNumber > 0 && lineNumber <= lines.length) {
    return lines[lineNumber - 1].trim();
  }
  return '';
}

/**
 * Print validation results
 */
function printValidationResults(results, fileName) {
  console.log(`\n${colors.cyan}╔═══════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║           CODE VALIDATION REPORT: ${fileName.padEnd(30, ' ')} ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  // Compliance score
  const scoreColor = results.complianceScore === 100 ? colors.green :
                     results.complianceScore >= 80 ? colors.yellow : colors.red;
  console.log(`${colors.bold}Compliance Score: ${scoreColor}${results.complianceScore}%${colors.reset}`);
  console.log(`Status: ${results.compliant ? colors.green + '✅ COMPLIANT' : colors.red + '❌ NON-COMPLIANT'}${colors.reset}\n`);
  
  // Summary
  console.log(`${colors.blue}Summary:${colors.reset}`);
  console.log(`  Total Issues: ${results.summary.totalIssues}`);
  console.log(`  Critical: ${colors.red}${results.summary.critical}${colors.reset}`);
  console.log(`  High: ${colors.yellow}${results.summary.high}${colors.reset}`);
  console.log(`  Warnings: ${colors.yellow}${results.summary.warnings}${colors.reset}`);
  console.log(`  Lines of Code: ${results.summary.linesOfCode}\n`);
  
  // Critical violations
  if (results.violations.length > 0) {
    console.log(`${colors.red}${colors.bold}VIOLATIONS (Must Fix):${colors.reset}`);
    results.violations.forEach((v, i) => {
      console.log(`\n${i + 1}. ${colors.red}[${v.severity.toUpperCase()}]${colors.reset} ${v.rule}`);
      console.log(`   ${colors.red}✗${colors.reset} ${v.message}`);
      if (v.count) console.log(`   Count: ${v.count}`);
      if (v.locations) console.log(`   Lines: ${v.locations.join(', ')}`);
      if (v.suggestion) console.log(`   ${colors.cyan}→ ${v.suggestion}${colors.reset}`);
    });
    console.log();
  }
  
  // Warnings
  if (results.warnings.length > 0) {
    console.log(`${colors.yellow}${colors.bold}WARNINGS (Recommended):${colors.reset}`);
    results.warnings.forEach((w, i) => {
      console.log(`\n${i + 1}. ${colors.yellow}[${w.severity.toUpperCase()}]${colors.reset} ${w.rule}`);
      console.log(`   ${colors.yellow}⚠${colors.reset} ${w.message}`);
      if (w.suggestion) console.log(`   ${colors.cyan}→ ${w.suggestion}${colors.reset}`);
    });
    console.log();
  }
  
  // Final verdict
  if (results.compliant) {
    console.log(`${colors.green}${colors.bold}✅ CODE IS 100% COMPLIANT WITH AGENT_CONTEXT_ULTIMATE.md${colors.reset}\n`);
  } else {
    console.log(`${colors.red}${colors.bold}❌ CODE MUST BE FIXED BEFORE DEPLOYMENT${colors.reset}\n`);
  }
}

/**
 * Enhanced validation with context awareness
 */
function validateWithContext(code, fileName, agentContext) {
  // Determine code type from file path
  let codeType = 'general';
  if (fileName.includes('/routes/')) codeType = 'backend';
  if (fileName.includes('/services/')) codeType = 'service';
  if (fileName.includes('/components/')) codeType = 'frontend';
  if (fileName.includes('/db/schema/')) codeType = 'schema';
  
  // Run validation
  const results = validateCode(code, fileName, codeType);
  
  // Add context-specific checks
  if (codeType === 'service' && agentContext) {
    // Check if service matches workflow in context
    const workflowMatch = agentContext.match(new RegExp(`${fileName}.*?workflow`, 'i'));
    if (!workflowMatch) {
      results.warnings.push({
        rule: 'CONTEXT_ALIGNMENT',
        severity: 'medium',
        type: 'workflow_mismatch',
        message: 'Service implementation may not match documented workflow'
      });
    }
  }
  
  return results;
}

module.exports = {
  validateCode,
  validateWithContext,
  printValidationResults
};

// CLI support
if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`${colors.cyan}Usage: node code-validator.js <file-to-validate>${colors.reset}`);
    console.log(`Example: node code-validator.js ../../backend/src/routes/culture.ts`);
    process.exit(1);
  }
  
  const filePath = args[0];
  
  if (!fs.existsSync(filePath)) {
    console.error(`${colors.red}Error: File not found: ${filePath}${colors.reset}`);
    process.exit(1);
  }
  
  const code = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  const results = validateCode(code, fileName);
  printValidationResults(results, fileName);
  
  process.exit(results.compliant ? 0 : 1);
}

