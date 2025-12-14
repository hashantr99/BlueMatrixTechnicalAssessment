import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [JwtModule, AuthModule], // import JwtModule to make JwtService availabl
  controllers: [PostsController],
  providers: [
    PostsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard, // Apply the JWT Guard globally
    // },
  ],
})
export class PostsModule {}
