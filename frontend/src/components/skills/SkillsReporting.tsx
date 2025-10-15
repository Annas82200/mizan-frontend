'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, BarChart3, TrendingUp } from 'lucide-react';

interface SkillsReportingProps {
  userRole: string;
}

/**
 * Skills Reporting Component
 * Generates and displays skills analysis reports
 */
export const SkillsReporting: React.FC<SkillsReportingProps> = ({ userRole }) => {
  const [reports] = useState([
    {
      id: '1',
      name: 'Q4 2024 Skills Assessment Report',
      type: 'Strategic Assessment',
      status: 'Completed',
      generatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Technology Team Skills Analysis',
      type: 'Department Analysis',
      status: 'Completed',
      generatedAt: new Date('2024-01-20')
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Skills Reports & Insights</h3>
          <p className="text-sm text-gray-600">Generate and view comprehensive skills analysis reports</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span>Strategic Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">5</div>
            <p className="text-sm text-gray-600">Organization-level reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Department Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-sm text-gray-600">Team-level analyses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-500" />
              <span>Individual Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">150</div>
            <p className="text-sm text-gray-600">Employee assessments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-mizan-primary/10 rounded-full">
                    <FileText className="w-5 h-5 text-mizan-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-600">
                      {report.type} • Generated: {report.generatedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{report.status}</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
