import { Stack } from "expo-router";
import "react-native-reanimated";

export default function featuresLayout() {
  return (
    <Stack>
      <Stack.Screen name="(managementApps)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(managementProduct)"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(promotion)" options={{ headerShown: false }} />
      <Stack.Screen name="(report)" options={{ headerShown: false }} />
    </Stack>
  );
}
