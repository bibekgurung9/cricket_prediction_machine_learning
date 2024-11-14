"use client";
import React, { useEffect, useState } from 'react';
import { fetchUserData } from '@/actions/profile';
import Cookies from 'js-cookie';
import { PredictMatchType, UserType } from '@/constants/interfaces';
import { getAllUserMatchData } from '@/actions/predict-match/get-all-matches';
import MatchesList from './cricket/MatchesList';

const Profile = () => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [matches, setMatches] = useState<PredictMatchType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      fetchUserData()
        .then((data) => {
          setUserData(data);
          getAllUserMatchData(data.id!)
            .then((matchesData) => {
              setMatches(matchesData);
            })
            .catch((error) => {
              console.error("Error fetching user matches:", error);
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
      <div className="w-full max-w-screen-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          Welcome, {userData.firstName} {userData.lastName} 🏏
        </h1>

        <div className="mt-6">
          <MatchesList matches={matches} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
