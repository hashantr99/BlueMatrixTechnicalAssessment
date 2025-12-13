import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  async createUser(email: string, password: string) {
    const hashedPassword = await hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO Users (email, password) VALUES (?, ?)',
      [email, hashedPassword],
    );
    return result;
  }

  async findByEmail(email: string) {
    const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [
      email,
    ]);
    return rows[0];
  }
}
