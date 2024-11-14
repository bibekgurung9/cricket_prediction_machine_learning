import React from 'react';
import { useRouter } from 'next/navigation';
import { PredictMatchType } from '@/constants/interfaces';

interface MatchesListProps {
  matches: PredictMatchType[];
}

const MatchesList = ({ matches } : MatchesListProps) => {
  const router = useRouter();

  const handleMatchClick = (matchId: number) => {
    router.push(`/predict-match/${matchId}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white text-center">Match Histories:</h2>
      <ul className="space-y-2 mt-4">
        {matches.length > 0 ? (
          matches.map((match) => (
            <li
              key={match.id}
              className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => handleMatchClick(match.id)}
            >
              Match between {match.battingTeam} vs {match.bowlingTeam} - {match.city}
            </li>
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </ul>
    </div>
  );
};

export default MatchesList;
