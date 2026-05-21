import { PlusCircle, FilePlus } from 'lucide-react';

interface Props {
  onOpenRabModal: () => void;
}

export function TabLembagaPengajuan({ onOpenRabModal }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Formulir Penyusunan Anggaran RAB</h4>
          <p className="text-xs text-slate-400">Silakan tambahkan data usulan anggaran di bawah ini, lalu ajukan ke verifikator admin.</p>
        </div>
        <button
          type="button"
          onClick={onOpenRabModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/10 transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> Mulai Input RAB Baru
        </button>
      </div>

      <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full w-fit mx-auto mb-3">
          <FilePlus className="w-6 h-6" />
        </div>
        <p className="text-xs font-bold text-slate-700">Siap Mengisi RAB?</p>
        <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
          Klik tombol di atas untuk membuka modal interaktif pengisian baris barang, harga satuan, beserta bukti penunjang foto secara terstruktur.
        </p>
      </div>
    </div>
  );
}
