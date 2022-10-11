import { IsString, IsIn, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsIn([1, 2, 3, 4, 5])
  stars: number;

  @IsString()
  comment: string;

  @IsNumber()
  customerId: number;
}
