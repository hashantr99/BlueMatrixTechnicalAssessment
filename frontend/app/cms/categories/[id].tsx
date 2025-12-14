'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSingleCategory, updateCategory } from './../../services/api';
import { Category } from './../../types/category';

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchSingleCategory(Number(id)); 
        setCategory(data); 
        setName(data.name);
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCategory(Number(id), name);  
      router.push('/cms/categories');  
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (!category) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Category</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">Category Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
