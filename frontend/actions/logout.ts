"use server";
import Cookies from "js-cookie";

export const logoutUser = async () => {
  Cookies.remove("token");
}