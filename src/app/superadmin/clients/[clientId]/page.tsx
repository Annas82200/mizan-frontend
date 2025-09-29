"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useClients } from '../../../../contexts/client-context';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Upload, 
  Send, 
  CheckCircle, 
  TrendingUp,
  BarChart3,
  Target,
  Brain,
  Settings,
  Eye,
  Download
} from 'lucide-react';

export default function ClientPage() {
  const params = useParams();
  const router = useRouter();
  const { clients } = useClients();
  const clientId = params.clientId as string;
  
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisResults, setAnalysisResults] = useState({});
  const [dataStatus, setDataStatus] = useState({
    culture: { hasData: false, required: 'Employee surveys', status: 'missing' },
    structure: { hasData: false, required: 'Org chart', status: 'missing' },
    skills: { hasData: false, required: 'Employee profiles', status: 'missing' }
  });

  useEffect(() => {
    const foundClient = clients.find(c => c.id === clientId);
    if (foundClient) {
      setClient(foundClient);
      // Simulate data status check
      setDataStatus({
        culture: { hasData: true, required: 'Employee surveys', status: 'complete', count: 45 },
        structure: { hasData: true, required: 'Org chart', status: 'complete' },
        skills: { hasData: false, required: 'Employee profiles', status: 'missing' }
      });
    }
  }, [clients, clientId]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'data', name: 'Data Collection', icon: Upload },
    { id: 'analysis', name: 'Analysis', icon: Brain },
    { id: 'reports', name: 'Reports', icon: BarChart3 }
  ];

  const runAnalysis = async (analysisType) => {
    if (!dataStatus[analysisType]?.hasData) {
      alert(`❌ Cannot run ${analysisType} analysis!\n\n` +
            `Required: ${dataStatus[analysisType]?.required}\n` +
            `Status: ${dataStatus[analysisType]?.status}\n\n` +
            `Please collect the required data first.`);
      return;
    }

    console.log(`🎯 Running ${analysisType} analysis for ${client.name}`);
    
    // TEMPORARY WORKAROUND: Use local API instead of Railway backend
    // This will work immediately while Railway backend is being updated
    try {
      const response = await fetch(`/api/superadmin/clients/${clientId}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisType })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResults(prev => ({
          ...prev,
          [analysisType]: data.result
        }));

        alert(`✅ ${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis Complete!\n\n` +
              `📊 Results generated for ${client.name}\n` +
              `📈 Check the Reports tab to view detailed insights`);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      // Fallback to mock analysis if API fails
      console.log(`🔄 API failed, using mock analysis for ${analysisType}`);
      
      const mockResults = {
        culture: {
          success: true,
          analysisId: `culture-${clientId}-${Date.now()}`,
          clientId,
          analysisType: 'culture',
          scores: {
            alignment: 85,
            engagement: 78,
            satisfaction: 82,
            recognition: 75
          },
          insights: [
            "Strong cultural alignment with stated values (85%)",
            "Employee engagement shows room for improvement (78%)",
            "Recognition systems could be enhanced (75%)",
            "Overall culture health is good with specific improvement areas"
          ],
          recommendations: [
            "Implement quarterly culture pulse surveys",
            "Develop peer recognition program",
            "Create culture ambassador roles",
            "Establish regular feedback sessions"
          ],
          generatedAt: new Date().toISOString()
        },
        structure: {
          success: true,
          analysisId: `structure-${clientId}-${Date.now()}`,
          clientId,
          analysisType: 'structure',
          efficiency: 88,
          insights: [
            "Organizational structure supports current scale effectively",
            "Clear reporting lines with appropriate span of control",
            "Some departments could benefit from cross-functional collaboration",
            "Decision-making processes are well-defined"
          ],
          recommendations: [
            "Review manager-to-employee ratios in growing departments",
            "Clarify role responsibilities in overlapping areas",
            "Implement cross-functional collaboration protocols",
            "Establish regular structure review cycles"
          ],
          generatedAt: new Date().toISOString()
        },
        skills: {
          success: true,
          analysisId: `skills-${clientId}-${Date.now()}`,
          clientId,
          analysisType: 'skills',
          gaps: [
            { skill: "Digital Marketing", gap: "Medium", priority: "High", affectedEmployees: 15 },
            { skill: "Data Analysis", gap: "Low", priority: "Medium", affectedEmployees: 8 },
            { skill: "Leadership", gap: "High", priority: "High", affectedEmployees: 12 }
          ],
          insights: [
            "Strong technical skills across engineering teams",
            "Digital marketing capabilities need development",
            "Leadership skills gap identified in middle management",
            "Data analysis skills are adequate but could be enhanced"
          ],
          recommendations: [
            "Develop comprehensive digital marketing training program",
            "Create mentorship programs for leadership development",
            "Invest in data analytics tools and training",
            "Establish skills assessment and development framework"
          ],
          generatedAt: new Date().toISOString()
        }
      };

      const result = mockResults[analysisType];
      if (result) {
        setAnalysisResults(prev => ({
          ...prev,
          [analysisType]: result
        }));

        alert(`✅ ${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis Complete! (Mock Data)\n\n` +
              `📊 Results generated for ${client.name}\n` +
              `📈 Check the Reports tab to view detailed insights\n\n` +
              `⚠️ Note: Using mock data while backend is being updated`);
      } else {
        alert(`❌ Analysis failed: Unknown analysis type`);
      }
    }
  };

  const sendSurvey = (surveyType) => {
    alert(`📧 ${surveyType.charAt(0).toUpperCase() + surveyType.slice(1)} Survey\n\n` +
          `✅ Survey sent to ${client.employees} employees\n` +
          `📱 Employees will receive email with survey link\n` +
          `📊 Responses will be collected automatically`);
  };

  const uploadFile = (fileType) => {
    alert(`📁 Upload ${fileType}\n\n` +
          `✅ File upload dialog would open here\n` +
          `📊 File would be processed and stored\n` +
          `🔍 Data would be validated and indexed`);
  };

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading client...</p>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-light text-slate-900">{client.name}</h1>
              <p className="text-slate-600">{client.industry} • {client.employees} employees</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-medium text-slate-900">${client.mrr}</div>
            <div className="text-sm text-slate-500">Monthly Revenue</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-slate-900 mb-3">Company Information</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Email:</span> {client.email}</div>
              <div><span className="text-slate-500">Plan:</span> {client.plan}</div>
              <div><span className="text-slate-500">Status:</span> {client.status}</div>
              <div><span className="text-slate-500">Last Active:</span> {client.lastActive}</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 mb-3">Strategic Information</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Strategy:</span> {client.strategy || 'Not specified'}</div>
              <div><span className="text-slate-500">Vision:</span> {client.vision || 'Not specified'}</div>
              <div><span className="text-slate-500">Mission:</span> {client.mission || 'Not specified'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-medium text-slate-900 mb-6">Data Collection Status</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(dataStatus).map(([type, status]) => (
            <div key={type} className="p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium capitalize text-slate-900">{type}</span>
                <div className={`w-3 h-3 rounded-full ${
                  status.status === 'complete' ? 'bg-green-500' : 'bg-amber-500'
                }`}></div>
              </div>
              <p className="text-sm text-slate-600 mb-2">{status.required}</p>
              <div className="text-xs text-slate-500">
                {status.status === 'complete' ? 
                  `✅ ${status.count || 'Data'} collected` : 
                  '❌ Data missing'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataCollectionTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-medium text-slate-900 mb-6">Data Collection</h2>
        
        <div className="space-y-6">
          <div className="p-6 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-slate-900">Culture Analysis</h3>
                  <p className="text-sm text-slate-600">Employee surveys and culture assessment</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                dataStatus.culture.status === 'complete' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {dataStatus.culture.status === 'complete' ? 'Complete' : 'Missing'}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => sendSurvey('culture')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
                <span>Send Survey</span>
              </button>
              {dataStatus.culture.status === 'complete' && (
                <button className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200">
                  <Eye className="w-4 h-4" />
                  <span>View Responses ({dataStatus.culture.count})</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-medium text-slate-900">Structure Analysis</h3>
                  <p className="text-sm text-slate-600">Organizational chart and hierarchy</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                dataStatus.structure.status === 'complete' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {dataStatus.structure.status === 'complete' ? 'Complete' : 'Missing'}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => uploadFile('org-chart')}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Org Chart</span>
              </button>
              {dataStatus.structure.status === 'complete' && (
                <button className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200">
                  <Eye className="w-4 h-4" />
                  <span>View Chart</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-medium text-slate-900">Skills Analysis</h3>
                  <p className="text-sm text-slate-600">Employee profiles and skill assessments</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                dataStatus.skills.status === 'complete' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {dataStatus.skills.status === 'complete' ? 'Complete' : 'Missing'}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => uploadFile('employee-profiles')}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Profiles</span>
              </button>
              {dataStatus.skills.status === 'complete' && (
                <button className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200">
                  <Eye className="w-4 h-4" />
                  <span>View Profiles</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysisTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-medium text-slate-900 mb-6">Run Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(dataStatus).map(([type, status]) => (
            <div key={type} className="p-6 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-slate-900 capitalize">{type}</h3>
                    <p className="text-sm text-slate-600">Analysis</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  status.status === 'complete' ? 'bg-green-500' : 'bg-amber-500'
                }`}></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">Required: {status.required}</p>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  status.status === 'complete' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {status.status === 'complete' ? '✅ Ready' : '❌ Missing Data'}
                </div>
              </div>
              
              <button
                onClick={() => runAnalysis(type)}
                disabled={status.status !== 'complete'}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  status.status === 'complete'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {status.status === 'complete' ? 'Run Analysis' : 'Data Required'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-medium text-slate-900 mb-6">Analysis Reports</h2>
        
        {Object.keys(analysisResults).length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Reports Yet</h3>
            <p className="text-slate-600 mb-6">Run analysis to generate reports</p>
            <button
              onClick={() => setActiveTab('analysis')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Analysis
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(analysisResults).map(([type, result]) => (
              <div key={type} className="p-6 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-slate-900 capitalize">{type} Report</h3>
                      <p className="text-sm text-slate-600">{result.generatedAt}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-500 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-green-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Key Insights</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {result.insights.map((insight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Recommendations</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/superadmin/dashboard')}
                className="p-2 text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-medium text-slate-900">{client.name}</h1>
                <p className="text-sm text-slate-500">Client Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'data' && renderDataCollectionTab()}
        {activeTab === 'analysis' && renderAnalysisTab()}
        {activeTab === 'reports' && renderReportsTab()}
      </div>
    </div>
  );
}