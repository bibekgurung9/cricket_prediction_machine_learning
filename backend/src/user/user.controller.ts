import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard/jwt-guard.guard';
import { User } from 'src/entities/user.entity';
import { PredictMatchDto } from './dto/predict-match.dto';
import { Team } from 'src/common/enums/team.enum';
import { City } from 'src/common/enums/city.enum';
import { SaveMatchDto } from './dto/save-match.dto';
import { UpdateMatchDto } from './dto/update-match-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
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

  @UseGuards(JwtAuthGuard)
  @Get('/all-matches/:userId')
  async getMatchs(
    @Param('userId') userId: number,
  ){
    return await this.userService.getPastMatchPredictions(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-match/:userId/:matchId')
  async getMatchData(
    @Param('userId') userId: number,
    @Param('matchId') matchId: number,
  ){
    console.log(userId, matchId)
    return await this.userService.getMatchPredictionData(userId, matchId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-match/:userId/:matchId')
  async deleteMatchData(
    @Param('userId') userId: number,
    @Param('matchId') matchId: number,
  ){
    return await this.userService.deleteMatchPrediction(userId, matchId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/predict-match')
  async predictMatchOutcome(
    @Body('battingTeam') battingTeam: Team,
    @Body('bowlingTeam') bowlingTeam: Team,
    @Body('city') city: City,
    @Body('runsLeft') runsLeft: number,
    @Body('ballsLeft') ballsLeft: number,
    @Body('wicketsLeft') wicketsLeft: number,
    @Body('currentRunRate') currentRunRate: number,
    @Body('requiredRunRate') requiredRunRate: number,
    @Body('target') target: number) {
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

  @UseGuards(JwtAuthGuard)
  @Post('/save-prediction/:userId')
  async saveUserPrediction(
    @Param('userId') userId: number,
    @Body('saveMatchData') saveMatchDto: SaveMatchDto,
  ): Promise<any> {
    try {
      return await this.userService.saveUserPrediction(userId, saveMatchDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-prediction/:userId/:matchId')
  async updateUserPrediction(
    @Param('userId') userId: number,
    @Param('matchId') matchId: number,
    @Body() updateMatchDto: UpdateMatchDto,  
  ): Promise<any> {
    try {
      return await this.userService.updateUserPrediction(userId, matchId, updateMatchDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
