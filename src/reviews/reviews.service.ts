import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Review } from './review.entity';
import { MealsService } from '../meals/meals.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class ReviewsService {
  constructor(
    private mealsService: MealsService,
    private customersService: CustomersService,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(mealId: number, createReviewDto: CreateReviewDto) {
    const customerId = createReviewDto.customerId;

    const [meal, customer] = await Promise.all([
      this.mealsService.findOne(mealId),
      this.customersService.findOne(customerId),
    ]);

    if (!meal) throw new NotFoundException(`Meal ${mealId} not found`);

    if (!customer)
      throw new NotFoundException(`Customer ${customerId} not found`);

    const existingReview = await this.reviewRepository.findOne({
      where: { mealId: meal.id, customerId: customer.id },
    });

    if (existingReview)
      throw new ConflictException(
        `Customer ${customerId} already rate meal ${mealId}`,
      );

    const review = this.reviewRepository.create(createReviewDto);
    review.meal = meal;
    review.customer = customer;
    await this.reviewRepository.save(review);

    const avg = await this.getAvg(mealId);

    await this.mealsService.updateRating(meal, avg.rating);

    return review;
  }

  private getAvg(mealId) {
    return this.reviewRepository
      .createQueryBuilder()
      .select('AVG(stars)', 'rating')
      .where('mealId = :mealId', { mealId })
      .getRawOne();
  }
}
