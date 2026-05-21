import { useState, useCallback } from 'react';
import { LogOut } from 'lucide-react';

import { User, Budget, BudgetItem, TabId, AppState } from './types';
import { STORAGE_PREFIX, DEFAULT_LOGO, initialUsers, initialBudgets } from './data';
import { generateId } from './utils';

import { ToastContainer, ToastMessage, ToastType } from './components/Toast';
import { LoginView } from './components/LoginView';
import { Sidebar } from './components/Sidebar';

import { TabDashboard } from './components/tabs/TabDashboard';
import { TabAdminDiajukan } from './components/tabs/TabAdminDiajukan';
import { TabAdminVerifikasi } from './components/tabs/TabAdminVerifikasi';
import { TabAdminTerealisasi } from './components/tabs/TabAdminTerealisasi';
import { TabAdminHapus } from './components/tabs/TabAdminHapus';
import { TabAdminAkun } from './components/tabs/TabAdminAkun';
import { TabAdminLogo } from './components/tabs/TabAdminLogo';
import { TabSharedSandi } from './components/tabs/TabSharedSandi';
import { TabLembagaPengajuan } from './components/tabs/TabLembagaPengajuan';
import { TabLembagaMonitoring } from './components/tabs/TabLembagaMonitoring';
import { TabLembagaEditHapus } from './components/tabs/TabLembagaEditHapus';

import { ModalRAB } from './components/modals/ModalRAB';
import { ModalVerify } from './components/modals/ModalVerify';
import { ModalDownload } from './components/modals/ModalDownload';
import { ModalPhotoViewer } from './components/modals/ModalPhotoViewer';

function loadState(): AppState {
  return {
    users: JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'users') || 'null') || initialUsers,
    budgets: JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'budgets') || 'null') || initialBudgets,
    logoUrl: localStorage.getItem(STORAGE_PREFIX + 'logoUrl') || DEFAULT_LOGO,
  };
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_PREFIX + 'users', JSON.stringify(state.users));
  localStorage.setItem(STORAGE_PREFIX + 'budgets', JSON.stringify(state.budgets));
  localStorage.setItem(STORAGE_PREFIX + 'logoUrl', state.logoUrl);
}

const TAB_TITLES: Record<TabId, string> = {
  'dashboard': 'Statistik & Ringkasan Dashboard',
  'admin-diajukan': 'Daftar Seluruh Anggaran yang Diajukan',
  'admin-verifikasi': 'Panel Verifikasi Persetujuan Anggaran',
  'admin-terealisasi': 'Data Realisasi & Pencairan Anggaran',
  'admin-hapus': 'Manajemen Penghapusan Anggaran',
  'admin-akun': 'Manajemen Akun Login Pengguna',
  'admin-logo': 'Pengaturan Logo Resmi Al-Achdan',
  'shared-sandi': 'Pengaturan Keamanan Sandi',
  'lembaga-pengajuan': 'Pengajuan Rencana Anggaran Biaya (RAB)',
  'lembaga-monitoring': 'Alur Perjalanan & Monitoring Anggaran',
  'lembaga-edit-hapus': 'Manajemen Edit & Hapus RAB Lembaga',
};

