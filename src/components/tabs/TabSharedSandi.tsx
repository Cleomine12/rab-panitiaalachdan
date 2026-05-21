import { useState } from 'react';
import { User } from '../../types';

interface Props {
  currentUser: User;
  onChangePassword: (newPass: string) => void;
  onError: (msg: string) => void;
  onSuccess: (msg: string) => void;
}

export function TabSharedSandi({ currentUser, onChangePassword, onError, onSuccess }: Props) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (current !== currentUser.password) {
      onError('Sandi saat ini tidak sesuai.');
      return;
    }
    if (newPass !== confirm) {
      onError('Konfirmasi sandi baru tidak cocok.');
      return;
    }
    onChangePassword(newPass);
    onSuccess('Kata sandi berhasil diperbarui!');
    setCurrent('');
    setNewPass('');
    setConfirm('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-md">
      <h4 className="text-sm font-bold text-slate-900 mb-1">Amankan Akun Anda</h4>
      <p className="text-xs text-slate-400 mb-6">Ubah kata sandi secara berkala untuk menjaga keamanan akses pengajuan anggaran.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Kata Sandi Saat Ini</label>
          <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Kata Sandi Baru</label>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Ulangi Kata Sandi Baru</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium" />
        </div>
        <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors">
          Perbarui Kata Sandi
        </button>
      </form>
    </div>
  );
}
