"use client";
import React, { useEffect, useState } from 'react';
import { predictMatch } from '@/actions/predict';
import { fetchUserData } from '@/actions/profile';
import { saveMatchData } from '@/actions/save-match';
import { Team, City } from '@/constants/enum';
import { ResultType } from '@/constants/interfaces';
import Cookies from 'js-cookie';

const MatchPrediction= () => {
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
  const [userId, setUserId] = useState<number | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUserData()
        .then((data) => setUserId(data.id))
        .catch(() => setServerError("Error fetching user data."));
    }
  }, []);

  const validateInputs = () => {
    setServerError(null);
    return true;
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
  
    setLoading(true);
    setServerError(null);
  
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
      if (predictionResult.error) {
        setServerError(predictionResult.error);
      } else {
        setResult(predictionResult);
      }
    } catch {
      setServerError('Error predicting winner. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleSavePrediction = async () => {
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

    try {
      const response = await saveMatchData(matchData, userId);
      if (response.error) {
        setServerError(response.error);
      } else {
        setSuccess("Match Saved Successfully");
      }
    } catch {
      setServerError("Error saving prediction. Please try again.");
    }
  };

  return (
<div className="max-w-4xl mx-auto p-4 bg-gray-300 rounded-lg shadow-lg flex flex-col justify-center">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
    Predict Cricket Match Winner 🏏
  </h1>

  {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}
  {success && <p className="text-green-500 text-center mb-4">{success}</p>}

  <form 
    onSubmit={handleSubmit} 
    className={`grid grid-cols-2 md:grid-cols-3 gap-2 ${loading ? 'blur-sm pointer-events-none' : ''}`}
  >
    <div className="flex flex-col">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Batting Team:
      </label>
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
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Bowling Team:
      </label>
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

    {[
      { label: 'Runs Left', value: runsLeft, setValue: setRunsLeft },
      { label: 'Balls Left', value: ballsLeft, setValue: setBallsLeft },
      { label: 'Wickets Left', value: wicketsLeft, setValue: setWicketsLeft },
      { label: 'Current Run Rate', value: currentRunRate, setValue: setCurrentRunRate, step: '0.01' },
      { label: 'Required Run Rate', value: requiredRunRate, setValue: setRequiredRunRate, step: '0.01' },
      { label: 'Target', value: target, setValue: setTarget },
    ].map(({ label, value, setValue, step }, idx) => (
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
        onClick={handleSavePrediction}
        disabled={!result || !userId}
        className={`w-1/2 py-3 ml-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${!result ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Save Prediction 💾
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

export default MatchPrediction;
