/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/dtos/user-info.dto';
import { RedisService } from './redis.service';
import { ConnectionStatus } from 'src/enums/connection-status.enum';
import { SaveAnswerDto } from 'src/dtos/save-answer.dto';

@Injectable()
export class UserService {
  constructor(private readonly redisService: RedisService) {}

  async saveUserInfo(userInfo: UserInfo) {
    return await this.redisService.storeUserInfo(userInfo.id, userInfo);
  }

  async getUserInfo(id: string) {
    return await this.redisService.getUserInfo(id);
  }

  async getAllUserInfo() {
    return await this.redisService.getAllUsersInfo();
  }

  async deleteUserInfo(id: string) {
    return await this.redisService.removeUserInfo(id);
  }

  async getConnection(userInfo: UserInfo) {
    const ifUserExist = await this.getUserInfo(userInfo.id);
    if (ifUserExist && ifUserExist?.status == ConnectionStatus.ONGOING) {
      if (ifUserExist?.answer) {
        return ifUserExist;
      } else {
        null;
      }
    }
    const allUserInfo = await this.redisService.getAllUsersInfo();
    for (let i = 0; i < allUserInfo.length; i++) {
      const user = allUserInfo[i];
      if (user.id != userInfo.id && user.status !== ConnectionStatus.ONGOING) {
        user.remoteOffer = userInfo.offer;
        user.status = ConnectionStatus.ONGOING;
        await this.saveUserInfo(user);
        return user;
      }
    }
    await this.saveUserInfo(userInfo);
    return null;
  }

  async saveAnswer(answerDto: SaveAnswerDto) {
    const ifUserExist = await this.getUserInfo(answerDto.remoteUserId);
    if (ifUserExist) {
      await this.saveUserInfo({ ...ifUserExist, answer: answerDto.answer });
    }
  }
}
