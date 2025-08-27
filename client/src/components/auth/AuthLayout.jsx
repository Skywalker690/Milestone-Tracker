
import React, { useState } from 'react';
import { Target, Sparkles, Zap } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthLayout = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/50 via-transparent to-pink-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-fuchsia-900/40"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Enhanced Logo/Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              
            
            </div>
            <p className="text-gray-300 text-lg font-medium">
              Transform your goals into achievements
            </p>
          </div>

          {/* Auth Forms */}
          <div className="transform transition-all duration-500 ease-in-out">
            {isLogin ? (
              <LoginForm 
                onToggleMode={toggleMode} 
                onLoginSuccess={onLoginSuccess}
              />
            ) : (
              <SignupForm onToggleMode={toggleMode} />
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <Sparkles className="h-4 w-4 text-purple-400" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
              <a
                href="https://github.com/Skywalker690"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium"
              >
                Skywalker690<span className="mx-1 text-red-400">❤️</span>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AuthLayout;


