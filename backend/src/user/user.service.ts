import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PythonShell } from 'python-shell';
import { PredictMatchDto } from './dto/predict-match.dto';
import { Match } from 'src/entities/matches.entity';

@Injectable()
export class UserService {
  private readonly MATCH_LIMIT = 5;
  constructor(
    @InjectRepository(User) private UserRepo: Repository<User>,
    @InjectRepository(Match) private MatchRepo: Repository<Match>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(user);
  }

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.UserRepo.update({ id: userId }, { hashedRefreshToken });
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({
      where: {
        email,
      },
    });
  }

  async findOne(id: number) {
    return this.UserRepo.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'lastName',
        'avatarUrl',
        'hashedRefreshToken',
      ],
    });
  }

  async getWinnerPrediction(data: PredictMatchDto): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
          scriptPath: './',  
          args: [JSON.stringify(data)]  
      };

    PythonShell.run('app.py', options).then(result => {
      try {
          const prediction = JSON.parse(result[0]);
          resolve(prediction);
      } catch (error) {
          reject('Failed to parse prediction result');
      }
    }).catch(err => {
        reject(err);
    });
    });
  }

  async saveUserPrediction(userId: number, matchData: Partial<Match>): Promise<any> {
    const user = await this.UserRepo.findOne({
      where: { id: userId },
      relations: ['matches'],
    });
  
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    const existingPrediction = await this.MatchRepo.findOne({
      where: {
        user: { id: userId },
        battingTeam: matchData.battingTeam,
        bowlingTeam: matchData.bowlingTeam,
        city: matchData.city,
        target: matchData.target,
        runsLeft: matchData.runsLeft,
        ballsLeft: matchData.ballsLeft,
        wicketsLeft: matchData.wicketsLeft,
        currentRunRate: matchData.currentRunRate,
        requiredRunRate: matchData.requiredRunRate,
      },
    });

    if (existingPrediction) {
      throw new BadRequestException('You have already made a prediction for this match.');
    }
  
    const predictionCount = user.matches.filter((match) => match.isPrediction).length;
    if (predictionCount >= this.MATCH_LIMIT) {
      throw new BadRequestException('You can only save up to 5 match predictions');
    }
  
    const newPrediction = this.MatchRepo.create({
      ...matchData,
      isPrediction: true, 
      user,
    });

    const savedPrediction = await this.MatchRepo.save(newPrediction);
    return {
      message: "Match saved successfully!",
      matchData: savedPrediction
    };
}
  

  async getPastMatchPredictions(userId: number): Promise<Match[]> {
    return this.MatchRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async getMatchPredictionData(userId: number, matchId: number): Promise<Match | null> {
    return this.MatchRepo.findOne({
      where: {
        id: matchId,
        user: { id: userId },
      },
      relations: ['user'],
    });
  }

  async deleteMatchPrediction(userId: number, matchId: number): Promise<{ success: boolean; message: string }> {
    const match = await this.MatchRepo.findOne({
      where: {
        id: matchId,
        user: { id: userId },
      },
    });
  
    if (!match) {
      return { success: false, message: "Match not found or does not belong to the user." };
    }
  
    try {
      await this.MatchRepo.remove(match);
      return { success: true, message: "Match deleted successfully." };
    } catch (error) {
      console.error("Error deleting match:", error);
      return { success: false, message: "Failed to delete match. Please try again later." };
    }
  }
}
