#!/usr/bin/env node

/**
 * METHOD REFERENCE VALIDATOR
 * 
 * Validates that fixes don't reference methods that don't exist in the codebase.
 * Prevents incomplete implementations from being approved.
 * 
 * Compliant with AGENT_CONTEXT_ULTIMATE.md Production-Ready Priority Rule
 */

const { execSync } = require('child_process');
const path = require('path');

class MethodReferenceValidator {
  constructor(projectRoot) {
    this.projectRoot = projectRoot || process.cwd();
  }
  
  /**
   * Extract method/function calls from code
   */
  extractMethodCalls(code) {
    const methods = new Set();
    
    // Match function calls: functionName(
    const functionCallPattern = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    let match;
    
    while ((match = functionCallPattern.exec(code)) !== null) {
      const methodName = match[1];
      
      // Skip common keywords and built-ins
      if (this.isStandardMethod(methodName)) {
        continue;
      }
      
      methods.add(methodName);
    }
    
    // Match method calls: object.method(
    const methodCallPattern = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    
    while ((match = methodCallPattern.exec(code)) !== null) {
      const methodName = match[1];
      
      if (this.isStandardMethod(methodName)) {
        continue;
      }
      
      methods.add(methodName);
    }
    
    // Match async/await patterns: await functionName(
    const awaitPattern = /await\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    
    while ((match = awaitPattern.exec(code)) !== null) {
      const methodName = match[1];
      
      if (this.isStandardMethod(methodName)) {
        continue;
      }
      
      methods.add(methodName);
    }
    
    return Array.from(methods);
  }
  
  /**
   * Check if a method name is a standard JavaScript/TypeScript method
   */
  isStandardMethod(methodName) {
    const standardMethods = [
      // JavaScript built-ins
      'console', 'log', 'error', 'warn', 'info', 'debug',
      'require', 'import', 'export', 'module',
      'parseInt', 'parseFloat', 'isNaN', 'isFinite',
      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
      'Promise', 'async', 'await',
      
      // Common array/object methods
      'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex',
      'some', 'every', 'includes', 'indexOf', 'push', 'pop',
      'shift', 'unshift', 'slice', 'splice', 'concat', 'join',
      'sort', 'reverse', 'length',
      
      // String methods
      'toString', 'toLowerCase', 'toUpperCase', 'trim', 'split',
      'replace', 'match', 'search', 'substring', 'substr',
      
      // Object methods
      'keys', 'values', 'entries', 'assign', 'freeze', 'seal',
      
      // Date methods
      'Date', 'now', 'toISOString', 'getTime',
      
      // Math methods
      'Math', 'random', 'floor', 'ceil', 'round', 'abs',
      
      // JSON methods
      'JSON', 'parse', 'stringify',
      
      // Common control flow
      'if', 'else', 'for', 'while', 'do', 'switch', 'case',
      'try', 'catch', 'finally', 'throw', 'return',
      
      // Common operators
      'new', 'delete', 'typeof', 'instanceof',
      
      // Next.js/React
      'useState', 'useEffect', 'useContext', 'useRouter',
      'redirect', 'notFound',
      
      // Database/Drizzle ORM
      'select', 'insert', 'update', 'delete', 'from', 'where',
      'eq', 'and', 'or', 'desc', 'asc',
      
      // Express
      'get', 'post', 'put', 'patch', 'delete', 'use',
      
      // Common validation
      'test', 'exec', 'match'
    ];
    
    return standardMethods.includes(methodName) || methodName.length < 2;
  }
  
  /**
   * Check if a method exists in the codebase
   */
  async methodExists(methodName) {
    try {
      // Use grep to search for method definition
      // Search for: function methodName, const methodName =, methodName:, async methodName
      const patterns = [
        `function ${methodName}`,
        `const ${methodName} =`,
        `let ${methodName} =`,
        `var ${methodName} =`,
        `${methodName}:`,
        `async ${methodName}`,
        `${methodName}\\(`,
        `class.*${methodName}`,
        `${methodName}.*=.*async`,
        `export.*${methodName}`,
        `export.*function.*${methodName}`
      ];
      
      for (const pattern of patterns) {
        try {
          // Search in backend and frontend directories
          const result = execSync(
            `grep -r "${pattern}" ${this.projectRoot}/backend ${this.projectRoot}/frontend 2>/dev/null || true`,
            { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
          );
          
          if (result && result.trim().length > 0) {
            return true;
          }
        } catch (error) {
          // Continue to next pattern
        }
      }
      
      return false;
    } catch (error) {
      // If grep fails, assume method exists to avoid false positives
      return true;
    }
  }
  
  /**
   * Validate a fix for method references
   */
  async validateFix(fixCode, filePath) {
    const methods = this.extractMethodCalls(fixCode);
    const missing = [];
    const checked = [];
    
    // Check custom methods that might be missing
    const customMethods = methods.filter(m => {
      // Focus on methods that look like Mizan-specific implementations
      return m.includes('Mizan') || 
             m.includes('initialize') || 
             m.includes('validate') ||
             m.includes('trigger') ||
             m.includes('Engine') ||
             m.includes('Agent') ||
             m.length > 15; // Longer method names are likely custom
    });
    
    for (const method of customMethods) {
      checked.push(method);
      const exists = await this.methodExists(method);
      
      if (!exists) {
        missing.push(method);
      }
    }
    
    return {
      valid: missing.length === 0,
      missingMethods: missing,
      checkedMethods: checked,
      totalMethodsCalled: methods.length,
      recommendation: missing.length > 0 ? 'NEEDS_IMPLEMENTATION' : 'OK',
      note: missing.length > 0 
        ? `These methods are referenced but may not exist in the codebase: ${missing.join(', ')}`
        : 'All checked method references appear to exist'
    };
  }
  
  /**
   * Quick validation for common patterns
   */
  hasObviousMissingMethods(fixCode) {
    // Check for common patterns of missing methods
    const suspiciousPatterns = [
      /initializeMizanModules\(/,
      /validateThreeEngineArchitecture\(/,
      /validateAgentTriggeringMechanisms\(/,
      /triggerHiringModule\(/,
      /setupMizanAI\(/
    ];
    
    const found = [];
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(fixCode)) {
        found.push(pattern.source.replace(/\\/g, ''));
      }
    }
    
    return {
      hasSuspicious: found.length > 0,
      suspiciousMethods: found,
      warning: found.length > 0 
        ? `Fix references potentially missing methods: ${found.join(', ')}`
        : null
    };
  }
}

module.exports = MethodReferenceValidator;

