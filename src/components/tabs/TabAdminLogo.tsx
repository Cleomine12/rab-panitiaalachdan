import { useState } from 'react';

const PRESETS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=60', label: 'Nuansa Klasik' },
  { id: 2, src: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=120&auto=format&fit=crop&q=60', label: 'Hijau Islami' },
  { id: 3, src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=120&auto=format&fit=crop&q=60', label: 'Emas Modern' },
];

interface Props {
  logoUrl: string;
  onSave: (url: string) => void;
  onError: (msg: string) => void;
}

export function TabAdminLogo({ logoUrl, onSave, onError }: Props) {
  const [inputUrl, setInputUrl] = useState('');
  const [preview, setPreview] = useState(logoUrl);

  const handleSave = () => {
    if (!inputUrl.trim()) {
      onError('Masukkan tautan URL logo terlebih dahulu.');
      return;
    }
    setPreview(inputUrl.trim());
    onSave(inputUrl.trim());
    setInputUrl('');
  };

  const handlePreset = (src: string) => {
    setPreview(src);
    onSave(src);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl">
      <h4 className="text-sm font-bold text-slate-900 mb-1">Ganti Logo Organisasi Al-Achdan</h4>
      <p className="text-xs text-slate-400 mb-6">Logo ini akan muncul pada Kop Laporan Resmi, Header Halaman, serta halaman login.</p>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-slate-50 border rounded-2xl">
            <img src={preview} alt="Preview Logo" className="w-24 h-24 object-cover rounded-xl shadow-md border border-slate-200" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">Pratinjau Logo Aktif</p>
            <p className="text-[11px] text-slate-400 mt-1">Gunakan URL gambar valid (HTTPS) atau pilih dari preset template logo di bawah ini.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Tautan / URL Logo Baru</label>
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs font-medium"
              placeholder="https://example.com/logo-achdan.png"
            />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-700 mb-2">Preset Logo Pilihan</p>
            <div className="grid grid-cols-3 gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePreset(p.src)}
                  className="p-2 border rounded-xl hover:bg-slate-50 text-center flex flex-col items-center gap-1.5"
                >
                  <img src={p.src} className="w-8 h-8 rounded-full object-cover" alt={p.label} />
                  <span className="text-[10px] font-semibold text-slate-600">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            Terapkan Logo Baru
          </button>
        </div>
      </div>
    </div>
  );
}
