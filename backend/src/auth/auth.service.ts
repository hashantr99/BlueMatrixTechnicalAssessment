import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
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

    return {
      access_token: jwt.sign(payload, jwtSecret, { expiresIn: '60m' }),
    };
  }
}
