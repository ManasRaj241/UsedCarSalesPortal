import Signup from 'login_mfe/Signup';

import React from 'react';

function SignupPage() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-md w-full space-y-8">
        <Signup />
      </div>
    </div>
  );
}

export default SignupPage;
