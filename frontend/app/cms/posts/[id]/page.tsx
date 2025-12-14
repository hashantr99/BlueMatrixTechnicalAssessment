'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchCategories, fetchSinglePost, updatePost } from '../../../services/api'; 
import { Post } from '../../../types/post';  
import { Category } from '@/app/types/category';

const EditPost = () => {
  const router = useRouter();
  //const { id } = router.query; 
  const params = useParams();
    const id = params.id; // id comes as string 
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);  
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft'); 
  
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

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchSinglePost(Number(id));
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
        setCategoryId(data.category_id);
        setStatus((data.status) || 'Draft');
      };
      fetchData();  
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedPost = { title, content, imageUrl, categoryId, status, id };
      //await updatePost(Number(id), updatedPost);  
      await updatePost( Number(id), title, content, imageUrl, categoryId, status ); 
      router.push('/cms/posts');  
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 border mb-4"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 border mb-4"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full p-2 border mb-4"
        >
          {/* <option value={1}>Category 1</option>
          <option value={2}>Category 2</option> */}
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

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Draft' | 'Published')}
          className="w-full p-2 border mb-4"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
