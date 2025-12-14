import { Injectable } from '@nestjs/common';
import { db } from 'src/db';

@Injectable()
export class PostsService {
  // create a new post
  async createPost(
    title: string,
    content: string,
    imageUrl: string,
    categoryId: number,
    userId: number,
    status: string = 'Draft', // default status is 'Draft'
  ) {
    const [result] = await db.execute(
      'INSERT INTO Posts (title, content, image_url, category_id, user_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, content, imageUrl, categoryId, userId, status],
    );
    return result;
  }

  // get all posts
  async getAllPosts() {
    const [rows] = await db.execute('SELECT * FROM Posts');
    return rows;
  }

  // get a post by ID
  async getPost(id: number) {
    const [rows] = await db.execute('SELECT * FROM Posts WHERE post_id = ?', [id]);
    return rows[0];
  }

  // update a post
  async updatePost(
    id: number,
    title: string,
    content: string,
    imageUrl: string,
    categoryId: number,
    status: string, // allow updating the status
  ) {
    const [result] = await db.execute(
      'UPDATE Posts SET title = ?, content = ?, image_url = ?, category_id = ?, status = ? WHERE post_id = ?',
      [title, content, imageUrl, categoryId, status, id],
    );
    return result;
  }

  // delete a post
  async deletePost(id: number) {
    const [result] = await db.execute('DELETE FROM Posts WHERE post_id = ?', [id]);
    return result;
  }

  async getPostsByStatus(status: string) {
    const [rows] = await db.execute('SELECT * FROM Posts WHERE status = ?', [
      status,
    ]);
    return rows;
  }
}
