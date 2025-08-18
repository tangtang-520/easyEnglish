// ToastContext.tsx
import { Toast, ToastDescription, useToast } from "@/components/ui/toast";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react-native";
import React, {
    createContext,
    JSX,
    useCallback,
    useContext,
    useEffect,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastType = "success" | "error" | "warning" | "info";

type ToastContextValue = {
  showToast: (title: string, description?: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastRef: ToastContextValue["showToast"] | null = null;

// 不同状态对应的样式
const toastStyles: Record<
  ToastType,
  { bg: string; textColor: string; icon: JSX.Element }
> = {
  success: {
    bg: "bg-succes-50",
    textColor: "text-succes-800",
    icon: <CheckCircle2 size={20} color="#166534" className="mr-1" />,
  },
  error: {
    bg: "bg-error-50",
    textColor: "text-error-800",
    icon: <XCircle size={20} color="#991b1b" className="mr-1 0" />,
  },
  info: {
    bg: "bg-outline-50",
    textColor: "text-outline-800",
    icon: <AlertTriangle size={20} color="#414141" className="mr-1 " />,
  },
  warning: {
    bg: "bg-warning-50",
    textColor: "text-warning-800",
    icon: <AlertTriangle size={20} color="#824417" className="mr-1 " />,
  },
};

export const ToastProviderContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const insets = useSafeAreaInsets();

  const showToast = useCallback(
    (title: string, description?: string, type: ToastType = "error") => {
      const style = toastStyles[type];

      toast.show({
        placement: "top",
        duration: 1000,
        render: ({ id }) => (
          <Toast
            variant="outline"
            nativeID={`toast-${id}`}
            action={type}
            className={`${style.bg} rounded-lg p-3 flex-row items-center`}
            style={{
              marginTop: insets.top + 10, // 关键：顶部偏移安全区
            }}
          >
            {style.icon}
            <ToastDescription className={style.textColor}>
              {title}
              {description ? ` - ${description}` : ""}
            </ToastDescription>
          </Toast>
        ),
      });
    },
    [toast]
  );

  useEffect(() => {
    toastRef = showToast;
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// React 外部调用（如 axios）
export const toastFromAnywhere = (
  ...args: Parameters<ToastContextValue["showToast"]>
) => {
  if (toastRef) {
    toastRef(...args);
  } else {
    console.warn("Toast 尚未初始化");
  }
};

export const useGlobalToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useGlobalToast 必须在 ToastProviderContext 内使用");
  return context;
};
