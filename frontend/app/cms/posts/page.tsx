
'use client'
import { useState, useEffect } from 'react';
import { fetchPosts, deletePost } from './../../services/api';  
import { Post } from './../../types/post';  
import { useRouter } from 'next/navigation';

const ManagePosts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();  
      setPosts(data);
    };
    fetchData();
  }, []);

  
  const handleDelete = async (id: number) => {
    await deletePost(id);  
    setPosts(posts.filter(post => post.post_id !== id));  
  };

 
  const handleCreatePost = () => {
    router.push('/cms/posts/create');  
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Posts</h1>

      <button
        onClick={handleCreatePost}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
      >
        Create New Post
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.post_id} className="border rounded p-4 shadow-md hover:shadow-lg">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.content.slice(0, 100)}...</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => router.push(`/cms/posts/${post.post_id}`)}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.post_id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;
