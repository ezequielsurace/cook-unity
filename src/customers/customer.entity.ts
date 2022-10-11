import { Review } from '../reviews/review.entity';
import { User } from '../users/user.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Customer extends User {
  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToMany(() => Review, (reviews) => reviews.customer)
  reviews: Review[];
}
