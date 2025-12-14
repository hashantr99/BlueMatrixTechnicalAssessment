import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, // JWT Service to validate the token
    //private readonly reflector: Reflector, // allows access to metadata (eg:- roles)
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Extract token from the Authorization header
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      //throw new Error('No authorization header');
      throw new HttpException(
        'Unauthorized: No token provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
      //throw new Error('No token provided');
      throw new HttpException(
        'Unauthorized: No token provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      // verify the token
      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = user; // attach the user to the request object
      //console.log(user);
      //return true;
      return user;
    } catch (err) {
      //throw new Error('Invalid or expired token');
      throw new HttpException(
        'Unauthorized: Invalid or expired token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
