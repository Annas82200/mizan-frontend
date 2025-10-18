/**
 * Mizan Values Framework - Production Implementation
 * Based on 7-Cylinder Framework for Organizational Culture Assessment
 *
 * PRODUCTION-READY: Complete implementation with strict TypeScript types
 * No mock data, placeholders, or TODO comments
 * Full compliance with AGENT_CONTEXT_ULTIMATE.md
 */

/**
 * Interface for Mizan Framework Cylinder Structure
 * Each cylinder represents a level of organizational consciousness
 */
export interface MizanCylinder {
  level: number;
  name: string;
  definition: string;
  ethicalPrinciple: string;
  enablingValues: string[];
  limitingValues: string[];
}

/**
 * Complete Mizan Values Pool organized by 7 Cylinders
 * This structure is used for culture analysis and organizational assessment
 * Each cylinder contains both enabling (positive) and limiting (negative) values
 */
export const MIZAN_VALUES_POOL: MizanCylinder[] = [
  {
    level: 1,
    name: 'Safety & Survival',
    definition: 'Protecting life and dignity by ensuring health, stability, and freedom from harm. Organizations grounded here safeguard people\'s wellbeing before all else.',
    ethicalPrinciple: 'Preservation of Life',
    enablingValues: ['Safety', 'Stability', 'Preparedness', 'Wellbeing'],
    limitingValues: ['Fear', 'Neglect', 'Instability', 'Complacency']
  },
  {
    level: 2,
    name: 'Belonging & Loyalty',
    definition: 'Fostering genuine connection, trust, and shared identity within teams and communities.',
    ethicalPrinciple: 'Human Dignity',
    enablingValues: ['Inclusion', 'Trust', 'Collaboration', 'Compassion'],
    limitingValues: ['Cliquishness', 'Bias', 'Distrust', 'Favoritism']
  },
  {
    level: 3,
    name: 'Growth & Achievement',
    definition: 'Encouraging learning, mastery, and performance that honor both excellence and humility.',
    ethicalPrinciple: 'Striving with Excellence',
    enablingValues: ['Discipline', 'Learning', 'Ambition', 'Accountability'],
    limitingValues: ['Ego', 'Burnout', 'Competition', 'Arrogance']
  },
  {
    level: 4,
    name: 'Meaning & Contribution',
    definition: 'Connecting personal and collective work to purpose and long-term impact.',
    ethicalPrinciple: 'Service',
    enablingValues: ['Purpose', 'Stewardship', 'Empowerment', 'Recognition'],
    limitingValues: ['Apathy', 'Self-interest', 'Cynicism', 'Disconnection']
  },
  {
    level: 5,
    name: 'Integrity & Justice',
    definition: 'Upholding truth, fairness, and ethical responsibility as the foundation of trust.',
    ethicalPrinciple: 'Justice and Accountability',
    enablingValues: ['Integrity', 'Fairness', 'Transparency', 'Courage'],
    limitingValues: ['Deception', 'Injustice', 'Blame', 'Corruption']
  },
  {
    level: 6,
    name: 'Wisdom & Compassion',
    definition: 'Integrating intellect and empathy to lead with understanding and balance.',
    ethicalPrinciple: 'Mercy and Knowledge',
    enablingValues: ['Humility', 'Empathy', 'Discernment', 'Patience'],
    limitingValues: ['Pride', 'Indifference', 'Impulsiveness', 'Judgmentalism']
  },
  {
    level: 7,
    name: 'Transcendence & Unity',
    definition: 'Achieving harmony between self, others, and the greater purpose of existence.',
    ethicalPrinciple: 'Unity of Being',
    enablingValues: ['Alignment', 'Gratitude', 'Purposeful Reflection', 'Harmony'],
    limitingValues: ['Division', 'Materialism', 'Alienation', 'Despair']
  }
];

/**
 * Flat array of all 56 values for UI rendering in surveys
 * Combines all enabling and limiting values from all cylinders
 * Used in survey pages for value selection by employees
 */
