import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from '../chefs/chef.entity';
import { ChefsService } from '../chefs/chefs.service';
import { Meal } from './meal.entity';
import { MealsService } from './meals.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('MealsService', () => {
  let service: MealsService;
  let mealRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        ChefsService,
        { provide: getRepositoryToken(Meal), useValue: createMockRepository() },
        { provide: getRepositoryToken(Chef), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<MealsService>(MealsService);
    mealRepository = module.get<MockRepository>(getRepositoryToken(Meal));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when meal with ID exists', () => {
      it('should return the meal object', async () => {
        const mealId = 1;
        const expectedMeal = {};

        mealRepository.findOne.mockReturnValue(expectedMeal);

        const meal = await service.findOne(mealId);

        expect(meal).toEqual(expectedMeal);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException', async () => {
        const mealId = 1;

        mealRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(mealId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Meal ${mealId} not found`);
        }
      });
    });
  });
});
