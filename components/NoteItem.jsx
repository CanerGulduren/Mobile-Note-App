import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function NoteItem({ note, onPress, onToggleFavorite, onDelete }) {
  return (
    <TouchableOpacity style={styles.note} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{note.title}</Text>
        <Text numberOfLines={2}>{note.content}</Text>
      </View>
      <TouchableOpacity onPress={onToggleFavorite}>
        <Text style={styles.favorite}>{note.favorite ? "⭐" : "☆"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  note: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  delete: {
    fontSize: 18,
    color: "red",
    paddingLeft: 12,
  },
  favorite: {
    fontSize: 20,
    paddingLeft: 10,
    color: "#FFD700",
  },
});
