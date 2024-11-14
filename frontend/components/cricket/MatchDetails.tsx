"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PredictMatchType } from '@/constants/interfaces';
import { getMatchData } from '@/actions/predict-match/get-match';
import Cookies from 'js-cookie';
import { fetchUserData } from '@/actions/profile';
import { deleteMatchData } from '@/actions/predict-match/delete-match';

interface MatchDetailsProps {
  matchId: string;
}

const MatchDetails = ({ matchId }: MatchDetailsProps) => {
  const router = useRouter();
  const [matchData, setMatchData] = useState<PredictMatchType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUserData()
        .then((data) => setUserId(data.id))
        .catch(() => setMessage("Error fetching user data."));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getMatchData(userId, matchId)
        .then((data) => setMatchData(data || null))
        .catch(() => setMessage("Error fetching match data."));
    }
  }, [userId, matchId]);

  const handleDeleteMatch = async () => {
    if (!userId || !matchId) {
      setMessage("User ID or Match ID is missing.");
      return;
    }

    try {
      await deleteMatchData(userId, matchId);
      setMessage("Match deleted successfully!");
      setTimeout(() => router.push("/predict-match"), 2000);
    } catch {
      setMessage("Error deleting match. Please try again.");
    }
  };

  const handleMakeAnotherPrediction = () => router.push("/predict-match");

  if (message) {
    return <p className="text-center text-lg">{message}</p>;
  }

  if (!matchData) {
    return <p className="text-center text-lg">Loading match data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Match Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <p><strong>Batting Team:</strong> {matchData.battingTeam}</p>
        <p><strong>Bowling Team:</strong> {matchData.bowlingTeam}</p>
        <p><strong>City:</strong> {matchData.city}</p>
        <p><strong>Runs Left:</strong> {matchData.runsLeft}</p>
        <p><strong>Balls Left:</strong> {matchData.ballsLeft}</p>
        <p><strong>Wickets Left:</strong> {matchData.wicketsLeft}</p>
        <p><strong>Current Run Rate:</strong> {matchData.currentRunRate}</p>
        <p><strong>Required Run Rate:</strong> {matchData.requiredRunRate}</p>
        <p><strong>Target:</strong> {matchData.target}</p>
        <p className="col-span-1 sm:col-span-2 lg:col-span-3">
          <strong>Prediction Date:</strong> {new Date(matchData.matchDate).toLocaleString()}
        </p>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Prediction Result</h2>
          <p><strong>{matchData.battingTeam} Win Probability:</strong> {`${(matchData.team1WinProbability * 100).toFixed(2)}%`}</p>
          <p><strong>{matchData.bowlingTeam} Win Probability:</strong> {`${(matchData.team2WinProbability * 100).toFixed(2)}%`}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-6">
        <button
          onClick={handleDeleteMatch}
          className="w-full sm:w-1/2 py-3 mr-0 sm:mr-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Match
        </button>
        <button
          onClick={handleMakeAnotherPrediction}
          className="w-full sm:w-1/2 py-3 mt-4 sm:mt-0 ml-0 sm:ml-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Make Another Prediction
        </button>
      </div>
    </div>
  );
};

export default MatchDetails;
