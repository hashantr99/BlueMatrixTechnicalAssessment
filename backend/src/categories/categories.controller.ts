import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard'; // Import the JWT guard

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // create a new category
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body() body: { name: string }) {
    return this.categoriesService.createCategory(body.name);
  }

  // get all categories
  // protect this route with JWT Auth Guard
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  // get category by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return this.categoriesService.getCategory(id);
  }

  // update a category
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: { name: string },
  ) {
    return this.categoriesService.updateCategory(id, body.name);
  }

  // delete a category
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
