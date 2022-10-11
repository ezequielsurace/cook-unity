import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userssRepository: Repository<User>,
  ) {}

  async findOne(username: string) {
    return this.userssRepository.findOneBy({ username: username });
  }
}
