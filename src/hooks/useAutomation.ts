import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAutomatedFlows,
  createFlow,
  updateFlow,
  toggleFlow,
  deleteFlow,
  runFlowManually,
  getFlowExecutions
} from "@/lib/api/automation";
import { toast } from "@/components/ui/use-toast";

export function useAutomatedFlows() {
  const queryClient = useQueryClient();

  const { data: flows, isLoading } = useQuery({
    queryKey: ["automated-flows"],
    queryFn: getAutomatedFlows,
  });

  const createMutation = useMutation({
    mutationFn: createFlow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automated-flows"] });
      toast({
        title: "Flow created",
        description: "Your automated flow has been created and enabled.",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      updateFlow(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automated-flows"] });
      toast({
        title: "Flow updated",
        description: "Your changes have been saved.",
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      toggleFlow(id, enabled),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["automated-flows"] });
      toast({
        title: variables.enabled ? "Flow enabled" : "Flow disabled",
        description: variables.enabled
          ? "The flow will now run automatically."
          : "The flow has been paused.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFlow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automated-flows"] });
      toast({
        title: "Flow deleted",
        description: "The automated flow has been removed.",
      });
    },
  });

  const runManuallyMutation = useMutation({
    mutationFn: runFlowManually,
    onSuccess: () => {
      toast({
        title: "Flow triggered",
        description: "The flow is now running. Check back for results.",
      });
    },
  });

  return {
    flows,
    isLoading,
    createFlow: createMutation.mutate,
    updateFlow: updateMutation.mutate,
    toggleFlow: toggleMutation.mutate,
    deleteFlow: deleteMutation.mutate,
    runFlowManually: runManuallyMutation.mutate,
  };
}

export function useFlowExecutions(flowId: string) {
  return useQuery({
    queryKey: ["flow-executions", flowId],
    queryFn: () => getFlowExecutions(flowId),
    enabled: !!flowId,
    refetchInterval: 5000, // Refresh every 5 seconds
  });
}
