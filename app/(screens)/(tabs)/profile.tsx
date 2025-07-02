import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text>referrals</Text> */}
      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          router.push("/(screens)/login/login"); // Navigate to login page
          // Optionally, navigate to login or update state
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
