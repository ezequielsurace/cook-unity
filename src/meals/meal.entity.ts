import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Chef } from '../chefs/chef.entity';
import { Review } from '../reviews/review.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  rating: number;

  @ManyToOne(() => Chef, (chef) => chef.meals, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chefId' })
  chef: Chef;

  @OneToMany(() => Review, (reviews) => reviews.meal)
  reviews: Review[];
}
