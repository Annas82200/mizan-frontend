"use client";

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Upload, 
  Download, 
  Edit, 
  Save, 
  X,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FrameworkData {
  id: string;
  name: string;
  version: string;
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
  cylinders: Array<{
    id: string;
    name: string;
    ethicalPrinciple: string;
    definition: string;
    values: Array<{
      name: string;
      definition: string;
      type: 'enabling' | 'limiting';
    }>;
  }>;
}

export default function FrameworkPage() {
  const [frameworks, setFrameworks] = useState<FrameworkData[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<FrameworkData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFramework, setEditingFramework] = useState<FrameworkData | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    loadFrameworks();
  }, []);

  const loadFrameworks = async () => {
    try {
      // Load framework data from localStorage or API
      const frameworkData = localStorage.getItem('mizanFrameworks');
      if (frameworkData) {
        setFrameworks(JSON.parse(frameworkData));
      } else {
        // Default framework data
        const defaultFramework: FrameworkData = {
          id: '1',
          name: 'Mizan 7-Cylinders Framework',
          version: '2024.1',
          lastUpdated: new Date().toISOString(),
          status: 'active',
          cylinders: [
            {
              id: 'safety',
              name: 'Safety & Survival',
              ethicalPrinciple: 'Preservation of Life',
              definition: 'Protecting life and dignity by ensuring health, stability, and freedom from harm.',
              values: [
                { name: 'Safety', definition: 'Ensuring physical and psychological safety', type: 'enabling' },
                { name: 'Security', definition: 'Protecting from threats and vulnerabilities', type: 'enabling' }
              ]
            },
            {
              id: 'belonging',
              name: 'Belonging & Loyalty',
              ethicalPrinciple: 'Brotherhood & Trust',
              definition: 'Creating bonds of trust, loyalty, and care where every person feels they belong.',
              values: [
                { name: 'Loyalty', definition: 'Commitment to relationships and commitments', type: 'enabling' },
                { name: 'Trust', definition: 'Reliability and dependability in relationships', type: 'enabling' }
              ]
            },
            {
              id: 'growth',
              name: 'Growth & Achievement',
              ethicalPrinciple: 'Striving with Excellence',
              definition: 'Pursuing performance and growth with humility and responsibility.',
              values: [
                { name: 'Excellence', definition: 'Commitment to high standards and continuous improvement', type: 'enabling' },
                { name: 'Achievement', definition: 'Pursuing meaningful goals and accomplishments', type: 'enabling' }
              ]
            },
            {
              id: 'meaning',
              name: 'Meaning & Contribution',
              ethicalPrinciple: 'Purposeful Service',
              definition: 'Connecting work and learning to a deeper sense of purpose and contribution.',
              values: [
                { name: 'Innovation', definition: 'Translating creativity into solutions that benefit people', type: 'enabling' },
                { name: 'Service', definition: 'Contributing to the greater good', type: 'enabling' }
              ]
            },
            {
              id: 'integrity',
              name: 'Integrity & Justice',
              ethicalPrinciple: 'Justice & Accountability',
              definition: 'Aligning words and actions with fairness and accountability.',
              values: [
                { name: 'Integrity', definition: 'Consistency between values and actions', type: 'enabling' },
                { name: 'Justice', definition: 'Fair treatment and equitable outcomes', type: 'enabling' }
              ]
            },
            {
              id: 'wisdom',
              name: 'Wisdom & Compassion',
              ethicalPrinciple: 'Mercy & Knowledge',
              definition: 'Leading and serving with empathy, humility, and wisdom.',
              values: [
                { name: 'Compassion', definition: 'Understanding and caring for others', type: 'enabling' },
                { name: 'Wisdom', definition: 'Applying knowledge with discernment', type: 'enabling' }
              ]
            },
            {
              id: 'transcendence',
              name: 'Transcendence & Unity',
              ethicalPrinciple: 'Unity & Stewardship',
              definition: 'Seeing life, work, and the planet as interconnected.',
              values: [
                { name: 'Unity', definition: 'Working together toward common goals', type: 'enabling' },
                { name: 'Stewardship', definition: 'Responsible care for resources and environment', type: 'enabling' }
              ]
            }
          ]
        };
        
        setFrameworks([defaultFramework]);
        localStorage.setItem('mizanFrameworks', JSON.stringify([defaultFramework]));
      }
    } catch (error) {
      console.error('Failed to load frameworks:', error);
    }
  };

  const handleEditFramework = (framework: FrameworkData) => {
    setEditingFramework({ ...framework });
    setIsEditing(true);
  };

  const handleSaveFramework = () => {
    if (!editingFramework) return;

    const updatedFrameworks = frameworks.map(f => 
      f.id === editingFramework.id ? { ...editingFramework, lastUpdated: new Date().toISOString() } : f
    );
    
    setFrameworks(updatedFrameworks);
    localStorage.setItem('mizanFrameworks', JSON.stringify(updatedFrameworks));
    setIsEditing(false);
    setEditingFramework(null);
    alert('Framework updated successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingFramework(null);
  };

  const handleUploadFramework = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const frameworkData = JSON.parse(e.target?.result as string);
          const newFramework: FrameworkData = {
            ...frameworkData,
            id: Date.now().toString(),
            lastUpdated: new Date().toISOString(),
            status: 'draft'
          };
          
          const updatedFrameworks = [...frameworks, newFramework];
          setFrameworks(updatedFrameworks);
          localStorage.setItem('mizanFrameworks', JSON.stringify(updatedFrameworks));
          setShowUpload(false);
          alert('Framework uploaded successfully!');
        } catch (error) {
          alert('Invalid framework file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadFramework = (framework: FrameworkData) => {
    const dataStr = JSON.stringify(framework, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${framework.name.replace(/\s+/g, '_')}_v${framework.version}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Framework Management</h1>
          <p className="text-gray-600 mt-1">Manage and configure the Mizan analysis frameworks</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center space-x-2 bg-mizan-teal text-white px-4 py-2 rounded-lg hover:bg-mizan-teal-600 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Framework</span>
        </button>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Framework</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Framework File (JSON)
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleUploadFramework}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  Framework files should be in JSON format with cylinders, values, and definitions.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frameworks List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Available Frameworks</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {frameworks.map((framework) => (
              <div key={framework.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-mizan-teal mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                      <p className="text-sm text-gray-600">Version {framework.version} • {framework.cylinders.length} cylinders</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(framework.status)}`}>
                      {framework.status}
                    </span>
                    <button
                      onClick={() => handleDownloadFramework(framework)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditFramework(framework)}
                      className="text-mizan-teal hover:text-mizan-teal-600"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(framework.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Framework Modal */}
      {isEditing && editingFramework && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Edit Framework</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveFramework}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Framework Name</label>
                  <input
                    type="text"
                    value={editingFramework.name}
                    onChange={(e) => setEditingFramework({...editingFramework, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                  <input
                    type="text"
                    value={editingFramework.version}
                    onChange={(e) => setEditingFramework({...editingFramework, version: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingFramework.status}
                  onChange={(e) => setEditingFramework({...editingFramework, status: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cylinders</h3>
                <div className="space-y-4">
                  {editingFramework.cylinders.map((cylinder, index) => (
                    <div key={cylinder.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cylinder Name</label>
                          <input
                            type="text"
                            value={cylinder.name}
                            onChange={(e) => {
                              const updatedCylinders = [...editingFramework.cylinders];
                              updatedCylinders[index].name = e.target.value;
                              setEditingFramework({...editingFramework, cylinders: updatedCylinders});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ethical Principle</label>
                          <input
                            type="text"
                            value={cylinder.ethicalPrinciple}
                            onChange={(e) => {
                              const updatedCylinders = [...editingFramework.cylinders];
                              updatedCylinders[index].ethicalPrinciple = e.target.value;
                              setEditingFramework({...editingFramework, cylinders: updatedCylinders});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Definition</label>
                        <textarea
                          value={cylinder.definition}
                          onChange={(e) => {
                            const updatedCylinders = [...editingFramework.cylinders];
                            updatedCylinders[index].definition = e.target.value;
                            setEditingFramework({...editingFramework, cylinders: updatedCylinders});
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
