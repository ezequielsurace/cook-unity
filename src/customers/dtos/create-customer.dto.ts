import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;
}
