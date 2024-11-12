"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserData } from '@/actions/profile';
import Cookies from 'js-cookie';
import DefaultUser from "@/assets/default-user.jpg";
import Image from 'next/image';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{ name: string; profileImage: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");

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

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return (
      <div>
        <h2>Please log in</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-16">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Welcome, {userData.name} 🏏
          </h1>
          
          <div className="flex items-center justify-center">
            <Image
              src={userData.profileImage}
              alt={`${userData.name}'s profile`}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
