import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useNoteDetail } from "../hooks/useNoteDetail";

export default function NoteDetailScreen({ route, navigation, db }) {
  const { note } = route.params;

  const {
    title,
    setTitle,
    content,
    setContent,
    editable,
    setEditable,
    handleUpdate,
  } = useNoteDetail(note, db, navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Başlık</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        editable={editable}
        style={[styles.input, !editable && styles.disabledInput]}
      />

      <Text style={styles.label}>İçerik</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        editable={editable}
        multiline
        style={[
          styles.input,
          styles.textArea,
          !editable && styles.disabledInput,
        ]}
      />

      {!editable ? (
        <Button title="Düzenle" onPress={() => setEditable(true)} />
      ) : (
        <Button title="Kaydet" onPress={handleUpdate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  disabledInput: {
    backgroundColor: "#eee",
  },
});
