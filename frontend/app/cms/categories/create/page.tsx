'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory } from '../../../services/api'; 

const CreateCategory = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCategory(name);
      router.push('/cms/categories'); 
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Category</h1>

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
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
