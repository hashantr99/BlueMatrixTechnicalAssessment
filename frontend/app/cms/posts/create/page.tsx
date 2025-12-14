'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, fetchCategories } from '../../../services/api'; 
import { Category } from '../../../types/category';  

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1); 
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');
  const [categories, setCategories] = useState<Category[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();  
        setCategories(data);  
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();  
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPost(title, content, imageUrl, categoryId, status); 
      router.push('/cms/posts'); 
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block font-medium mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-medium mb-2">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block font-medium mb-2">Category</label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full p-2 border"
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option>No categories available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block font-medium mb-2">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Draft' | 'Published')}
            className="w-full p-2 border"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
