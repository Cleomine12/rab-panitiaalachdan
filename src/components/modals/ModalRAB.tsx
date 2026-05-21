import { useEffect, useState } from 'react';
import { X, Plus, Trash2, Send, Image } from 'lucide-react';
import { Budget, BudgetItem, User } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  isOpen: boolean;
  editBudget: Budget | null;
  currentUser: User;
  onClose: () => void;
  onSubmit: (title: string, items: BudgetItem[], budgetId?: string) => void;
}

const emptyItem = (): BudgetItem => ({ name: '', qty: 1, unit: 'Unit', price: 0, total: 0, photo: '' });

export function ModalRAB({ isOpen, editBudget, currentUser, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<BudgetItem[]>([emptyItem()]);

  useEffect(() => {
    if (isOpen) {
      if (editBudget) {
        setTitle(editBudget.title);
        setItems(editBudget.items.map((i) => ({ ...i })));
      } else {
        setTitle('');
        setItems([emptyItem()]);
      }
    }
  }, [isOpen, editBudget]);

  const updateField = (index: number, field: keyof BudgetItem, value: string | number) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      if (field === 'qty' || field === 'price') {
        next[index].total = next[index].qty * next[index].price;
      }
      return next;
    });
  };

  const addRow = () => setItems((prev) => [...prev, emptyItem()]);

  const removeRow = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateField(index, 'photo', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const grandTotal = items.reduce((acc, i) => acc + i.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, items, editBudget?.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-slate-100">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {editBudget ? 'Ubah Rencana Anggaran Biaya (RAB)' : 'Pengajuan Anggaran RAB Baru'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Isi rincian barang, kuantitas, harga, dan bukti pendukung anggaran.</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Judul Pengajuan / Kategori</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm font-medium"
                placeholder="Contoh: Konsumsi Acara Utama / Perlengkapan Panggung"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Lembaga Pemohon</label>
              <input
                type="text"
                readOnly
                value={currentUser.name}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold text-slate-700 uppercase">Daftar Kebutuhan Barang / Jasa</label>
              <button type="button" onClick={addRow} className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                <Plus className="w-4 h-4" /> Tambah Baris
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] font-bold uppercase text-slate-600 tracking-wider border-b border-slate-200">
                      <th className="p-3 w-8 text-center">No</th>
                      <th className="p-3">Nama Barang / Jasa</th>
                      <th className="p-3 w-24">Vol (Qty)</th>
                      <th className="p-3 w-28">Satuan</th>
                      <th className="p-3 w-36">Harga Satuan (Rp)</th>
                      <th className="p-3 w-36">Total (Rp)</th>
                      <th className="p-3 w-32 text-center">Foto Barang</th>
                      <th className="p-3 w-12 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 text-center text-slate-500 font-semibold text-xs">{index + 1}</td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateField(index, 'name', e.target.value)}
                            required
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            placeholder="cth: Pembelian Map Raport"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            min={1}
                            value={item.qty}
                            onChange={(e) => updateField(index, 'qty', parseInt(e.target.value) || 1)}
                            required
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => updateField(index, 'unit', e.target.value)}
                            required
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            placeholder="Pcs/Set"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            min={0}
                            value={item.price}
                            onChange={(e) => updateField(index, 'price', parseInt(e.target.value) || 0)}
                            required
                            className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-right focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </td>
                        <td className="p-3 text-right font-extrabold text-slate-800 text-xs whitespace-nowrap">
                          {formatRupiah(item.total)}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col items-center gap-1">
                            {item.photo ? (
                              <div className="relative w-12 h-12 rounded border overflow-hidden group">
                                <img src={item.photo} className="w-full h-full object-cover" alt="" />
                                <button
                                  type="button"
                                  onClick={() => updateField(index, 'photo', '')}
                                  className="absolute inset-0 bg-black/60 text-white text-[9px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  Hapus
                                </button>
                              </div>
                            ) : (
                              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded text-[10px] font-bold border border-slate-200 flex items-center gap-1">
                                <Image className="w-3.5 h-3.5" /> Unggah
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => e.target.files?.[0] && handlePhotoUpload(index, e.target.files[0])}
                                />
                              </label>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeRow(index)}
                            className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Estimasi Pengajuan:</span>
                <span className="text-xl font-extrabold text-emerald-700">{formatRupiah(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl font-semibold text-sm transition-all">
              Batal
            </button>
            <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/10 transition-all flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Kirim Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
