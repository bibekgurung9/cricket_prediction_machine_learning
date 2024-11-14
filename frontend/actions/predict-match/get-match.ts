import Cookies from "js-cookie";
import { getCurrentMatchUrl } from "@/urls/URL"; 

export const getMatchData = async (userId: string, matchId: string) => {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("No token found in cookies.");
    }

    try {
        const response = await fetch(`${getCurrentMatchUrl}/${userId}/${matchId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch match data.");
        }

        const matchData = await response.json();
        return matchData;
    } catch (error) {
        console.error("Error fetching match data:", error);
        throw error;
    }
};
