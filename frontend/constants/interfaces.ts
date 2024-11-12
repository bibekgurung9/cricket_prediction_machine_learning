import { Team, City } from "./enum";

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