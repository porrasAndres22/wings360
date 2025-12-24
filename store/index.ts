
import { create } from 'zustand';


export const useChangeOption = create<{ data: String, handler: (setHandler: String) => void }>((set) => ({
    data: "",
    handler: (setHandler: String) => set({ data: setHandler }),
}));

