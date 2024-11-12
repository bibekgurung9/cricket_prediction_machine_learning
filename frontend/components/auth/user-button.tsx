"use client";
import DefaultUser from "@/assets/default-user.jpg"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/actions/profile"; 
import Cookies from "js-cookie";

export function UserButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<{ name: string; profileImage: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token)

    if (token) {
      fetchUserData()
        .then((data) => {
          setUserData({
            name: `${data.firstName} ${data.lastName}`,
            profileImage: data.avatarUrl || DefaultUser, 
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false); 
        });
    } else {
      setLoading(false);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return (
      <Link href="/auth/login" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white hover:opacity-80">
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleDropdown} className="flex items-center space-x-2">
        <Image
          src={userData.profileImage}
          alt={`${userData.name}'s profile`}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{userData.name}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
              Profile
            </Link>
            <button
              onClick={() => {
                Cookies.remove("token");
                router.push("/auth/login");
              }}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
