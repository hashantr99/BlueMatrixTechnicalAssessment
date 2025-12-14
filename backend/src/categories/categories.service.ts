import { Injectable } from '@nestjs/common';
import { db } from 'src/db';

@Injectable()
export class CategoriesService {
  // create a new category
  async createCategory(name: string) {
    const [result] = await db.execute(
      'INSERT INTO Categories (name) VALUES (?)',
      [name],
    );
    return result;
  }

  // get all categories
  async getAllCategories() {
    const [rows] = await db.execute('SELECT * FROM Categories');
    return rows;
  }

  // get a category by ID
  async getCategory(id: number) {
    const [rows] = await db.execute(
      'SELECT * FROM Categories WHERE category_id = ?',
      [id],
    );
    return rows[0]; // return the first category if found
  }

  // update a category
  async updateCategory(id: number, name: string) {
    const [result] = await db.execute(
      'UPDATE Categories SET name = ? WHERE category_id = ?',
      [name, id],
    );
    return result;
  }

  // delete a category
  async deleteCategory(id: number) {
    const [result] = await db.execute(
      'DELETE FROM Categories WHERE category_id = ?',
      [id],
    );
    return result;
  }
}
