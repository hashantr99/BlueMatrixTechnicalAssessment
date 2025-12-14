'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSinglePost } from '../../services/api';
import { Post } from '../../types/post';

const PostPage = () => {
  const params = useParams();
  const id = params.id; // id comes as string

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchSinglePost(Number(id));
        setPost(data);
      };
      fetchData();
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
      <img
        src={post.image_url}
        alt={post.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
