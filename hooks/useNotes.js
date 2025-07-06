import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { getNotes, deleteNote, toggleFavorite } from "../database";

export function useNotes(db) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(async () => {
    try {
      const result = await getNotes(db);
      setNotes(result);
    } catch (error) {
      console.error("Notları çekerken hata oluştu:", error);
    }
  }, [db]);

  const toggleFavoriteNote = async (note) => {
    try {
      await toggleFavorite(db, note.id, note.favorite);
      fetchNotes();
    } catch (error) {
      console.error("Favori değiştirme hatası:", error);
    }
  };

  const deleteNoteWithConfirmation = (id) => {
    Alert.alert("Notu Sil", "Bu notu silmek istediğinize emin misiniz?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Sil",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(db, id);
            fetchNotes();
          } catch (error) {
            console.error("Silme hatası:", error);
          }
        },
      },
    ]);
  };

  return {
    notes,
    fetchNotes,
    toggleFavoriteNote,
    deleteNoteWithConfirmation,
  };
}
