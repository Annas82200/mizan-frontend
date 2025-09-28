"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, X, AlertCircle } from 'lucide-react';

// This would normally come from your database
const MIZAN_VALUES = [
  // Cylinder 1: Survival
  { id: 1, value: "Security", type: "enabling", cylinder: 1 },
  { id: 2, value: "Stability", type: "enabling", cylinder: 1 },
  { id: 3, value: "Safety", type: "enabling", cylinder: 1 },
  { id: 4, value: "Fear", type: "limiting", cylinder: 1 },
  { id: 5, value: "Scarcity mindset", type: "limiting", cylinder: 1 },
  
  // Cylinder 2: Relationship
  { id: 6, value: "Belonging", type: "enabling", cylinder: 2 },
  { id: 7, value: "Trust", type: "enabling", cylinder: 2 },
  { id: 8, value: "Loyalty", type: "enabling", cylinder: 2 },
  { id: 9, value: "Dependency", type: "limiting", cylinder: 2 },
  { id: 10, value: "Conformity", type: "limiting", cylinder: 2 },
  
  // Cylinder 3: Self-Esteem
  { id: 11, value: "Achievement", type: "enabling", cylinder: 3 },
  { id: 12, value: "Recognition", type: "enabling", cylinder: 3 },
  { id: 13, value: "Excellence", type: "enabling", cylinder: 3 },
  { id: 14, value: "Arrogance", type: "limiting", cylinder: 3 },
  { id: 15, value: "Status-seeking", type: "limiting", cylinder: 3 },
  
  // Cylinder 4: Transformation
  { id: 16, value: "Growth", type: "enabling", cylinder: 4 },
  { id: 17, value: "Innovation", type: "enabling", cylinder: 4 },
  { id: 18, value: "Adaptability", type: "enabling", cylinder: 4 },
  { id: 19, value: "Chaos", type: "limiting", cylinder: 4 },
  { id: 20, value: "Instability", type: "limiting", cylinder: 4 },
  
  // Cylinder 5: Internal Cohesion
  { id: 21, value: "Collaboration", type: "enabling", cylinder: 5 },
  { id: 22, value: "Unity", type: "enabling", cylinder: 5 },
  { id: 23, value: "Harmony", type: "enabling", cylinder: 5 },
  { id: 24, value: "Groupthink", type: "limiting", cylinder: 5 },
  { id: 25, value: "Conflict avoidance", type: "limiting", cylinder: 5 },
  
  // Cylinder 6: Making a Difference
  { id: 26, value: "Impact", type: "enabling", cylinder: 6 },
  { id: 27, value: "Purpose", type: "enabling", cylinder: 6 },
  { id: 28, value: "Service", type: "enabling", cylinder: 6 },
  { id: 29, value: "Martyrdom", type: "limiting", cylinder: 6 },
  { id: 30, value: "Burnout", type: "limiting", cylinder: 6 },
  
  // Cylinder 7: Service
  { id: 31, value: "Wisdom", type: "enabling", cylinder: 7 },
  { id: 32, value: "Stewardship", type: "enabling", cylinder: 7 },
  { id: 33, value: "Legacy", type: "enabling", cylinder: 7 },
  { id: 34, value: "Detachment", type: "limiting", cylinder: 7 },
  { id: 35, value: "Rigidity", type: "limiting", cylinder: 7 }
];

interface CultureAssessmentProps {
  employeeId: string;
  companyId: string;
  tenantId: string;
  onComplete?: (assessment: any) => void;
}

