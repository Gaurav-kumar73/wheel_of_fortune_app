import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setLoggedIn(!!token);
      setChecking(false);
    };
    checkLogin();
  }, []);

  if (checking) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Protected guard={!loggedIn}>
        <Stack.Screen name="/" />
      </Stack.Protected>

      <Stack.Protected guard={loggedIn}>
        <Stack.Screen name="(screens)/(tabs)" />
      </Stack.Protected>

    </Stack>
  );
}
