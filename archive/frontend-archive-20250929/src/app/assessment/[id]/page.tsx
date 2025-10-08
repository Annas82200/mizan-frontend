"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Heart,
  Brain,
  Shield,
  Zap,
  Target,
  Activity,
  Crown,
  CheckCircle,
  Info,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAssessment } from "@/hooks/useAssessment";

// Mizan Values with cylinders
const VALUES_BY_CYLINDER = {
  1: { // Stability
    name: "Stability",
    icon: Shield,
    enabling: ["Safety", "Reliability", "Clarity", "Predictability", "Security", "Consistency"],
    limiting: ["Fear", "Rigidity", "Micromanagement", "Control", "Resistance"]
  },
  2: { // Belonging
    name: "Belonging",
    icon: Heart,
    enabling: ["Inclusion", "Empathy", "Celebration", "Connection", "Community", "Acceptance"],
    limiting: ["Cliquishness", "Bias", "Tokenism", "Exclusion", "Favoritism"]
  },
  3: { // Mastery
    name: "Mastery",
    icon: Target,
    enabling: ["Craftsmanship", "Learning Agility", "Mentorship", "Excellence", "Expertise", "Growth"],
    limiting: ["Perfectionism", "Gatekeeping", "Burnout", "Competition", "Hoarding"]
  },
  4: { // Autonomy
    name: "Autonomy",
    icon: Zap,
    enabling: ["Ownership", "Initiative", "Adaptability", "Independence", "Trust", "Empowerment"],
    limiting: ["Isolation", "Chaos", "Avoidance", "Anarchy", "Abandonment"]
  },
  5: { // Purpose
    name: "Purpose",
    icon: Brain,
    enabling: ["Contribution", "Storytelling", "Service", "Impact", "Meaning", "Vision"],
    limiting: ["Hero Syndrome", "Dogma", "Disconnection", "Martyrdom", "Zealotry"]
  },
  6: { // Evolution
    name: "Evolution",
    icon: Activity,
    enabling: ["Experimentation", "Feedback Fluency", "Resilience", "Innovation", "Agility", "Transformation"],
    limiting: ["Thrash", "Data Myopia", "Fatigue", "Disruption", "Instability"]
  },
  7: { // Legacy
    name: "Legacy",
    icon: Crown,
    enabling: ["Stewardship", "Systems Thinking", "Regeneration", "Sustainability", "Wisdom", "Heritage"],
    limiting: ["Complacency", "Nostalgia", "Risk Aversion", "Stagnation", "Obsolescence"]
  }
};

