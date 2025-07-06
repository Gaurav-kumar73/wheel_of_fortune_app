import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof SignupForm, value: string) =>
    setForm({ ...form, [field]: value });

  const API_URL = "https://spine.onrender.com/api/auth/login";

  const handleLogin = async () => {
    // Check for required fields
    if (!form.email || !form.password) {
        Alert.alert("Incomplete Form", "Please fill all required fields.");
        return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (data.success) {
        // Store JWT securely
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Success', 'Login successful!');
        router.replace("/(screens)/(tabs)"); // Navigate to home screen
        
      } else {
        Alert.alert('Error', data.message || 'Login failed.');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong!');
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
                  style={styles.loginButton}
                  onPress={() => router.push("/(screens)/login/signup")}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Create New Account?
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>

            {/* Signup Section */}
            <View style={styles.loginSection}>
              <Text
                style={{
                  color: Colors.axtra1,
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Welcome
              </Text>

              {/* Signup Form */}
              <View style={{ marginTop: 30 }}>

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

                {/* Button */}
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                  >
                    {loading ? "Logging... " : "Login"}
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
  loginButton: {
    backgroundColor: Colors.axtra1,
    padding: 6,
    borderRadius: 5,
  },
  loginSection: {
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
  loginBtn: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
});
