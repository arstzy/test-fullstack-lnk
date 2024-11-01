import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map(({ id, title, description, action, variant, ...props }) => (
          <Toast
            key={id}
            {...props}
            className={`p-4 rounded shadow-md transition-transform ${variant === 'destructive' ? 'bg-red-200 text-red-800' : 'bg-white text-black'
              }`}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        ))}
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
