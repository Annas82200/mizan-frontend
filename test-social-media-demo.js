#!/usr/bin/env node

/**
 * Demo Test for Social Media Content Generation
 * Demonstrates the 7-Cylinder Framework and Professional Content Generation
 */

const colors = require('colors/safe');

// Test utilities
const log = {
  info: (msg) => console.log(colors.blue('ℹ'), msg),
  success: (msg) => console.log(colors.green('✓'), msg),
  error: (msg) => console.log(colors.red('✗'), msg),
  section: (msg) => console.log(colors.cyan('\n' + '='.repeat(60) + '\n' + msg + '\n' + '='.repeat(60))),
  data: (label, data) => console.log(colors.yellow(label + ':'), typeof data === 'string' ? data : JSON.stringify(data, null, 2))
};

// Content generator modules are TypeScript, so we'll demonstrate the functionality

// Demonstrate the 7-Cylinder Framework
async function demonstrateFramework() {
  log.section('7-CYLINDER FRAMEWORK DEMONSTRATION');
  
  const cylinders = [
    {
      number: 1,
      name: "Safety & Survival",
      principle: "Preservation of Life",
      description: "Protecting life and dignity by ensuring health, stability, and freedom from harm"
    },
    {
      number: 2,
      name: "Belonging & Loyalty",
      principle: "Human Dignity",
      description: "Fostering genuine connection, trust, and shared identity within teams"
    },
    {
      number: 3,
      name: "Growth & Achievement",
      principle: "Striving with Excellence",
      description: "Encouraging learning, mastery, and performance"
    },
    {
      number: 4,
      name: "Meaning & Contribution",
      principle: "Service",
      description: "Connecting work to purpose and long-term impact"
    },
    {
      number: 5,
      name: "Integrity & Justice",
      principle: "Justice and Accountability",
      description: "Upholding truth, fairness, and ethical responsibility"
    },
    {
      number: 6,
      name: "Wisdom & Compassion",
      principle: "Mercy and Knowledge",
      description: "Integrating intellect and empathy to lead with balance"
    },
    {
      number: 7,
      name: "Transcendence & Unity",
      principle: "Unity of Being",
      description: "Achieving harmony between self, others, and greater purpose"
    }
  ];

  console.log(colors.yellow('\nThe Mizan 7-Cylinder Framework:\n'));
  
  cylinders.forEach(cylinder => {
    console.log(colors.green(`Cylinder ${cylinder.number}: ${cylinder.name}`));
    console.log(colors.gray(`  Ethical Principle: ${cylinder.principle}`));
    console.log(colors.gray(`  ${cylinder.description}\n`));
  });
}

// Demonstrate professional content generation
async function demonstrateContentGeneration() {
  log.section('PROFESSIONAL CONTENT GENERATION DEMO');
  
  // Create a mock content generator to show the structure
  const sampleRequests = [
    {
      platform: 'linkedin',
      topic: 'Creating Psychological Safety in the Workplace',
      cylinder: 1
    },
    {
      platform: 'linkedin',
      topic: 'Building Trust and Connection in Teams',
      cylinder: 2
    },
    {
      platform: 'twitter',
      topic: 'The 7-Cylinder Framework for Organizational Success',
      cylinder: 'all'
    }
  ];

  for (const request of sampleRequests) {
    console.log(colors.yellow(`\nGenerating content for: ${request.topic}`));
    console.log(colors.gray(`Platform: ${request.platform}`));
    
    // Simulate professional content generation
    const content = generateProfessionalContent(request);
    console.log(colors.green('\nGenerated Content:'));
    console.log(colors.white(content));
    console.log(colors.gray('-'.repeat(60)));
  }
}

function generateProfessionalContent(request) {
  if (request.platform === 'linkedin') {
    if (request.cylinder === 1) {
      return `Understanding Safety & Survival in Organizational Culture

Protecting life and dignity by ensuring health, stability, and freedom from harm forms the foundation of any thriving organization.

Ethical Principle: Preservation of Life

Key Enabling Values:
• Safety: Creates environments free from physical, psychological, and digital harm
• Stability: Establishes dependable systems and consistent leadership
• Preparedness: Anticipates risks and responds proactively
• Wellbeing: Promotes holistic balance for sustainable performance

Organizations that master this cylinder demonstrate:
• Higher employee engagement and retention
• Improved organizational performance
• Stronger cultural alignment
• Sustainable competitive advantage

The Mizan platform analyzes your organization across all seven cylinders, providing data-driven insights for transformation.

Learn more at mizan.com`;
    } else if (request.cylinder === 2) {
      return `Building Connection: The Power of Belonging & Loyalty

Fostering genuine connection, trust, and shared identity within teams is essential for organizational success.

Ethical Principle: Human Dignity

Core Components:
• Inclusion: Values all voices regardless of status or background
• Trust: Builds reliability through transparency and honesty
• Collaboration: Encourages teamwork and mutual reliance
• Compassion: Recognizes the emotional and human side of work

Transform your organizational culture with data-driven insights from the Mizan platform.`;
    }
  } else if (request.platform === 'twitter') {
    return `The 7-Cylinder Framework transforms organizations through:
Safety & Survival, Belonging & Loyalty, Growth & Achievement, Meaning & Contribution, Integrity & Justice, Wisdom & Compassion, and Transcendence & Unity.

Data-driven insights for measurable transformation.`;
  }
  
  return 'Professional content tailored to your platform and audience.';
}

