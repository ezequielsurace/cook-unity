import { Body, Controller, Get, Param, Post, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ChefGuard } from '../common/guards/chef.guard';
import { MealsService } from '../meals/meals.service';
import { ChefsService } from './chefs.service';
import { CreateChefDto } from './dtos/create-chef.dto';

@ApiTags('chefs')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('chefs')
export class ChefsController {
  constructor(
    private chefsService: ChefsService,
    private mealsService: MealsService,
  ) {}

  @Public()
  @Post()
  async create(@Body() createChefDto: CreateChefDto) {
    return await this.chefsService.create(createChefDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.chefsService.findOne(id);
  }

  @UseGuards(ChefGuard)
  @Get(':id/meals')
  async meals(@Request() request, @Param('id') id: number) {
    if(request.user.id != id) throw new ForbiddenException();

    const query = {
      chefId: id,
    };
    return await this.mealsService.findAll(query);
  }
}
