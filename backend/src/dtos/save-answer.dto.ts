import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SaveAnswerDto {
  @IsString()
  @IsNotEmpty()
  remoteUserId: string;

  @IsString()
  @IsOptional()
  answer: string;
}
