import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { openDb, createTable } from "./database";
import HomeScreen from "./screens/HomeScreen";
import AddNoteScreen from "./screens/AddNoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    (async () => {
      const database = await openDb();
      await createTable(database);
      setDb(database);
    })();
  }, []);

  if (!db) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} db={db} />}
        </Stack.Screen>
        <Stack.Screen name="AddNote">
          {(props) => <AddNoteScreen {...props} db={db} />}
        </Stack.Screen>
        <Stack.Screen name="NoteDetail">
          {(props) => <NoteDetailScreen {...props} db={db} />}
        </Stack.Screen>
        <Stack.Screen name="Favorites">
          {(props) => <FavoritesScreen {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
