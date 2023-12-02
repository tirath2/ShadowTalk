import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { RedisService } from './services/redis.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [UserController, AppController],
  providers: [UserService, RedisService, AppService],
})
export class AppModule {}
