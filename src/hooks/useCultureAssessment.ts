import { useState, useEffect } from 'react';

interface CultureQuestion {
  id: string;
  text: string;
  type: 'scale' | 'multiple_choice' | 'text';
  options?: string[];
  min?: number;
  max?: number;
  category: string;
}

interface AssessmentResponse {
  questionId: string;
  value: string | number;
}

interface CultureAssessmentData {
  questions: CultureQuestion[];
  responses: AssessmentResponse[];
  currentQuestionIndex: number;
  isComplete: boolean;
  score?: number;
}

export function useCultureAssessment(token?: string) {
  const [assessmentData, setAssessmentData] = useState<CultureAssessmentData>({
    questions: [],
    responses: [],
    currentQuestionIndex: 0,
    isComplete: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAssessment();
  }, [token]);

  const loadAssessment = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual API call
      const mockQuestions: CultureQuestion[] = [
        {
          id: '1',
          text: 'How would you rate the level of collaboration in your team?',
          type: 'scale',
          min: 1,
          max: 5,
          category: 'collaboration'
        },
        {
          id: '2',
          text: 'Which of these best describes your work environment?',
          type: 'multiple_choice',
          options: ['Highly structured', 'Flexible', 'Autonomous', 'Collaborative'],
          category: 'environment'
        },
        {
          id: '3',
          text: 'How do you feel about your current role and responsibilities?',
          type: 'text',
          category: 'satisfaction'
        },
        {
          id: '4',
          text: 'Rate your satisfaction with company communication',
          type: 'scale',
          min: 1,
          max: 5,
          category: 'communication'
        },
        {
          id: '5',
          text: 'How likely are you to recommend this company as a place to work?',
          type: 'scale',
          min: 1,
          max: 10,
          category: 'advocacy'
        }
      ];

      setAssessmentData(prev => ({
        ...prev,
        questions: mockQuestions
      }));
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load assessment');
      setLoading(false);
    }
  };

  const answerQuestion = (questionId: string, value: string | number) => {
    setAssessmentData(prev => {
      const existingResponseIndex = prev.responses.findIndex(r => r.questionId === questionId);
      const newResponses = [...prev.responses];
      
      if (existingResponseIndex >= 0) {
        newResponses[existingResponseIndex] = { questionId, value };
      } else {
        newResponses.push({ questionId, value });
      }

      return {
        ...prev,
        responses: newResponses
      };
    });
  };

  const nextQuestion = () => {
    setAssessmentData(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
    }));
  };

  const previousQuestion = () => {
    setAssessmentData(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0)
    }));
  };

  const submitAssessment = async () => {
    try {
      setLoading(true);
      
      // Mock submission - replace with actual API call
      const mockScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
      
      setAssessmentData(prev => ({
        ...prev,
        isComplete: true,
        score: mockScore
      }));
      
      setLoading(false);
      return { success: true, score: mockScore };
    } catch (err) {
      setError('Failed to submit assessment');
      setLoading(false);
      return { success: false, error: 'Submission failed' };
    }
  };

  const resetAssessment = () => {
    setAssessmentData(prev => ({
      ...prev,
      responses: [],
      currentQuestionIndex: 0,
      isComplete: false,
      score: undefined
    }));
  };

  const getCurrentQuestion = () => {
    return assessmentData.questions[assessmentData.currentQuestionIndex];
  };

  const getResponse = (questionId: string) => {
    return assessmentData.responses.find(r => r.questionId === questionId)?.value;
  };

  const getProgress = () => {
    return (assessmentData.responses.length / assessmentData.questions.length) * 100;
  };

  const canProceed = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    
    const hasResponse = assessmentData.responses.some(r => r.questionId === currentQuestion.id);
    return hasResponse;
  };

  const isLastQuestion = () => {
    return assessmentData.currentQuestionIndex === assessmentData.questions.length - 1;
  };

  return {
    ...assessmentData,
    loading,
    error,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitAssessment,
    resetAssessment,
    getCurrentQuestion,
    getResponse,
    getProgress,
    canProceed,
    isLastQuestion
  };
}
