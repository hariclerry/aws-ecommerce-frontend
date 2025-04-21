import React from 'react';
import { useAuth } from 'react-oidc-context';

export default function AuthButtons() {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  if (auth.isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-white">
          Hi, {auth.user?.profile?.email}
        </span>
        <button
          onClick={() => auth.removeUser()}
          className="text-sm text-red-300 hover:underline"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => auth.signinRedirect()}
      className="text-sm text-blue-300 hover:underline"
    >
      Login
    </button>
  );
}
