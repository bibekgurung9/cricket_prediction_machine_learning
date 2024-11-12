import { getUserProfileUrl } from "@/urls/URL";
import Cookies from "js-cookie";

export const fetchUserData = async () => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("No token found in cookies.");
  }

  try {
    const response = await fetch(`${getUserProfileUrl}`, {
      method: "GET",
      headers: {
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
