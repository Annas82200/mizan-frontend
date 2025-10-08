import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getActionModules,
  startModule,
  updateModuleProgress,
  completeModule,
  getModuleDetails
} from "@/lib/api/modules";
import { toast } from "@/components/ui/use-toast";

export function useActionModules() {
  const queryClient = useQueryClient();

  const { data: modules, isLoading } = useQuery({
    queryKey: ["action-modules"],
    queryFn: getActionModules,
  });

  const startMutation = useMutation({
    mutationFn: startModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["action-modules"] });
      toast({
        title: "Module started",
        description: "You can track progress in the module dashboard.",
      });
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: ({ moduleId, progress }: { moduleId: string; progress: number }) =>
      updateModuleProgress(moduleId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["action-modules"] });
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["action-modules"] });
      toast({
        title: "Module completed",
        description: "Congratulations on completing this module!",
      });
    },
  });

  return {
    modules,
    isLoading,
    startModule: startMutation.mutate,
    updateProgress: updateProgressMutation.mutate,
    completeModule: completeMutation.mutate,
  };
}

export function useModuleDetails(moduleId: string) {
  return useQuery({
    queryKey: ["module-details", moduleId],
    queryFn: () => getModuleDetails(moduleId),
    enabled: !!moduleId,
  });
}
