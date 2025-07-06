import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { insertNote } from '../database';

export default function AddNoteScreen({ navigation, db }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Uyarı', 'Başlık ve içerik boş olamaz.');
      return;
    }

    try {
      await insertNote(db, title, content);
      Alert.alert('Başarılı', 'Not kaydedildi!');
      navigation.goBack();
    } catch (error) {
      console.error('Not eklenemedi:', error);
      Alert.alert('Hata', 'Not kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Başlık</Text>
      <TextInput
        style={styles.input}
        placeholder="Not başlığı"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>İçerik</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Not içeriği"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button title="Kaydet" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
