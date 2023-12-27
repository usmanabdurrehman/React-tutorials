import { create } from "zustand";

const useUserStore = create((set) => ({
  firstName: "",
  lastName: "",
  updateFirstName: (firstName: string) => set(() => ({ firstName })),
  updateLastName: (lastName: string) => set(() => ({ lastName })),
}));
