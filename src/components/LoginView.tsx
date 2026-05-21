import { useState } from 'react';
import { User as UserIcon, Lock, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginViewProps {
  users: User[];
  logoUrl: string;
  onLogin: (user: User) => void;
  onError: (msg: string) => void;
}

export function LoginView({ users, logoUrl, onLogin, onError }: LoginViewProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );
    if (found) {
      onLogin(found);
    } else {
      onError('Username atau kata sandi Anda salah.');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 bg-gradient-to-tr from-emerald-900 via-emerald-800 to-teal-900 min-h-screen">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/20 rounded-full blur-xl"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-inner">
              <img
                src={logoUrl}
                alt="Logo Al-Achdan"
                className="w-16 h-16 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sistem Pengajuan RAB</h2>
          <p className="text-slate-500 text-sm mt-1">Kepanitiaan Perpisahan Al-Achdan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Username / Nama Lembaga
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <UserIcon className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm font-medium"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            Masuk Sistem <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center relative z-10">
          <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Dibuat Oleh</p>
          <p className="text-sm font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mt-1">
            Nandi Achdarizal Sutisna
          </p>
        </div>
      </div>
    </div>
  );
}
