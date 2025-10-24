'use client';

import React, { useState } from 'react';
import {
  Shield,
  Heart,
  TrendingUp,
  Sparkles,
  Scale,
  Brain,
  Target,
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Trash2,
  Save,
  X,
  AlertCircle
} from 'lucide-react';

interface Value {
  name: string;
  definition: string;
}

interface Cylinder {
  cylinder: number;
  name: string;
  definition: string;
  ethicalPrinciple: string;
  enablingValues: Value[];
  limitingValues: Value[];
}

const CYLINDER_ICONS = [Shield, Heart, TrendingUp, Sparkles, Scale, Brain, Target];
const CYLINDER_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#CCA404'];

export default function FrameworkConfigPage() {
  const [expandedCylinder, setExpandedCylinder] = useState<number | null>(7);
  const [editingCylinder, setEditingCylinder] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<{
    cylinderId: number;
    type: 'enabling' | 'limiting';
    index: number;
  } | null>(null);
  const [addingValue, setAddingValue] = useState<{
    cylinderId: number;
    type: 'enabling' | 'limiting';
  } | null>(null);
  const [newValue, setNewValue] = useState<Value>({ name: '', definition: '' });

  const [cylinders, setCylinders] = useState<Cylinder[]>([
    {
      cylinder: 1,
      name: "Safety & Survival",
      definition: "Protecting life and dignity by ensuring health, stability, and freedom from harm. Organizations grounded here safeguard people's wellbeing before all else.",
      ethicalPrinciple: "Preservation of Life",
      enablingValues: [
        {
          name: "Safety",
          definition: "Creates environments free from physical, psychological, and digital harm where people feel secure to contribute."
        },
        {
          name: "Stability",
          definition: "Establishes dependable systems, predictable routines, and consistent leadership that sustain confidence and trust."
        },
        {
          name: "Preparedness",
          definition: "Anticipates risks and responds proactively through prevention, training, and care for resilience."
        },
        {
          name: "Wellbeing",
          definition: "Promotes holistic balance—mental, physical, emotional, and social—so individuals can thrive sustainably."
        }
      ],
      limitingValues: [
        {
          name: "Fear",
          definition: "Uses control or intimidation to drive compliance instead of safety and trust."
        },
        {
          name: "Neglect",
          definition: "Ignores early warning signs that threaten people's wellbeing or stability."
        },
        {
          name: "Instability",
          definition: "Creates chaos through unclear priorities or frequent disruptive change."
        },
        {
          name: "Complacency",
          definition: "Fails to update systems and safeguards, leaving people vulnerable."
        }
      ]
    },
    {
      cylinder: 2,
      name: "Belonging & Loyalty",
      definition: "Fostering genuine connection, trust, and shared identity within teams and communities.",
      ethicalPrinciple: "Human Dignity",
      enablingValues: [
        {
          name: "Inclusion",
          definition: "Creates spaces where all voices are valued and respected regardless of status or background."
        },
        {
          name: "Trust",
          definition: "Builds reliability through transparency, honesty, and consistent care for others."
        },
        {
          name: "Collaboration",
          definition: "Encourages teamwork and mutual reliance to achieve shared goals."
        },
        {
          name: "Compassion",
          definition: "Recognizes the emotional and human side of work, fostering empathy and kindness."
        }
      ],
      limitingValues: [
        {
          name: "Cliquishness",
          definition: "Forms exclusive circles that divide teams and limit access to opportunity."
        },
        {
          name: "Bias",
          definition: "Lets personal or cultural prejudice influence decisions or relationships."
        },
        {
          name: "Distrust",
          definition: "Assumes bad intent or hides information, eroding openness and cooperation."
        },
        {
          name: "Favoritism",
          definition: "Rewards loyalty to individuals over loyalty to shared purpose or principles."
        }
      ]
    },
    {
      cylinder: 3,
      name: "Growth & Achievement",
      definition: "Encouraging learning, mastery, and performance that honor both excellence and humility.",
      ethicalPrinciple: "Striving with Excellence",
      enablingValues: [
        {
          name: "Discipline",
          definition: "Maintains consistency, focus, and perseverance in pursuit of goals."
        },
        {
          name: "Learning",
          definition: "Seeks continuous improvement through feedback, curiosity, and reflection."
        },
        {
          name: "Ambition",
          definition: "Sets bold yet ethical aspirations that uplift the individual and the organization."
        },
        {
          name: "Accountability",
          definition: "Takes ownership for actions, results, and the wellbeing of others."
        }
      ],
      limitingValues: [
        {
          name: "Ego",
          definition: "Pursues recognition and power at the expense of humility and shared success."
        },
        {
          name: "Burnout",
          definition: "Overextends effort without balance or care, leading to exhaustion and decline."
        },
        {
          name: "Competition",
          definition: "Creates rivalry that undermines trust and collaboration."
        },
        {
          name: "Arrogance",
          definition: "Rejects feedback or learning due to inflated self-perception."
        }
      ]
    },
    {
      cylinder: 4,
      name: "Meaning & Contribution",
      definition: "Connecting personal and collective work to purpose and long-term impact.",
      ethicalPrinciple: "Service",
      enablingValues: [
        {
          name: "Purpose",
          definition: "Aligns actions and decisions with a clear sense of meaning and contribution."
        },
        {
          name: "Stewardship",
          definition: "Acts responsibly toward people, resources, and the environment."
        },
        {
          name: "Empowerment",
          definition: "Gives others the freedom and tools to take initiative and create positive impact."
        },
        {
          name: "Recognition",
          definition: "Celebrates effort and contribution as vital to collective success."
        }
      ],
      limitingValues: [
        {
          name: "Apathy",
          definition: "Shows disinterest in the organization's mission or others' wellbeing."
        },
        {
          name: "Self-interest",
          definition: "Prioritizes personal gain over shared outcomes."
        },
        {
          name: "Cynicism",
          definition: "Dismisses purpose or meaning as irrelevant or naïve."
        },
        {
          name: "Disconnection",
          definition: "Loses sight of how one's work contributes to a larger purpose."
        }
      ]
    },
    {
      cylinder: 5,
      name: "Integrity & Justice",
      definition: "Upholding truth, fairness, and ethical responsibility as the foundation of trust.",
      ethicalPrinciple: "Justice and Accountability",
      enablingValues: [
        {
          name: "Integrity",
          definition: "Acts consistently with moral principles even when inconvenient or unseen."
        },
        {
          name: "Fairness",
          definition: "Makes impartial decisions that respect the rights and dignity of all."
        },
        {
          name: "Transparency",
          definition: "Shares information honestly to build confidence and accountability."
        },
        {
          name: "Courage",
          definition: "Stands up for what is right, even under pressure or risk."
        }
      ],
      limitingValues: [
        {
          name: "Deception",
          definition: "Distorts truth for convenience or personal advantage."
        },
        {
          name: "Injustice",
          definition: "Permits unfair systems or double standards to persist."
        },
        {
          name: "Blame",
          definition: "Avoids responsibility by shifting fault onto others."
        },
        {
          name: "Corruption",
          definition: "Compromises moral principles for personal or organizational gain."
        }
      ]
    },
    {
      cylinder: 6,
      name: "Wisdom & Compassion",
      definition: "Integrating intellect and empathy to lead with understanding and balance.",
      ethicalPrinciple: "Mercy and Knowledge",
      enablingValues: [
        {
          name: "Humility",
          definition: "Listens deeply, learns from others, and admits the limits of one's perspective."
        },
        {
          name: "Empathy",
          definition: "Seeks to understand others' experiences before acting or deciding."
        },
        {
          name: "Discernment",
          definition: "Balances facts, values, and intuition to make wise judgments."
        },
        {
          name: "Patience",
          definition: "Responds to difficulty with steadiness and grace rather than reactivity."
        }
      ],
      limitingValues: [
        {
          name: "Pride",
          definition: "Closes the door to learning by overestimating one's own wisdom."
        },
        {
          name: "Indifference",
          definition: "Fails to act with compassion when others are in need."
        },
        {
          name: "Impulsiveness",
          definition: "Acts hastily without reflection or counsel."
        },
        {
          name: "Judgmentalism",
          definition: "Condemns others harshly rather than guiding with mercy."
        }
      ]
    },
    {
      cylinder: 7,
      name: "Transcendence & Unity",
      definition: "Achieving harmony between self, others, and the greater purpose of existence.",
      ethicalPrinciple: "Unity of Being",
      enablingValues: [
        {
          name: "Alignment",
          definition: "Brings actions, words, and intentions into coherence across all areas of life."
        },
        {
          name: "Gratitude",
          definition: "Recognizes and appreciates the interconnectedness of all blessings and efforts."
        },
        {
          name: "Purposeful Reflection",
          definition: "Pauses to connect daily work to deeper meaning and shared humanity."
        },
        {
          name: "Harmony",
          definition: "Promotes peace, cooperation, and spiritual balance within and between groups."
        }
      ],
      limitingValues: [
        {
          name: "Division",
          definition: "Amplifies differences and conflict, eroding unity and purpose."
        },
        {
          name: "Materialism",
          definition: "Overfocuses on possessions or status, neglecting inner growth."
        },
        {
          name: "Alienation",
          definition: "Feels disconnected from meaning, others, or the greater whole."
        },
        {
          name: "Despair",
          definition: "Loses faith in the possibility of renewal, healing, or higher purpose."
        }
      ]
    }
  ]);

  const handleAddValue = (cylinderId: number, type: 'enabling' | 'limiting') => {
    if (!newValue.name.trim() || !newValue.definition.trim()) return;

    setCylinders(prev => prev.map(cyl => {
      if (cyl.cylinder === cylinderId) {
        const values = type === 'enabling' ? [...cyl.enablingValues] : [...cyl.limitingValues];
        values.push({ ...newValue });

        return type === 'enabling'
          ? { ...cyl, enablingValues: values }
          : { ...cyl, limitingValues: values };
      }
      return cyl;
    }));

    setNewValue({ name: '', definition: '' });
    setAddingValue(null);
  };

  const handleDeleteValue = (cylinderId: number, type: 'enabling' | 'limiting', index: number) => {
    setCylinders(prev => prev.map(cyl => {
      if (cyl.cylinder === cylinderId) {
        const values = type === 'enabling' ? [...cyl.enablingValues] : [...cyl.limitingValues];
        values.splice(index, 1);

        return type === 'enabling'
          ? { ...cyl, enablingValues: values }
          : { ...cyl, limitingValues: values };
      }
      return cyl;
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      // ✅ PRODUCTION: Use httpOnly cookies for authentication (Phase 1 Security)
      // Get token from localStorage for Authorization header (hybrid auth)
      const token = localStorage.getItem('mizan_auth_token');

      const response = await fetch(`${apiUrl}/api/framework`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: 'include',  // Send httpOnly cookie automatically
        body: JSON.stringify({ cylinders })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save framework');
      }

      const result = await response.json();
      alert(`Framework configuration saved successfully! Version ${result.version}`);
    } catch (error: unknown) {
      console.error('Save error:', error);
      alert(`Error saving framework: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  };

  const getCylinderIcon = (index: number) => {
    const IconComponent = CYLINDER_ICONS[index];
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
            7-Cylinder Framework Configuration
          </h1>
          <p className="text-lg text-mizan-secondary">
            Mizan's proprietary values-based cultural assessment system
          </p>
        </div>
        <button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Save className="w-5 h-5" />
          <span>Save All Changes</span>
        </button>
      </div>

      {/* Warning Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-900">
            <strong>Important:</strong> Changes to the framework affect all culture analyses across all tenants.
            Make sure all definitions are accurate and aligned with Mizan's methodology.
          </p>
        </div>
      </div>

      {/* Cylinders Display */}
      <div className="space-y-3">
        {cylinders.sort((a, b) => b.cylinder - a.cylinder).map((cylinder, idx) => (
          <div
            key={cylinder.cylinder}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-400"
          >
            {/* Cylinder Header */}
            <button
              onClick={() => setExpandedCylinder(expandedCylinder === cylinder.cylinder ? null : cylinder.cylinder)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-400"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${CYLINDER_COLORS[cylinder.cylinder - 1]}15`, color: CYLINDER_COLORS[cylinder.cylinder - 1] }}
                >
                  {getCylinderIcon(cylinder.cylinder - 1)}
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-3">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${CYLINDER_COLORS[cylinder.cylinder - 1]}15`,
                        color: CYLINDER_COLORS[cylinder.cylinder - 1]
                      }}
                    >
                      Cylinder {cylinder.cylinder}
                    </span>
                    <h3 className="text-lg font-semibold text-mizan-primary">
                      {cylinder.name}
                    </h3>
                  </div>
                  <p className="text-sm text-mizan-secondary mt-1">
                    {cylinder.ethicalPrinciple}
                  </p>
                </div>
              </div>
              {expandedCylinder === cylinder.cylinder ? (
                <ChevronUp className="w-5 h-5 text-mizan-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-mizan-secondary" />
              )}
            </button>

            {/* Cylinder Details (Expanded) */}
            {expandedCylinder === cylinder.cylinder && (
              <div className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-100">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-mizan-primary mb-2">Definition</h4>
                  <p className="text-mizan-secondary text-sm">
                    {cylinder.definition}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Enabling Values */}
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-green-900 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Enabling Values ({cylinder.enablingValues.length})
                      </h4>
                      <button
                        onClick={() => setAddingValue({ cylinderId: cylinder.cylinder, type: 'enabling' })}
                        className="p-1 hover:bg-green-100 rounded transition-colors"
                        title="Add enabling value"
                      >
                        <Plus className="w-4 h-4 text-green-700" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {cylinder.enablingValues.map((value, vIdx) => (
                        <div key={vIdx} className="bg-white p-3 rounded-lg border border-green-200 group">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-green-900 text-sm">{value.name}</span>
                              </div>
                              <p className="text-xs text-green-800">{value.definition}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteValue(cylinder.cylinder, 'enabling', vIdx)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all ml-2"
                              title="Delete value"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add New Enabling Value Form */}
                      {addingValue?.cylinderId === cylinder.cylinder && addingValue.type === 'enabling' && (
                        <div className="bg-white p-3 rounded-lg border-2 border-green-300">
                          <input
                            type="text"
                            placeholder="Value name..."
                            value={newValue.name}
                            onChange={(e) => setNewValue({ ...newValue, name: e.target.value })}
                            className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm mb-2 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                          />
                          <textarea
                            placeholder="Value definition..."
                            value={newValue.definition}
                            onChange={(e) => setNewValue({ ...newValue, definition: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm mb-2 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all resize-none"
                          />
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleAddValue(cylinder.cylinder, 'enabling')}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                            >
                              Add Value
                            </button>
                            <button
                              onClick={() => {
                                setAddingValue(null);
                                setNewValue({ name: '', definition: '' });
                              }}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Limiting Values */}
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-red-900 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        Limiting Values ({cylinder.limitingValues.length})
                      </h4>
                      <button
                        onClick={() => setAddingValue({ cylinderId: cylinder.cylinder, type: 'limiting' })}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                        title="Add limiting value"
                      >
                        <Plus className="w-4 h-4 text-red-700" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {cylinder.limitingValues.map((value, vIdx) => (
                        <div key={vIdx} className="bg-white p-3 rounded-lg border border-red-200 group">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-red-900 text-sm">{value.name}</span>
                              </div>
                              <p className="text-xs text-red-800">{value.definition}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteValue(cylinder.cylinder, 'limiting', vIdx)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all ml-2"
                              title="Delete value"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add New Limiting Value Form */}
                      {addingValue?.cylinderId === cylinder.cylinder && addingValue.type === 'limiting' && (
                        <div className="bg-white p-3 rounded-lg border-2 border-red-300">
                          <input
                            type="text"
                            placeholder="Value name..."
                            value={newValue.name}
                            onChange={(e) => setNewValue({ ...newValue, name: e.target.value })}
                            className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm mb-2 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                          />
                          <textarea
                            placeholder="Value definition..."
                            value={newValue.definition}
                            onChange={(e) => setNewValue({ ...newValue, definition: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm mb-2 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                          />
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleAddValue(cylinder.cylinder, 'limiting')}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                            >
                              Add Value
                            </button>
                            <button
                              onClick={() => {
                                setAddingValue(null);
                                setNewValue({ name: '', definition: '' });
                              }}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
