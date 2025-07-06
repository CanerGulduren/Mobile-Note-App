import { useState } from "react";
import { Alert } from "react-native";
import { updateNote } from "../database";

export function useNoteDetail(note, db, navigation) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [editable, setEditable] = useState(false);

  const handleUpdate = async () => {
    try {
      await updateNote(db, note.id, title, content);
      Alert.alert("Başarılı", "Not güncellendi.");
      setEditable(false);
      navigation.goBack();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      Alert.alert("Hata", "Not güncellenemedi.");
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    editable,
    setEditable,
    handleUpdate,
  };
}
