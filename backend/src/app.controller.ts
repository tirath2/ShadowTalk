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
export class AppController {}
