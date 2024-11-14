import { deleteCurrentMatchUrl } from "@/urls/URL";
import Cookies from "js-cookie";

export const deleteMatchData = async (userId: string, matchId: string) => {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("No token found in cookies.");
    }

    try {
        const response = await fetch(`${deleteCurrentMatchUrl}/${userId}/${matchId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete match.");
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        console.error("Error deleting match:", error);
        throw error;
    }
};
