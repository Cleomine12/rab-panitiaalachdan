import { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: number) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const borderColor =
    toast.type === 'success' ? 'border-l-emerald-600' :
    toast.type === 'error' ? 'border-l-rose-600' : 'border-l-amber-600';
  const textColor =
    toast.type === 'success' ? 'text-emerald-800' :
    toast.type === 'error' ? 'text-rose-800' : 'text-amber-800';
  const Icon =
    toast.type === 'success' ? CheckCircle :
    toast.type === 'error' ? AlertTriangle : Info;

  return (
    <div
      className={`pointer-events-auto max-w-sm p-4 rounded-xl shadow-lg border border-l-4 ${borderColor} bg-white text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      <Icon className={`w-4 h-4 ${textColor}`} />
      <span className={textColor}>{toast.message}</span>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
