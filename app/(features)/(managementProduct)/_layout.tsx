import { Stack } from "expo-router";
import "react-native-reanimated";

export default function productLayout() {
  return (
    <Stack>
      <Stack.Screen name="product" options={{ headerShown: false }} />
    </Stack>
  );
}
