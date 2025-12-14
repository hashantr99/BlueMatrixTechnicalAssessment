'use client'
import { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from './../../services/api'; 
import { Category } from './../../types/category';  
import { useRouter } from 'next/navigation';

const ManageCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();  
      setCategories(data);
    };
    fetchData();
  }, []);

  
  const handleDelete = async (id: number) => {
    await deleteCategory(id);  
    setCategories(categories.filter(category => category.category_id !== id));  
  };

  
  const handleCreateCategory = () => {
    router.push('/cms/categories/create');  
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Categories</h1>

      <button
        onClick={handleCreateCategory}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
      >
        Create New Category
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.category_id} className="border rounded p-4 shadow-md hover:shadow-lg">
            <h3 className="text-lg font-semibold">{category.name}</h3>

            <div className="flex justify-between mt-4">
              {/* Edit Button */}
              <button
                onClick={() => router.push(`/cms/categories/${category.category_id}`)}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Edit
              </button>
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(category.category_id)}
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

export default ManageCategories;
