/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/dtos/user-info.dto';
import { RedisService } from './redis.service';

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
}
