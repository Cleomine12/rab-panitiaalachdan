import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  title: string;
  src: string;
  onClose: () => void;
}

export function ModalPhotoViewer({ isOpen, title, src, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 border border-slate-100 flex flex-col relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
        <h4 className="text-sm font-bold text-slate-900 mb-4">Pratinjau: {title}</h4>
        <div className="bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center min-h-[300px]">
          <img src={src} alt={title} className="max-w-full max-h-[50vh] object-contain" />
        </div>
      </div>
    </div>
  );
}
