import {
  Controller,
  ValidationPipe,
  UsePipes,
  Post,
  Body,
  Query,
  Get,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/dtos/response.dto';
import { SaveAnswerDto } from 'src/dtos/save-answer.dto';
import { UserInfo } from 'src/dtos/user-info.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserInfo(@Query('id') id: string): Promise<any> {
    try {
      const data = await this.userService.getUserInfo(id);
      return ResponseDto.success<UserInfo>(
        'user fetched successfully',
        HttpStatus.OK,
        data,
      );
    } catch (error) {
      throw new HttpException(
        ResponseDto.failure<string>(
          'Unable fetch User',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        ),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/all')
  async getAllUserInfo() {
    try {
      const data = await this.userService.getAllUserInfo();
      return ResponseDto.success<any>(
        'user fetched  successfully',
        HttpStatus.OK,
        data,
      );
    } catch (error) {
      throw new HttpException(
        ResponseDto.failure<string>(
          'Unable fetch User',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        ),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async setUserInfo(@Body() userInfo: UserInfo) {
    try {
      const data = await this.userService.saveUserInfo(userInfo);
      return ResponseDto.success<any>(
        'user saved  successfully',
        HttpStatus.OK,
        data,
      );
    } catch (error) {
      throw new HttpException(
        ResponseDto.failure<string>(
          'Unable save User',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        ),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('get-connection')
  @UsePipes(ValidationPipe)
  async getConnection(@Body() userInfo: UserInfo) {
    try {
      const data = await this.userService.getConnection(userInfo);
      return ResponseDto.success<any>(
        'user get connection  successfully',
        HttpStatus.OK,
        data,
      );
    } catch (error) {
      throw new HttpException(
        ResponseDto.failure<string>(
          'Unable get connection User',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        ),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('save-answer')
  @UsePipes(ValidationPipe)
  async saveAns(@Body() saveAns: SaveAnswerDto) {
    try {
      const data = await this.userService.saveAnswer(saveAns);
      return ResponseDto.success<any>(
        'user get answer  successfully',
        HttpStatus.OK,
        data,
      );
    } catch (error) {
      throw new HttpException(
        ResponseDto.failure<string>(
          'Unable get answer User',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        ),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  async deleteUserInfo(@Query('id') id: string) {
    try {
      const data = await this.userService.deleteUserInfo(id);
      return ResponseDto.success<any>(
        'user deleted  successfully',
        HttpStatus.OK,
        data,
      );
    } catch (error) {
      throw new HttpException(
        ResponseDto.failure<string>(
          'Unable deleted User',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        ),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
