import Cookies from "js-cookie";
import { updateCurrentMatchUrl } from "@/urls/URL"; 

export const updatePrediction = async (
    userId: string,
    matchId: string,
    formData: {
        battingTeam: string;
        bowlingTeam: string;
        city: string;
        runsLeft: string;
        ballsLeft: string;
        wicketsLeft: string;
        currentRunRate: string;
        requiredRunRate: string;
        target: string;
    }
) => {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("No token found in cookies.");
    }

    try {
        const response = await fetch(`${updateCurrentMatchUrl}/${userId}/${matchId}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData), 
        });

        if (!response.ok) {
            throw new Error("Failed to update match prediction.");
        }

        const updatedMatchData = await response.json(); 
        return updatedMatchData;
    } catch (error) {
        console.error("Error updating match prediction:", error);
        throw error;
    }
};
