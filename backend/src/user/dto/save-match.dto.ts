// src/user/dto/save-match.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class SaveMatchDto {
  @IsString()
  @IsNotEmpty()
  battingTeam: string;

  @IsString()
  @IsNotEmpty()
  bowlingTeam: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  runsLeft: number;

  @IsNumber()
  ballsLeft: number;

  @IsNumber()
  wicketsLeft: number;

  @IsNumber()
  currentRunRate: number;

  @IsNumber()
  requiredRunRate: number;

  @IsNumber()
  target: number;

  @IsNumber()
  team1WinProbability: number;

  @IsNumber()
  team2WinProbability: number;
}
