/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { UserInfo } from 'src/dtos/user-info.dto';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    // Connect to your Redis server
    this.redisClient = new Redis({
      host: 'localhost', // Replace with your Redis server host
      port: 6379, // Replace with your Redis server port
    });
  }

  async storeUserInfo(id: string, userInfo: UserInfo): Promise<void> {
    const key = `user:${id}`;
    const value = JSON.stringify(userInfo);
    console.log('save Value', value);
    // Store user information in Redis with an expiration time (optional)
    await this.redisClient.set(key, value, 'EX', 3600); // Expires in 1 hour (adjust as needed)
  }

  async getUserInfo(id: string): Promise<any | undefined> {
    const key = `user:${id}`;
    const value = await this.redisClient.get(key);

    return value ? JSON.parse(value) : undefined;
  }

  async getAllUsersInfo(): Promise<any[]> {
    // Fetch all keys with the prefix 'user:'
    const userKeys = await this.redisClient.keys('user:*');
    console.log(userKeys);
    // Fetch data for each user key
    const usersData = await Promise.all(
      userKeys.map(async (key) => {
        const u = await this.redisClient.get(key);
        console.log({ u });
        if (u) {
          return JSON.parse(u);
        }
      }),
    );

    console.log(usersData?.filter((item) => item));

    return usersData?.filter((item) => item);
  }

  async removeUserInfo(id: string): Promise<void> {
    const key = `user:${id}`;
    await this.redisClient.del(key);
  }
}
