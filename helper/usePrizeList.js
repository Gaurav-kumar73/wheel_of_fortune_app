import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const PrizeApiUrl = "https://spine.onrender.com/api/spin/prizelist"; // <-- Use correct endpoint

export function usePrizeList() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrizeList = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(PrizeApiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success && data.prizes) {
          setPrizes(data.prizes);
          console.log("Prizes fetched successfully:", data.prizes);
        }
      } catch (error) {
        // Optionally handle error
      }
      setLoading(false);
    };
    fetchPrizeList();
  }, []);

  return { prizes, loading };
}