#!/usr/bin/env node

/**
 * REJECTION CRITERIA MODULE
 * 
 * Defines explicit patterns for REJECTING fixes that:
 * - Are cosmetic workarounds (remove TODOs without implementation)
 * - Break critical business workflows
 * - Introduce security vulnerabilities
 * - Remove competitive advantage features
 * 
 * Compliant with AGENT_CONTEXT_ULTIMATE.md Production-Ready Priority Rule
 */

const REJECTION_CRITERIA = {
  /**
   * Business Logic Rejection Criteria (Agent 3)
   */
  BUSINESS_REJECTS: {
    WORKAROUND_FIX: {
      name: 'Cosmetic/Workaround Fix',
      patterns: [
        /TODO.*removed.*without.*implementation/i,
        /comment.*changed.*without.*code/i,
        /renamed.*without.*fixing/i,
        /compliant.*comment.*added/i
      ],
      check: (fixData) => {
        const oldCode = fixData.violation?.content || '';
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        // Check if only comments changed
        const oldCodeNoComments = oldCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
        const newCodeNoComments = newCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
        
        if (oldCodeNoComments === newCodeNoComments && oldCode !== newCode) {
          return {
            shouldReject: true,
            reason: 'Cosmetic fix: Only comments changed, no actual implementation',
            severity: 'CRITICAL',
            violatesRule: 'AGENT_CONTEXT_ULTIMATE.md Lines 7-13: Production-Ready Priority Rule'
          };
        }
        
        // Check if TODO removed without implementation
        if (oldCode.includes('TODO') && !newCode.includes('TODO')) {
          const hasRealImplementation = newCode.length > oldCode.length * 1.5 || 
                                       newCode.includes('try {') ||
                                       newCode.includes('async ') ||
                                       newCode.includes('await ') ||
                                       newCode.includes('fetch(');
          
          if (!hasRealImplementation) {
            return {
              shouldReject: true,
              reason: 'TODO removed without production-ready implementation',
              severity: 'CRITICAL',
              violatesRule: 'AGENT_CONTEXT_ULTIMATE.md Lines 7-13: Never remove TODO without implementing functionality'
            };
          }
        }
        
        return { shouldReject: false };
      }
    },
    
    BREAKS_CULTURE_WORKFLOW: {
      name: 'Breaks Culture → Recognition/Engagement Workflow',
      check: (fixData) => {
        const file = fixData.violation?.file || '';
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        if (file.includes('culture') && file.includes('service')) {
          const hasRecognitionAgent = newCode.includes('recognitionAgent') || newCode.includes('RecognitionAgent');
          const hasEngagementAgent = newCode.includes('engagementAgent') || newCode.includes('EngagementAgent');
          
          if (!hasRecognitionAgent || !hasEngagementAgent) {
            return {
              shouldReject: true,
              reason: 'Culture service must trigger Recognition and Engagement agents',
              severity: 'CRITICAL',
              violatesRule: 'AGENT_CONTEXT_ULTIMATE.md: Culture Analysis workflow requires agent triggering'
            };
          }
        }
        
        return { shouldReject: false };
      }
    },
    
    BREAKS_SKILLS_LXP_WORKFLOW: {
      name: 'Breaks Skills → LXP Triggering',
      check: (fixData) => {
        const file = fixData.violation?.file || '';
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        if (file.includes('skills') && file.includes('service')) {
          const hasLXPTrigger = newCode.includes('lxp') || newCode.includes('LXP') || newCode.includes('triggerLXP');
          
          // If it's a gap analysis function, it MUST trigger LXP
          if (newCode.includes('gapAnalysis') || newCode.includes('skillsGap')) {
            if (!hasLXPTrigger) {
              return {
                shouldReject: true,
                reason: 'Skills gap analysis must trigger LXP module for learning paths',
                severity: 'CRITICAL',
                violatesRule: 'AGENT_CONTEXT_ULTIMATE.md: Skills Analysis → LXP triggering workflow'
              };
            }
          }
        }
        
        return { shouldReject: false };
      }
    },
    
    INCOMPLETE_IMPLEMENTATION: {
      name: 'References Non-Existent Methods',
      check: (fixData) => {
        const warning = fixData.mizanFix?.warning || '';
        const requiresImplementation = fixData.mizanFix?.requiresImplementation || [];
        
        if (requiresImplementation.length > 0) {
          return {
            shouldReject: true,
            reason: `Fix references methods that don't exist: ${requiresImplementation.join(', ')}`,
            severity: 'HIGH',
            violatesRule: 'AGENT_CONTEXT_ULTIMATE.md Lines 7-13: Every fix must be COMPLETE, production-ready'
          };
        }
        
        return { shouldReject: false };
      }
    },
    
    REMOVES_TENANT_ISOLATION: {
      name: 'Removes Tenant Isolation',
      check: (fixData) => {
        const oldCode = fixData.violation?.content || '';
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        const oldHasTenantId = oldCode.includes('tenantId');
        const newHasTenantId = newCode.includes('tenantId');
        
        if (oldHasTenantId && !newHasTenantId && oldCode.includes('db.')) {
          return {
            shouldReject: true,
            reason: 'Fix removes tenantId filtering from database query',
            severity: 'CRITICAL',
            violatesRule: 'AGENT_CONTEXT_ULTIMATE.md Lines 1023-1031: Multi-tenant Isolation Rule'
          };
        }
        
        return { shouldReject: false };
      }
    }
  },
  
  /**
   * Security Rejection Criteria (Agent 4)
   */
  SECURITY_REJECTS: {
    TENANT_ISOLATION_BREACH: {
      name: 'Tenant Isolation Security Breach',
      check: (fixData) => {
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        // Check for database queries without tenantId
        const hasDatabaseQuery = /db\.(select|insert|update|delete)/i.test(newCode);
        const hasTenantIdFilter = /tenantId/i.test(newCode);
        
        if (hasDatabaseQuery && !hasTenantIdFilter) {
          return {
            shouldReject: true,
            reason: 'Database query without tenant isolation (missing tenantId)',
            severity: 'CRITICAL',
            riskScore: 100,
            violatesRule: 'Multi-tenant data isolation security - AGENT_CONTEXT_ULTIMATE.md'
          };
        }
        
        return { shouldReject: false };
      }
    },
    
    AUTHENTICATION_BYPASS: {
      name: 'Authentication Bypass',
      check: (fixData) => {
        const oldCode = fixData.violation?.content || '';
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        const oldHasAuth = /auth|session|token/i.test(oldCode);
        const newHasAuth = /auth|session|token/i.test(newCode);
        
        if (oldHasAuth && !newHasAuth && oldCode.includes('if')) {
          return {
            shouldReject: true,
            reason: 'Fix removes authentication check',
            severity: 'CRITICAL',
            riskScore: 98,
            violatesRule: 'Enterprise security requirements - authentication required'
          };
        }
        
        return { shouldReject: false };
      }
    },
    
    SQL_INJECTION_RISK: {
      name: 'SQL Injection Vulnerability',
      check: (fixData) => {
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        // Check for raw SQL with string interpolation
        const hasRawSQL = /db\.query|sql`|SELECT.*FROM/i.test(newCode);
        const hasStringInterpolation = /\$\{.*\}/.test(newCode);
        
        if (hasRawSQL && hasStringInterpolation) {
          return {
            shouldReject: true,
            reason: 'Raw SQL with string interpolation - SQL injection risk',
            severity: 'CRITICAL',
            riskScore: 95,
            violatesRule: 'Must use parameterized queries (Drizzle ORM)'
          };
        }
        
        return { shouldReject: false };
      }
    }
  },
  
  /**
   * Strategic Rejection Criteria (Agent 5)
   */
  STRATEGIC_REJECTS: {
    BREAKS_THREE_ENGINE: {
      name: 'Removes Three-Engine Architecture',
      check: (fixData) => {
        const contextClassifier = require('./validation-context-classifier');
        const file = fixData.violation?.file || '';
        const classification = contextClassifier.classify(file);
        
        if (classification.requiresThreeEngine) {
          const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
          const hasKnowledgeEngine = /knowledgeEngine|KnowledgeEngine/i.test(newCode);
          const hasDataEngine = /dataEngine|DataEngine/i.test(newCode);
          const hasReasoningEngine = /reasoningEngine|ReasoningEngine/i.test(newCode);
          
          if (!hasKnowledgeEngine || !hasDataEngine || !hasReasoningEngine) {
            return {
              shouldReject: true,
              reason: 'AI analysis feature must use Three-Engine Architecture',
              severity: 'CRITICAL',
              violatesRule: 'AGENT_CONTEXT_ULTIMATE.md Lines 1034-1054: Three-Engine Architecture required for AI features'
            };
          }
        }
        
        return { shouldReject: false };
      }
    },
    
    BREAKS_COMPETITIVE_ADVANTAGE: {
      name: 'Removes Competitive Advantage Feature',
      check: (fixData) => {
        const oldCode = fixData.violation?.content || '';
        const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
        
        // Check if AI agent triggering is removed
        const oldHasAgentTrigger = /trigger.*Agent|Agent.*trigger/.test(oldCode);
        const newHasAgentTrigger = /trigger.*Agent|Agent.*trigger/.test(newCode);
        
        if (oldHasAgentTrigger && !newHasAgentTrigger) {
          return {
            shouldReject: true,
            reason: 'Fix removes AI agent triggering - core platform differentiation',
            severity: 'CRITICAL',
            violatesRule: 'Platform competitive advantage - agent triggering workflows'
          };
        }
        
        return { shouldReject: false };
      }
    },
    
    REVENUE_RISK: {
      name: 'Breaks Revenue-Generating Feature',
      check: (fixData) => {
        const file = fixData.violation?.file || '';
        
        // Check if this is an enterprise feature
        const isEnterpriseFeature = file.includes('performance') || 
                                    file.includes('hiring') || 
                                    file.includes('talent') || 
                                    file.includes('bonus');
        
        if (isEnterpriseFeature) {
          const oldCode = fixData.violation?.content || '';
          const newCode = fixData.mizanFix?.primaryFix?.newCode || '';
          
          // If fix dramatically reduces code (potential feature removal)
          if (newCode.length < oldCode.length * 0.5) {
            return {
              shouldReject: true,
              reason: 'Fix significantly reduces enterprise feature code - potential revenue risk',
              severity: 'HIGH',
              violatesRule: 'Enterprise revenue features must be maintained'
            };
          }
        }
        
        return { shouldReject: false };
      }
    }
  }
};

/**
 * Check all rejection criteria for a fix
 */
function checkRejectionCriteria(fixData, criteriaType = 'BUSINESS_REJECTS') {
  const criteria = REJECTION_CRITERIA[criteriaType];
  
  if (!criteria) {
    throw new Error(`Invalid criteria type: ${criteriaType}`);
  }
  
  for (const [key, criterion] of Object.entries(criteria)) {
    const result = criterion.check(fixData);
    
    if (result.shouldReject) {
      return {
        shouldReject: true,
        criterionName: criterion.name,
        reason: result.reason,
        severity: result.severity || 'HIGH',
        riskScore: result.riskScore || 90,
        violatesRule: result.violatesRule
      };
    }
  }
  
  return { shouldReject: false };
}

/**
 * Check all rejection criteria across all types
 */
function checkAllRejectionCriteria(fixData) {
  const results = {
    business: checkRejectionCriteria(fixData, 'BUSINESS_REJECTS'),
    security: checkRejectionCriteria(fixData, 'SECURITY_REJECTS'),
    strategic: checkRejectionCriteria(fixData, 'STRATEGIC_REJECTS')
  };
  
  // Return first rejection found
  for (const [type, result] of Object.entries(results)) {
    if (result.shouldReject) {
      return {
        ...result,
        rejectionType: type
      };
    }
  }
  
  return { shouldReject: false };
}

module.exports = { 
  REJECTION_CRITERIA, 
  checkRejectionCriteria,
  checkAllRejectionCriteria
};

