import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const API_URL = "https://spine.onrender.com/api/auth/user";

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  code: string;
}

export interface Wallet {
  balance: number;
}

export function useUserDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.data.user);
          setWallet(data.data.wallet);
        }
      } catch (error) {
        // Optionally handle error
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  return { user, wallet, loading };
}