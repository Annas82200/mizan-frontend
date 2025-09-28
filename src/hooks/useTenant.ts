import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTenantInfo, updateTenantInfo, purchaseModule, upgradePlan } from "@/lib/api/tenant";
import { toast } from "@/components/ui/use-toast";

export function useTenant() {
  const queryClient = useQueryClient();

  const { data: tenant, isLoading, error } = useQuery({
    queryKey: ["tenant"],
    queryFn: getTenantInfo,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateMutation = useMutation({
    mutationFn: updateTenantInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant"] });
      toast({
        title: "Settings updated",
        description: "Your organization settings have been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const purchaseModuleMutation = useMutation({
    mutationFn: purchaseModule,
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        queryClient.invalidateQueries({ queryKey: ["tenant"] });
        toast({
          title: "Module activated",
          description: "The module is now available in your account.",
        });
      }
    },
  });

  const upgradePlanMutation = useMutation({
    mutationFn: upgradePlan,
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        queryClient.invalidateQueries({ queryKey: ["tenant"] });
        toast({
          title: "Plan upgraded",
          description: "Your plan has been successfully upgraded.",
        });
      }
    },
  });

  return {
    tenant,
    isLoading,
    error,
    updateTenant: updateMutation.mutate,
    purchaseModule: purchaseModuleMutation.mutate,
    upgradePlan: upgradePlanMutation.mutate,
  };
}
