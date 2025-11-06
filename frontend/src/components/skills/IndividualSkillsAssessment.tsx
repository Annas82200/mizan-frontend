'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCheck, Upload, FileText, CheckCircle, X, Plus, Loader2, AlertCircle } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface IndividualSkillsAssessmentProps {
  userRole: string;
  employeeId?: string;
}

interface Skill {
  name: string;
  category: string;
  level: string;
  yearsOfExperience?: number;
}

/**
 * Individual Skills Assessment Component
 * ✅ PRODUCTION-READY: Full API integration
 * For employees to complete skills assessments via resume upload or manual entry
 */
export const IndividualSkillsAssessment: React.FC<IndividualSkillsAssessmentProps> = ({
  userRole, // Reserved for future role-based features
  employeeId = 'current' // Default to current user
}) => {
  // State management
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  // Manual skill entry form state
  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    category: '',
    level: 'beginner',
    yearsOfExperience: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gap analysis state
  const [gapAnalysis, setGapAnalysis] = useState<any>(null);
  const [loadingGapAnalysis, setLoadingGapAnalysis] = useState(false);
  const [gapAnalysisError, setGapAnalysisError] = useState<string | null>(null);

  // Load existing skills on mount
  useEffect(() => {
    loadEmployeeSkills();
  }, [employeeId]);

  /**
   * Load existing skills from backend
   */
  const loadEmployeeSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: any = await apiClient.skills.getEmployeeSkills(employeeId);

      if (response.success && response.data?.skills) {
        setSkills(response.data.skills);
        // Load gap analysis if skills exist
        if (response.data.skills.length > 0) {
          loadGapAnalysis();
        }
      }
    } catch (err: any) {
      console.error('Failed to load skills:', err);
      setError(err.message || 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load gap analysis for the employee
   */
  const loadGapAnalysis = async () => {
    try {
      setLoadingGapAnalysis(true);
      setGapAnalysisError(null);

      const response: any = await apiClient.skills.getEmployeeGapAnalysis(employeeId);

      if (response.success && response.data) {
        setGapAnalysis(response.data);
      }
    } catch (err: any) {
      console.error('Failed to load gap analysis:', err);
      setGapAnalysisError(err.message || 'Failed to load gap analysis');
    } finally {
      setLoadingGapAnalysis(false);
    }
  };

  /**
   * Handle file upload via drag-and-drop or file input
   */
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB limit)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      setError(`File size must be less than 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setUploadProgress(10);

      const response: any = await apiClient.skills.uploadResume(file, employeeId);
      setUploadProgress(100);

      if (response.success && response.data?.extractedSkills) {
        // Merge extracted skills with existing skills (avoid duplicates)
        const existingSkillNames = skills.map(s => s.name.toLowerCase());
        const newSkills = response.data.extractedSkills.filter(
          (s: Skill) => !existingSkillNames.includes(s.name.toLowerCase())
        );

        const updatedSkills = [...skills, ...newSkills];
        setSkills(updatedSkills);

        // Auto-save to backend
        await saveSkills(updatedSkills);

        // Load gap analysis after skills are added
        if (updatedSkills.length > 0) {
          loadGapAnalysis();
        }
      }

      setTimeout(() => setUploadProgress(0), 2000);
    } catch (err: any) {
      console.error('Resume upload failed:', err);
      setError(err.message || 'Failed to upload resume');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle drag events
   */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  /**
   * Handle file input change
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  /**
   * Save skills to backend
   */
  const saveSkills = async (skillsToSave: Skill[]) => {
    try {
      const response: any = await apiClient.skills.updateEmployeeSkills(employeeId, skillsToSave);

      if (response.success) {
        return true;
      }
      throw new Error(response.error || 'Failed to save skills');
    } catch (err: any) {
      console.error('Failed to save skills:', err);
      setError(err.message || 'Failed to save skills');
      return false;
    }
  };

  /**
   * Add manual skill
   */
  const handleAddManualSkill = async () => {
    if (!newSkill.name.trim() || !newSkill.category.trim()) {
      setError('Skill name and category are required');
      return;
    }

    // Check for duplicates
    if (skills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      setError('This skill already exists');
      return;
    }

    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);

    // Save to backend
    setLoading(true);
    const success = await saveSkills(updatedSkills);
    setLoading(false);

    if (success) {
      // Reset form
      setNewSkill({
        name: '',
        category: '',
        level: 'beginner',
        yearsOfExperience: 0
      });
      setShowManualForm(false);
      setError(null);

      // Load gap analysis after adding skills
      loadGapAnalysis();
    }
  };

  /**
   * Delete skill
   */
  const handleDeleteSkill = async (skillName: string) => {
    try {
      setLoading(true);
      setError(null);

      await apiClient.skills.deleteEmployeeSkill(employeeId, skillName);

      // Update local state
      setSkills(skills.filter(s => s.name !== skillName));
    } catch (err: any) {
      console.error('Failed to delete skill:', err);
      setError(err.message || 'Failed to delete skill');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calculate assessment progress
   */
  const calculateProgress = () => {
    if (skills.length === 0) return 0;
    // Basic progress: having skills = progress
    // Could be enhanced with proficiency levels, years of experience, etc.
    return Math.min((skills.length / 10) * 100, 100);
  };

  const progress = calculateProgress();
  const assessmentStatus = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Skills Assessment</h3>
        <p className="text-sm text-gray-600">Complete your personal skills assessment</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-800">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 p-0 h-auto"
              onClick={() => setError(null)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resume Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Resume Upload</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Upload your resume for automatic skills extraction
            </p>

            {/* Drag-and-drop area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">
                Drag & drop your resume here
              </p>
              <p className="text-xs text-gray-500 mb-3">or</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                size="sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Upload progress */}
            {uploadProgress > 0 && (
              <div className="mt-3">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Assessment Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Manual Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Add skills manually one by one
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowManualForm(!showManualForm)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </CardContent>
        </Card>

        {/* Assessment Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5" />
              <span>Assessment Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <Badge variant={assessmentStatus === 'completed' ? 'default' : 'outline'}>
                {assessmentStatus === 'not-started' && 'Not Started'}
                {assessmentStatus === 'in-progress' && 'In Progress'}
                {assessmentStatus === 'completed' && (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </>
                )}
              </Badge>
              <p className="text-xs text-gray-600 mt-2">
                {skills.length} skill{skills.length !== 1 ? 's' : ''} added
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manual Skill Entry Form */}
      {showManualForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Skill Manually</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="skill-name">Skill Name *</Label>
                <Input
                  id="skill-name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., JavaScript"
                />
              </div>
              <div>
                <Label htmlFor="skill-category">Category *</Label>
                <Input
                  id="skill-category"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  placeholder="e.g., Programming"
                />
              </div>
              <div>
                <Label htmlFor="skill-level">Proficiency Level</Label>
                <select
                  id="skill-level"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-gray-300"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <Label htmlFor="skill-years">Years of Experience</Label>
                <Input
                  id="skill-years"
                  type="number"
                  min="0"
                  max="50"
                  value={newSkill.yearsOfExperience}
                  onChange={(e) => setNewSkill({ ...newSkill, yearsOfExperience: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleAddManualSkill} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Skill
              </Button>
              <Button variant="outline" onClick={() => setShowManualForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills List */}
      {skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Skills ({skills.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{skill.name}</h4>
                    <p className="text-xs text-gray-600">{skill.category}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {skill.level}
                      </Badge>
                      {skill.yearsOfExperience !== undefined && skill.yearsOfExperience > 0 && (
                        <span className="text-xs text-gray-500">
                          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSkill(skill.name)}
                    disabled={loading}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {!loading && skills.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">No Skills Added Yet</h4>
            <p className="text-sm text-gray-600 mb-4">
              Upload your resume or add skills manually to get started
            </p>
          </CardContent>
        </Card>
      )}

      {/* Gap Analysis Section */}
      {skills.length > 0 && (
        <>
          {/* Loading state for gap analysis */}
          {loadingGapAnalysis && (
            <Card>
              <CardContent className="py-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Analyzing skills gaps...</p>
              </CardContent>
            </Card>
          )}

          {/* Gap analysis error */}
          {gapAnalysisError && !loadingGapAnalysis && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800">{gapAnalysisError}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-yellow-600 p-0 h-auto mt-1"
                  onClick={() => loadGapAnalysis()}
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Gap analysis results */}
          {gapAnalysis && !loadingGapAnalysis && (
            <>
              {/* Overall Gap Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <span>Gap Analysis Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">Overall Gap Score</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {gapAnalysis.overallGapScore !== undefined
                          ? Math.round(gapAnalysis.overallGapScore)
                          : 'N/A'}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm text-gray-600 mb-2">Critical Gaps</p>
                      <p className="text-3xl font-bold text-red-600">
                        {gapAnalysis.criticalGaps?.length || 0}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-600 mb-2">Strengths</p>
                      <p className="text-3xl font-bold text-green-600">
                        {gapAnalysis.strengths?.length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Critical Skills Gaps */}
              {gapAnalysis.criticalGaps && gapAnalysis.criticalGaps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span>Critical Skills Gaps</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {gapAnalysis.criticalGaps.map((gap: any, index: number) => (
                        <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{gap.skillName || gap.skill}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Category: {gap.category || 'General'}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {gap.currentLevel || 'None'} → {gap.requiredLevel || 'Required'}
                                </Badge>
                                {gap.gapScore !== undefined && (
                                  <span className="text-sm text-red-600">
                                    Gap Score: {Math.round(gap.gapScore)}%
                                  </span>
                                )}
                              </div>
                            </div>
                            {gap.gapSeverity && (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                {gap.gapSeverity.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Strengths */}
              {gapAnalysis.strengths && gapAnalysis.strengths.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Your Strengths</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {gapAnalysis.strengths.map((strength: any, index: number) => (
                        <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900">{strength.skillName || strength.skill}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {strength.category || 'General'}
                          </p>
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {strength.level || strength.proficiencyLevel || 'Proficient'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {gapAnalysis.recommendations && gapAnalysis.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {gapAnalysis.recommendations.map((recommendation: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <span className="text-blue-600 mt-1 font-bold">{index + 1}.</span>
                          <span className="text-sm text-gray-700 flex-1">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Empty gap analysis state */}
              {(!gapAnalysis.criticalGaps || gapAnalysis.criticalGaps.length === 0) &&
               (!gapAnalysis.strengths || gapAnalysis.strengths.length === 0) &&
               (!gapAnalysis.recommendations || gapAnalysis.recommendations.length === 0) && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Analysis Complete</h4>
                    <p className="text-sm text-gray-600">
                      Gap analysis is being processed. Check back soon for detailed insights.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
