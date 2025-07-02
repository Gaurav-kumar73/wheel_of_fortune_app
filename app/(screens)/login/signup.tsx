import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface SignupForm {
  name: string;
  username: string;
  email: string;
  password: string;
  mobile: string;
  referralCode: string;
}

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof SignupForm, value: string) =>
    setForm({ ...form, [field]: value });

  const API_URL = "https://spine.onrender.com/api/auth/signup";

  const handleSignup = async () => {
    // Check for required fields
    if (!form.name || !form.username || !form.email || !form.password || !form.mobile) {
      Alert.alert("Incomplete Form", "Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        Alert.alert("Success", "Registration successful!");
        router.push("/(screens)/login/login"); // Navigate to login screen
      } else {
        Alert.alert("Error", data.message || "Signup failed.");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
        <Stack.Screen
          options={{ headerShown: false, statusBarStyle: "dark" }}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
              source={require("@/assets/images/backgroundMoney.png")}
              style={styles.ImageBackground}
              resizeMode="cover"
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 20,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={{ color: "#fff", fontSize: 18 }}>
                    {"<- Back"}
                  </Text>
                </TouchableOpacity>

                {/* Go to Login Button */}
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={() => router.push("/(screens)/login/login")}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Already have an Account?
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>

            {/* Signup Section */}
            <View style={styles.signupSection}>
              <Text
                style={{
                  color: Colors.axtra1,
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Create Your Account
              </Text>

              {/* Signup Form */}
              <View style={{ marginTop: 30 }}>
                {/* Name */}
                <Text style={{ fontSize: 16, marginBottom: 4 }}>Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Enter your name"
                    style={styles.textInput}
                    placeholderTextColor="#888"
                    value={form.name}
                    onChangeText={(v) => handleChange("name", v)}
                  />
                </View>

                {/* Username */}
                <Text style={{ fontSize: 16, marginBottom: 4 }}>Username</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Enter your username"
                    autoCapitalize="none"
                    style={styles.textInput}
                    placeholderTextColor="#888"
                    value={form.username}
                    onChangeText={(v) => handleChange("username", v)}
                  />
                </View>

                {/* Email */}
                <Text style={{ fontSize: 16, marginBottom: 4 }}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Enter your email"
                    // keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.textInput}
                    placeholderTextColor="#888"
                    value={form.email}
                    onChangeText={(v) => handleChange("email", v)}
                  />
                </View>

                {/* Password */}
                <Text style={{ fontSize: 16, marginBottom: 4 }}>Password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <TextInput
                    placeholder="Enter your password"
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
                    style={[styles.textInput, { flex: 1}]}
                    placeholderTextColor="#888"
                    value={form.password}
                    onChangeText={(v) => handleChange("password", v)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                    style={{ padding: 8 }}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={22}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                {/* Mobile Number */}
                <Text style={{ fontSize: 16, marginBottom: 4 }}>Mobile</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Enter your mobile number"
                    keyboardType="phone-pad"
                    style={styles.textInput}
                    placeholderTextColor="#888"
                    value={form.mobile}
                    onChangeText={(v) => handleChange("mobile", v)}
                  />
                </View>

                {/* Referral Code */}
                <Text style={{ fontSize: 16, marginBottom: 4 }}>
                  Referral Code
                </Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Enter referral code (optional)"
                    style={styles.textInput}
                    placeholderTextColor="#888"
                    value={form.referralCode}
                    onChangeText={(v) => handleChange("referralCode", v)}
                  />
                </View>

                {/* Button */}
                <TouchableOpacity
                  style={styles.signupBtn}
                  onPress={handleSignup}
                  disabled={loading}
                >
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  ImageBackground: {
    justifyContent: "center",
    width: "100%",
    height: 180,
    backgroundColor: Colors.primary,
  },
  signupButton: {
    backgroundColor: Colors.axtra1,
    padding: 6,
    borderRadius: 5,
  },
  signupSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: "#000",
    paddingBottom: 20,
  },
  inputWrapper: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    marginBottom: 16,
    width: "100%",
  },
  textInput: {
    padding: 12,
    width: "100%",
  },
  signupBtn: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
});
