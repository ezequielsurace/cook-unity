import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChefsModule } from './chefs/chefs.module';
import { MealsModule } from './meals/meals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './meals/meal.entity';
import { Chef } from './chefs/chef.entity';
import { Review } from './reviews/review.entity';
import { User } from './users/user.entity';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/customer.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Chef, Meal, Review, User, Customer],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ChefsModule,
    MealsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
