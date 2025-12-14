'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // check if the user has a token (authenticated)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');  // redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => router.push('/')}
                className="text-lg font-semibold hover:text-gray-400"
              >
                Home
              </button>
              <button
                onClick={() => router.push('/login')}
                className="text-lg font-semibold hover:text-gray-400"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/cms/dashboard')}
                className="text-lg font-semibold hover:text-gray-400"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/cms/posts')}
                className="text-lg font-semibold hover:text-gray-400"
              >
                Manage Posts
              </button>
              <button
                onClick={() => router.push('/cms/categories')}
                className="text-lg font-semibold hover:text-gray-400"
              >
                Manage Categories
              </button>
              <button
                onClick={handleLogout}
                className="text-lg font-semibold hover:text-gray-400"
              >
                Logout
              </button>
            </>
          )}
          <button
  className="text-blue-600 underline"
  type="button"
  onClick={() => router.push('/register')}
>
  Create an account
</button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
