"use client";
import { useEffect } from "react";
import { loginUser } from "@/actions/login";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Social = () => {
  const router = useRouter();

  const loginOAuthGoogle = async () => {
    await loginUser();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log("Token found:", token);

      Cookies.set("token", token, { expires: 1, secure: false });

      router.replace("/profile");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center w-full gap-y-6">
      <button
        className="w-full flex items-center justify-center gap-x-2"
        onClick={loginOAuthGoogle}
      >
        Continue with Google
        <FcGoogle className="h-5 w-5" />
      </button>
    </div>
  );
};
