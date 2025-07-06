export async function toggleFavorite(db, id, currentValue) {
  const newValue = currentValue ? 0 : 1;
  return await db.runAsync("UPDATE notes SET favorite = ? WHERE id = ?;", [
    newValue,
    id,
  ]);
}

export async function getFavoriteNotes(db) {
  return await db.getAllAsync("SELECT * FROM notes WHERE favorite = 1;");
}
