"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Heart,
  Brain,
  Target,
  Zap,
  Shield,
  Activity,
  Crown,
  CheckCircle,
  ChevronRight,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCultureAssessment } from "@/hooks/useCultureAssessment";

interface CultureAssessmentProps {
  token?: string;
  isInteractive?: boolean;
}

export default function CultureAssessment({ token, isInteractive }: CultureAssessmentProps) {
  const { 
    questions,
    responses,
    currentQuestionIndex,
    isComplete,
    loading: isLoading,
    error,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitAssessment,
    getCurrentQuestion,
    getResponse,
    getProgress,
    canProceed,
    isLastQuestion
  } = useCultureAssessment(token);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  const [answer, setAnswer] = useState<any>(null);
  const [botResponse, setBotResponse] = useState<string>("");

  const handleSubmit = async () => {
    if (!answer || !currentQuestion) return;

    answerQuestion(currentQuestion.id, answer);
    
    if (isInteractive) {
      setBotResponse("Thank you for your response!");
      
      // Clear bot response after a delay
      setTimeout(() => {
        setBotResponse("");
        setAnswer(null);
        if (!isLastQuestion()) {
          nextQuestion();
        }
      }, 2000);
    } else {
      setAnswer(null);
      if (!isLastQuestion()) {
        nextQuestion();
      }
    }
  };

  if (isComplete) {
    return <AssessmentComplete />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4">Culture Fit Assessment</Badge>
          <h1 className="text-3xl font-bold mb-2">
            Let's Find Your Culture Match
          </h1>
          <p className="text-gray-600">
            Help us understand your work style and values
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Question {currentQuestionIndex + 1}
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {currentQuestion.text}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentQuestion.type === "multiple_choice" && (
                    <RadioGroup value={answer} onValueChange={setAnswer}>
                      <div className="space-y-3">
                        {currentQuestion.options?.map((option: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${idx}`} />
                            <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {currentQuestion.type === "scale" && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Low ({currentQuestion.min})</span>
                        <span>High ({currentQuestion.max})</span>
                      </div>
                      <Slider
                        value={[answer || currentQuestion.min || 1]}
                        onValueChange={(value) => setAnswer(value[0])}
                        min={currentQuestion.min || 1}
                        max={currentQuestion.max || 5}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-center">
                        <span className="text-2xl font-bold">{answer || currentQuestion.min || 1}</span>
                      </div>
                    </div>
                  )}

                  {currentQuestion.type === "text" && (
                    <Textarea
                      value={answer || ""}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="min-h-[150px]"
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bot Response (Enterprise) */}
        {isInteractive && botResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Bot className="w-5 h-5 text-purple-600 mt-1" />
                  <p className="text-sm">{botResponse}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!answer || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing...
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Values Reference */}
        <Card className="mt-12 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">Our Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Shield, label: "Stability" },
                { icon: Heart, label: "Belonging" },
                { icon: Target, label: "Mastery" },
                { icon: Zap, label: "Autonomy" },
                { icon: Brain, label: "Purpose" },
                { icon: Activity, label: "Evolution" },
                { icon: Crown, label: "Legacy" }
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span>{value.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AssessmentComplete() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Assessment Complete!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing the culture fit assessment. We'll review your responses and be in touch soon.
          </p>
          <Button className="w-full">
            Return to Application
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
