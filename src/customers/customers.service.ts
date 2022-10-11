import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRespository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = this.customerRespository.create(createCustomerDto);

    await this.customerRespository.save(newCustomer);

    return newCustomer;
  }

  async findOne(id: number) {
    return await this.customerRespository.findOneBy({ id: id });
  }
}
