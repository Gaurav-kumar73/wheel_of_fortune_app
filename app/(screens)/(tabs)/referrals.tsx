import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function Referrals() {
  const BASE_URL = "https://spine.onrender.com/api/spin/play";

  const getAuthToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  // Play Spin
  const playSpin = async () => {
    const token = await getAuthToken();
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spinType: "free" }),
      });
      if (!response.ok) {
        Alert.alert("Error", `Server error: ${response.status}`);
        return;
      }
      const data = await response.json();
      if (data.success) {
        Alert.alert(
          "Spin Result",
          `Message: ${data.message}\nSpin Value: ${data.spin.resultValue}\nReward Balance: ${data.UserReward.rewardBalance}`
        );
      } else {
        Alert.alert("Error", data.message || "Spin failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to play spin.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Spin" onPress={playSpin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});