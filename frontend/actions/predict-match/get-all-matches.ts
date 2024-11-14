import { gettAllMatchesUrl } from "@/urls/URL";
import Cookies from "js-cookie";

export const getAllUserMatchData = async (userId: number) => {
  console.log(userId)
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("No token found in cookies.");
  }

  try {
    const response = await fetch(`${gettAllMatchesUrl}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }

    const userData = await response.json();

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
