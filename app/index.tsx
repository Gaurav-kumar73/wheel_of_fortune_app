import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";
import StartingScreen from "../components/StartingScreen";

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem("token")
      .then(token => {
        if (isMounted) setLoggedIn(!!token);
      })
      .catch(() => {
        if (isMounted) setLoggedIn(false);
      })
      .finally(() => {
        if (isMounted) setChecking(false);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!checking && loggedIn) {
      router.replace("/(screens)/(tabs)");
    }
  }, [checking, loggedIn]);

  if (checking) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#34A853" />
      </View>
    );
  }

  // Show StartingScreen if not logged in
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StartingScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});