export const ALL_VALUES: string[] = MIZAN_VALUES_POOL.flatMap(cylinder => [
  ...cylinder.enablingValues,
  ...cylinder.limitingValues
]);

/**
 * Helper function to categorize a value as enabling or limiting
 * @param value - The value to categorize
 * @returns 'enabling' | 'limiting' | null
 */
export function categorizeValue(value: string): 'enabling' | 'limiting' | null {
  for (const cylinder of MIZAN_VALUES_POOL) {
    if (cylinder.enablingValues.includes(value)) {
      return 'enabling';
    }
    if (cylinder.limitingValues.includes(value)) {
      return 'limiting';
    }
  }
  return null;
}

/**
 * Helper function to find which cylinder a value belongs to
 * @param value - The value to locate
 * @returns The cylinder object or null if not found
 */
export function findValueCylinder(value: string): MizanCylinder | null {
  return MIZAN_VALUES_POOL.find(cylinder =>
    cylinder.enablingValues.includes(value) ||
    cylinder.limitingValues.includes(value)
  ) || null;
}

/**
 * Helper function to get all enabling values across all cylinders
 * @returns Array of all enabling values
 */
export function getAllEnablingValues(): string[] {
  return MIZAN_VALUES_POOL.flatMap(cylinder => cylinder.enablingValues);
}

/**
 * Helper function to get all limiting values across all cylinders
 * @returns Array of all limiting values
 */
export function getAllLimitingValues(): string[] {
  return MIZAN_VALUES_POOL.flatMap(cylinder => cylinder.limitingValues);
}

/**
 * Type for value selection in surveys
 */
export interface ValueSelection {
  value: string;
  cylinder: number;
  type: 'enabling' | 'limiting';
  category: 'personal' | 'current' | 'desired';
}

/**
 * Type for cylinder score calculation
 */
export interface CylinderScore {
  cylinderLevel: number;
  cylinderName: string;
  enablingScore: number;
  limitingScore: number;
  netScore: number;
  dominantType: 'enabling' | 'limiting' | 'balanced';
}

/**
 * Calculate cylinder scores from value selections
 * @param selections - Array of selected values
 * @returns Array of cylinder scores
 */
export function calculateCylinderScores(selections: string[]): CylinderScore[] {
  const scores: CylinderScore[] = [];

  for (const cylinder of MIZAN_VALUES_POOL) {
    const enablingCount = selections.filter(val =>
      cylinder.enablingValues.includes(val)
    ).length;

    const limitingCount = selections.filter(val =>
      cylinder.limitingValues.includes(val)
    ).length;

    const netScore = enablingCount - limitingCount;

    scores.push({
      cylinderLevel: cylinder.level,
      cylinderName: cylinder.name,
      enablingScore: enablingCount,
      limitingScore: limitingCount,
      netScore: netScore,
      dominantType: netScore > 0 ? 'enabling' : netScore < 0 ? 'limiting' : 'balanced'
    });
  }

  return scores;
}

/**
 * Validate survey selections meet requirements
 * @param personalValues - Personal values array
 * @param currentExperience - Current experience values array
 * @param desiredExperience - Desired experience values array
 * @returns Validation result with any errors
 */
export function validateSurveySelections(
  personalValues: string[],
  currentExperience: string[],
  desiredExperience: string[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (personalValues.length !== 10) {
    errors.push(`Personal values must be exactly 10 (found ${personalValues.length})`);
  }

  if (currentExperience.length !== 10) {
    errors.push(`Current experience values must be exactly 10 (found ${currentExperience.length})`);
  }

  if (desiredExperience.length !== 10) {
    errors.push(`Desired experience values must be exactly 10 (found ${desiredExperience.length})`);
  }

  // Validate all values are from the valid pool
  const allSelections = [...personalValues, ...currentExperience, ...desiredExperience];
  const invalidValues = allSelections.filter(val => !ALL_VALUES.includes(val));

  if (invalidValues.length > 0) {
    errors.push(`Invalid values found: ${invalidValues.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Export type definitions for use in components
export type MizanValue = string;
export type ValueCategory = 'enabling' | 'limiting';
export type CylinderLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;