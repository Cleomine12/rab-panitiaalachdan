import {
  LayoutDashboard, FileClock, ShieldCheck, CheckCircle2, Trash2,
  Users, Image, Lock, FilePlus2, Activity, Sliders, LogOut
} from 'lucide-react';
import { User, TabId } from '../types';

const MENU_ICONS: Record<string, React.ElementType> = {
  'layout-dashboard': LayoutDashboard,
  'file-clock': FileClock,
  'shield-check': ShieldCheck,
  'check-circle-2': CheckCircle2,
  'trash-2': Trash2,
  'users': Users,
  'image': Image,
  'lock': Lock,
  'file-plus-2': FilePlus2,
  'activity': Activity,
  'sliders': Sliders,
};

interface MenuItem {
  id: TabId;
  label: string;
  icon: string;
}

const adminMenu: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'admin-diajukan', label: 'Anggaran Diajukan', icon: 'file-clock' },
  { id: 'admin-verifikasi', label: 'Verifikasi Anggaran', icon: 'shield-check' },
  { id: 'admin-terealisasi', label: 'Anggaran Terealisasi', icon: 'check-circle-2' },
  { id: 'admin-hapus', label: 'Hapus Anggaran', icon: 'trash-2' },
  { id: 'admin-akun', label: 'Manajemen Akun', icon: 'users' },
  { id: 'admin-logo', label: 'Pengaturan Logo', icon: 'image' },
  { id: 'shared-sandi', label: 'Ubah Sandi', icon: 'lock' },
];

const lembagaMenu: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'lembaga-pengajuan', label: 'Pengajuan RAB', icon: 'file-plus-2' },
  { id: 'lembaga-monitoring', label: 'Monitoring Status', icon: 'activity' },
  { id: 'lembaga-edit-hapus', label: 'Edit & Hapus RAB', icon: 'sliders' },
  { id: 'shared-sandi', label: 'Ubah Sandi', icon: 'lock' },
];

interface SidebarProps {
  currentUser: User;
  currentTab: TabId;
  logoUrl: string;
  onTabChange: (tab: TabId) => void;
  onLogout: () => void;
}

export function Sidebar({ currentUser, currentTab, logoUrl, onTabChange, onLogout }: SidebarProps) {
  const menu = currentUser.role === 'admin' ? adminMenu : lembagaMenu;

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <img src={logoUrl} alt="Logo" className="w-10 h-10 object-cover rounded-lg border border-slate-700" />
        <div>
          <h1 className="font-bold text-white leading-tight text-sm tracking-wide">AL-ACHDAN</h1>
          <p className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">Sistem RAB</p>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-sm">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <p className="font-semibold text-white text-xs truncate">{currentUser.name}</p>
          <p className="text-[10px] text-slate-400 capitalize">
            {currentUser.role === 'admin' ? 'Administrator' : 'Perwakilan Lembaga'}
          </p>
        </div>
      </div>

      <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
        {menu.map((item) => {
          const Icon = MENU_ICONS[item.icon] || LayoutDashboard;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-700/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Keluar dari Sistem
        </button>
        <div className="text-center mt-3">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Dikembangkan Oleh</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">Nandi Achdarizal Sutisna</p>
        </div>
      </div>
    </aside>
  );
}
