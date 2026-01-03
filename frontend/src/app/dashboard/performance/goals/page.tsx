'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Target, Edit, Trash2, CheckCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface PerformanceGoal {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'departmental' | 'culture' | 'skills';
  category: string;
  targetValue: number;
  currentValue: number;
  weight: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  approvalStatus: 'draft' | 'pending_approval' | 'approved' | 'rejected';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface GoalFormData {
  title: string;
  description: string;
  type: 'individual' | 'departmental' | 'culture' | 'skills';
  category: string;
  targetValue: number;
  weight: number;
  dueDate: string;
}

export default function GoalsPage() {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<PerformanceGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<PerformanceGoal | null>(null);
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    type: 'individual',
    category: 'performance',
    targetValue: 100,
    weight: 1,
    dueDate: ''
  });

  useEffect(() => {
    loadGoals();
  }, [session]);

  const loadGoals = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const response = await apiClient.get<PerformanceGoal[]>('/api/performance/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    try {
      await apiClient.post('/api/performance/goals', formData);
      setIsCreateDialogOpen(false);
      resetForm();
      await loadGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleUpdateGoal = async (goalId: string, updates: Partial<PerformanceGoal>) => {
    try {
      await apiClient.put(`/api/performance/goals/${goalId}`, updates);
      await loadGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;

    try {
      await apiClient.delete(`/api/performance/goals/${goalId}`);
      await loadGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleMarkComplete = async (goalId: string) => {
    await handleUpdateGoal(goalId, { status: 'completed' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'individual',
      category: 'performance',
      targetValue: 100,
      weight: 1,
      dueDate: ''
    });
    setEditingGoal(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Goals</h1>
          <p className="text-muted-foreground mt-1">
            Set, track, and achieve your performance objectives
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Goal
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first performance goal to get started
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Create Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {goal.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {goal.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(goal.status)}`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-semibold">
                        {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (goal.currentValue / goal.targetValue) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Goal Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type</span>
                      <p className="font-semibold capitalize">{goal.type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category</span>
                      <p className="font-semibold capitalize">{goal.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weight</span>
                      <p className="font-semibold">{goal.weight}x</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due Date</span>
                      <p className="font-semibold">
                        {new Date(goal.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    {goal.status !== 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkComplete(goal.id)}
                        className="gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark Complete
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingGoal(goal);
                        setIsCreateDialogOpen(true);
                      }}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create/Edit Goal Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingGoal ? 'Edit Goal' : 'Create New Goal'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Goal Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Increase customer satisfaction by 20%"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the goal and how it will be measured..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Goal Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'individual' | 'departmental' | 'culture' | 'skills') => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="departmental">Departmental</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="skills">Skills</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., performance, revenue"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Target Value</label>
                <Input
                  type="number"
                  value={formData.targetValue}
                  onChange={(e) => setFormData({ ...formData, targetValue: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Weight</label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateGoal}>
              {editingGoal ? 'Update Goal' : 'Create Goal'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
