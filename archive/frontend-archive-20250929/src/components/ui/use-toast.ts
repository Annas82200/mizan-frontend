import { useState, useCallback } from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

const toasts: Toast[] = [];

export function useToast() {
  const [, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = "default" }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, title, description, variant };
    
    toasts.push(newToast);
    setToasts([...toasts]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      const index = toasts.findIndex(t => t.id === id);
      if (index > -1) {
        toasts.splice(index, 1);
        setToasts([...toasts]);
      }
    }, 5000);

    return { id };
  }, []);

  return { toast };
}

// Export a standalone toast function for convenience
export const toast = ({ title, description, variant = "default" }: Omit<Toast, "id">) => {
  console.log(`Toast: ${title || ""} - ${description || ""}`);
};
