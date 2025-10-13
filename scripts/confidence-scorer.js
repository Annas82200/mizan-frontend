#!/usr/bin/env node

/**
 * CONFIDENCE SCORER
 * 
 * Analyzes multi-agent agreement and assigns confidence scores
 */

const fs = require('fs');
const path = require('path');

function calculateConfidence() {
  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  let decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));

  for (const item of decisions) {
    const agent3Conf = item.agent3Validation.confidence || 0;
    const agent4Conf = item.agent4SecurityReview.confidenceScore || 0;
    const agent5Conf = item.agent5FinalDecision.confidence || 0;

    // Calculate weighted confidence
    const avgConfidence = (agent3Conf + agent4Conf + agent5Conf) / 3;
    
    // Agreement bonus
    const agreement = item.agent5FinalDecision.agentAgreement.consensus ? 0.1 : 0;
    
    // Final confidence
    const finalConfidence = Math.min(1.0, avgConfidence + agreement);

    item.confidenceMetrics = {
      agent3Confidence: agent3Conf,
      agent4Confidence: agent4Conf,
      agent5Confidence: agent5Conf,
      averageConfidence: avgConfidence,
      agreementBonus: agreement,
      finalConfidence: finalConfidence,
      level: finalConfidence >= 0.9 ? 'very-high' :
             finalConfidence >= 0.8 ? 'high' :
             finalConfidence >= 0.7 ? 'medium' : 'low'
    };
  }

  fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));
  console.log('✅ Confidence scores calculated\n');
}

if (require.main === module) {
  calculateConfidence();
}

module.exports = { calculateConfidence };
