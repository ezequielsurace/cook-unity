import { IsString, IsNumber } from 'class-validator';

export class CreateMealDto {
  @IsString()
  name: string;

  @IsNumber()
  chefId: number;
}
