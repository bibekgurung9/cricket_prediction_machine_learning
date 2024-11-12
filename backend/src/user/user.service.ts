import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PythonShell } from 'python-shell';
import { PredictMatchDto } from './dto/predict-match.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

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
}
