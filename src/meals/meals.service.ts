import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChefsService } from '../chefs/chefs.service';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dtos/create-meal.dto';
import { Meal } from './meal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    private chefsService: ChefsService,
  ) {}

  async create(createMealDto: CreateMealDto) {
    const chefId = createMealDto.chefId;

    const chef = await this.chefsService.findOne(chefId);

    if (!chef) throw new NotFoundException(`Chef ${chefId} not found`);

    const newMeal = this.mealRepository.create(createMealDto);

    newMeal.chef = chef;

    await this.mealRepository.save(newMeal);

    return newMeal;
  }

  async findOne(id: number): Promise<Meal> {
    const meal = await this.mealRepository.findOne({ where: { id: id } });

    if (!meal) throw new NotFoundException(`Meal ${id} not found`);

    return meal;
  }

  async findAll(query?: any): Promise<Meal[]> {
    return this.mealRepository.find({
      skip: query.page * query.limit || 0,
      take: query.limit || 10,
      order: { id: 'ASC' },
      relations: {
        chef: true,
      },
      where: {
        chef: {
          id: query.chefId,
        },
      },
    });
  }

  async updateRating(meal: Meal, rating: number) {
    meal.rating = rating;

    await this.mealRepository.save(meal);
  }
}