function CultureAssessment({ 
  employeeId, 
  companyId, 
  tenantId, 
  onComplete 
}: CultureAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalValues, setPersonalValues] = useState<number[]>([]);
  const [currentExperienceValues, setCurrentExperienceValues] = useState<number[]>([]);
  const [desiredFutureValues, setDesiredFutureValues] = useState<number[]>([]);
  const [engagementLevel, setEngagementLevel] = useState([3]);
  const [recognitionLevel, setRecognitionLevel] = useState([3]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      title: "Your Personal Values",
      description: "What are your personal values? Select 10 values that resonate most with you.",
      key: "personal",
      values: personalValues,
      setValues: setPersonalValues
    },
    {
      title: "Current Company Experience",
      description: "How are you experiencing the company culture? Select 10 values that best describe your current experience.",
      key: "current",
      values: currentExperienceValues,
      setValues: setCurrentExperienceValues
    },
    {
      title: "Desired Future Culture",
      description: "How would you like to experience the company in the future? Select 10 values that represent your ideal culture.",
      key: "future",
      values: desiredFutureValues,
      setValues: setDesiredFutureValues
    }
  ];

  const currentQuestion = questions[currentStep];

  const toggleValue = (valueId: number) => {
    if (currentStep === 0) {
      if (personalValues.includes(valueId)) {
        setPersonalValues(personalValues.filter(v => v !== valueId));
      } else if (personalValues.length < 10) {
        setPersonalValues([...personalValues, valueId]);
      }
    } else if (currentStep === 1) {
      if (currentExperienceValues.includes(valueId)) {
        setCurrentExperienceValues(currentExperienceValues.filter(v => v !== valueId));
      } else if (currentExperienceValues.length < 10) {
        setCurrentExperienceValues([...currentExperienceValues, valueId]);
      }
    } else if (currentStep === 2) {
      if (desiredFutureValues.includes(valueId)) {
        setDesiredFutureValues(desiredFutureValues.filter(v => v !== valueId));
      } else if (desiredFutureValues.length < 10) {
        setDesiredFutureValues([...desiredFutureValues, valueId]);
      }
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return personalValues.length === 10;
    if (currentStep === 1) return currentExperienceValues.length === 10;
    if (currentStep === 2) return desiredFutureValues.length === 10;
    return true;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const assessment = {
      employeeId,
      companyId,
      tenantId,
      personalValues: personalValues.map(id => 
        MIZAN_VALUES.find(v => v.id === id)?.value
      ),
      currentExperienceValues: currentExperienceValues.map(id => 
        MIZAN_VALUES.find(v => v.id === id)?.value
      ),
      desiredFutureValues: desiredFutureValues.map(id => 
        MIZAN_VALUES.find(v => v.id === id)?.value
      ),
      engagementLevel: engagementLevel[0],
      recognitionLevel: recognitionLevel[0],
      completedAt: new Date().toISOString()
    };

    try {
      // In a real app, this would be an API call
      await fetch('/api/culture-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessment)
      });

      if (onComplete) {
        onComplete(assessment);
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep + 1} of 4</span>
          <span>{Math.round(((currentStep + 1) / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Question 1 - Personal Values */}
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{questions[0].title}</CardTitle>
            <CardDescription>{questions[0].description}</CardDescription>
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Selected: {personalValues.length}/10 values
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {MIZAN_VALUES.map(value => {
                const isSelected = personalValues.includes(value.id);
                const isDisabled = !isSelected && personalValues.length >= 10;
                
                return (
                  <Button
                    key={value.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    disabled={isDisabled}
                    onClick={() => toggleValue(value.id)}
                  >
                    {value.value}
                    {isSelected && <Check className="ml-1 h-3 w-3" />}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question 2 - Current Experience */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{questions[1].title}</CardTitle>
            <CardDescription>{questions[1].description}</CardDescription>
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Selected: {currentExperienceValues.length}/10 values
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {MIZAN_VALUES.map(value => {
                const isSelected = currentExperienceValues.includes(value.id);
                const isDisabled = !isSelected && currentExperienceValues.length >= 10;
                
                return (
                  <Button
                    key={value.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    disabled={isDisabled}
                    onClick={() => toggleValue(value.id)}
                  >
                    {value.value}
                    {isSelected && <Check className="ml-1 h-3 w-3" />}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions 3, 4, 5 - All on one page */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Question 3 - Desired Future */}
          <Card>
            <CardHeader>
              <CardTitle>{questions[2].title}</CardTitle>
              <CardDescription>{questions[2].description}</CardDescription>
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Selected: {desiredFutureValues.length}/10 values
                </AlertDescription>
              </Alert>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {MIZAN_VALUES.map(value => {
                  const isSelected = desiredFutureValues.includes(value.id);
                  const isDisabled = !isSelected && desiredFutureValues.length >= 10;
                  
                  return (
                    <Button
                      key={value.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      disabled={isDisabled}
                      onClick={() => toggleValue(value.id)}
                    >
                      {value.value}
                      {isSelected && <Check className="ml-1 h-3 w-3" />}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Questions 4 & 5 - Engagement & Recognition */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement & Recognition Levels</CardTitle>
              <CardDescription>
                Please rate your current levels of engagement and recognition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label className="text-sm font-medium mb-4 block">
                  How engaged do you feel in your work? (1 = Not engaged, 5 = Super engaged)
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">1</span>
                  <Slider
                    value={engagementLevel}
                    onValueChange={setEngagementLevel}
                    min={1}
                    max={5}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">5</span>
                  <Badge variant="secondary" className="ml-4">
                    {engagementLevel[0]}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-4 block">
                  How recognized do you feel for your contributions? (1 = Not recognized, 5 = Highly recognized)
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">1</span>
                  <Slider
                    value={recognitionLevel}
                    onValueChange={setRecognitionLevel}
                    min={1}
                    max={5}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">5</span>
                  <Badge variant="secondary" className="ml-4">
                    {recognitionLevel[0]}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}



      {/* Summary Step */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Summary</CardTitle>
            <CardDescription>
              Please review your responses before submitting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q, idx) => (
              <div key={idx} className="border rounded p-4">
                <h4 className="font-medium mb-2">{q.title}</h4>
                <div className="flex flex-wrap gap-1">
                  {q.values.map(valueId => {
                    const value = MIZAN_VALUES.find(v => v.id === valueId);
                    return value ? (
                      <Badge key={valueId} variant="outline">
                        {value.value}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
            
            <div className="border rounded p-4">
              <h4 className="font-medium mb-2">Engagement & Recognition</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Engagement Level:</span>
                  <Badge>{engagementLevel[0]}/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Recognition Level:</span>
                  <Badge>{recognitionLevel[0]}/5</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        
        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function SurveyPage() {
  // Default props for the assessment component
  const defaultProps = {
    employeeId: "employee-1",
    companyId: "company-1", 
    tenantId: "tenant-1",
    onComplete: (assessment: any) => {
      console.log("Assessment completed:", assessment);
    }
  };

  return <CultureAssessment {...defaultProps} />;
}
