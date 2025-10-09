/**
 * Simple test of Social Media Content Generation
 * Tests the AI agent directly without authentication
 */

import { SocialMediaAgent } from './backend/services/agents/social-media-agent.js';

console.log('🧪 Testing Mizan Social Media Content Generation');
console.log('='.repeat(60));
console.log('');

async function testContentGeneration() {
  const agent = new SocialMediaAgent();

  // Test 1: Framework Education Post
  console.log('📝 Test 1: Generating LinkedIn post about Cylinder 1');
  console.log('-'.repeat(60));

  try {
    const result1 = await agent.generateContent({
      platform: 'linkedin',
      contentPillar: 'framework-education',
      topic: 'Cylinder 1: Safety & Survival - The Foundation',
      targetAudience: 'HR leaders and business owners',
      includeVisuals: true
    });

    console.log('✅ Generation successful!');
    console.log('');
    console.log('Platform:', result1.platform);
    console.log('');
    console.log('Content:');
    console.log(result1.content);
    console.log('');
    console.log('Hashtags:', result1.hashtags.join(', '));
    console.log('');
    console.log('CTA:', result1.cta);
    console.log('');
    console.log('Visual Suggestion:', result1.visualSuggestion);
    console.log('');
    console.log('Best time to post:', result1.schedulingRecommendation?.dayOfWeek, result1.schedulingRecommendation?.timeOfDay);
    console.log('');
    console.log('Character count:', result1.platformOptimizations.characterCount);
    console.log('Expected engagement:', result1.platformOptimizations.engagement);
    console.log('');
  } catch (error) {
    console.error('❌ Test 1 failed:', error.message);
    console.error('');
  }

  // Test 2: Problem-Solution Post
  console.log('📝 Test 2: Generating LinkedIn post about cultural entropy');
  console.log('-'.repeat(60));

  try {
    const result2 = await agent.generateContent({
      platform: 'linkedin',
      contentPillar: 'problem-solution',
      topic: 'Cultural Entropy: The Hidden Cost of Misalignment',
      targetAudience: 'CEOs and business leaders',
      includeVisuals: true
    });

    console.log('✅ Generation successful!');
    console.log('');
    console.log('Content:');
    console.log(result2.content);
    console.log('');
    console.log('Hashtags:', result2.hashtags.join(', '));
    console.log('');
    console.log('CTA:', result2.cta);
    console.log('');
  } catch (error) {
    console.error('❌ Test 2 failed:', error.message);
    console.error('');
  }

  // Test 3: Twitter (short-form)
  console.log('📝 Test 3: Generating Twitter thread starter');
  console.log('-'.repeat(60));

  try {
    const result3 = await agent.generateContent({
      platform: 'twitter',
      contentPillar: 'thought-leadership',
      topic: 'The Future of Organizational Culture',
      includeVisuals: false
    });

    console.log('✅ Generation successful!');
    console.log('');
    console.log('Content:');
    console.log(result3.content);
    console.log('');
    console.log('Hashtags:', result3.hashtags.join(', '));
    console.log('');
    console.log('CTA:', result3.cta);
    console.log('');
  } catch (error) {
    console.error('❌ Test 3 failed:', error.message);
    console.error('');
  }

  console.log('🎉 Testing complete!');
  console.log('');
}

testContentGeneration().catch(console.error);
