import { Team, City } from "./enum";

export interface UserType{
    id: number;
    firstName : string;
    lastName: string;
    avatarUrl: string;
    hashedRefreshToken: string;
}

export interface MatchPredictionType {
    battingTeam: Team | "";
    bowlingTeam: Team | "";
    city: City | "";
    runsLeft: number;
    ballsLeft: number;
    wicketsLeft: number;
    currentRunRate: number;
    requiredRunRate: number;
    target: number;
}

export interface ResultType {
    team1: string;
    team2: string;
    probability1: number; 
    probability2: number;
}

export interface PredictMatchType {
    id: number;
    battingTeam: Team; // Assuming Team is an enum for teams like 'Royal Challengers Bangalore'
    bowlingTeam: Team; // Assuming Team is an enum for teams like 'Sunrisers Hyderabad'
    city: City; // Assuming City is an enum for city names like 'Kolkata'
    runsLeft: number;
    ballsLeft: number;
    wicketsLeft: number;
    currentRunRate: number;
    requiredRunRate: number;
    target: number;
    matchDate: string; // The date of the match
    isPrediction: boolean; // Flag to check if this is a prediction
    team1WinProbability: number; // Probability of team 1 winning
    team2WinProbability: number; // Probability of team 2 winning
  }