'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Settings, Save, Calendar, Bell, Target } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface PerformanceSettings {
  performanceCycle: 'quarterly' | 'semi-annual' | 'annual';
  goalApprovalRequired: boolean;
  evaluationReminderDays: number;
  calibrationEnabled: boolean;
  continuousFeedbackEnabled: boolean;
  peerReviewEnabled: boolean;
  selfAssessmentRequired: boolean;
  goalsVisibilityLevel: 'private' | 'team' | 'department' | 'company';
  notificationPreferences: {
    goalDeadline: boolean;
    evaluationDue: boolean;
    feedbackReceived: boolean;
    calibrationScheduled: boolean;
  };
}

export default function PerformanceSettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<PerformanceSettings>({
    performanceCycle: 'quarterly',
    goalApprovalRequired: true,
    evaluationReminderDays: 7,
    calibrationEnabled: true,
    continuousFeedbackEnabled: true,
    peerReviewEnabled: false,
    selfAssessmentRequired: true,
    goalsVisibilityLevel: 'team',
    notificationPreferences: {
      goalDeadline: true,
      evaluationDue: true,
      feedbackReceived: true,
      calibrationScheduled: true
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [session]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<PerformanceSettings>('/api/performance/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await apiClient.put('/api/performance/settings', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
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
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Performance Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure performance management preferences
          </p>
        </div>
        <Button onClick={handleSaveSettings} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Performance Cycle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Performance Cycle Configuration
          </CardTitle>
          <CardDescription>
            Set how often performance evaluations are conducted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="performance-cycle">Performance Review Cycle</Label>
            <Select
              value={settings.performanceCycle}
              onValueChange={(value: 'quarterly' | 'semi-annual' | 'annual') =>
                setSettings({ ...settings, performanceCycle: value })
              }
            >
              <SelectTrigger id="performance-cycle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quarterly">Quarterly (every 3 months)</SelectItem>
                <SelectItem value="semi-annual">Semi-Annual (every 6 months)</SelectItem>
                <SelectItem value="annual">Annual (once per year)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reminder-days">Evaluation Reminder (days before)</Label>
            <Input
              id="reminder-days"
              type="number"
              value={settings.evaluationReminderDays}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  evaluationReminderDays: parseInt(e.target.value)
                })
              }
              min={1}
              max={30}
            />
          </div>
        </CardContent>
      </Card>

      {/* Goal Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goal Management Settings
          </CardTitle>
          <CardDescription>
            Configure how goals are created and managed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Goal Approval Required</Label>
              <p className="text-sm text-muted-foreground">
                Require manager approval before goals become active
              </p>
            </div>
            <Switch
              checked={settings.goalApprovalRequired}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, goalApprovalRequired: checked })
              }
            />
          </div>

          <div>
            <Label htmlFor="goals-visibility">Goals Visibility Level</Label>
            <Select
              value={settings.goalsVisibilityLevel}
              onValueChange={(value: 'private' | 'team' | 'department' | 'company') =>
                setSettings({ ...settings, goalsVisibilityLevel: value })
              }
            >
              <SelectTrigger id="goals-visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private (only you and manager)</SelectItem>
                <SelectItem value="team">Team (visible to team members)</SelectItem>
                <SelectItem value="department">Department (visible to department)</SelectItem>
                <SelectItem value="company">Company (visible to everyone)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Features</CardTitle>
          <CardDescription>
            Enable or disable specific performance management features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Calibration Sessions</Label>
              <p className="text-sm text-muted-foreground">
                Enable performance calibration meetings for managers
              </p>
            </div>
            <Switch
              checked={settings.calibrationEnabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, calibrationEnabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Continuous Feedback</Label>
              <p className="text-sm text-muted-foreground">
                Allow ongoing feedback throughout the performance cycle
              </p>
            </div>
            <Switch
              checked={settings.continuousFeedbackEnabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, continuousFeedbackEnabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Peer Reviews</Label>
              <p className="text-sm text-muted-foreground">
                Enable 360-degree feedback from peers
              </p>
            </div>
            <Switch
              checked={settings.peerReviewEnabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, peerReviewEnabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Self-Assessment Required</Label>
              <p className="text-sm text-muted-foreground">
                Require employees to complete self-assessments
              </p>
            </div>
            <Switch
              checked={settings.selfAssessmentRequired}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, selfAssessmentRequired: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose which performance notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Goal Deadline Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Notify when goals are approaching their due date
              </p>
            </div>
            <Switch
              checked={settings.notificationPreferences.goalDeadline}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notificationPreferences: {
                    ...settings.notificationPreferences,
                    goalDeadline: checked
                  }
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Evaluation Due Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Remind when performance evaluations are due
              </p>
            </div>
            <Switch
              checked={settings.notificationPreferences.evaluationDue}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notificationPreferences: {
                    ...settings.notificationPreferences,
                    evaluationDue: checked
                  }
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Feedback Received</Label>
              <p className="text-sm text-muted-foreground">
                Notify when you receive feedback from peers or managers
              </p>
            </div>
            <Switch
              checked={settings.notificationPreferences.feedbackReceived}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notificationPreferences: {
                    ...settings.notificationPreferences,
                    feedbackReceived: checked
                  }
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Calibration Scheduled</Label>
              <p className="text-sm text-muted-foreground">
                Notify when calibration sessions are scheduled
              </p>
            </div>
            <Switch
              checked={settings.notificationPreferences.calibrationScheduled}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notificationPreferences: {
                    ...settings.notificationPreferences,
                    calibrationScheduled: checked
                  }
                })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
