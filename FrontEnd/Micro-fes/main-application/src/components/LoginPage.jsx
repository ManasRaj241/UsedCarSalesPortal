import Login from 'login_mfe/Login';

import React from 'react';

function LoginPage() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-md w-full space-y-8">
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
