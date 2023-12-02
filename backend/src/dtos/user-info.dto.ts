import { IsString, IsNotEmpty } from 'class-validator';

export class UserInfo {
  @IsString()
  @IsNotEmpty()
  id: string;

  tags: string[];
}
