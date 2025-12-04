import { create } from "zustand";
import { db } from "./db";

// -------------------- TYPES --------------------
interface Document {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

interface Lifecycle {
  id: string;
  stage: string;
  progress: number;
  owner: string;
  status: string;
}

interface Project {
  id: string;
  name: string;
  budget: number;
  progress: number;
  manager: string;
  status: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
}

interface WordAssistant {
  id: string;
  title: string;
  lastEdited: string;
}

interface AppStore {
  documents: Document[];
  lifecycle: Lifecycle[];
  projects: Project[];
  chartData: { date: string; desktop: number; mobile: number }[];
  team: TeamMember[];
  wordAssistant: WordAssistant[];

  // Actions
  updateDocument: (id: number, updates: Partial<Document>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  documents: db.documents,
  lifecycle: db.lifecycle,
  projects: db.projects,
  chartData: db.chartData,
  team: db.team,
  wordAssistant: db.wordAssistant,

  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),
}));
