import {create} from 'zustand';

interface QuizState {
    results: any;
    setResults: (results: any) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    results: null,
    setResults: (results) => set({ results }),
}));
