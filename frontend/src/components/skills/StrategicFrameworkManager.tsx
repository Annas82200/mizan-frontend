'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Edit, Trash2, Loader2, AlertCircle, X, FileText } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface StrategicFrameworkManagerProps {
  userRole: string;
}

interface Framework {
  id: string;
  frameworkName: string;
  industry: string;
  strategicSkills: any[];
  technicalSkills: any[];
  softSkills: any[];
  prioritization: any[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Strategic Framework Manager Component
 * ✅ PRODUCTION-READY: Full API integration
 * Manages strategic skills frameworks with create, read, update, delete operations
 */
export const StrategicFrameworkManager: React.FC<StrategicFrameworkManagerProps> = ({ userRole }) => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  // Create/Edit form state
  const [formData, setFormData] = useState({
    industry: '',
    strategy: '',
    organizationName: ''
  });

  // Load frameworks on mount
  useEffect(() => {
    loadFrameworks();
  }, []);

  /**
   * Load all frameworks from backend
   */
  const loadFrameworks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: any = await apiClient.skills.getFrameworks();

      if (response.success && response.frameworks) {
        setFrameworks(response.frameworks);
      }
    } catch (err: any) {
      logger.error('Failed to load frameworks:', err);
      setError(err.message || 'Failed to load frameworks');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new framework
   */
  const handleCreateFramework = async () => {
    if (!formData.industry.trim() || !formData.strategy.trim() || !formData.organizationName.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response: any = await apiClient.skills.createFramework({
        industry: formData.industry,
        strategy: formData.strategy,
        organizationName: formData.organizationName
      });

      if (response.success) {
        // Reload frameworks
        await loadFrameworks();

        // Reset form and close modal
        setFormData({ industry: '', strategy: '', organizationName: '' });
        setShowCreateModal(false);
      }
    } catch (err: any) {
      logger.error('Failed to create framework:', err);
      setError(err.message || 'Failed to create framework');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing framework
   */
  const handleUpdateFramework = async () => {
    if (!selectedFramework) return;

    try {
      setLoading(true);
      setError(null);

      const response: any = await apiClient.skills.updateFramework(selectedFramework.id, {
        industry: formData.industry,
        frameworkName: formData.organizationName
      });

      if (response.success) {
        // Reload frameworks
        await loadFrameworks();

        // Reset and close modal
        setSelectedFramework(null);
        setFormData({ industry: '', strategy: '', organizationName: '' });
        setShowEditModal(false);
      }
    } catch (err: any) {
      logger.error('Failed to update framework:', err);
      setError(err.message || 'Failed to update framework');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete framework
   */
  const handleDeleteFramework = async () => {
    if (!selectedFramework) return;

    try {
      setLoading(true);
      setError(null);

      const response: any = await apiClient.skills.deleteFramework(selectedFramework.id);

      if (response.success) {
        // Reload frameworks
        await loadFrameworks();

        // Reset and close modal
        setSelectedFramework(null);
        setShowDeleteConfirm(false);
      }
    } catch (err: any) {
      logger.error('Failed to delete framework:', err);
      setError(err.message || 'Failed to delete framework. This framework may have active assessment sessions.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open edit modal with framework data
   */
  const openEditModal = (framework: Framework) => {
    setSelectedFramework(framework);
    setFormData({
      industry: framework.industry,
      strategy: '',
      organizationName: framework.frameworkName
    });
    setShowEditModal(true);
  };

  /**
   * Open delete confirmation
   */
  const openDeleteConfirm = (framework: Framework) => {
    setSelectedFramework(framework);
    setShowDeleteConfirm(true);
  };

  /**
   * Count total skills in framework
   */
  const countSkills = (framework: Framework) => {
    const strategic = Array.isArray(framework.strategicSkills) ? framework.strategicSkills.length : 0;
    const technical = Array.isArray(framework.technicalSkills) ? framework.technicalSkills.length : 0;
    const soft = Array.isArray(framework.softSkills) ? framework.softSkills.length : 0;
    return strategic + technical + soft;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Strategic Skills Frameworks</h3>
          <p className="text-sm text-gray-600">Create and manage industry-specific skills frameworks</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Framework
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 p-0 h-auto mt-1"
              onClick={() => setError(null)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && frameworks.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Frameworks Grid */}
      {!loading && frameworks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworks.map((framework) => (
            <Card key={framework.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate text-base">{framework.frameworkName}</span>
                  <div className="flex space-x-1 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(framework)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openDeleteConfirm(framework)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="mb-2">{framework.industry}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills Overview:</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-lg font-bold text-blue-600">
                          {Array.isArray(framework.strategicSkills) ? framework.strategicSkills.length : 0}
                        </p>
                        <p className="text-xs text-gray-600">Strategic</p>
                      </div>
                      <div className="bg-green-50 rounded p-2">
                        <p className="text-lg font-bold text-green-600">
                          {Array.isArray(framework.technicalSkills) ? framework.technicalSkills.length : 0}
                        </p>
                        <p className="text-xs text-gray-600">Technical</p>
                      </div>
                      <div className="bg-purple-50 rounded p-2">
                        <p className="text-lg font-bold text-purple-600">
                          {Array.isArray(framework.softSkills) ? framework.softSkills.length : 0}
                        </p>
                        <p className="text-xs text-gray-600">Soft</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      Created: {new Date(framework.createdAt).toLocaleDateString()}
                    </p>
                    {framework.updatedAt !== framework.createdAt && (
                      <p className="text-xs text-gray-500">
                        Updated: {new Date(framework.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && frameworks.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">No Frameworks Created</h4>
            <p className="text-sm text-gray-600 mb-4">
              Create your first strategic skills framework to start analyzing skills gaps
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Framework
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Framework Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Create Strategic Skills Framework</span>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>
                <div>
                  <Label htmlFor="strategy">Strategic Focus *</Label>
                  <Textarea
                    id="strategy"
                    value={formData.strategy}
                    onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                    placeholder="Describe your organization's strategic direction and key objectives"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    placeholder="e.g., Acme Corp"
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleCreateFramework} disabled={loading} className="flex-1">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Create Framework
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateModal(false)} disabled={loading}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Framework Modal */}
      {showEditModal && selectedFramework && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Edit Framework</span>
                <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-industry">Industry</Label>
                  <Input
                    id="edit-industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-organizationName">Framework Name</Label>
                  <Input
                    id="edit-organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleUpdateFramework} disabled={loading} className="flex-1">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                    Update Framework
                  </Button>
                  <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={loading}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedFramework && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Confirm Deletion</span>
                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Are you sure you want to delete the framework <strong>"{selectedFramework.frameworkName}"</strong>?
                </p>
                <p className="text-sm text-gray-600">
                  This action cannot be undone. The framework will be permanently removed if there are no active assessment sessions.
                </p>
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="destructive"
                    onClick={handleDeleteFramework}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                    Delete Framework
                  </Button>
                  <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={loading}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
