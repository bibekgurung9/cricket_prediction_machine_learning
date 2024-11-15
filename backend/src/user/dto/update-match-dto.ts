import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { City } from 'src/common/enums/city.enum';
import { Team } from 'src/common/enums/team.enum';

export class UpdateMatchDto {
    @IsEnum(Team)
    battingTeam?: Team;
    @IsEnum(Team)
    bowlingTeam?: Team;

    @IsEnum(City)
    @IsOptional()
    city?: City;

    @IsNumber()
    @IsOptional()
    runsLeft?: number;

    @IsNumber()
    @IsOptional()
    ballsLeft?: number;

    @IsNumber()
    @IsOptional()
    wicketsLeft?: number;

    @IsNumber()
    @IsOptional()
    currentRunRate?: number;

    @IsNumber()
    @IsOptional()
    requiredRunRate?: number;

    @IsNumber()
    @IsOptional()
    target?: number;
}
