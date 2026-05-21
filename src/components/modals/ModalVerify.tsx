import { useState } from 'react';
import { X, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Budget, User } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  isOpen: boolean;
  budget: Budget | null;
  users: User[];
  onClose: () => void;
  onApprove: (id: string, note: string) => void;
  onReject: (id: string, note: string) => void;
  onViewPhoto: (title: string, src: string) => void;
  onError: (msg: string) => void;
}

export function ModalVerify({ isOpen, budget, users, onClose, onApprove, onReject, onViewPhoto, onError }: Props) {
  const [note, setNote] = useState('');

  if (!isOpen || !budget) return null;

  const userObj = users.find((u) => u.id === budget.user_id);

  const handleReject = () => {
    if (!note.trim()) {
      onError('Catatan wajib diisi jika menolak anggaran.');
      return;
    }
    onReject(budget.id, note);
    setNote('');
  };

  const handleApprove = () => {
    onApprove(budget.id, note);
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-slate-100">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Verifikasi Anggaran & Rincian RAB</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pemohon: {userObj?.name || budget.username} - Tanggal: {budget.date}
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{budget.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                    <th className="py-2">Barang</th>
                    <th className="py-2 text-center">Jumlah</th>
                    <th className="py-2 text-right">Harga Satuan</th>
                    <th className="py-2 text-right">Subtotal</th>
                    <th className="py-2 text-center">Foto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {budget.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-3 font-semibold text-slate-800 text-xs">{item.name}</td>
                      <td className="py-3 text-center text-slate-500 text-xs">{item.qty} {item.unit}</td>
                      <td className="py-3 text-right text-slate-600 text-xs">{formatRupiah(item.price)}</td>
                      <td className="py-3 text-right font-extrabold text-slate-800 text-xs">{formatRupiah(item.total)}</td>
                      <td className="py-3 text-center">
                        {item.photo ? (
                          <button
                            type="button"
                            onClick={() => onViewPhoto(item.name, item.photo)}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] border border-emerald-200"
                          >
                            Lihat Foto
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[10px] italic">Tidak Ada</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600">TOTAL PENGAJUAN:</span>
              <span className="text-base font-extrabold text-emerald-700">{formatRupiah(budget.grandTotal)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tindakan Admin Verifikator</h4>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Catatan Verifikasi (Opsional untuk persetujuan, Wajib jika menolak):</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm font-medium"
                rows={3}
                placeholder="Tulis catatan persetujuan atau alasan penolakan..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleReject}
                className="px-5 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5"
              >
                <ThumbsDown className="w-4 h-4" /> Tolak Anggaran
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/10 transition-all flex items-center gap-1.5"
              >
                <ThumbsUp className="w-4 h-4" /> Setujui Anggaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
