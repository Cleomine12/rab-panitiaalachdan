import { Check, Banknote } from 'lucide-react';
import { Budget, User } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  budgets: Budget[];
  users: User[];
  onToggleRealization: (id: string, status: boolean) => void;
}

export function TabAdminTerealisasi({ budgets, users, onToggleRealization }: Props) {
  const approved = budgets.filter((b) => b.status === 'approved');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100">
        <h4 className="text-sm font-bold text-slate-900">Realisasi & Pencairan Anggaran</h4>
        <p className="text-xs text-slate-400">Verifikasi pencairan dana untuk usulan anggaran yang telah disetujui sebelumnya.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
              <th className="p-4">Tanggal Pengajuan</th>
              <th className="p-4">Lembaga Pemohon</th>
              <th className="p-4">RAB Kegiatan</th>
              <th className="p-4">Plafon Anggaran</th>
              <th className="p-4">Status Pencairan</th>
              <th className="p-4 text-center">Tindakan Realisasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {approved.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-slate-400 font-medium">Belum ada pengajuan berstatus disetujui untuk direalisasikan.</td></tr>
            )}
            {approved.map((b) => {
              const userObj = users.find((u) => u.id === b.user_id);
              return (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-500">{b.date}</td>
                  <td className="p-4 font-bold text-slate-800">{userObj?.name || b.username}</td>
                  <td className="p-4 font-semibold text-slate-700">{b.title}</td>
                  <td className="p-4 font-extrabold text-emerald-700">{formatRupiah(b.grandTotal)}</td>
                  <td className="p-4">
                    {b.isRealized ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-teal-50 text-teal-700 border border-teal-100">
                        <Check className="w-3 h-3" /> Sudah Cair (Realized)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-100">
                        Belum Terealisasi
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {b.isRealized ? (
                      <button
                        onClick={() => onToggleRealization(b.id, false)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-semibold"
                      >
                        Batalkan Pencairan
                      </button>
                    ) : (
                      <button
                        onClick={() => onToggleRealization(b.id, true)}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold inline-flex items-center gap-1"
                      >
                        <Banknote className="w-3.5 h-3.5" /> Cairkan Sekarang
                      </button>
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
