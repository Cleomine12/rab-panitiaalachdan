import { useState } from 'react';
import { X, FileText, FileSpreadsheet, FileEdit } from 'lucide-react';
import { Budget, User } from '../../types';
import { formatRupiah } from '../../utils';

interface Props {
  isOpen: boolean;
  budget: Budget | null;
  users: User[];
  logoUrl: string;
  onClose: () => void;
}

export function ModalDownload({ isOpen, budget, users, logoUrl, onClose }: Props) {
  const [paperSize, setPaperSize] = useState<'a4' | 'f4'>('a4');

  if (!isOpen || !budget) return null;

  const userObj = users.find((u) => u.id === budget.user_id);
  const lembagaName = userObj?.name || budget.username;
  const today = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  const budgetDate = new Date(budget.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  const previewSheetId = 'modal-print-preview-sheet';

  const getSheetHtml = () => {
    const el = document.getElementById(previewSheetId);
    return el ? el.innerHTML : '';
  };

  const handlePDF = () => {
    const printableHtml = `
      <html>
      <head>
        <title>RAB_Al_Achdan_${budget.title.replace(/\s+/g, '_')}</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11px; color: #000; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #000; padding: 6px; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          @page { size: ${paperSize === 'a4' ? 'A4' : '215mm 330mm'}; margin: 1.5cm; }
        </style>
      </head>
      <body>${getSheetHtml()}<script>window.onload=function(){window.print();}<\/script></body>
      </html>
    `;
    const pw = window.open('', '_blank');
    if (pw) { pw.document.write(printableHtml); pw.document.close(); }
  };

  const handleExcel = () => {
    let csv = 'data:text/csv;charset=utf-8,';
    csv += 'RENCANA ANGGARAN BIAYA (RAB) PERPISAHAN AL-ACHDAN\n';
    csv += `Lembaga Pemohon,${lembagaName}\n`;
    csv += `Tanggal Pengajuan,${budget.date}\n`;
    csv += `Judul Pengajuan,${budget.title}\n\n`;
    csv += 'No,Nama Barang,Kuantitas,Satuan,Harga Satuan,Total\n';
    budget.items.forEach((item, i) => {
      csv += `${i + 1},"${item.name}",${item.qty},"${item.unit}",${item.price},${item.total}\n`;
    });
    csv += `,,,,,TOTAL ANGGARAN,${budget.grandTotal}\n`;
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `RAB_${budget.title.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>RAB Al-Achdan</title>
      <style>
        body { font-family: Arial; font-size: 11pt; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 6pt; }
      </style></head>
      <body>${getSheetHtml()}</body>
      </html>
    `;
    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RAB_${budget.title.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-slate-100">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ekspor Laporan & Format Berkas</h3>
            <p className="text-xs text-slate-500 mt-0.5">Konfigurasi tata letak ukuran halaman sebelum mengunduh berkas laporan.</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 space-y-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 shrink-0">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ukuran Kertas</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaperSize('a4')}
                  className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center justify-center gap-1 ${paperSize === 'a4' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'}`}
                >
                  <span>A4</span>
                  <span className="text-[10px] text-slate-500 font-normal">210 x 297 mm</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaperSize('f4')}
                  className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center justify-center gap-1 ${paperSize === 'f4' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'}`}
                >
                  <span>F4 / Folio</span>
                  <span className="text-[10px] text-slate-500 font-normal">215 x 330 mm</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Format Berkas</label>
              <div className="space-y-2">
                <button type="button" onClick={handlePDF} className="w-full p-3 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-xl flex items-center gap-3 transition-colors text-left">
                  <span className="p-2 bg-rose-100 text-rose-700 rounded-lg"><FileText className="w-5 h-5" /></span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Cetak PDF Terformat</p>
                    <p className="text-[10px] text-slate-400">Cocok untuk penyerahan fisik / tanda tangan</p>
                  </div>
                </button>
                <button type="button" onClick={handleExcel} className="w-full p-3 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center gap-3 transition-colors text-left">
                  <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><FileSpreadsheet className="w-5 h-5" /></span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Unduh Format Excel (CSV/XLS)</p>
                    <p className="text-[10px] text-slate-400">Cocok untuk pengolahan angka keuangan</p>
                  </div>
                </button>
                <button type="button" onClick={handleWord} className="w-full p-3 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl flex items-center gap-3 transition-colors text-left">
                  <span className="p-2 bg-sky-100 text-sky-700 rounded-lg"><FileEdit className="w-5 h-5" /></span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Unduh Format Word (Doc)</p>
                    <p className="text-[10px] text-slate-400">Mudah diedit teks penunjangnya kembali</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Pratinjau Layout Dokumen Resmi</label>
            <div className="flex-grow bg-slate-100 rounded-2xl border border-slate-200 p-4 overflow-auto max-h-[50vh] flex justify-center">
              <div
                id={previewSheetId}
                className={`bg-white p-8 shadow-md border border-slate-300 origin-top text-slate-900 text-[11px] leading-relaxed ${paperSize === 'a4' ? 'size-a4' : 'size-f4'}`}
              >
                <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 flex items-center justify-between">
                  <img src={logoUrl} alt="Logo" className="w-16 h-16 object-cover rounded" />
                  <div className="text-center flex-grow px-4">
                    <h2 className="text-sm font-extrabold uppercase tracking-wide">PANITIA BERSAMA PERPISAHAN KELAS AKHIR</h2>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">YAYASAN AL-ACHDAN KABUPATEN</h3>
                    <p className="text-[10px] text-slate-500 italic">Sekretariat: Jl. Al-Achdan No. 10 Kode Pos 12345 Telp (021) 123456</p>
                  </div>
                  <div className="w-16"></div>
                </div>

                <div className="text-center mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest underline">LAPORAN RENCANA ANGGARAN BIAYA (RAB)</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Nomor: 045/PAN-PER/AL-ACHDAN/2026</p>
                </div>

                <div className="mb-4">
                  <table className="w-full text-left font-semibold">
                    <tbody>
                      <tr><td className="w-24">Perihal</td><td className="w-4">:</td><td>Pengajuan RAB Kepanitiaan Perpisahan Al-Achdan</td></tr>
                      <tr><td>Unit Kerja</td><td>:</td><td>{lembagaName}</td></tr>
                      <tr><td>Tanggal Cetak</td><td>:</td><td>{today}</td></tr>
                    </tbody>
                  </table>
                </div>

                <table className="w-full border-collapse border border-slate-900 mb-8">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-center border-b border-slate-900">
                      <th className="border border-slate-900 p-2 w-8">No</th>
                      <th className="border border-slate-900 p-2">Rincian Barang / Jasa</th>
                      <th className="border border-slate-900 p-2 w-16">Qty</th>
                      <th className="border border-slate-900 p-2 w-20">Satuan</th>
                      <th className="border border-slate-900 p-2 w-28">Harga (Rp)</th>
                      <th className="border border-slate-900 p-2 w-28">Jumlah (Rp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.items.map((item, i) => (
                      <tr key={i}>
                        <td className="border border-slate-900 p-2 text-center">{i + 1}</td>
                        <td className="border border-slate-900 p-2 font-bold">{item.name}</td>
                        <td className="border border-slate-900 p-2 text-center">{item.qty}</td>
                        <td className="border border-slate-900 p-2 text-center">{item.unit}</td>
                        <td className="border border-slate-900 p-2 text-right">{formatRupiah(item.price)}</td>
                        <td className="border border-slate-900 p-2 text-right">{formatRupiah(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold bg-slate-50">
                      <td colSpan={5} className="border border-slate-900 p-2 text-right">TOTAL KEBUTUHAN ANGGARAN</td>
                      <td className="border border-slate-900 p-2 text-right text-emerald-800">{formatRupiah(budget.grandTotal)}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="grid grid-cols-2 gap-8 text-center font-bold mt-12">
                  <div>
                    <p>Mengetahui,</p>
                    <p className="mb-16">Ketua Panitia Al-Achdan</p>
                    <p className="underline">.........................................</p>
                  </div>
                  <div>
                    <p>Cianjur, {today}</p>
                    <p className="mb-16">Bendahara Pengaju</p>
                    <p className="underline">{lembagaName}</p>
                  </div>
                </div>

                <div className="mt-16 pt-4 border-t border-slate-200 text-center text-[9px] text-slate-400 italic">
                  Laporan ini dihasilkan secara otomatis oleh Sistem RAB Al-Achdan. Made by: Nandi Achdarizal Sutisna
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
