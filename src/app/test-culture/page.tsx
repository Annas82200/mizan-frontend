"use client";

import React, { useState } from 'react';

export default function TestCulturePage() {
  const [responses, setResponses] = useState({
    personalValues: [],
    currentExperience: [],
    desiredExperience: [],
    recognition: 5,
    engagement: 5
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const values = [
    'Trust', 'Innovation', 'Learning', 'Accountability', 'Excellence', 
    'Safety', 'Belonging', 'Recognition', 'Autonomy', 'Purpose'
  ];

  const handleValueToggle = (field, value) => {
    const current = responses[field] || [];
    if (current.includes(value)) {
      setResponses({
        ...responses,
        [field]: current.filter(v => v !== value)
      });
    } else if (current.length < 10) {
      setResponses({
        ...responses,
        [field]: [...current, value]
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/entry/analyze-culture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName: 'Test Organization',
          industry: 'Technology',
          companyValues: ['Innovation', 'Trust', 'Excellence'],
          employeeResponses: [responses]
        })
      });

      const result = await response.json();
      setResults(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Culture Analysis Test</h1>
        
        {!results ? (
          <div className="space-y-8">
            {/* Personal Values */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Values (select up to 10)</h3>
              <div className="grid grid-cols-5 gap-2">
                {values.map(value => (
                  <button
                    key={value}
                    onClick={() => handleValueToggle('personalValues', value)}
                    className={`p-2 text-sm rounded ${
                      responses.personalValues.includes(value)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Selected: {responses.personalValues.length}/10
              </p>
            </div>

            {/* Current Experience */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Current Experience (select up to 10)</h3>
              <div className="grid grid-cols-5 gap-2">
                {values.map(value => (
                  <button
                    key={value}
                    onClick={() => handleValueToggle('currentExperience', value)}
                    className={`p-2 text-sm rounded ${
                      responses.currentExperience.includes(value)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Selected: {responses.currentExperience.length}/10
              </p>
            </div>

            {/* Desired Experience */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Desired Experience (select up to 10)</h3>
              <div className="grid grid-cols-5 gap-2">
                {values.map(value => (
                  <button
                    key={value}
                    onClick={() => handleValueToggle('desiredExperience', value)}
                    className={`p-2 text-sm rounded ${
                      responses.desiredExperience.includes(value)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Selected: {responses.desiredExperience.length}/10
              </p>
            </div>

            {/* Recognition Slider */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recognition Level: {responses.recognition}/10</h3>
              <input
                type="range"
                min="1"
                max="10"
                value={responses.recognition}
                onChange={(e) => setResponses({...responses, recognition: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Engagement Slider */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Engagement Level: {responses.engagement}/10</h3>
              <input
                type="range"
                min="1"
                max="10"
                value={responses.engagement}
                onChange={(e) => setResponses({...responses, engagement: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Run Culture Analysis'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Analysis Results</h2>
            
            {results.success ? (
              <div className="space-y-4">
                <div className="bg-green-100 p-4 rounded">
                  <h3 className="font-semibold">Success!</h3>
                  <p>Overall Score: {results.analysis.overallScore}</p>
                  <p>Entropy Score: {results.analysis.entropyScore}</p>
                  <p>Values Alignment: {results.analysis.valuesAlignment}%</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded">
                  <h3 className="font-semibold">Survey Analysis</h3>
                  <p>Total Responses: {results.analysis.surveyAnalysis.totalResponses}</p>
                  <p>Average Recognition: {results.analysis.surveyAnalysis.averageRecognition.toFixed(1)}</p>
                  <p>Average Engagement: {results.analysis.surveyAnalysis.averageEngagement.toFixed(1)}</p>
                </div>

                <div className="bg-blue-100 p-4 rounded">
                  <h3 className="font-semibold">Employee Report Available</h3>
                  <p>Personal insights generated: {results.analysis.reports.employeeReports.length} reports</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-100 p-4 rounded">
                <h3 className="font-semibold">Error</h3>
                <p>{results.error || 'Analysis failed'}</p>
              </div>
            )}

            <button
              onClick={() => setResults(null)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              Test Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

