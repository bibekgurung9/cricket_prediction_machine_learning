import { MatchPredictionType } from "@/constants/interfaces";
import { savePredictionhUrl } from "@/urls/URL";
import Cookies from "js-cookie";

export const saveMatchData = async (matchData: MatchPredictionType, userId: number | null) => {
    const token = Cookies.get("token");

    if(!userId) {
        return { error: "User not found" };
    }

    if (!token) {
        return { error: "No token found in cookies." };
    }
    
    try {
        console.log(`${savePredictionhUrl}/${userId}`);
        const response = await fetch(`${savePredictionhUrl}/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ saveMatchData: matchData }),
        });

        if (!response.ok) {
        
            const errorData = await response.json();
            return { error: errorData?.message || "Failed to save match data." };
        }

        const predictData = await response.json();
        return predictData; 
    } catch (error: any) {
        console.error("Error saving match data:", error);
        return { error: error.message || "An error occurred while saving the match prediction." };
    }
};
