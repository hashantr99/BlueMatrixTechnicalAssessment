'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSinglePost, updatePost } from './../../services/api'; 
import { Post } from './../../types/post';  

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;  
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);  

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchSinglePost(Number(id));
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
        setCategoryId(data.category_id);
      };
      fetchData();  
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedPost = { title, content, imageUrl, categoryId };
      await updatePost(Number(id), updatedPost);  
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
          <option value={1}>Category 1</option>
          <option value={2}>Category 2</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
