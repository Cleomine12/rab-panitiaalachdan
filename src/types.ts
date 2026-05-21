export type Role = 'admin' | 'lembaga';
export type BudgetStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: Role;
}

export interface BudgetItem {
  name: string;
  qty: number;
  unit: string;
  price: number;
  total: number;
  photo: string;
}

export interface Budget {
  id: string;
  user_id: string;
  username: string;
  title: string;
  date: string;
  status: BudgetStatus;
  isRealized: boolean;
  verificationNote: string;
  items: BudgetItem[];
  grandTotal: number;
}

export type TabId =
  | 'dashboard'
  | 'admin-diajukan'
  | 'admin-verifikasi'
  | 'admin-terealisasi'
  | 'admin-hapus'
  | 'admin-akun'
  | 'admin-logo'
  | 'shared-sandi'
  | 'lembaga-pengajuan'
  | 'lembaga-monitoring'
  | 'lembaga-edit-hapus';

export interface AppState {
  users: User[];
  budgets: Budget[];
  logoUrl: string;
}
