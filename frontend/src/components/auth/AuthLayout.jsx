import React, { useState } from 'react';
import { Target } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthLayout = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Milestone Tracker</h1>
          </div>
          <p className="text-gray-300">
            Track your progress, achieve your goals
          </p>
        </div>

        {/* Auth Forms */}
        {isLogin ? (
          <LoginForm 
            onToggleMode={toggleMode} 
            onLoginSuccess={onLoginSuccess}
          />
        ) : (
          <SignupForm onToggleMode={toggleMode} />
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} All rights reserved. 
          <a
            href="https://github.com/Skywalker690"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 ml-1"
          >
            Skywalker690 ❤️
          </a>
          
        </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;