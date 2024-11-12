"use client";
import { predictMatch } from '@/actions/predict';
import { Team, City } from '@/constants/enum';
import { ResultType } from '@/constants/interfaces';
import React, { useState } from 'react';

const MatchPrediction = () => {
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
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const result = await predictMatch(matchData);
      console.log(result);
      if (result.error) {
        setServerError(result.error);
      } else {
        setResult(result); 
      }
    } catch {
      setServerError('Error predicting winner. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Predict Cricket Match Winner 🏏</h1>

      {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}

      <div>
        <form 
          onSubmit={handleSubmit} 
          className={`grid grid-cols-2 gap-2 ${loading ? 'blur-sm pointer-events-none' : ''}`}
        >
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
          <div className="flex flex-col">
            <label className="block text-lg font-medium text-gray-700 mb-2">Runs Left:</label>
            <input 
              type="number" 
              value={runsLeft} 
              onChange={(e) => setRunsLeft(Number(e.target.value) || '')} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-lg font-medium text-gray-700 mb-2">Balls Left:</label>
            <input 
              type="number" 
              value={ballsLeft} 
              onChange={(e) => setBallsLeft(Number(e.target.value) || '')} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-lg font-medium text-gray-700 mb-2">Wickets Left:</label>
            <input 
              type="number" 
              value={wicketsLeft} 
              onChange={(e) => setWicketsLeft(Number(e.target.value) || '')} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-lg font-medium text-gray-700 mb-2">Current Run Rate:</label>
            <input 
              type="number" 
              step="0.01" 
              value={currentRunRate} 
              onChange={(e) => setCurrentRunRate(Number(e.target.value) || '')} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-lg font-medium text-gray-700 mb-2">Required Run Rate:</label>
            <input 
              type="number" 
              step="0.01" 
              value={requiredRunRate} 
              onChange={(e) => setRequiredRunRate(Number(e.target.value) || '')} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-lg font-medium text-gray-700 mb-2">Target:</label>
            <input 
              type="number" 
              value={target} 
              onChange={(e) => setTarget(Number(e.target.value) || '')} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="col-span-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Predicting...' : 'Predict Winner 🎯'}
            </button>
          </div>
        </form>
      </div>

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
