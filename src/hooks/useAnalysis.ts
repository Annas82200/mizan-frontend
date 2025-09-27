import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  runAnalysis, 
  getAnalysisHistory, 
  getAnalysisDetails 
} from "@/lib/api/analyses";
import { toast } from "@/components/ui/use-toast";

export function useAnalysis(type?: string) {
  const queryClient = useQueryClient();

  // Get analysis history
  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["analysis-history", type],
    queryFn: () => getAnalysisHistory(type),
    enabled: !!type || type === undefined,
  });

  // Run analysis mutation
  const runMutation = useMutation({
    mutationFn: runAnalysis,
    onMutate: () => {
      toast({
        title: "Analysis started",
        description: "Your analysis is running. This may take a few minutes.",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["analysis-history"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast({
        title: "Analysis complete",
        description: `Score: ${Math.round(data.score * 100)}%`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    history,
    historyLoading,
    runAnalysis: runMutation.mutate,
    isAnalyzing: runMutation.isPending,
  };
}

export function useAnalysisDetails(id: string) {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: () => getAnalysisDetails(id),
    enabled: !!id,
  });
}
