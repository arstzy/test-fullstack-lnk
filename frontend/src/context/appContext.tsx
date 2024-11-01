import Loading from "@/components/ui/Loading";
import { createContext, ReactNode, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ToastOptions {
  variant: "default" | "destructive";
  title: string;
  description: string;
}

interface AppContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showToast: (options: ToastOptions) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const showToast = ({ variant, title, description }: ToastOptions) => {
    toast({
      variant,
      title,
      description,
    });
  };

  return (
    <AppContext.Provider value={{ isLoading, setLoading, showToast }}>
      <Toaster />
      {isLoading && <Loading />}
      {children}
    </AppContext.Provider>
  );
};