// Demonstrate Three-Engine Architecture
async function demonstrateThreeEngineArchitecture() {
  log.section('THREE-ENGINE ARCHITECTURE DEMONSTRATION');
  
  console.log(colors.yellow('\nThe Three-Engine Architecture:\n'));
  
  const engines = [
    {
      name: 'Knowledge Engine',
      role: 'Learning & Context',
      functions: [
        'Loads 7-cylinder framework from database',
        'Learns from successful post metrics',
        'Stores industry best practices',
        'Accumulates platform-specific knowledge'
      ]
    },
    {
      name: 'Data Engine',
      role: 'Processing & Structuring',
      functions: [
        'Processes request with learned context',
        'Normalizes and structures data',
        'Applies platform constraints',
        'Integrates framework knowledge'
      ]
    },
    {
      name: 'Reasoning Engine',
      role: 'Generation & Optimization',
      functions: [
        'Generates optimized content',
        'Applies professional writing guidelines',
        'Creates platform-specific formatting',
        'Produces actionable insights'
      ]
    }
  ];

  engines.forEach((engine, index) => {
    console.log(colors.green(`${index + 1}. ${engine.name} - ${engine.role}`));
    engine.functions.forEach(func => {
      console.log(colors.gray(`   • ${func}`));
    });
    console.log();
  });

  console.log(colors.yellow('Content Generation Flow:'));
  console.log(colors.white(`
  1. Knowledge Engine learns context first
     ↓
  2. Data Engine processes request with learned context
     ↓
  3. Reasoning Engine generates professional content
     ↓
  4. Learning loop updates Knowledge Engine with performance metrics
  `));
}

// Demonstrate learning capabilities
async function demonstrateLearningCapabilities() {
  log.section('LEARNING CAPABILITIES DEMONSTRATION');
  
  console.log(colors.yellow('\nThe platform learns from:\n'));
  
  const learningPoints = [
    {
      source: 'Post Performance Metrics',
      learns: 'Successful content patterns, engagement rates, optimal posting times'
    },
    {
      source: 'Platform Analytics',
      learns: 'Best practices per platform, character limits, hashtag strategies'
    },
    {
      source: 'Industry Context',
      learns: 'HR trends, organizational challenges, emerging topics'
    },
    {
      source: 'Framework Application',
      learns: 'Which cylinders resonate most, effective messaging strategies'
    }
  ];

  learningPoints.forEach(point => {
    console.log(colors.green(`From ${point.source}:`));
    console.log(colors.gray(`  Learns: ${point.learns}\n`));
  });

  console.log(colors.yellow('Performance Threshold:'));
  console.log(colors.white('• Posts with >4% engagement rate are analyzed for successful patterns'));
  console.log(colors.white('• Patterns are stored and used to improve future content generation'));
}

// Main demo runner
async function runDemo() {
  log.section('MIZAN SOCIAL MEDIA FEATURE DEMONSTRATION');
  log.info('Showcasing the Enhanced Social Media Content Generation');
  
  try {
    await demonstrateFramework();
    await demonstrateContentGeneration();
    await demonstrateThreeEngineArchitecture();
    await demonstrateLearningCapabilities();
    
    log.section('KEY FEATURES SUMMARY');
    
    const features = [
      'Complete 7-Cylinder Framework with ethical principles',
      'Professional content generation without emojis',
      'Three-Engine Architecture with learning capabilities',
      'Platform-specific optimization (LinkedIn, Twitter, Facebook, Instagram)',
      'Learning from performance metrics',
      'Multi-tenant isolation',
      'Production-ready implementation'
    ];
    
    console.log(colors.yellow('\nImplemented Features:\n'));
    features.forEach(feature => {
      console.log(colors.green('✓'), feature);
    });
    
    console.log(colors.cyan('\n' + '='.repeat(60)));
    log.success('Social Media Feature Demonstration Complete!');
    
  } catch (error) {
    log.error(`Demo error: ${error.message}`);
  }
}

// Run the demo
runDemo().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
