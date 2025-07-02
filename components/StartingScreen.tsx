import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StartingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" translucent={false}/>
      <Stack.Screen options={{ headerShown: false, statusBarStyle: "dark",}} />

      <ImageBackground
        source={require("@/assets/images/background1.png")} // Replace with your background image path
        style={styles.container}
        resizeMode="cover"
      >

        {/* Top Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>WELCOME TO THE SPIN &</Text>
          <Text style={styles.title1}>WIN ADVENTURE</Text>
          <Text style={styles.title2}>
            Spin the wheel, invite friends, and unlock exciting rewards with
            every turn!
          </Text>
        </View>

        {/* mid image */}
        <View>
          <Image
            source={require("@/assets/images/girl.png")}
            style={styles.image}
          />
        </View>

        {/* footer buttons */}
        <View style={styles.buttonContainer}>
          <Link href={"/(screens)/login/signup"} asChild>
            <TouchableOpacity style={styles.button1}>
              <Text style={{ color: Colors.text2, fontWeight: "bold" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/(screens)/login/login"} asChild>
            <TouchableOpacity style={styles.button2}>
              <Text style={{ color: Colors.axtra1, fontWeight: "bold" }}>
                Log In
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Footer text*/}
        <View>
          <Text style={styles.footerTextContainer}>By Clicking Login or Signup, You Agree To Our
            {" "}
            <Text style={{color: Colors.primary}}>Privacy Policy</Text>
            {" "}And{" "}
            <Text style={{color: Colors.primary}}>Terms Of Services.</Text>
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: 580,
  },
  titleContainer: {
    paddingHorizontal: 20,
  },
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.text2,
  },
  title2: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.text2,
  },
  image: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button1: {
    padding: 10,
    backgroundColor: Colors.axtra1,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
  button2: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    // Only bottom shadow
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 4 }, // shadow only at bottom
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4, // for Android
    backgroundColor: "#fff",
  },
  footerTextContainer:{
    padding: 20,
    fontSize: 12,
    textAlign: "center",
  },
});
