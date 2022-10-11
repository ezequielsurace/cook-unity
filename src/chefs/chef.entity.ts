import { Meal } from '../meals/meal.entity';
import { User } from '../users/user.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Chef extends User {
  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToMany(() => Meal, (meals) => meals.chef)
  meals: Meal[];
}
