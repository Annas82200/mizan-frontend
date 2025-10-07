/**
 * Mizan 7-Cylinder Framework - Complete Values Pool
 * These values are used in the culture survey for employees to select from.
 * The Culture Agent analyzes which cylinder each value belongs to.
 */

export interface MizanValue {
  value: string;
  type: 'enabling' | 'limiting';
  cylinder: number;
  cylinderName: string;
}

export const MIZAN_VALUES_POOL: MizanValue[] = [
  // Cylinder 1: Safety & Survival
  { value: 'Safety', type: 'enabling', cylinder: 1, cylinderName: 'Safety & Survival' },
  { value: 'Stability', type: 'enabling', cylinder: 1, cylinderName: 'Safety & Survival' },
  { value: 'Preparedness', type: 'enabling', cylinder: 1, cylinderName: 'Safety & Survival' },
  { value: 'Wellbeing', type: 'enabling', cylinder: 1, cylinderName: 'Safety & Survival' },
  { value: 'Fear', type: 'limiting', cylinder: 1, cylinderName: 'Safety & Survival' },
  { value: 'Neglect', type: 'limiting', cylinder: 1, cylinderName: 'Safety & Survival' },
  { value: 'Instability', type: 'limiting', cylinder: 1, cylinderName: 'Safety & Survival' },
  { value: 'Complacency', type: 'limiting', cylinder: 1, cylinderName: 'Safety & Survival' },

  // Cylinder 2: Belonging & Loyalty
  { value: 'Belonging', type: 'enabling', cylinder: 2, cylinderName: 'Belonging & Loyalty' },
  { value: 'Dignity', type: 'enabling', cylinder: 2, cylinderName: 'Belonging & Loyalty' },
  { value: 'Loyalty', type: 'enabling', cylinder: 2, cylinderName: 'Belonging & Loyalty' },
  { value: 'Respect', type: 'enabling', cylinder: 2, cylinderName: 'Belonging & Loyalty' },
  { value: 'Exclusion', type: 'limiting', cylinder: 2, cylinderName: 'Belonging & Loyalty' },
  { value: 'Humiliation', type: 'limiting', cylinder: 2, cylinderName: 'Belonging & Loyalty' },
  { value: 'Tribalism', type: 'limiting', cylinder: 2, cylinderName: 'Belonging & Loyalty' },
  { value: 'Disrespect', type: 'limiting', cylinder: 2, cylinderName: 'Belonging & Loyalty' },

  // Cylinder 3: Growth & Achievement
  { value: 'Achievement', type: 'enabling', cylinder: 3, cylinderName: 'Growth & Achievement' },
  { value: 'Discipline', type: 'enabling', cylinder: 3, cylinderName: 'Growth & Achievement' },
  { value: 'Accountability', type: 'enabling', cylinder: 3, cylinderName: 'Growth & Achievement' },
  { value: 'Learning', type: 'enabling', cylinder: 3, cylinderName: 'Growth & Achievement' },
  { value: 'Stagnation', type: 'limiting', cylinder: 3, cylinderName: 'Growth & Achievement' },
  { value: 'Negligence', type: 'limiting', cylinder: 3, cylinderName: 'Growth & Achievement' },
  { value: 'Blame-shifting', type: 'limiting', cylinder: 3, cylinderName: 'Growth & Achievement' },
  { value: 'Arrogance', type: 'limiting', cylinder: 3, cylinderName: 'Growth & Achievement' },

  // Cylinder 4: Meaning & Contribution
  { value: 'Purpose', type: 'enabling', cylinder: 4, cylinderName: 'Meaning & Contribution' },
  { value: 'Contribution', type: 'enabling', cylinder: 4, cylinderName: 'Meaning & Contribution' },
  { value: 'Service', type: 'enabling', cylinder: 4, cylinderName: 'Meaning & Contribution' },
  { value: 'Generosity', type: 'enabling', cylinder: 4, cylinderName: 'Meaning & Contribution' },
  { value: 'Apathy', type: 'limiting', cylinder: 4, cylinderName: 'Meaning & Contribution' },
  { value: 'Self-centeredness', type: 'limiting', cylinder: 4, cylinderName: 'Meaning & Contribution' },
  { value: 'Exploitation', type: 'limiting', cylinder: 4, cylinderName: 'Meaning & Contribution' },
  { value: 'Greed', type: 'limiting', cylinder: 4, cylinderName: 'Meaning & Contribution' },

  // Cylinder 5: Integrity & Justice
  { value: 'Integrity', type: 'enabling', cylinder: 5, cylinderName: 'Integrity & Justice' },
  { value: 'Fairness', type: 'enabling', cylinder: 5, cylinderName: 'Integrity & Justice' },
  { value: 'Transparency', type: 'enabling', cylinder: 5, cylinderName: 'Integrity & Justice' },
  { value: 'Courage', type: 'enabling', cylinder: 5, cylinderName: 'Integrity & Justice' },
  { value: 'Dishonesty', type: 'limiting', cylinder: 5, cylinderName: 'Integrity & Justice' },
  { value: 'Favoritism', type: 'limiting', cylinder: 5, cylinderName: 'Integrity & Justice' },
  { value: 'Secrecy', type: 'limiting', cylinder: 5, cylinderName: 'Integrity & Justice' },
  { value: 'Cowardice', type: 'limiting', cylinder: 5, cylinderName: 'Integrity & Justice' },

  // Cylinder 6: Wisdom & Compassion
  { value: 'Wisdom', type: 'enabling', cylinder: 6, cylinderName: 'Wisdom & Compassion' },
  { value: 'Empathy', type: 'enabling', cylinder: 6, cylinderName: 'Wisdom & Compassion' },
  { value: 'Patience', type: 'enabling', cylinder: 6, cylinderName: 'Wisdom & Compassion' },
  { value: 'Humility', type: 'enabling', cylinder: 6, cylinderName: 'Wisdom & Compassion' },
  { value: 'Ignorance', type: 'limiting', cylinder: 6, cylinderName: 'Wisdom & Compassion' },
  { value: 'Cruelty', type: 'limiting', cylinder: 6, cylinderName: 'Wisdom & Compassion' },
  { value: 'Impatience', type: 'limiting', cylinder: 6, cylinderName: 'Wisdom & Compassion' },
  { value: 'Pride', type: 'limiting', cylinder: 6, cylinderName: 'Wisdom & Compassion' },

  // Cylinder 7: Transcendence & Unity
  { value: 'Unity', type: 'enabling', cylinder: 7, cylinderName: 'Transcendence & Unity' },
  { value: 'Harmony', type: 'enabling', cylinder: 7, cylinderName: 'Transcendence & Unity' },
  { value: 'Transcendence', type: 'enabling', cylinder: 7, cylinderName: 'Transcendence & Unity' },
  { value: 'Balance', type: 'enabling', cylinder: 7, cylinderName: 'Transcendence & Unity' },
  { value: 'Division', type: 'limiting', cylinder: 7, cylinderName: 'Transcendence & Unity' },
  { value: 'Discord', type: 'limiting', cylinder: 7, cylinderName: 'Transcendence & Unity' },
  { value: 'Materialism', type: 'limiting', cylinder: 7, cylinderName: 'Transcendence & Unity' },
  { value: 'Imbalance', type: 'limiting', cylinder: 7, cylinderName: 'Transcendence & Unity' },
];

// Export grouped by type for easy filtering
export const ENABLING_VALUES = MIZAN_VALUES_POOL.filter(v => v.type === 'enabling');
export const LIMITING_VALUES = MIZAN_VALUES_POOL.filter(v => v.type === 'limiting');

// Export all values as simple string array for forms
export const ALL_VALUES = MIZAN_VALUES_POOL.map(v => v.value);
