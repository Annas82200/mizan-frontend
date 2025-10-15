'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Edit, Trash2 } from 'lucide-react';

interface StrategicFrameworkManagerProps {
  userRole: string;
}

/**
 * Strategic Framework Manager Component
 * Manages strategic skills frameworks
 */
export const StrategicFrameworkManager: React.FC<StrategicFrameworkManagerProps> = ({ userRole }) => {
  const [frameworks, setFrameworks] = useState([
    {
      id: '1',
      name: 'Technology Industry Framework',
      industry: 'Technology',
      skills: ['JavaScript', 'Python', 'Cloud Computing', 'AI/ML'],
      createdAt: new Date('2024-01-15')
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Strategic Skills Frameworks</h3>
          <p className="text-sm text-gray-600">Create and manage industry-specific skills frameworks</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Framework
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{framework.name}</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Badge variant="outline">{framework.industry}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {framework.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Created: {framework.createdAt.toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
