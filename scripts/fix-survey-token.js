/**
 * ONE-OFF FIX: Re-generate survey token validation fix
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function regenerateSurveyFix() {
  console.log('🔧 Regenerating survey token validation fix...\n');

  const violation = {
    file: "app/survey/[token]/page.tsx",
    line: 44,
    content: "// TODO: Add token validation endpoint",
    rule: "noPlaceholders",
    severity: "error",
    priority: "high"
  };

  const agent1Analysis = {
    severity: "CRITICAL",
    impact: "Survey access is completely unsecured - any user can access any survey by guessing or manipulating the token parameter.",
    fixApproach: "1. Create token validation API endpoint, 2. Implement Drizzle ORM queries, 3. Add proper TypeScript types, 4. Implement server-side validation, 5. Add error handling, 6. Redirect unauthorized users"
  };

  const prompt = `You are a senior Mizan platform developer. Fix this CRITICAL security violation.

VIOLATION:
File: ${violation.file}
Line: ${violation.line}
Code: ${violation.content}
Priority: ${violation.priority}
Impact: ${agent1Analysis.impact}

MIZAN RULES (CRITICAL):
1. Use DRIZZLE ORM: db.select().from(table).where(eq(...))
2. Use NEXT.JS 14 APP ROUTER: export async function GET(request: Request)
3. Use STRICT TYPESCRIPT: No 'any' types, proper interfaces
4. NO PLACEHOLDERS: No <div>Loading...</div> or <div>Content</div>
5. PROPER DRIZZLE SCHEMA: pgTable, varchar, etc from 'drizzle-orm/pg-core'

YOUR TASK: Create complete token validation with:
- Proper API endpoint using App Router
- Real database queries using Drizzle ORM
- Actual survey rendering (not placeholder content)
- Server-side validation before rendering
- Proper error handling and redirects

Respond in valid JSON (no markdown code blocks):
{
  "fixType": "complex",
  "primaryFix": {
    "description": "Complete description",
    "code": "Frontend code with proper validation",
    "filePath": "${violation.file}",
    "startLine": ${violation.line},
    "endLine": ${violation.line},
    "additionalFiles": [
      {
        "path": "app/api/survey/validate-token/route.ts",
        "content": "Complete API route with Drizzle ORM",
        "purpose": "Token validation endpoint"
      }
    ]
  },
  "testingInstructions": "How to test",
  "potentialRisks": ["Risk 1"],
  "confidence": 0.95,
  "mizanComplianceCheck": {
    "usesDrizzleORM": true,
    "usesAppRouter": true,
    "noPlaceholders": true,
    "strictTypes": true,
    "integrates3EngineAI": false
  }
}

CRITICAL: Ensure valid JSON with no syntax errors!`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = response.content[0].text;
    
    // Remove markdown code blocks if present
    let cleanText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Extract JSON
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not find JSON in response');
    }
    
    const fix = JSON.parse(jsonMatch[0]);
    
    console.log('✅ Fix generated successfully!');
    console.log(`   Description: ${fix.primaryFix.description.substring(0, 80)}...`);
    console.log(`   Files created: ${fix.primaryFix.additionalFiles.length + 1}`);
    console.log(`   Confidence: ${(fix.confidence * 100).toFixed(0)}%\n`);

    // Load existing fixes
    const fixesPath = path.join(process.cwd(), 'scripts', 'agent2-fixes-claude.json');
    const fixes = JSON.parse(fs.readFileSync(fixesPath, 'utf8'));

    // Find and replace Fix #2
    const fixIndex = fixes.findIndex(f => f.violation.file === violation.file);
    
    if (fixIndex !== -1) {
      fixes[fixIndex].agent2Fix = {
        agent: 'Claude (Fix Generator)',
        timestamp: new Date().toISOString(),
        ...fix
      };
      
      fs.writeFileSync(fixesPath, JSON.stringify(fixes, null, 2));
      console.log('✅ Updated agent2-fixes-claude.json\n');
    } else {
      console.log('⚠️  Could not find Fix #2 in existing fixes\n');
    }

    return fix;

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

regenerateSurveyFix();