export default function CultureAssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const { assessment, submitAssessment, isLoading } = useAssessment(params.id as string);
  
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    personal_values: [] as string[],
    current_experience: [] as string[],
    desired_future: [] as string[],
    engagement: 3,
    recognition: 3
  });

  const questions = [
    {
      id: "personal_values",
      title: "What are your personal values?",
      subtitle: "Select up to 10 values that resonate most with you",
      type: "values"
    },
    {
      id: "current_experience",
      title: "How are you experiencing the company culture?",
      subtitle: "Select up to 10 values that best describe your current experience",
      type: "values"
    },
    {
      id: "desired_future",
      title: "How would you like to experience the company in the future?",
      subtitle: "Select up to 10 values that represent your ideal culture",
      type: "values"
    },
    {
      id: "engagement",
      title: "How engaged do you feel at work?",
      subtitle: "Rate your current engagement level",
      type: "slider",
      min: 1,
      max: 5,
      labels: {
        1: "Disengaged",
        3: "Moderately engaged", 
        5: "Highly engaged"
      }
    },
    {
      id: "recognition",
      title: "How often do you feel recognized for your contributions?",
      subtitle: "Rate the frequency of recognition you receive",
      type: "slider",
      min: 1,
      max: 5,
      labels: {
        1: "Never",
        3: "Sometimes",
        5: "Very frequently"
      }
    }
  ];

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleValueToggle = (value: string) => {
    const key = currentQuestion.id as keyof typeof selections;
    const currentValues = selections[key] as string[];
    
    if (currentValues.includes(value)) {
      setSelections({
        ...selections,
        [key]: currentValues.filter(v => v !== value)
      });
    } else if (currentValues.length < 10) {
      setSelections({
        ...selections,
        [key]: [...currentValues, value]
      });
    }
  };

  const handleSliderChange = (value: number[]) => {
    setSelections({
      ...selections,
      [currentQuestion.id]: value[0]
    });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitAssessment(selections);
      router.push(`/assessment/${params.id}/complete`);
    } catch (error) {
      console.error("Failed to submit assessment:", error);
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === "values") {
      const key = currentQuestion.id as keyof typeof selections;
      return (selections[key] as string[]).length > 0;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            Mizan Culture Assessment
          </Badge>
          <h1 className="text-3xl font-bold mb-2">
            Share Your Cultural Experience
          </h1>
          <p className="text-gray-600">
            Your insights help shape our organizational culture
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Question {step + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
                <CardDescription className="text-lg">
                  {currentQuestion.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentQuestion.type === "values" ? (
                  <ValueSelection
                    selectedValues={selections[currentQuestion.id as keyof typeof selections] as string[]}
                    onToggle={handleValueToggle}
                  />
                ) : (
                  <div className="space-y-6 py-8">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{currentQuestion.labels?.[1]}</span>
                      <span>{currentQuestion.labels?.[3]}</span>
                      <span>{currentQuestion.labels?.[5]}</span>
                    </div>
                    <Slider
                      value={[selections[currentQuestion.id as keyof typeof selections] as number]}
                      onValueChange={handleSliderChange}
                      min={currentQuestion.min ?? 1}
                      max={currentQuestion.max ?? 5}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-3xl font-bold">
                        {selections[currentQuestion.id as keyof typeof selections]}
                      </span>
                      <p className="text-sm text-gray-600 mt-2">
                        {currentQuestion.labels?.[selections[currentQuestion.id as keyof typeof selections] as keyof typeof currentQuestion.labels]}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
          >
            {step === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>

        {/* Info */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  About the Mizan Framework
                </h4>
                <p className="text-sm text-blue-800">
                  Our culture assessment is based on the Mizan 7-cylinder framework, 
                  which maps organizational values across seven key dimensions. Each 
                  dimension has both enabling values (that support growth) and limiting 
                  values (that can hinder progress).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ValueSelection({ 
  selectedValues, 
  onToggle 
}: { 
  selectedValues: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-8">
      {Object.entries(VALUES_BY_CYLINDER).map(([cylinder, data]) => {
        const Icon = data.icon;
        const cylinderValues = [...data.enabling, ...data.limiting];
        const selectedInCylinder = cylinderValues.filter(v => selectedValues.includes(v));
        
        return (
          <div key={cylinder} className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-purple-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{data.name}</h3>
                <p className="text-xs text-gray-600">
                  {selectedInCylinder.length} selected
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-700 mb-2">Enabling Values</p>
              <div className="grid grid-cols-3 gap-2">
                {data.enabling.map(value => (
                  <ValueCard
                    key={value}
                    value={value}
                    isSelected={selectedValues.includes(value)}
                    isEnabled={selectedValues.length < 10 || selectedValues.includes(value)}
                    onToggle={() => onToggle(value)}
                    type="enabling"
                  />
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-700 mb-2">Limiting Values</p>
              <div className="grid grid-cols-3 gap-2">
                {data.limiting.map(value => (
                  <ValueCard
                    key={value}
                    value={value}
                    isSelected={selectedValues.includes(value)}
                    isEnabled={selectedValues.length < 10 || selectedValues.includes(value)}
                    onToggle={() => onToggle(value)}
                    type="limiting"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="sticky bottom-0 bg-white/90 backdrop-blur p-4 -mx-6 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Selected: {selectedValues.length}/10
          </span>
          <Badge variant={selectedValues.length === 10 ? "default" : "secondary"}>
            {10 - selectedValues.length} remaining
          </Badge>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ 
  value, 
  isSelected, 
  isEnabled, 
  onToggle,
  type 
}: { 
  value: string;
  isSelected: boolean;
  isEnabled: boolean;
  onToggle: () => void;
  type: "enabling" | "limiting";
}) {
  return (
    <motion.button
      whileHover={{ scale: isEnabled ? 1.02 : 1 }}
      whileTap={{ scale: isEnabled ? 0.98 : 1 }}
      onClick={onToggle}
      disabled={!isEnabled}
      className={`
        relative p-3 rounded-lg border-2 text-sm font-medium transition-all
        ${isSelected 
          ? type === "enabling"
            ? "border-green-500 bg-green-50 text-green-900"
            : "border-orange-500 bg-orange-50 text-orange-900"
          : isEnabled
            ? "border-gray-200 hover:border-gray-300 text-gray-700"
            : "border-gray-100 text-gray-400 cursor-not-allowed"
        }
      `}
    >
      {value}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
            type === "enabling" ? "bg-green-500" : "bg-orange-500"
          }`}
        >
          <CheckCircle className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}
