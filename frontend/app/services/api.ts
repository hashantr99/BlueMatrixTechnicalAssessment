import axios from 'axios';

// Base URL for the API (you can adjust it according to your backend URL)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
});

// Add JWT token to headers for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all posts (only published)
export const fetchPosts = async () => {
  const response = await api.get('/posts?status=Published');
  return response.data;
};

// Fetch a single post by ID
export const fetchSinglePost = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// Fetch all categories
export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};


// Fetch a single category by ID
export const fetchSingleCategory = async (id: number) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// Login request for Admin CMS
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Delete a post by ID
export const deletePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

// Delete a category by ID
export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};


// Update a post by ID
export const updatePost = async (
  id: number,
  title: string,
  content: string,
  imageUrl: string,
  categoryId: number,
  status: 'Draft' | 'Published' // Allow either 'Draft' or 'Published'
) => {
  const response = await api.put(`/posts/${id}`, {
    title,
    content,
    imageUrl,
    categoryId,
    status,
  });
  return response.data;
};

// Create a new post
export const createPost = async (
  title: string,
  content: string,
  imageUrl: string,
  categoryId: number,
  status: 'Draft' | 'Published' = 'Draft' // Default status is 'Draft'
) => {
  const response = await api.post('/posts', {
    title,
    content,
    imageUrl,
    categoryId,
    status,
  });
  return response.data;
};

// Create a new category
export const createCategory = async (name: string) => {
  const response = await api.post('/categories', { name });
  return response.data;
};

// Update a category by ID
export const updateCategory = async (id: number, name: string) => {
  const response = await api.put(`/categories/${id}`, { name });
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await api.post('/users/register', { email, password });
  return response.data;
};