import { Customer } from '../customers/customer.entity';
import { Meal } from '../meals/meal.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stars: number;

  @Column()
  comment: string;

  @Exclude()
  @Column()
  mealId: number;

  @Exclude()
  @Column()
  customerId: number;

  @ManyToOne(() => Meal, (meal) => meal.reviews, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mealId' })
  meal: Meal;

  @ManyToOne(() => Customer, (customer) => customer.reviews, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
