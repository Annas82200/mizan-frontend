#!/usr/bin/env node

/**
 * MIZAN FIX APPLICATOR - CORRECTED FOR MONOREPO
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

// Map violation paths to actual file locations
function correctFilePath(violationPath) {
  // Frontend paths
  if (violationPath.startsWith('app/')) {
    return path.join('frontend', 'src', violationPath);
  }
  if (violationPath.startsWith('components/')) {
    return path.join('frontend', 'src', violationPath);
  }
  if (violationPath.startsWith('types/')) {
    return path.join('frontend', 'src', violationPath);
  }
  if (violationPath.startsWith('lib/')) {
    return path.join('frontend', 'src', violationPath);
  }
  
  // Backend paths
  if (violationPath.startsWith('routes/')) {
    return path.join('backend', violationPath);
  }
  if (violationPath.startsWith('backend/')) {
    return violationPath; // Already has backend prefix
  }
  
  return violationPath;
}

async function applyFixes() {
  console.log(`${colors.blue}${colors.bold}🔧 Mizan Fix Applicator (Corrected for Monorepo)${colors.reset}\n`);

  // Load Agent 5 decisions
  const decisionsPath = path.join(process.cwd(), 'scripts', 'agent5-final-decisions.json');
  
  let decisions;
  try {
    decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Error: Could not read agent5-final-decisions.json${colors.reset}`);
    process.exit(1);
  }

  // Filter approved fixes (including human overrides)
  const approvedFixes = decisions.filter(d => {
    const agentDecision = d.agent5FinalDecision.finalDecision;
    const humanDecision = d.humanReview?.decision;
    return humanDecision === 'APPROVE' || (agentDecision === 'APPROVE' && humanDecision !== 'REJECT');
  });

  const rejectedFixes = decisions.filter(d => {
    const humanDecision = d.humanReview?.decision;
    return humanDecision === 'REJECT' || (d.agent5FinalDecision.finalDecision === 'REJECT' && humanDecision !== 'APPROVE');
  });

  console.log(`${colors.green}✅ Approved fixes: ${approvedFixes.length}${colors.reset}`);
  console.log(`${colors.red}❌ Rejected fixes: ${rejectedFixes.length}${colors.reset}\n`);

  if (approvedFixes.length === 0) {
    console.log(`${colors.yellow}⚠️  No approved fixes to apply${colors.reset}\n`);
    return;
  }

  // Create backup directory
  const backupDir = path.join(process.cwd(), 'backups', `corrected-${Date.now()}`);
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`${colors.blue}📦 Backup directory: ${backupDir}${colors.reset}\n`);

  let appliedCount = 0;
  let skippedCount = 0;

  for (const fix of approvedFixes) {
    const { violation, agent2Fix } = fix;
    
    console.log(`${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bold}🔧 Fix: ${violation.file}:${violation.line}${colors.reset}`);
    console.log(`   Rule: ${violation.rule}`);
    console.log(`   Priority: ${violation.priority}`);

    try {
      const primaryFix = agent2Fix.primaryFix;
      
      // Correct the file path
      const correctedPath = correctFilePath(primaryFix.filePath);
      const targetFile = path.join(process.cwd(), correctedPath);

      console.log(`   📍 Actual path: ${correctedPath}`);

      // Check if file exists
      if (!fs.existsSync(targetFile)) {
        console.log(`   ${colors.yellow}⚠️  File not found, skipping${colors.reset}\n`);
        skippedCount++;
        continue;
      }

      // Backup original file
      const backupPath = path.join(backupDir, correctedPath);
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(targetFile, backupPath);
      console.log(`   ${colors.blue}💾 Backed up${colors.reset}`);

      // Read file content
      let fileContent = fs.readFileSync(targetFile, 'utf8');
      const lines = fileContent.split('\n');
      const targetLineIndex = primaryFix.startLine - 1;

      // Show what we're replacing
      if (lines[targetLineIndex]) {
        console.log(`   ${colors.yellow}📝 Old line ${primaryFix.startLine}:${colors.reset}`);
        console.log(`      ${lines[targetLineIndex].trim().substring(0, 80)}...`);
        
        // Replace the line
        lines[targetLineIndex] = primaryFix.code;
        fileContent = lines.join('\n');
        fs.writeFileSync(targetFile, fileContent, 'utf8');
        
        console.log(`   ${colors.green}✅ Applied primary fix${colors.reset}`);
      } else {
        console.log(`   ${colors.yellow}⚠️  Line ${primaryFix.startLine} not found in file${colors.reset}`);
      }

      // Create additional files
      if (primaryFix.additionalFiles && primaryFix.additionalFiles.length > 0) {
        console.log(`   ${colors.blue}📄 Creating ${primaryFix.additionalFiles.length} additional files...${colors.reset}`);
        
        for (const additionalFile of primaryFix.additionalFiles) {
          const correctedAdditionalPath = correctFilePath(additionalFile.path);
          const additionalFilePath = path.join(process.cwd(), correctedAdditionalPath);
          
          // Create directory if needed
          fs.mkdirSync(path.dirname(additionalFilePath), { recursive: true });
          
          // Write file
          fs.writeFileSync(additionalFilePath, additionalFile.content, 'utf8');
          console.log(`   ${colors.green}✅ Created: ${correctedAdditionalPath}${colors.reset}`);
        }
      }

      appliedCount++;
      console.log(`   ${colors.green}${colors.bold}✅ Fix applied successfully!${colors.reset}\n`);

    } catch (error) {
      console.error(`   ${colors.red}❌ Error: ${error.message}${colors.reset}\n`);
      skippedCount++;
    }
  }

  // Summary
  console.log(`${colors.blue}${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}${colors.bold}📊 SUMMARY${colors.reset}`);
  console.log(`${colors.green}✅ Successfully applied: ${appliedCount}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Skipped: ${skippedCount}${colors.reset}`);
  console.log(`${colors.blue}💾 Backups: ${backupDir}${colors.reset}`);
  console.log(`${colors.blue}${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  console.log(`${colors.green}${colors.bold}🎉 Fix application complete!${colors.reset}\n`);
}

if (require.main === module) {
  applyFixes();
}

module.exports = { applyFixes };