#!/usr/bin/env node

/**
 * MIZAN FIX APPLICATOR v2.0
 * 
 * Applies approved fixes from Agent 5
 * NOW WORKS CORRECTLY because audit-violations.js uses proper paths!
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

async function applyFixes() {
  console.log(`${colors.blue}${colors.bold}🔧 Mizan Fix Applicator v2.0${colors.reset}\n`);

  // Load Agent 5 decisions
  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  
  let decisions;
  try {
    decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Error: Could not read agent5-final-decisions.json${colors.reset}`);
    process.exit(1);
  }

  // Filter approved fixes
  const approvedFixes = decisions.filter(d => {
    const agentDecision = d.agent5FinalDecision.finalDecision;
    const humanDecision = d.humanReview?.decision;
    return humanDecision === 'APPROVE' || (agentDecision === 'APPROVE' && humanDecision !== 'REJECT');
  });

  console.log(`${colors.green}✅ Approved fixes: ${approvedFixes.length}${colors.reset}\n`);

  if (approvedFixes.length === 0) {
    console.log(`${colors.yellow}⚠️  No approved fixes to apply${colors.reset}\n`);
    return;
  }

  // Create backup directory
  const backupDir = path.join(process.cwd(), 'backups', `backup-${Date.now()}`);
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`${colors.blue}📦 Backup: ${backupDir}${colors.reset}\n`);

  let appliedCount = 0;

  for (const fix of approvedFixes) {
    const { violation, agent2Fix } = fix;
    
    console.log(`${colors.bold}🔧 ${violation.file}:${violation.line}${colors.reset}`);

    try {
      const primaryFix = agent2Fix.primaryFix;
      const targetFile = path.join(process.cwd(), primaryFix.filePath);

      if (!fs.existsSync(targetFile)) {
        console.log(`   ${colors.yellow}⚠️  File not found, skipping${colors.reset}\n`);
        continue;
      }

      // Backup
      const backupPath = path.join(backupDir, primaryFix.filePath);
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(targetFile, backupPath);

      // Apply fix
      let fileContent = fs.readFileSync(targetFile, 'utf8');
      const lines = fileContent.split('\n');
      lines[primaryFix.startLine - 1] = primaryFix.code;
      fs.writeFileSync(targetFile, lines.join('\n'), 'utf8');
      
      console.log(`   ${colors.green}✅ Applied${colors.reset}`);

      // Create additional files
      if (primaryFix.additionalFiles) {
        for (const file of primaryFix.additionalFiles) {
          const filePath = path.join(process.cwd(), file.path);
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
          fs.writeFileSync(filePath, file.content, 'utf8');
          console.log(`   ${colors.green}✅ Created: ${file.path}${colors.reset}`);
        }
      }

      appliedCount++;

    } catch (error) {
      console.error(`   ${colors.red}❌ Error: ${error.message}${colors.reset}`);
    }
    
    console.log('');
  }

  console.log(`${colors.green}${colors.bold}✅ Applied ${appliedCount} fixes${colors.reset}\n`);
}

if (require.main === module) {
  applyFixes();
}

module.exports = { applyFixes };