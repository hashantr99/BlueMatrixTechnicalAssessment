import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db } from 'src/db';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [
      email,
    ]);
    const user = rows[0];

    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user_id: user.user_id, email: user.email };

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    // return {
    //   access_token: jwt.sign(payload, jwtSecret, { expiresIn: '60m' }),
    // };
    try {
      // use JwtService to sign the JWT token
      const access_token = this.jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: '60m', // expiration time for the token (60 minutes)
      });

      return { access_token };
    } catch (error) {
      throw new HttpException(
        'Error generating JWT token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
