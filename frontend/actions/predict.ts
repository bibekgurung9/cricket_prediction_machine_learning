import { MatchPredictionType } from "@/constants/interfaces";
import { predictMatchUrl } from "@/urls/URL";
import Cookies from "js-cookie";

export const predictMatch = async (matchData: MatchPredictionType) => {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("No token found in cookies.");
    }
    
    try {
        const response = await fetch(`${predictMatchUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(matchData),
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
    
        const predictData = await response.json();
    
        return predictData;
      } catch (error) {
        console.error("Error predicting", error);
        throw error;
      }
};
  