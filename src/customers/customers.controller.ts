import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@ApiTags('customers')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Public()
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto);
  }
}
