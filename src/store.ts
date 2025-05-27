import { create } from 'zustand';
import type { User } from '../src/services/userService';
import type { Company } from '../src/services/companyService';

interface AppState {
  users: User[];
  companies: Company[];
  loading: boolean;
  setUsers: (users: User[]) => void;
  setCompanies: (companies: Company[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  users: [],
  companies: [],
  loading: false,
  setUsers: (users) => set({ users }),
  setCompanies: (companies) => set({ companies }),
  setLoading: (loading) => set({ loading }),
}));
