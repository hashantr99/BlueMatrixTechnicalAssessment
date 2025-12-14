import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [JwtModule, AuthModule], // import JwtModule to make JwtService availabl
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard, // apply the JWT Guard globally
    // },
  ],
})
export class CategoriesModule {}
