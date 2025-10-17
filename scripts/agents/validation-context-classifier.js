#!/usr/bin/env node

/**
 * VALIDATION CONTEXT CLASSIFIER
 * 
 * Prevents false positives by classifying code context:
 * - Detection/Audit code (validation scripts that contain patterns intentionally)
 * - Infrastructure code (business logic that doesn't need Three-Engine Architecture)
 * - AI Analysis features (requires Three-Engine Architecture)
 * 
 * Compliant with AGENT_CONTEXT_ULTIMATE.md
 */

const VALIDATION_CONTEXT_CLASSIFIER = {
  // Detection/Audit Scripts - These INTENTIONALLY contain validation patterns
  DETECTION_PATTERNS: [
    /violations\.js$/,
    /audit.*\.js$/,
    /lint.*\.js$/,
    /validator.*\.js$/,
    /checker.*\.js$/,
    /pipeline.*\.js$/,
    /mizan-pipeline\.js$/,
    /orchestrator.*\.js$/,
    /confidence.*\.js$/,
    /human-review\.js$/,
    /apply-fixes\.js$/
  ],
  
  // Infrastructure Code - Business logic that doesn't require AI engines
  INFRASTRUCTURE_PATTERNS: [
    // Payment and billing
    /stripe/i,
    /payment/i,
    /billing/i,
    
    // Authentication and authorization
    /auth.*service/i,
    /auth.*middleware/i,
    /auth\.ts$/,
    /authentication/i,
    
    // File operations
    /upload.*service/i,
    /upload\.ts$/,
    /file.*service/i,
    /export\.ts$/,
    
    // Database operations
    /migration/i,
    /schema/i,
    /\.schema\.ts$/,
    /drizzle/i,
    
    // Middleware and utilities
    /middleware/i,
    /utils/i,
    /logger/i,
    /health-check/i,
    /monitoring/i,
    
    // LinkedIn integration (business logic, not AI)
    /linkedin.*service/i,
    /social.*media/i
  ],
  
  // AI Analysis Features - MUST use Three-Engine Architecture
  AI_FEATURES: [
    // Core analysis services
    /culture.*service/i,
    /culture.*agent/i,
    /recognition.*service/i,
    /recognition.*agent/i,
    /engagement.*service/i,
    /engagement.*agent/i,
    /skills.*service/i,
    /skills.*agent/i,
    /performance.*service/i,
    /performance.*agent/i,
    /hiring.*service/i,
    /hiring.*agent/i,
    /structure.*service/i,
    /structure.*agent/i,
    
    // AI engines themselves
    /knowledge.*engine/i,
    /data.*engine/i,
    /reasoning.*engine/i,
    
    // AI modules
    /modules\/.*Module\.ts$/,
    /architect-ai/i,
    /automated-flow/i,
    /trigger-engine/i
  ],
  
  // Frontend components (different validation criteria)
  FRONTEND_COMPONENTS: [
    /frontend\/src\/components/i,
    /frontend\/src\/app/i,
    /\.tsx$/
  ],
  
  /**
   * Classify a file path into its context category
   */
  classify(filePath) {
    if (this.isDetectionCode(filePath)) {
      return {
        type: 'DETECTION_CODE',
        requiresThreeEngine: false,
        requiresTenantIsolation: false,
        canContainValidationPatterns: true,
        description: 'Detection/audit script that intentionally contains validation patterns'
      };
    }
    
    if (this.isInfrastructureCode(filePath)) {
      return {
        type: 'INFRASTRUCTURE_CODE',
        requiresThreeEngine: false,
        requiresTenantIsolation: true,
        canContainValidationPatterns: false,
        description: 'Business logic/infrastructure code (payment, auth, uploads, etc.)'
      };
    }
    
    if (this.requiresThreeEngine(filePath)) {
      return {
        type: 'AI_FEATURE',
        requiresThreeEngine: true,
        requiresTenantIsolation: true,
        canContainValidationPatterns: false,
        description: 'AI analysis feature requiring Three-Engine Architecture'
      };
    }
    
    if (this.isFrontendComponent(filePath)) {
      return {
        type: 'FRONTEND_COMPONENT',
        requiresThreeEngine: false,
        requiresTenantIsolation: false,
        canContainValidationPatterns: false,
        description: 'Frontend React component'
      };
    }
    
    // Default classification
    return {
      type: 'GENERAL_CODE',
      requiresThreeEngine: false,
      requiresTenantIsolation: true,
      canContainValidationPatterns: false,
      description: 'General application code'
    };
  },
  
  /**
   * Check if file is detection/audit code
   */
  isDetectionCode(filePath) {
    return this.DETECTION_PATTERNS.some(pattern => pattern.test(filePath));
  },
  
  /**
   * Check if file is infrastructure code
   */
  isInfrastructureCode(filePath) {
    return this.INFRASTRUCTURE_PATTERNS.some(pattern => pattern.test(filePath));
  },
  
  /**
   * Check if file requires Three-Engine Architecture
   */
  requiresThreeEngine(filePath) {
    return this.AI_FEATURES.some(pattern => pattern.test(filePath));
  },
  
  /**
   * Check if file is frontend component
   */
  isFrontendComponent(filePath) {
    return this.FRONTEND_COMPONENTS.some(pattern => pattern.test(filePath));
  },
  
  /**
   * Get validation criteria for a file based on its context
   */
  getValidationCriteria(filePath) {
    const classification = this.classify(filePath);
    
    switch (classification.type) {
      case 'DETECTION_CODE':
        return {
          strictTypes: true,
          errorHandling: true,
          tenantIsolation: false,
          threeEngineArchitecture: false,
          allowValidationPatterns: true,
          note: 'This is detection code. Patterns like /mockData/i or strings "placeholder" are INTENTIONAL for detection purposes, not violations.'
        };
      
      case 'INFRASTRUCTURE_CODE':
        return {
          strictTypes: true,
          errorHandling: true,
          tenantIsolation: true,
          threeEngineArchitecture: false,
          allowValidationPatterns: false,
          note: 'This is infrastructure code. Three-Engine Architecture is NOT required. Validate types, error handling, security, and tenant isolation only.'
        };
      
      case 'AI_FEATURE':
        return {
          strictTypes: true,
          errorHandling: true,
          tenantIsolation: true,
          threeEngineArchitecture: true,
          allowValidationPatterns: false,
          agentTriggering: true,
          moduleIntegration: true,
          note: 'This is an AI analysis feature. MUST use Three-Engine Architecture, maintain agent triggering, and preserve cross-module workflows.'
        };
      
      case 'FRONTEND_COMPONENT':
        return {
          strictTypes: true,
          errorHandling: true,
          tenantIsolation: false,
          threeEngineArchitecture: false,
          allowValidationPatterns: false,
          note: 'This is a frontend component. Validate React patterns, TypeScript types, and user experience.'
        };
      
      default:
        return {
          strictTypes: true,
          errorHandling: true,
          tenantIsolation: true,
          threeEngineArchitecture: false,
          allowValidationPatterns: false,
          note: 'General application code. Apply standard validation criteria.'
        };
    }
  },
  
  /**
   * Generate human-readable validation context summary
   */
  getSummary(filePath) {
    const classification = this.classify(filePath);
    const criteria = this.getValidationCriteria(filePath);
    
    return `
FILE: ${filePath}
CLASSIFICATION: ${classification.type}
DESCRIPTION: ${classification.description}

VALIDATION REQUIREMENTS:
- Strict TypeScript Types: ${criteria.strictTypes ? 'YES' : 'NO'}
- Error Handling: ${criteria.errorHandling ? 'YES' : 'NO'}
- Tenant Isolation (tenantId): ${criteria.tenantIsolation ? 'YES' : 'NO'}
- Three-Engine Architecture: ${criteria.threeEngineArchitecture ? 'REQUIRED' : 'NOT REQUIRED'}
- Allow Validation Patterns: ${criteria.allowValidationPatterns ? 'YES (intentional)' : 'NO'}
${criteria.agentTriggering ? '- Agent Triggering: REQUIRED\n' : ''}${criteria.moduleIntegration ? '- Module Integration: REQUIRED\n' : ''}
NOTE: ${criteria.note}
`;
  }
};

module.exports = VALIDATION_CONTEXT_CLASSIFIER;

