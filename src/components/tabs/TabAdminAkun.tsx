import { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';
import { User, Role } from '../../types';

interface Props {
  users: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onDeleteUser: (id: string) => void;
}

export function TabAdminAkun({ users, onAddUser, onDeleteUser }: Props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('lembaga');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.some((u) => u.username === username.trim().toLowerCase())) {
      setError('Username ini sudah digunakan akun lain.');
      return;
    }
    onAddUser({ username: username.trim().toLowerCase(), password, name: name.trim(), role });
    setName('');
    setUsername('');
    setPassword('');
    setRole('lembaga');
    setError('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
        <h4 className="text-sm font-bold text-slate-900 mb-1">Daftarkan Akun Baru</h4>
        <p className="text-xs text-slate-400 mb-4">Tambahkan perwakilan lembaga atau admin pelaksana.</p>
        {error && <p className="text-xs text-rose-600 font-semibold mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nama Lengkap / Nama Lembaga</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium" placeholder="Contoh: Madrasah Ibtidaiyah Al-Achdan" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Username Login</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium" placeholder="Contoh: madrasah_ibtidaiyah" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Kata Sandi</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium" placeholder="Masukkan password" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Tingkat Hak Akses</label>
            <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium bg-white">
              <option value="lembaga">User / Lembaga</option>
              <option value="admin">Administrator Utama</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5">
            <UserPlus className="w-4 h-4" /> Simpan Akun Baru
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-900">Daftar Akun Pengguna</h4>
          <p className="text-xs text-slate-400">Pengaturan akses login kepanitiaan perpisahan.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
                <th className="p-4">Nama Lengkap</th>
                <th className="p-4">Username</th>
                <th className="p-4">Sandi</th>
                <th className="p-4">Peran</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-800">{u.name}</td>
                  <td className="p-4 font-semibold text-slate-600">{u.username}</td>
                  <td className="p-4 font-mono text-slate-500">{u.password}</td>
                  <td className="p-4 capitalize">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${u.role === 'admin' ? 'bg-sky-50 text-sky-700' : 'bg-slate-100 text-slate-700'}`}>{u.role}</span>
                  </td>
                  <td className="p-4 text-center">
                    {u.id === 'usr_admin' ? (
                      <span className="text-slate-400 text-[10px] font-semibold italic">System Default</span>
                    ) : (
                      <button onClick={() => onDeleteUser(u.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus Akun">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
