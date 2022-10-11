import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Chef } from '../chefs/chef.entity';
import { ChefsService } from '../chefs/chefs.service';
import { Customer } from '../customers/customer.entity';
import { CustomersService } from '../customers/customers.service';
import { Review } from '../reviews/review.entity';
import { ReviewsService } from '../reviews/reviews.service';
import { Meal } from './meal.entity';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  exports: [MealsService],
  imports: [TypeOrmModule.forFeature([Meal, Chef, Review, Customer])],
  controllers: [MealsController],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
    MealsService,
    ChefsService,
    ReviewsService,
    CustomersService,
  ],
})
export class MealsModule {}
