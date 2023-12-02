import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserInfo } from './dtos/user-info.dto';
import { UserService } from './services/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserInfo(@Query('id') id: string): Promise<UserInfo> {
    return await this.userService.getUserInfo(id);
  }

  @Get('/all')
  async getAllUserInfo(): Promise<UserInfo[]> {
    return await this.userService.getAllUserInfo();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async setUserInfo(@Body() userInfo: UserInfo): Promise<void> {
    return await this.userService.saveUserInfo(userInfo);
  }
}
