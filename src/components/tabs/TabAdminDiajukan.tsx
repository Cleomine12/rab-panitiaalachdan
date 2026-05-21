import { Download } from 'lucide-react';
import { Budget, User } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  budgets: Budget[];
  users: User[];
  onOpenDownload: (id: string) => void;
}

function statusBadge(status: Budget['status']) {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
  if (status === 'rejected') return 'bg-rose-50 text-rose-700 border border-rose-100';
  return 'bg-amber-50 text-amber-700 border border-amber-100';
}

function statusLabel(status: Budget['status']) {
  if (status === 'approved') return 'Disetujui';
  if (status === 'rejected') return 'Ditolak';
  return 'Proses Verifikasi';
}

export function TabAdminDiajukan({ budgets, users, onOpenDownload }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100">
        <h4 className="text-sm font-bold text-slate-900">Seluruh Pengajuan RAB Lembaga</h4>
        <p className="text-xs text-slate-400">Total anggaran yang diajukan oleh masing-masing perwakilan instansi.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
              <th className="p-4">Tanggal</th>
              <th className="p-4">Lembaga Pemohon</th>
              <th className="p-4">Kategori Pengajuan</th>
              <th className="p-4">Total Biaya</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Aksi Laporan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {budgets.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-slate-400 font-medium">Belum ada pengajuan masuk.</td></tr>
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
                      onClick={() => onOpenDownload(b.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Ekspor / Cetak
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
