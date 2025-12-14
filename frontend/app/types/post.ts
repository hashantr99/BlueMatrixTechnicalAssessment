export interface Post {
  post_id: number;
  title: string;
  content: string;
  image_url: string;
  category_id: number;
  user_id: number;
  status: 'Draft' | 'Published';
  created_at: string;
  updated_at: string;
}
