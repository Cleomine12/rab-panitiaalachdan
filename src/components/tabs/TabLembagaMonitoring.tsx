import { Budget } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  budgets: Budget[];
  userId: string;
}

function statusBadge(status: Budget['status']) {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-700';
  if (status === 'rejected') return 'bg-rose-50 text-rose-700';
  return 'bg-amber-50 text-amber-600';
}

function statusLabel(status: Budget['status']) {
  if (status === 'approved') return 'Disetujui';
  if (status === 'rejected') return 'Ditolak';
  return 'Sedang Ditinjau';
}

export function TabLembagaMonitoring({ budgets, userId }: Props) {
  const list = budgets.filter((b) => b.user_id === userId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h4 className="text-sm font-bold text-slate-900 mb-1">Monitoring & Alur Perjalanan RAB</h4>
      <p className="text-xs text-slate-400 mb-6">Pantau tahapan realisasi pengajuan anggaran perpisahan lembaga Anda.</p>

      {list.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-400 text-xs">
          Belum ada riwayat pengajuan untuk dipantau.
        </div>
      ) : (
        <div className="space-y-6">
          {list.map((b) => {
            let step = 1;
            if (b.status === 'approved') step = 2;
            if (b.status === 'approved' && b.isRealized) step = 3;
            if (b.status === 'rejected') step = -1;

            return (
              <div key={b.id} className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{b.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Diajukan Tanggal: {b.date} | Estimasi: <span className="font-extrabold text-slate-700">{formatRupiah(b.grandTotal)}</span>
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${statusBadge(b.status)}`}>
                    {statusLabel(b.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step >= 1 || step === -1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800">Tahap 1: Pengajuan Masuk</p>
                      <p className="text-[9px] text-slate-400">Berkas berhasil di-upload ke sistem.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      step === -1 ? 'bg-rose-600 text-white' : step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step === -1 ? '✗' : '2'}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800">
                        {step === -1 ? 'Ditolak Verifikator' : 'Tahap 2: Verifikasi Admin'}
                      </p>
                      <p className="text-[9px] text-slate-400">
                        {b.verificationNote ? `Catatan: "${b.verificationNote}"` : 'Tinjauan kelayakan anggaran.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step === 3 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800">Tahap 3: Terealisasi (Cair)</p>
                      <p className="text-[9px] text-slate-400">{step === 3 ? 'Selesai disalurkan bendahara.' : 'Menunggu antrean transfer.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
