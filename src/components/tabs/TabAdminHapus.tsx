import { Trash2 } from 'lucide-react';
import { Budget, User } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  budgets: Budget[];
  users: User[];
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
  return 'Menunggu';
}

export function TabAdminHapus({ budgets, users, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100">
        <h4 className="text-sm font-bold text-slate-900">Hapus Data Riwayat Anggaran</h4>
        <p className="text-xs text-rose-500 font-semibold">Tindakan ini permanen dan akan menghapus data anggaran dari sistem selamanya.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
              <th className="p-4">Tanggal</th>
              <th className="p-4">Lembaga</th>
              <th className="p-4">Judul RAB</th>
              <th className="p-4">Total Biaya</th>
              <th className="p-4">Status Pengajuan</th>
              <th className="p-4 text-center">Aksi Hapus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {budgets.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-slate-400 font-medium">Tidak ada data anggaran dalam database.</td></tr>
            )}
            {budgets.map((b) => {
              const userObj = users.find((u) => u.id === b.user_id);
              return (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-500">{b.date}</td>
                  <td className="p-4 font-bold text-slate-800">{userObj?.name || b.username}</td>
                  <td className="p-4 font-semibold text-slate-700">{b.title}</td>
                  <td className="p-4 font-extrabold text-slate-900">{formatRupiah(b.grandTotal)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusBadge(b.status)}`}>
                      {statusLabel(b.status)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onDelete(b.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 text-rose-700 rounded-lg font-bold inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hapus Permanen
                    </button>
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
