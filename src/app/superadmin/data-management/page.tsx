"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useClients } from '../../../contexts/client-context';
// All icons replaced with emojis - no generic icons used

export default function DataManagementPage() {
  const { clients } = useClients();
  const [selectedClient, setSelectedClient] = useState(null);
  const [surveyData, setSurveyData] = useState({
    employeeEmails: '',
    customMessage: ''
  });
  const [uploadData, setUploadData] = useState({
    orgChart: null,
    employeeProfiles: null
  });
  const [dataStatus, setDataStatus] = useState({
    surveys: { sent: 0, completed: 0, pending: 0 },
    orgChart: { uploaded: false, employees: 0 },
    profiles: { uploaded: false, processed: 0 }
  });

  // Real client data from context

  const sendSurvey = async () => {
    if (!selectedClient) {
      alert('Please select a client first');
      return;
    }

    try {
      const emails = surveyData.employeeEmails.split('\n').map(email => email.trim()).filter(email => email);
      
      const response = await fetch('https://mizan-backend-production.up.railway.app/api/surveys/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClient.id,
          surveyType: 'culture',
          employeeEmails: emails,
          customMessage: surveyData.customMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send survey');
      }

      const data = await response.json();
      
      setDataStatus(prev => ({
        ...prev,
        surveys: { sent: emails.length, completed: 0, pending: emails.length }
      }));

      alert(`Survey sent successfully to ${emails.length} employees!`);
      
    } catch (error) {
      console.error('Survey send error:', error);
      alert('Failed to send survey: ' + error.message);
    }
  };

  const uploadOrgChart = async (file) => {
    if (!selectedClient) {
      alert('Please select a client first');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvData = e.target.result;
        
        const response = await fetch('https://mizan-backend-production.up.railway.app/api/upload/org-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId: selectedClient.id,
            csvData: csvData,
            fileName: file.name
          })
        });

        if (!response.ok) {
          throw new Error('Failed to upload org chart');
        }

        const data = await response.json();
        
        setDataStatus(prev => ({
          ...prev,
          orgChart: { uploaded: true, employees: data.parsedData.totalEmployees }
        }));

        alert(`Org chart uploaded successfully! ${data.parsedData.totalEmployees} employees processed.`);
      };
      
      reader.readAsText(file);
      
    } catch (error) {
      console.error('Org chart upload error:', error);
      alert('Failed to upload org chart: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
              <span className="text-xl font-light text-slate-800">Mizan</span>
            </Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <span className="text-red-600 text-xl">👑</span>
              <span className="text-lg font-medium text-slate-900">Super Admin</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/superadmin/dashboard" className="text-slate-600 hover:text-slate-900">
              Back to Dashboard
            </Link>
            <Link href="/auth/login" className="text-slate-600 hover:text-slate-900">
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">Real Data Collection & Management</h1>
          <p className="text-slate-600">Collect actual organizational data for genuine AI analysis</p>
        </div>

        {/* Client Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-medium text-slate-900 mb-4">Select Client for Data Collection</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedClient?.id === client.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h3 className="font-medium text-slate-900">{client.name}</h3>
                <p className="text-sm text-slate-600">{client.plan} Plan • {client.employees} employees</p>
                <p className="text-xs text-slate-500">{client.email}</p>
              </div>
            ))}
          </div>
          
          {selectedClient && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-900 font-medium">Selected: {selectedClient.name}</p>
              <p className="text-blue-700 text-sm">Ready to collect data for {selectedClient.employees} employees</p>
            </div>
          )}
        </div>

        {/* Data Collection Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Employee Surveys */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">Employee Surveys</h3>
                <p className="text-sm text-slate-600">Culture, Engagement & Recognition Data</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Employee Emails (one per line)</label>
                <textarea
                  value={surveyData.employeeEmails}
                  onChange={(e) => setSurveyData({...surveyData, employeeEmails: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="john@company.com&#10;sarah@company.com&#10;mike@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Custom Message (Optional)</label>
                <textarea
                  value={surveyData.customMessage}
                  onChange={(e) => setSurveyData({...surveyData, customMessage: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                  placeholder="Please complete this culture survey to help improve our workplace..."
                />
              </div>

              <button
                onClick={sendSurvey}
                disabled={!selectedClient || !surveyData.employeeEmails}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="mr-2">📧</span>
                Send Culture Survey
              </button>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-2">Survey Status</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-medium text-blue-600">{dataStatus.surveys.sent}</div>
                    <div className="text-slate-600">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium text-green-600">{dataStatus.surveys.completed}</div>
                    <div className="text-slate-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium text-amber-600">{dataStatus.surveys.pending}</div>
                    <div className="text-slate-600">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organizational Chart Upload */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏗️</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">Organizational Chart</h3>
                <p className="text-sm text-slate-600">Structure Analysis Data</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                <span className="text-4xl mx-auto mb-2 block">📁</span>
                <p className="text-sm text-slate-600 mb-2">Upload CSV file with org structure</p>
                <p className="text-xs text-slate-500 mb-4">Format: Name, Email, Department, Manager, Role, Level</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) uploadOrgChart(file);
                  }}
                  className="hidden"
                  id="org-chart-upload"
                />
                <label
                  htmlFor="org-chart-upload"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer inline-block"
                >
                  Choose CSV File
                </label>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-2">Upload Status</h4>
                {dataStatus.orgChart.uploaded ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <span className="text-lg">✅</span>
                    <span className="text-sm">Org chart uploaded - {dataStatus.orgChart.employees} employees</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-slate-500">
                    <span className="text-lg">⚠️</span>
                    <span className="text-sm">No org chart uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Employee Profiles Upload */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900">Employee Profiles</h3>
                <p className="text-sm text-slate-600">Skills Analysis Data</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                <span className="text-4xl mx-auto mb-2 block">📄</span>
                <p className="text-sm text-slate-600 mb-2">Upload employee profiles or resumes</p>
                <p className="text-xs text-slate-500 mb-4">Supported: CSV, JSON, PDF resumes</p>
                <input
                  type="file"
                  accept=".csv,.json,.pdf"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    console.log('📁 Files selected:', files.length);
                    // Process files here
                  }}
                  className="hidden"
                  id="profiles-upload"
                />
                <label
                  htmlFor="profiles-upload"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                >
                  Choose Files
                </label>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-2">Processing Status</h4>
                {dataStatus.profiles.uploaded ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <span className="text-lg">✅</span>
                    <span className="text-sm">Profiles processed - {dataStatus.profiles.processed} employees</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-slate-500">
                    <span className="text-lg">⚠️</span>
                    <span className="text-sm">No profiles uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Collection Status & Analysis Readiness */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-medium text-slate-900 mb-6">Analysis Readiness Dashboard</h2>
          
          {selectedClient && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="font-medium text-blue-900 mb-2">Data Collection for: {selectedClient.name}</h3>
              <p className="text-blue-700 text-sm">Collecting real organizational data for genuine AI analysis</p>
            </div>
          )}

          <div className="grid md:grid-cols-5 gap-6">
            {/* Culture Analysis Readiness */}
            <div className="text-center p-4 border border-slate-200 rounded-xl">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-medium text-slate-900 mb-2">Culture Analysis</h4>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                dataStatus.surveys.completed >= 5 ? 'bg-green-100 text-green-800' :
                dataStatus.surveys.completed > 0 ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                {dataStatus.surveys.completed >= 5 ? 'Ready' :
                 dataStatus.surveys.completed > 0 ? 'Partial Data' :
                 'Needs Surveys'}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {dataStatus.surveys.completed}/5+ responses needed
              </p>
            </div>

            {/* Structure Analysis Readiness */}
            <div className="text-center p-4 border border-slate-200 rounded-xl">
              <div className="text-3xl mb-2">🏗️</div>
              <h4 className="font-medium text-slate-900 mb-2">Structure Analysis</h4>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                dataStatus.orgChart.uploaded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {dataStatus.orgChart.uploaded ? 'Ready' : 'Needs Org Chart'}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {dataStatus.orgChart.uploaded ? `${dataStatus.orgChart.employees} employees` : 'Upload CSV'}
              </p>
            </div>

            {/* Skills Analysis Readiness */}
            <div className="text-center p-4 border border-slate-200 rounded-xl">
              <div className="text-3xl mb-2">🎓</div>
              <h4 className="font-medium text-slate-900 mb-2">Skills Analysis</h4>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                dataStatus.profiles.uploaded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {dataStatus.profiles.uploaded ? 'Ready' : 'Needs Profiles'}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {dataStatus.profiles.uploaded ? `${dataStatus.profiles.processed} profiles` : 'Upload profiles'}
              </p>
            </div>

            {/* Engagement Analysis Readiness */}
            <div className="text-center p-4 border border-slate-200 rounded-xl">
              <div className="text-3xl mb-2">💖</div>
              <h4 className="font-medium text-slate-900 mb-2">Engagement Analysis</h4>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                dataStatus.surveys.completed >= 3 ? 'bg-green-100 text-green-800' :
                dataStatus.surveys.completed > 0 ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                {dataStatus.surveys.completed >= 3 ? 'Ready' :
                 dataStatus.surveys.completed > 0 ? 'Partial Data' :
                 'Needs Surveys'}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Uses engagement data from culture surveys
              </p>
            </div>

            {/* Recognition Analysis Readiness */}
            <div className="text-center p-4 border border-slate-200 rounded-xl">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-medium text-slate-900 mb-2">Recognition Analysis</h4>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                dataStatus.surveys.completed >= 3 ? 'bg-green-100 text-green-800' :
                dataStatus.surveys.completed > 0 ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                {dataStatus.surveys.completed >= 3 ? 'Ready' :
                 dataStatus.surveys.completed > 0 ? 'Partial Data' :
                 'Needs Surveys'}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Uses recognition data from culture surveys
              </p>
            </div>
          </div>
        </div>

        {/* Real Analysis Section */}
        {selectedClient && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-medium text-slate-900 mb-6">Run Real Analysis with Collected Data</h2>
            
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { id: 'culture', name: 'Culture', emoji: '🎯', requirement: 'surveys', minData: 5 },
                { id: 'structure', name: 'Structure', emoji: '🏗️', requirement: 'orgChart', minData: 1 },
                { id: 'skills', name: 'Skills', emoji: '🎓', requirement: 'profiles', minData: 1 },
                { id: 'engagement', name: 'Engagement', emoji: '💖', requirement: 'surveys', minData: 3 },
                { id: 'recognition', name: 'Recognition', emoji: '🏆', requirement: 'surveys', minData: 3 }
              ].map((analysis) => {
                const isReady = 
                  analysis.requirement === 'surveys' ? dataStatus.surveys.completed >= analysis.minData :
                  analysis.requirement === 'orgChart' ? dataStatus.orgChart.uploaded :
                  analysis.requirement === 'profiles' ? dataStatus.profiles.uploaded :
                  false;

                return (
                  <div key={analysis.id} className="text-center">
                    <button
                      disabled={!isReady}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        isReady 
                          ? 'border-green-500 bg-green-50 hover:bg-green-100 text-green-800'
                          : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-2xl mb-2">{analysis.emoji}</div>
                      <div className="font-medium">{analysis.name}</div>
                      <div className="text-xs mt-1">
                        {isReady ? 'Run Real Analysis' : 'Collect Data First'}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Real vs Demo Analysis</h4>
                  <p className="text-sm text-amber-800">
                    <strong>Demo Analysis</strong>: Uses sample data for testing endpoints<br/>
                    <strong>Real Analysis</strong>: Uses actual employee data for genuine insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
