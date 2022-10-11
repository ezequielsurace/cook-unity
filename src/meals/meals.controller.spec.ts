import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../reviews/reviews.service';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { mealDummyData } from '../../test/stub/meal';
import { reviewDummyData } from '../../test/stub/review';

describe('MealsController', () => {
  let controller: MealsController;

  const mockMealsService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        name: dto.name,
        chef: {
          id: dto.chefId,
          name: 'Dabiz',
          surname: 'Muñoz',
        },
        rating: '0.00',
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: 1,
          name: 'Chicken Sawarma',
          chef: {
            id: 1,
            name: 'Dabiz',
            surname: 'Muñoz',
          },
          rating: '0.00',
        },
      ];
    }),
  };

  const mockReviewsService = {
    create: jest.fn((id, dto) => {
      return {
        stars: dto.stars,
        comment: dto.comment,
        customerId: dto.customerId,
        meal: {
          id: id,
          name: 'Chicken Sawarma',
          rating: '5.00',
        },
        customer: {
          id: dto.customerId,
          username: 'Ezequiiel7',
          password: '123456',
          name: 'Ezequiel',
          surname: 'Surace',
        },
        mealId: id,
        id: 1,
      };
    }),
  };

  const mockBody = {
    user: {
      id: 1
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealsController],
      providers: [MealsService, ReviewsService],
    })
      .overrideProvider(MealsService)
      .useValue(mockMealsService)
      .overrideProvider(ReviewsService)
      .useValue(mockReviewsService)
      .compile();

    controller = module.get<MealsController>(MealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should create a meal', async () => {
      expect(await controller.findAll()).toEqual([mealDummyData.meal]);

      expect(mockMealsService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a meal', async () => {
      expect(await controller.create(mockBody, mealDummyData.createMealDto)).toEqual(
        mealDummyData.meal,
      );

      expect(mockMealsService.create).toHaveBeenCalled();
    });
  });

  it('should create a review', async () => {
    expect(await controller.rate(1, reviewDummyData.createReviewDto)).toEqual(
      reviewDummyData.review,
    );

    expect(mockReviewsService.create).toHaveBeenCalled();
  });
});
