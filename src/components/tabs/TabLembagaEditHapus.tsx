import { Edit, Trash2 } from 'lucide-react';
import { Budget } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  budgets: Budget[];
  userId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function statusBadge(status: Budget['status']) {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-700';
  if (status === 'rejected') return 'bg-rose-50 text-rose-700';
  return 'bg-amber-50 text-amber-700';
}

function statusLabel(status: Budget['status']) {
  if (status === 'approved') return 'Disetujui';
  if (status === 'rejected') return 'Ditolak';
  return 'Pending';
}

export function TabLembagaEditHapus({ budgets, userId, onEdit, onDelete }: Props) {
  const list = budgets.filter((b) => b.user_id === userId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100">
        <h4 className="text-sm font-bold text-slate-900">Kelola Pengajuan RAB Anda</h4>
        <p className="text-xs text-slate-400">Perubahan atau penghapusan hanya bisa dilakukan pada anggaran yang bertanda 'Sedang Ditinjau' (Pending).</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
              <th className="p-4">Tanggal</th>
              <th className="p-4">Nama Kegiatan</th>
              <th className="p-4">Total Biaya</th>
              <th className="p-4">Status Verifikasi</th>
              <th className="p-4 text-center">Opsi Kelola</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {list.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400 font-medium">Lembaga Anda belum membuat pengajuan RAB.</td></tr>
            )}
            {list.map((b) => {
              const isEditable = b.status === 'pending';
              return (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-500">{b.date}</td>
                  <td className="p-4 font-bold text-slate-800">{b.title}</td>
                  <td className="p-4 font-extrabold text-slate-900">{formatRupiah(b.grandTotal)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusBadge(b.status)}`}>
                      {statusLabel(b.status)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {isEditable ? (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => onEdit(b.id)} className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold inline-flex items-center gap-1">
                          <Edit className="w-3.5 h-3.5" /> Edit RAB
                        </button>
                        <button onClick={() => onDelete(b.id)} className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold inline-flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[10px] italic font-semibold">Terkunci (Sudah Diproses)</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
