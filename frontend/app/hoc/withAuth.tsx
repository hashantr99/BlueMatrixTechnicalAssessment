
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';  // import ComponentType to type the HOC

// higher Order Component to protect CMS routes
const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthWrapper = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      // check if the token exists in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        // if there's no token, redirect to login page
        router.push('/login');
      }
    }, [router]);

    // return the wrapped component
    return <Component {...props} />;
  };

  // adding a display name to the HOC
  AuthWrapper.displayName = `withAuth(${Component.displayName || Component.name})`;

  return AuthWrapper;
};

export default withAuth;

