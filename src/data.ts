import { User, Budget } from './types';

export const STORAGE_PREFIX = 'AL_ACHDAN_RAB_';
export const DEFAULT_LOGO =
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=60';

export const initialUsers: User[] = [
  { id: 'usr_admin', username: 'admin', password: '123', name: 'Administrator Utama', role: 'admin' },
  { id: 'usr_madrasah_ts', username: 'madrasah_ts', password: '123', name: 'Madrasah Tsanawiyah Al-Achdan', role: 'lembaga' },
  { id: 'usr_madrasah_al', username: 'madrasah_al', password: '123', name: 'Madrasah Aliyah Al-Achdan', role: 'lembaga' },
  { id: 'usr_panitia_inti', username: 'panitia_inti', password: '123', name: 'Panitia Inti Perpisahan', role: 'lembaga' },
];

export const initialBudgets: Budget[] = [
  {
    id: 'bg_001',
    user_id: 'usr_madrasah_ts',
    username: 'madrasah_ts',
    title: 'Sewa Panggung & Sound System',
    date: '2026-05-18',
    status: 'approved',
    isRealized: true,
    verificationNote: 'Sesuai rincian standar kelayakan panggung perpisahan.',
    items: [
      { name: 'Panggung Ukuran 6x8 Meter', qty: 1, unit: 'Set', price: 1500000, total: 1500000, photo: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=200&auto=format&fit=crop&q=60' },
      { name: 'Sewa Sound System 5000 Watt', qty: 1, unit: 'Paket', price: 2000000, total: 2000000, photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=60' },
    ],
    grandTotal: 3500000,
  },
  {
    id: 'bg_002',
    user_id: 'usr_madrasah_al',
    username: 'madrasah_al',
    title: 'Konsumsi Tamu Undangan Wali Murid',
    date: '2026-05-20',
    status: 'pending',
    isRealized: false,
    verificationNote: '',
    items: [
      { name: 'Nasi Box Paket Premium (Ayam bakar + Es buah)', qty: 150, unit: 'Kotak', price: 25000, total: 3750000, photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=60' },
      { name: 'Air Mineral Botol 600ml', qty: 5, unit: 'Karton', price: 45000, total: 225000, photo: '' },
    ],
    grandTotal: 3975000,
  },
  {
    id: 'bg_003',
    user_id: 'usr_panitia_inti',
    username: 'panitia_inti',
    title: 'Sewa Kostum Tari Dan Dekorasi Tradisional',
    date: '2026-05-21',
    status: 'rejected',
    isRealized: false,
    verificationNote: 'Biaya sewa kostum terlalu mahal, cari vendor alternatif dengan harga hemat.',
    items: [
      { name: 'Dekorasi Pentas Balon & Bunga Segar', qty: 1, unit: 'Paket', price: 850000, total: 850000, photo: '' },
      { name: 'Sewa Kostum Tari Tradisional Lengkap', qty: 6, unit: 'Set', price: 250000, total: 1500000, photo: '' },
    ],
    grandTotal: 2350000,
  },
];
