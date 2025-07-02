import Colors from "@/constants/Colors";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide top header
        tabBarShowLabel: true, // Show or hide labels icons text
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: Colors.secondary, // Tab bar background color
          // height: 50, // Set tab bar height
          // paddingTop: 5, // Padding at the top of the tab bar
          // paddingBottom: 30, // Padding at the bottom of the tab bar
        },
        tabBarActiveTintColor: "black", // Active tab color
        tabBarInactiveTintColor: "white", // Inactive tab color
        tabBarHideOnKeyboard: true, // Hide tab bar when keyboard opens (Android only)
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="spin"
        options={{
          title: "Spin",
          tabBarIcon: ({ color, size }) => (
            <Feather name="target" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="sack-dollar" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="referrals"
        options={{
          title: "Referrals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
