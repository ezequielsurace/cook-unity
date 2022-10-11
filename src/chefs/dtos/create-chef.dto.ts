import { IsString } from 'class-validator';

export class CreateChefDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;
}
