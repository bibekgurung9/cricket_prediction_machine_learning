import { loginUserUrl } from "@/urls/URL";

export const loginUser = async () => {
  try {
      window.location.href = `${loginUserUrl}`;
  } catch (error) {
    console.error("Error:", error);
  }
};
