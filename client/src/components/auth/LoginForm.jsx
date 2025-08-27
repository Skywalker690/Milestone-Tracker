
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, Eye, EyeOff, LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onToggleMode, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await login(formData);
      if (result.success) onLoginSuccess(result.user);
      else setErrors({ submit: result.message });
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Glassmorphism Card */}
      <Card className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-sm"></div>
        <div className="absolute inset-[1px] bg-gray-900/40 rounded-3xl backdrop-blur-xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <CardHeader className="text-center pb-2 pt-8 px-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50"></div>
                <div className="relative p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full">
                  <LogIn className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </CardTitle>
            <p className="text-gray-300 font-medium">Sign in to continue your journey</p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="relative p-4 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 rounded-full">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    </div>
                    <p className="text-red-300 font-medium">{errors.submit}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm transition-all duration-300 focus:bg-white/10 focus:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20 ${
                      errors.email ? 'border-red-500/50 focus:border-red-500/50' : ''
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => handleChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm pr-12 transition-all duration-300 focus:bg-white/10 focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 ${
                      errors.password ? 'border-red-500/50 focus:border-red-500/50' : ''
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl pointer-events-none"></div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 bg-white/10" />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <Sparkles className="absolute inset-0 h-5 w-5 text-white/20" />
                    </div>
                    <span>Signing you in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                    <div className="ml-1 flex">
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse delay-75 ml-1"></div>
                      <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse delay-150 ml-1"></div>
                    </div>
                  </div>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-400 bg-gray-900/40 backdrop-blur-sm rounded-full">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-300 font-medium">
                  New to our platform?{' '}
                  <button
                    type="button"
                    onClick={onToggleMode}
                    className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-purple-400 hover:to-pink-400 font-semibold transition-all duration-300 hover:scale-105"
                    disabled={isLoading}
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
