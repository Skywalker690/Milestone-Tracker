import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, Eye, EyeOff, UserPlus, CheckCircle, Mail, Lock, User, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignupForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signup } = useAuth();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const { confirmPassword, ...signupData } = formData;
      const result = await signup(signupData);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ submit: result.message });
        }
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative">
        <Card className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-sm"></div>
          <div className="absolute inset-[1px] bg-gray-900/40 rounded-3xl backdrop-blur-xl"></div>
          
          <div className="relative z-10">
            <CardContent className="p-12 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto w-fit">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                {[...Array(8)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className={`absolute h-4 w-4 text-yellow-400 animate-pulse`}
                    style={{
                      top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 40}px`,
                      left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Welcome Aboard! 🎉
                </span>
              </h2>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Your account has been successfully created! 
                <br />
                <span className="text-emerald-400 font-medium">Ready to start tracking your milestones?</span>
              </p>
              
              <Button
                onClick={onToggleMode}
                className="w-full h-12 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>Continue to Sign In</span>
                </div>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      <Card className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-3xl blur-sm"></div>
        <div className="absolute inset-[1px] bg-gray-900/40 rounded-3xl backdrop-blur-xl"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center pb-2 pt-8 px-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-lg opacity-50"></div>
                <div className="relative p-3 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Join the Journey
              </span>
            </CardTitle>
            <p className="text-gray-300 font-medium">Create your account and start achieving</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200 font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-400" />
                    First Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      placeholder="John"
                      className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm transition-all duration-300 focus:bg-white/10 focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 ${
                        errors.firstName ? 'border-red-500/50 focus:border-red-500/50' : ''
                      }`}
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl pointer-events-none"></div>
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200 font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-pink-400" />
                    Last Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm transition-all duration-300 focus:bg-white/10 focus:border-pink-500/50 focus:shadow-lg focus:shadow-pink-500/20 ${
                        errors.lastName ? 'border-red-500/50 focus:border-red-500/50' : ''
                      }`}
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-red-500/5 rounded-xl pointer-events-none"></div>
                  </div>
                  {errors.lastName && (
                    <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

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
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm transition-all duration-300 focus:bg-white/10 focus:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20 ${
                      errors.email ? 'border-red-500/50 focus:border-red-500/50' : ''
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-xl pointer-events-none"></div>
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
                  <Lock className="h-4 w-4 text-green-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Create a strong password"
                    className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm pr-12 transition-all duration-300 focus:bg-white/10 focus:border-green-500/50 focus:shadow-lg focus:shadow-green-500/20 ${
                      errors.password ? 'border-red-500/50 focus:border-red-500/50' : ''
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl pointer-events-none"></div>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200 font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-teal-400" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className={`h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm pr-12 transition-all duration-300 focus:bg-white/10 focus:border-teal-500/50 focus:shadow-lg focus:shadow-teal-500/20 ${
                      errors.confirmPassword ? 'border-red-500/50 focus:border-red-500/50' : ''
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 rounded-xl pointer-events-none"></div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <Sparkles className="absolute inset-0 h-5 w-5 text-white/20" />
                    </div>
                    <span>Creating your account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Create Account</span>
                    <Sparkles className="h-4 w-4" />
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
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onToggleMode}
                    className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-pink-400 hover:to-red-400 font-semibold transition-all duration-300 hover:scale-105"
                    disabled={isLoading}
                  >
                    Sign in instead
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

export default SignupForm;


