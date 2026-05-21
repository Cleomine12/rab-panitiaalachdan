import { FileText, CheckCircle, Wallet, Hourglass, Bell, AlertCircle, ChevronRight, School } from 'lucide-react';
import { User, Budget, TabId } from '../../types';
import { formatRupiah } from '../../utils';

interface TabDashboardProps {
  currentUser: User;
  budgets: Budget[];
  onTabChange: (tab: TabId) => void;
}

export function TabDashboard({ currentUser, budgets, onTabChange }: TabDashboardProps) {
  const myBudgets = currentUser.role === 'admin' ? budgets : budgets.filter((b) => b.user_id === currentUser.id);
  const totalProposed = myBudgets.reduce((acc, b) => acc + b.grandTotal, 0);
  const totalApproved = myBudgets.filter((b) => b.status === 'approved').reduce((acc, b) => acc + b.grandTotal, 0);
  const totalRealized = myBudgets.filter((b) => b.isRealized).reduce((acc, b) => acc + b.grandTotal, 0);
  const pendingCount = myBudgets.filter((b) => b.status === 'pending').length;
  const unitLabel = currentUser.role === 'admin' ? 'Seluruh Lembaga' : 'Lembaga Anda';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Diajukan ({unitLabel})</p>
            <h3 className="text-xl font-extrabold text-slate-800 mt-1">{formatRupiah(totalProposed)}</h3>
            <p className="text-[10px] text-slate-500 mt-1">{myBudgets.length} Pengajuan Berkas</p>
          </div>
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><FileText className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Disetujui</p>
            <h3 className="text-xl font-extrabold text-emerald-600 mt-1">{formatRupiah(totalApproved)}</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Disetujui Admin</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Terealisasi</p>
            <h3 className="text-xl font-extrabold text-teal-600 mt-1">{formatRupiah(totalRealized)}</h3>
            <p className="text-[10px] text-teal-600 font-semibold mt-1">Dana Telah Cair</p>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><Wallet className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Menunggu Review</p>
            <h3 className="text-xl font-extrabold text-amber-600 mt-1">{pendingCount}</h3>
            <p className="text-[10px] text-amber-500 font-semibold mt-1">Pengajuan Baru</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Hourglass className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="bg-emerald-800 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg border border-emerald-900">
        <div className="relative z-10 max-w-xl">
          <h4 className="text-lg font-bold">Selamat Datang di Portal RAB Perpisahan Al-Achdan!</h4>
          <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
            Kelola penyusunan anggaran kebutuhan perpisahan secara transparan, akuntabel, dan terverifikasi secara instan demi kelancaran agenda Al-Achdan 2026.
          </p>
        </div>
        <div className="absolute right-6 bottom-0 top-0 items-center justify-center hidden md:flex opacity-20">
          <School className="w-32 h-32 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" /> Pengumuman Panitia Terbaru
          </h4>
          <ul className="space-y-4">
            <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg h-fit"><AlertCircle className="w-4 h-4" /></div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">Batas Akhir Pengajuan RAB</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">Seluruh madrasah dan lembaga diwajibkan menyelesaikan input RAB paling lambat sebelum 30 Mei 2026 untuk proses verifikasi keuangan gelombang pertama.</p>
              </div>
            </li>
            <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg h-fit"><CheckCircle className="w-4 h-4" /></div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">SOP Unggah Foto Barang</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">Harap melampirkan screenshot katalog, foto barang riil, atau perkiraan penawaran harga vendor guna mempermudah persetujuan admin.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Aksi Cepat Menu</h4>
            <p className="text-xs text-slate-400">Pilih menu navigasi cepat untuk mempermudah operasional kepanitiaan Anda.</p>
          </div>
          <div className="space-y-2 mt-4">
            {currentUser.role === 'admin' ? (
              <>
                <button onClick={() => onTabChange('admin-verifikasi')} className="w-full text-left p-3 hover:bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 transition-all">
                  <span>Tinjau Pengajuan Masuk</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={() => onTabChange('admin-akun')} className="w-full text-left p-3 hover:bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 transition-all">
                  <span>Tambah Akun Baru</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onTabChange('lembaga-pengajuan')} className="w-full text-left p-3 hover:bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 transition-all">
                  <span>Buat RAB Pengajuan Baru</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={() => onTabChange('lembaga-monitoring')} className="w-full text-left p-3 hover:bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 transition-all">
                  <span>Pantau Alur Persetujuan</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
