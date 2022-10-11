import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { chefDummyData } from './stub/chef';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from '../src/chefs/chef.entity';
import { Meal } from '../src/meals/meal.entity';
import { Review } from '../src/reviews/review.entity';
import { User } from '../src/users/user.entity';
import { Customer } from '../src/customers/customer.entity';
import { v4 as uuid } from 'uuid';
import { mealDummyData } from './stub/meal';
import { customerDummyData } from './stub/customer';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE_TEST,
          entities: [Chef, Meal, Review, User, Customer],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('signup as a new chef, logging in the app and create a meal', async () => {
    const username = chefDummyData.createChefDto.username + '-' + uuid();
    chefDummyData.createChefDto.username = username;

    const response = await request(app.getHttpServer())
      .post('/chefs')
      .send(chefDummyData.createChefDto)
      .expect(201);

    const { id } = response.body;

    chefDummyData.loginChefDto.username = username;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(chefDummyData.loginChefDto)
      .expect(201);

    const { accessToken } = loginResponse.body;

    mealDummyData.createMealDto.chefId = id;

    await request(app.getHttpServer())
      .post('/meals')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(mealDummyData.createMealDto)
      .expect(201);
  });

  it('signup as a new customer, logging in the app and get all meals', async () => {
    const username =
      customerDummyData.createCustomerDto.username + '-' + uuid();
    customerDummyData.createCustomerDto.username = username;

    await request(app.getHttpServer())
      .post('/customers')
      .send(customerDummyData.createCustomerDto)
      .expect(201);

    customerDummyData.loginCustomerDto.username = username;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(customerDummyData.loginCustomerDto)
      .expect(201);

    const { accessToken } = loginResponse.body;

    await request(app.getHttpServer())
      .get('/meals')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