export default function App() {
  const [appState, setAppState] = useState<AppState>(loadState);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState<TabId>('dashboard');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [rabModal, setRabModal] = useState<{ open: boolean; editId: string | null }>({ open: false, editId: null });
  const [verifyModal, setVerifyModal] = useState<{ open: boolean; budgetId: string | null }>({ open: false, budgetId: null });
  const [downloadModal, setDownloadModal] = useState<{ open: boolean; budgetId: string | null }>({ open: false, budgetId: null });
  const [photoModal, setPhotoModal] = useState<{ open: boolean; title: string; src: string }>({ open: false, title: '', src: '' });

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateState = (updates: Partial<AppState>) => {
    setAppState((prev) => {
      const next = { ...prev, ...updates };
      saveState(next);
      return next;
    });
  };

  // Auth
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentTab('dashboard');
    showToast(`Selamat datang kembali, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Sesi berhasil diakhiri.', 'info');
  };

  // Budgets
  const handleRabSubmit = (title: string, items: BudgetItem[], budgetId?: string) => {
    const grandTotal = items.reduce((acc, i) => acc + i.total, 0);
    if (budgetId) {
      updateState({
        budgets: appState.budgets.map((b) =>
          b.id === budgetId ? { ...b, title, items, grandTotal } : b
        ),
      });
    } else {
      const newBudget: Budget = {
        id: generateId('bg'),
        user_id: currentUser!.id,
        username: currentUser!.username,
        title,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        isRealized: false,
        verificationNote: '',
        items,
        grandTotal,
      };
      updateState({ budgets: [...appState.budgets, newBudget] });
    }
    showToast('Anggaran RAB Anda berhasil di-submit!', 'success');
    setRabModal({ open: false, editId: null });
    setCurrentTab(currentUser?.role === 'admin' ? 'admin-diajukan' : 'lembaga-monitoring');
  };

  const handleVerifyApprove = (id: string, note: string) => {
    updateState({
      budgets: appState.budgets.map((b) => b.id === id ? { ...b, status: 'approved', verificationNote: note } : b),
    });
    showToast('Anggaran berhasil disetujui!', 'success');
    setVerifyModal({ open: false, budgetId: null });
    setCurrentTab('admin-verifikasi');
  };

  const handleVerifyReject = (id: string, note: string) => {
    updateState({
      budgets: appState.budgets.map((b) => b.id === id ? { ...b, status: 'rejected', verificationNote: note } : b),
    });
    showToast('Anggaran berhasil ditolak!', 'success');
    setVerifyModal({ open: false, budgetId: null });
    setCurrentTab('admin-verifikasi');
  };

  const handleToggleRealization = (id: string, status: boolean) => {
    updateState({
      budgets: appState.budgets.map((b) => b.id === id ? { ...b, isRealized: status } : b),
    });
    showToast(status ? 'Dana berhasil dicairkan!' : 'Status pencairan berhasil dibatalkan.', 'success');
  };

  const handleAdminDeleteBudget = (id: string) => {
    if (confirm('Apakah Anda sangat yakin ingin menghapus data anggaran ini secara permanen dari sistem?')) {
      updateState({ budgets: appState.budgets.filter((b) => b.id !== id) });
      showToast('Data anggaran berhasil dihapus permanen.', 'success');
    }
  };

  const handleDeleteBudget = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus draf pengajuan RAB ini?')) {
      updateState({ budgets: appState.budgets.filter((b) => b.id !== id) });
      showToast('Pengajuan berhasil dihapus.', 'success');
    }
  };

  // Users
  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = { id: generateId('usr'), ...userData };
    updateState({ users: [...appState.users, newUser] });
    showToast(`Akun ${newUser.name} berhasil didaftarkan!`, 'success');
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus akun ini? Pengguna tersebut tidak akan bisa login lagi.')) {
      updateState({ users: appState.users.filter((u) => u.id !== id) });
      showToast('Akun berhasil dihapus.', 'success');
    }
  };

  const handleChangeLogo = (url: string) => {
    updateState({ logoUrl: url });
    showToast('Logo baru berhasil diterapkan pada sistem!', 'success');
  };

  const handleChangePassword = (newPass: string) => {
    if (!currentUser) return;
    updateState({
      users: appState.users.map((u) => u.id === currentUser.id ? { ...u, password: newPass } : u),
    });
    setCurrentUser((prev) => prev ? { ...prev, password: newPass } : prev);
  };

  if (!currentUser) {
    return (
      <>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        <LoginView
          users={appState.users}
          logoUrl={appState.logoUrl}
          onLogin={handleLogin}
          onError={(msg) => showToast(msg, 'error')}
        />
      </>
    );
  }

  const verifyBudget = verifyModal.budgetId ? appState.budgets.find((b) => b.id === verifyModal.budgetId) || null : null;
  const downloadBudget = downloadModal.budgetId ? appState.budgets.find((b) => b.id === downloadModal.budgetId) || null : null;
  const editBudget = rabModal.editId ? appState.budgets.find((b) => b.id === rabModal.editId) || null : null;

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const renderTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <TabDashboard currentUser={currentUser} budgets={appState.budgets} onTabChange={setCurrentTab} />;
      case 'admin-diajukan':
        return <TabAdminDiajukan budgets={appState.budgets} users={appState.users} onOpenDownload={(id) => setDownloadModal({ open: true, budgetId: id })} />;
      case 'admin-verifikasi':
        return <TabAdminVerifikasi budgets={appState.budgets} users={appState.users} onOpenVerify={(id) => setVerifyModal({ open: true, budgetId: id })} />;
      case 'admin-terealisasi':
        return <TabAdminTerealisasi budgets={appState.budgets} users={appState.users} onToggleRealization={handleToggleRealization} />;
      case 'admin-hapus':
        return <TabAdminHapus budgets={appState.budgets} users={appState.users} onDelete={handleAdminDeleteBudget} />;
      case 'admin-akun':
        return <TabAdminAkun users={appState.users} onAddUser={handleAddUser} onDeleteUser={handleDeleteUser} />;
      case 'admin-logo':
        return <TabAdminLogo logoUrl={appState.logoUrl} onSave={handleChangeLogo} onError={(msg) => showToast(msg, 'error')} />;
      case 'shared-sandi':
        return (
          <TabSharedSandi
            currentUser={currentUser}
            onChangePassword={handleChangePassword}
            onError={(msg) => showToast(msg, 'error')}
            onSuccess={(msg) => showToast(msg, 'success')}
          />
        );
      case 'lembaga-pengajuan':
        return <TabLembagaPengajuan onOpenRabModal={() => setRabModal({ open: true, editId: null })} />;
      case 'lembaga-monitoring':
        return <TabLembagaMonitoring budgets={appState.budgets} userId={currentUser.id} />;
      case 'lembaga-edit-hapus':
        return (
          <TabLembagaEditHapus
            budgets={appState.budgets}
            userId={currentUser.id}
            onEdit={(id) => setRabModal({ open: true, editId: id })}
            onDelete={handleDeleteBudget}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-50">
        <Sidebar
          currentUser={currentUser}
          currentTab={currentTab}
          logoUrl={appState.logoUrl}
          onTabChange={setCurrentTab}
          onLogout={handleLogout}
        />

        <main className="flex-grow flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-bold text-slate-900">{TAB_TITLES[currentTab]}</h2>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 font-medium">Sistem Anggaran Perpisahan</p>
                <p className="text-xs font-semibold text-slate-600">{today}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-rose-100"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </header>

          <div className="flex-grow p-6 overflow-y-auto">
            {renderTab()}
          </div>
        </main>
      </div>

      <ModalRAB
        isOpen={rabModal.open}
        editBudget={editBudget}
        currentUser={currentUser}
        onClose={() => setRabModal({ open: false, editId: null })}
        onSubmit={handleRabSubmit}
      />

      <ModalVerify
        isOpen={verifyModal.open}
        budget={verifyBudget}
        users={appState.users}
        onClose={() => setVerifyModal({ open: false, budgetId: null })}
        onApprove={handleVerifyApprove}
        onReject={handleVerifyReject}
        onViewPhoto={(title, src) => setPhotoModal({ open: true, title, src })}
        onError={(msg) => showToast(msg, 'error')}
      />

      <ModalDownload
        isOpen={downloadModal.open}
        budget={downloadBudget}
        users={appState.users}
        logoUrl={appState.logoUrl}
        onClose={() => setDownloadModal({ open: false, budgetId: null })}
      />

      <ModalPhotoViewer
        isOpen={photoModal.open}
        title={photoModal.title}
        src={photoModal.src}
        onClose={() => setPhotoModal({ open: false, title: '', src: '' })}
      />
    </>
  );
}
