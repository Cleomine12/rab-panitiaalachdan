import { ShieldCheck } from 'lucide-react';
import { Budget, User } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  budgets: Budget[];
  users: User[];
  onOpenVerify: (id: string) => void;
}

export function TabAdminVerifikasi({ budgets, users, onOpenVerify }: Props) {
  const pending = budgets.filter((b) => b.status === 'pending');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100">
        <h4 className="text-sm font-bold text-slate-900">Menunggu Verifikasi Persetujuan</h4>
        <p className="text-xs text-slate-400">Silakan tinjau kebenaran data barang dan estimasi pengajuan di bawah ini.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
              <th className="p-4">Tanggal</th>
              <th className="p-4">Lembaga Pemohon</th>
              <th className="p-4">Rencana Pengajuan (RAB)</th>
              <th className="p-4">Total Ajuan</th>
              <th className="p-4 text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {pending.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400 font-medium">Tidak ada pengajuan baru yang butuh verifikasi saat ini.</td></tr>
            )}
            {pending.map((b) => {
              const userObj = users.find((u) => u.id === b.user_id);
              return (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-500">{b.date}</td>
                  <td className="p-4 font-bold text-slate-800">{userObj?.name || b.username}</td>
                  <td className="p-4 font-semibold text-slate-700">{b.title}</td>
                  <td className="p-4 font-extrabold text-slate-900">{formatRupiah(b.grandTotal)}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onOpenVerify(b.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <ShieldCheck className="w-4 h-4" /> Proses Tinjauan
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
