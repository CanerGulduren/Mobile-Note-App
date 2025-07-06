export async function insertNote(db, title, content) {
  return await db.runAsync(
    'INSERT INTO notes (title, content) VALUES (?, ?);',
    [title, content]
  );
}

export async function getNotes(db) {
  return await db.getAllAsync('SELECT * FROM notes;');
}

export async function deleteNote(db, id) {
  return await db.runAsync(
    'DELETE FROM notes WHERE id = ?;',
    [id]
  );
}

export async function updateNote(db, id, title, content) {
  return await db.runAsync(
    'UPDATE notes SET title = ?, content = ? WHERE id = ?;',
    [title, content, id]
  );
}