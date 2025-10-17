#!/usr/bin/env node

/**
 * Test Script for Enhanced Social Media Content Generation
 * Tests 7-Cylinder Framework, Three-Engine Architecture, and Learning Capabilities
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const colors = require('colors/safe');

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const TEST_EMAIL = 'anna@mizan.com';
const TEST_PASSWORD = 'YourSecurePassword123';

// Test utilities
const log = {
  info: (msg) => console.log(colors.blue('ℹ'), msg),
  success: (msg) => console.log(colors.green('✓'), msg),
  error: (msg) => console.log(colors.red('✗'), msg),
  section: (msg) => console.log(colors.cyan('\n' + '='.repeat(60) + '\n' + msg + '\n' + '='.repeat(60))),
  data: (label, data) => console.log(colors.yellow(label + ':'), JSON.stringify(data, null, 2))
};

// Test results tracking
let testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  tests: []
};

async function runTest(name, testFn) {
  testResults.total++;
  log.info(`Testing: ${name}`);
  
  try {
    await testFn();
    testResults.passed++;
    testResults.tests.push({ name, status: 'PASSED' });
    log.success(`${name} - PASSED`);
    return true;
  } catch (error) {
    testResults.failed++;
    testResults.tests.push({ name, status: 'FAILED', error: error.message });
    log.error(`${name} - FAILED: ${error.message}`);
    return false;
  }
}

// Authentication
async function authenticate() {
  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    })
  });

  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.statusText}`);
  }

  const data = await response.json();
  const token = data.token || data.data?.token || data.accessToken || data.data?.accessToken;
  
  if (!token) {
    throw new Error('No token received from authentication');
  }

  return token;
}

// Test Functions
async function testSingleContentGeneration(token) {
  // Test each of the 7 cylinders
  const cylinders = [
    { cylinder: 1, name: "Safety & Survival", topic: "Creating Psychological Safety in the Workplace" },
    { cylinder: 2, name: "Belonging & Loyalty", topic: "Building Trust and Connection in Teams" },
    { cylinder: 3, name: "Growth & Achievement", topic: "Fostering Excellence and Learning Culture" },
    { cylinder: 4, name: "Meaning & Contribution", topic: "Connecting Work to Purpose and Impact" },
    { cylinder: 5, name: "Integrity & Justice", topic: "Establishing Fair and Ethical Practices" },
    { cylinder: 6, name: "Wisdom & Compassion", topic: "Leading with Balance and Empathy" },
    { cylinder: 7, name: "Transcendence & Unity", topic: "Achieving Organizational Harmony" }
  ];

  for (const cylinder of cylinders) {
    log.info(`Generating content for Cylinder ${cylinder.cylinder}: ${cylinder.name}`);
    
    const response = await fetch(`${BACKEND_URL}/api/social-media/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        platform: 'linkedin',
        contentPillar: 'framework-education',
        topic: cylinder.topic,
        targetAudience: 'HR leaders and organizational development professionals',
        tone: 'professional',
        includeVisuals: true
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to generate content for ${cylinder.name}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.success || !data.data) {
      throw new Error(`Invalid response for ${cylinder.name}`);
    }

    // Check for professional content (no emojis)
    const content = data.data.content;
    const hasEmojis = /[\u{1F300}-\u{1F9FF}]/u.test(content);
    if (hasEmojis) {
      throw new Error(`Content contains emojis for ${cylinder.name} (should be professional)`);
    }

    // Check content mentions the cylinder
    const mentionsCylinder = content.toLowerCase().includes(cylinder.name.toLowerCase()) ||
                            content.includes(`Cylinder ${cylinder.cylinder}`);
    if (!mentionsCylinder) {
      log.error(`Content doesn't mention ${cylinder.name}`);
    }

    // Verify hashtags exist
    if (!data.data.hashtags || data.data.hashtags.length === 0) {
      throw new Error(`No hashtags generated for ${cylinder.name}`);
    }

    // Verify CTA exists
    if (!data.data.cta) {
      throw new Error(`No CTA generated for ${cylinder.name}`);
    }

    log.success(`Content generated for ${cylinder.name}`);
    
    // Display sample of generated content
    console.log(colors.gray('Content preview:'));
    console.log(colors.gray(content.substring(0, 200) + '...'));
    console.log(colors.gray('Hashtags: ' + data.data.hashtags.join(', ')));
    console.log('');
  }
}

async function testWeeklyBatchGeneration(token) {
  // Test generation for week 1 (should be Cylinder 1)
  const response = await fetch(`${BACKEND_URL}/api/social-media/generate-batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      week: 1
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to generate batch: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error('Invalid batch generation response');
  }

  // Verify we got 3 posts (Monday, Wednesday, Friday)
  if (!data.data.content || data.data.content.length !== 3) {
    throw new Error(`Expected 3 posts, got ${data.data.content?.length || 0}`);
  }

  // Check theme is correct for week 1
  if (data.data.theme !== 'Foundation of Organizations') {
    throw new Error(`Wrong theme for week 1: ${data.data.theme}`);
  }

  log.success('Batch generated with 3 posts');
  
  // Check each post
  data.data.content.forEach((post, index) => {
    log.info(`Post ${index + 1} - ${post.day}: ${post.content.substring(0, 100)}...`);
  });
}

async function testStrategyRetrieval(token) {
  const response = await fetch(`${BACKEND_URL}/api/social-media/strategy`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get strategy: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error('Invalid strategy response');
  }

  // Verify 12 weeks
  if (!data.data.weeks || data.data.weeks.length !== 12) {
    throw new Error(`Expected 12 weeks, got ${data.data.weeks?.length || 0}`);
  }

  // Verify first 7 weeks are cylinders
  for (let i = 0; i < 7; i++) {
    const week = data.data.weeks[i];
    if (!week.focus.includes(`Cylinder ${i + 1}`)) {
      throw new Error(`Week ${i + 1} should focus on Cylinder ${i + 1}, but got: ${week.focus}`);
    }
  }

  log.success('Strategy contains all 7 cylinders in correct order');
  
  // Display strategy
  console.log(colors.gray('\n12-Week Strategy:'));
  data.data.weeks.forEach(week => {
    console.log(colors.gray(`  Week ${week.week}: ${week.theme} - ${week.focus}`));
  });
}

async function testContentTemplates(token) {
  const response = await fetch(`${BACKEND_URL}/api/social-media/templates`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get templates: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error('Invalid templates response');
  }

  // Verify platforms
  if (!data.data.platforms || data.data.platforms.length < 4) {
    throw new Error('Missing platform templates');
  }

  // Verify content pillars
  if (!data.data.contentPillars || data.data.contentPillars.length < 5) {
    throw new Error('Missing content pillars');
  }

  log.success('Templates retrieved successfully');
}

async function testPostManagement(token) {
  // First, generate a post
  const generateResponse = await fetch(`${BACKEND_URL}/api/social-media/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      platform: 'linkedin',
      contentPillar: 'framework-education',
      topic: 'Test Post for 7-Cylinder Framework',
      targetAudience: 'Test audience',
      tone: 'professional',
      includeVisuals: false
    })
  });

  if (!generateResponse.ok) {
    throw new Error('Failed to generate test post');
  }

  const generateData = await generateResponse.json();
  const postId = generateData.data.postId;

  // Get all posts
  const postsResponse = await fetch(`${BACKEND_URL}/api/social-media/posts`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!postsResponse.ok) {
    throw new Error('Failed to retrieve posts');
  }

  const postsData = await postsResponse.json();
  
  // Verify our post exists
  const ourPost = postsData.data.find(p => p.id === postId);
  if (!ourPost) {
    throw new Error('Generated post not found in posts list');
  }

  log.success('Post created and retrieved successfully');

  // Test learning from metrics
  const metricsResponse = await fetch(`${BACKEND_URL}/api/social-media/posts/${postId}/metrics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      engagement: 150,
      impressions: 3000,
      clicks: 45,
      shares: 12,
      comments: 8
    })
  });

  if (!metricsResponse.ok) {
    throw new Error('Failed to submit metrics for learning');
  }

  const metricsData = await metricsResponse.json();
  
  if (!metricsData.success) {
    throw new Error('Metrics submission failed');
  }

  log.success('Learning from metrics completed');

  // Clean up - delete the test post
  const deleteResponse = await fetch(`${BACKEND_URL}/api/social-media/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!deleteResponse.ok) {
    throw new Error('Failed to delete test post');
  }

  log.success('Test post cleaned up');
}

async function testThreeEngineArchitecture(token) {
  // Test that the Three-Engine Architecture is working
  // by generating content with specific requirements
  
  const response = await fetch(`${BACKEND_URL}/api/social-media/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      platform: 'linkedin',
      contentPillar: 'framework-education',
      topic: 'How the 7-Cylinder Framework Transforms Organizations',
      targetAudience: 'C-suite executives and HR leaders',
      tone: 'professional',
      includeVisuals: true
    })
  });

  if (!response.ok) {
    throw new Error('Three-Engine content generation failed');
  }

  const data = await response.json();
  
  // Verify content structure follows professional guidelines
  const content = data.data.content;
  
  // Check for professional structure
  const hasHeader = content.split('\n')[0].length < 100;
  const hasBulletPoints = content.includes('•');
  const hasMultipleParagraphs = content.split('\n\n').length > 2;
  
  if (!hasHeader || !hasBulletPoints || !hasMultipleParagraphs) {
    throw new Error('Content doesn\'t follow professional structure guidelines');
  }

  // Check mentions framework properly
  const mentionsFramework = content.includes('7-Cylinder Framework') || 
                           content.includes('seven critical cylinders') ||
                           content.includes('seven cylinders');
  
  if (!mentionsFramework) {
    throw new Error('Content doesn\'t properly mention 7-Cylinder Framework');
  }

  log.success('Three-Engine Architecture generating professional content');
}

// Main test runner
async function runAllTests() {
  log.section('MIZAN SOCIAL MEDIA CONTENT GENERATION TEST SUITE');
  log.info('Testing Enhanced Social Media Feature with 7-Cylinder Framework');
  log.info(`Backend URL: ${BACKEND_URL}`);
  
  let token;
  
  try {
    // Authenticate
    await runTest('Authentication', async () => {
      token = await authenticate();
      if (!token) throw new Error('No token received');
    });

    if (!token) {
      log.error('Cannot proceed without authentication');
      return;
    }

    // Run all tests
    await runTest('7-Cylinder Content Generation', () => testSingleContentGeneration(token));
    await runTest('Weekly Batch Generation', () => testWeeklyBatchGeneration(token));
    await runTest('12-Week Strategy Retrieval', () => testStrategyRetrieval(token));
    await runTest('Content Templates', () => testContentTemplates(token));
    await runTest('Post Management & Learning', () => testPostManagement(token));
    await runTest('Three-Engine Architecture', () => testThreeEngineArchitecture(token));

  } catch (error) {
    log.error(`Test suite error: ${error.message}`);
  }

  // Display results
  log.section('TEST RESULTS SUMMARY');
  console.log(colors.cyan('Total Tests:'), testResults.total);
  console.log(colors.green('Passed:'), testResults.passed);
  console.log(colors.red('Failed:'), testResults.failed);
  console.log(colors.yellow('Success Rate:'), 
    testResults.total > 0 ? `${((testResults.passed / testResults.total) * 100).toFixed(1)}%` : 'N/A');
  
  console.log('\nDetailed Results:');
  testResults.tests.forEach(test => {
    const status = test.status === 'PASSED' ? colors.green('✓') : colors.red('✗');
    const name = test.status === 'PASSED' ? colors.green(test.name) : colors.red(test.name);
    console.log(`  ${status} ${name}`);
    if (test.error) {
      console.log(colors.gray(`    Error: ${test.error}`));
    }
  });

  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
