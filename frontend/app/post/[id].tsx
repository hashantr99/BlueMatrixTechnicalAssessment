import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchSinglePost } from './../services/api';
import { Post } from './../types/post';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchSinglePost(Number(id));
        setPost(data);
      }
    };
    fetchData();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <img src={post.image_url} alt={post.title} />
      <div className="mt-4">{post.content}</div>
    </div>
  );
};

export default PostPage;
