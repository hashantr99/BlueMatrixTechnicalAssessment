import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // create a new post
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body()
    body: {
      title: string;
      content: string;
      imageUrl: string;
      categoryId: number;
      userId: number;
      status?: string; // defaults to 'Draft' if not provided
    },
  ) {
    return this.postsService.createPost(
      body.title,
      body.content,
      body.imageUrl,
      body.categoryId,
      body.userId,
      body.status || 'Draft', // set default status if not provided
    );
  }

  // get all posts
  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  // get post by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.postsService.getPost(id);
  }

  // update a post
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body()
    body: {
      title: string;
      content: string;
      imageUrl: string;
      categoryId: number;
      status: string; // status should be included for updates
    },
  ) {
    return this.postsService.updatePost(
      id,
      body.title,
      body.content,
      body.imageUrl,
      body.categoryId,
      body.status,
    );
  }

  // delete a post
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }

  @Get()
  async getAllPostsByStatus(@Query('status') status?: string) {
    if (status) {
      return this.postsService.getPostsByStatus(status);
    }
    return this.postsService.getAllPosts();
  }
}
