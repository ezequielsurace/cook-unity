import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from './chef.entity';
import { CreateChefDto } from './dtos/create-chef.dto';

@Injectable()
export class ChefsService {
  constructor(
    @InjectRepository(Chef)
    private chefRepository: Repository<Chef>,
  ) {}

  async create(createChefDto: CreateChefDto) {
    const newChef = this.chefRepository.create(createChefDto);

    await this.chefRepository.save(newChef);

    return newChef;
  }

  async findOne(id: number) {
    return await this.chefRepository.findOneBy({ id: id });
  }
}
