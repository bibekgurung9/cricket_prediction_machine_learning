"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMatchData } from '@/actions/predict-match/get-match';
import { updatePrediction } from '@/actions/predict-match/update-match';
import { fetchUserData } from '@/actions/profile';
import { Team, City } from '@/constants/enum';
import { predictMatch } from '@/actions/predict';
import { ResultType } from '@/constants/interfaces';
import Cookies from 'js-cookie';

interface UpdatePredictionProps {
  matchId: string;
}

const UpdatePrediction = ({ matchId }: UpdatePredictionProps) => {
  const router = useRouter();
  const teams = Object.values(Team);
  const cities = Object.values(City);
  
  const [battingTeam, setBattingTeam] = useState<Team | ''>('');
  const [bowlingTeam, setBowlingTeam] = useState<Team | ''>('');
  const [city, setCity] = useState<City | ''>('');
  const [runsLeft, setRunsLeft] = useState<number | ''>('');
  const [ballsLeft, setBallsLeft] = useState<number | ''>('');
  const [wicketsLeft, setWicketsLeft] = useState<number | ''>('');
  const [currentRunRate, setCurrentRunRate] = useState<number | ''>('');
  const [requiredRunRate, setRequiredRunRate] = useState<number | ''>('');
  const [target, setTarget] = useState<number | ''>('');
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUserData()
        .then(data => setUserId(data.id))
        .catch(() => setMessage("Error fetching user data."));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getMatchData(userId, matchId)
        .then((data) => {
          setBattingTeam(data.battingTeam);
          setBowlingTeam(data.bowlingTeam);
          setCity(data.city);
          setRunsLeft(data.runsLeft);
          setBallsLeft(data.ballsLeft);
          setWicketsLeft(data.wicketsLeft);
          setCurrentRunRate(data.currentRunRate);
          setRequiredRunRate(data.requiredRunRate);
          setTarget(data.target);
        })
        .catch(() => setMessage("Error fetching match data."));
    }
  }, [userId, matchId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    const matchData = {
      battingTeam,
      bowlingTeam,
      city,
      runsLeft: Number(runsLeft),
      ballsLeft: Number(ballsLeft),
      wicketsLeft: Number(wicketsLeft),
      currentRunRate: Number(currentRunRate),
      requiredRunRate: Number(requiredRunRate),
      target: Number(target),
    };
  
    try {
      const predictionResult = await predictMatch(matchData);
      setResult(predictionResult);
    } catch {
      setMessage("Error predicting match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrediction = async () => {
    if (!result) return;

    const matchData = {
      battingTeam,
      bowlingTeam,
      city,
      runsLeft: Number(runsLeft),
      ballsLeft: Number(ballsLeft),
      wicketsLeft: Number(wicketsLeft),
      currentRunRate: Number(currentRunRate),
      requiredRunRate: Number(requiredRunRate),
      target: Number(target),
      team1WinProbability: result.probability1,
      team2WinProbability: result.probability2,
    };

    setLoading(true);
    try {
      await updatePrediction(userId!, matchId, matchData);
      setMessage("Prediction updated successfully!");
      setTimeout(() => router.push("/profile"), 2000); // Redirect after success
    } catch {
      setMessage("Error updating prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Update Match Prediction 🏏
      </h1>

      {message && <p className="text-center text-lg">{message}</p>}

      <form onSubmit={handleSubmit} className={`grid grid-cols-2 md:grid-cols-3 gap-2 ${loading ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-700 mb-2">Batting Team:</label>
          <select
            value={battingTeam}
            onChange={(e) => setBattingTeam(e.target.value as Team)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Select Batting Team</option>
            {teams.map((team, idx) => (
              <option key={idx} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-700 mb-2">Bowling Team:</label>
          <select
            value={bowlingTeam}
            onChange={(e) => setBowlingTeam(e.target.value as Team)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Select Bowling Team</option>
            {teams.map((team, idx) => (
              <option key={idx} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-700 mb-2">City:</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value as City)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Select City</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {[{ label: 'Runs Left', value: runsLeft, setValue: setRunsLeft },
          { label: 'Balls Left', value: ballsLeft, setValue: setBallsLeft },
          { label: 'Wickets Left', value: wicketsLeft, setValue: setWicketsLeft },
          { label: 'Current Run Rate', value: currentRunRate, setValue: setCurrentRunRate, step: '0.01' },
          { label: 'Required Run Rate', value: requiredRunRate, setValue: setRequiredRunRate, step: '0.01' },
          { label: 'Target', value: target, setValue: setTarget }].map(({ label, value, setValue, step }, idx) => (
            <div className="flex flex-col" key={idx}>
              <label className="block text-lg font-medium text-gray-700 mb-2">{label}:</label>
              <input
                type="number"
                step={step}
                value={value}
                onChange={(e) => setValue(Number(e.target.value) || '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          ))}

        <div className="col-span-3 flex justify-between mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 py-3 mr-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Predicting...' : 'Predict Winner 🎯'}
          </button>
          <button
            type="button"
            onClick={handleUpdatePrediction}
            disabled={!result}
            className={`w-1/2 py-3 ml-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${!result ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Update Prediction 💾
          </button>
        </div>
      </form>

      {result && !loading && (
        <div className="mt-6 text-center text-xl text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Prediction Result</h2>
          <p className="text-lg">
            <span className="font-bold">{result.team1}</span>: {`${(result.probability1 * 100).toFixed(2)}%`}
          </p>
          <p className="text-lg">
            <span className="font-bold">{result.team2}</span>: {`${(result.probability2 * 100).toFixed(2)}%`}
          </p>
        </div>
      )}
    </div>
  );
};

export default UpdatePrediction;
