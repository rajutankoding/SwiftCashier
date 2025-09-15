import { useColorScheme } from "@/hooks/useColorScheme";
import { useDatabase } from "@/hooks/useDatabase";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "react-native-reanimated";
import "./global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { db, dbIsReady } = useDatabase();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded || !dbIsReady) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Memuat database...</Text>
    </View>;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(features)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
