import { IsNumber, IsEnum, IsInt } from 'class-validator';
import { City } from 'src/common/enums/city.enum';
import { Team } from 'src/common/enums/team.enum';

export class PredictMatchDto {
    @IsEnum(Team)
    battingTeam: Team;
  
    @IsEnum(Team)
    bowlingTeam: Team;
  
    @IsEnum(City)
    city: City;
  
    @IsInt()
    runsLeft: number;
  
    @IsInt()
    ballsLeft: number;
  
    @IsInt()
    wicketsLeft: number;
  
    @IsNumber()
    currentRunRate: number;
  
    @IsNumber()
    requiredRunRate: number;
  
    @IsInt()
    target: number;
}
