import { Module } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { ChefsController } from './chefs.controller';
import { Chef } from './chef.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsService } from '../meals/meals.service';
import { Meal } from '../meals/meal.entity';

@Module({
  exports: [ChefsService],
  imports: [TypeOrmModule.forFeature([Chef, Meal])],
  providers: [ChefsService, MealsService],
  controllers: [ChefsController],
})
export class ChefsModule {}
