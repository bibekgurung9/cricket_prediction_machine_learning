import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard/jwt-guard.guard';
import { User } from 'src/entities/user.entity';
import { PredictMatchDto } from './dto/predict-match.dto';
import { Team } from 'src/common/enums/team.enum';
import { City } from 'src/common/enums/city.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile') 
  async getUserData(@Req() request: Request) {
    const user = request.user as User;

    if (!user || !user.id) {
      throw new Error('User not found');
    }

    const userData = await this.userService.findOne(user.id);

    if (!userData) {
      throw new Error('User not found');
    }

    return userData;
  }

  @Post('predict-winner')
  async predictMatchOutcome(  
  @Body('battingTeam') battingTeam: Team,
  @Body('bowlingTeam') bowlingTeam: Team,
  @Body('city') city: City,
  @Body('runsLeft') runsLeft: number,
  @Body('ballsLeft') ballsLeft: number,
  @Body('wicketsLeft') wicketsLeft: number,
  @Body('currentRunRate') currentRunRate: number,
  @Body('requiredRunRate') requiredRunRate: number,
  @Body('target') target: number){
  const matchData: PredictMatchDto = {
    battingTeam,
    bowlingTeam,
    city,
    runsLeft,
    ballsLeft,
    wicketsLeft,
    currentRunRate,
    requiredRunRate,
    target
  }
  return await this.userService.getWinnerPrediction(matchData);
  }
}
