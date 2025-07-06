import { useEffect } from "react";
import { View, FlatList, Button } from "react-native";
import { useNotes } from "../hooks/useNotes";

export default function HomeScreen({ navigation, db }) {
  const { notes, fetchNotes, toggleFavoriteNote, deleteNoteWithConfirmation } =
    useNotes(db);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchNotes);
    return unsubscribe;
  }, [navigation, fetchNotes]);

  const renderItem = ({ item }) => (
    <NoteItem
      note={item}
      onPress={() => navigation.navigate("NoteDetail", { note: item })}
      onToggleFavorite={() => toggleFavoriteNote(item)}
      onDelete={() => deleteNoteWithConfirmation(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Button
        title="Yeni Not Ekle"
        onPress={() => navigation.navigate("AddNote")}
      />
      <Button
        title="Favori Notlarım"
        onPress={() => navigation.navigate("Favorites")}
      />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}
