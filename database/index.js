import * as SQLite from "expo-sqlite";
import { insertNote, getNotes, deleteNote, updateNote } from "./notes";
import { toggleFavorite, getFavoriteNotes } from "./favorites";

export async function openDb() {
  return await SQLite.openDatabaseAsync("notes.db");
}

export async function createTable(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      favorite INTEGER DEFAULT 0
    );
  `);
}

export {insertNote, getNotes, deleteNote, updateNote, toggleFavorite, getFavoriteNotes}