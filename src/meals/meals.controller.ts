import {
    Body,
    Get,
    Controller,
    Param,
    Post,
    Query,
    UseGuards,
    Request,
    ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChefGuard } from '../common/guards/chef.guard';
import { CustomerGuard } from '../common/guards/customer.guard';
import { CreateReviewDto } from '../reviews/dtos/create-review.dto';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateMealDto } from './dtos/create-meal.dto';
import { MealsService } from './meals.service';

@ApiTags('meals')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('meals')
export class MealsController {
    constructor(
        private mealsService: MealsService,
        private reviewService: ReviewsService,
    ) { }

    @UseGuards(ChefGuard)
    @Post()
    async create(@Request() request, @Body() createMealDto: CreateMealDto) {
        if (request.user.id != createMealDto.chefId) throw new ForbiddenException();

        return await this.mealsService.create(createMealDto);
    }

    @ApiQuery({ name: 'chefId', type: 'number', required: false })
    @ApiQuery({ name: 'page', type: 'number', required: false })
    @ApiQuery({ name: 'limit', type: 'number', required: false })
    @UseGuards(CustomerGuard)
    @Get()
    async findAll(@Query() query?: any) {
        return await this.mealsService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.mealsService.findOne(id);
    }

    @UseGuards(CustomerGuard)
    @Post(':id/rate')
    async rate(
        @Param('id') id: number,
        @Body() createReviewDto: CreateReviewDto,
    ) {
        return await this.reviewService.create(id, createReviewDto);
    }
}
