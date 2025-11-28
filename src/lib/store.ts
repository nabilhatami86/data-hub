import { create } from "zustand";
import db from "./db";

export const useAppStore = create((set: any) => ({
  documents: db.documents,
  lifecycle: db.lifecycle,
  projects: db.projects,
  analytics: db.analytics,
  team: db.team,
  wordAssistant: db.wordAssistant,

  // Update data globally
  updateDocument: (id: any, updates: any) =>
    set((state: any) => ({
      documents: state.documents.map((doc: any) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),
}));
