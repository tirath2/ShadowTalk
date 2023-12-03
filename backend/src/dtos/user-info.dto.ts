import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ConnectionStatus } from 'src/enums/connection-status.enum';

export class UserInfo {
  @IsString()
  @IsNotEmpty()
  id: string;

  tags: string[];

  @IsString()
  offer: string;

  @IsString()
  @IsOptional()
  answer: string;

  @IsOptional()
  @IsString()
  remoteOffer: string;

  @IsOptional()
  status: ConnectionStatus;
}
