'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, Mail, Lock, GraduationCap, Building2, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  const router = useRouter();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const backgroundRef = useRef(null);
  const shapesRef = useRef([]);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  // Generate consistent random sizes for shapes
  const shapeSizes = useMemo(() => {
    return Array(6).fill().map(() => ({
      width: Math.random() * 200 + 100,
      height: Math.random() * 200 + 100,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    if (!isMounted) return;

    const shapes = shapesRef.current;
    
    // Animate floating shapes
    shapes.forEach((shape, index) => {
      if (shape) {
        gsap.set(shape, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
          rotation: Math.random() * 360
        });
        
        gsap.to(shape, {
          duration: 10 + index * 2,
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          rotation: `+=${360}`,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      }
    });

    // Initial card animation
    gsap.fromTo(cardRef.current, 
      { 
        y: 100, 
        opacity: 0, 
        scale: 0.9,
        rotationX: 15 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotationX: 0,
        duration: 1.2, 
        ease: "power4.out",
        delay: 0.2
      }
    );

    // Stagger form elements
    gsap.fromTo(".form-element",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        delay: 0.8
      }
    );

  }, [isMounted]);

  const toggleForm = () => {
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      rotationY: 90,
      duration: 0.4,
      ease: "power2.inOut"
    })
    .call(() => {
      setIsLogin(!isLogin);
      reset();
      setSubmitSuccess(false);
      setErrorMessage('');
    })
    .to(cardRef.current, {
      rotationY: 0,
      duration: 0.4,
      ease: "power2.inOut"
    })
    .fromTo(".form-element",
      { x: 20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.05, 
        ease: "power3.out"
      }
    );
  };

  // Store token in localStorage as fallback for cross-origin issues
  const storeToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitSuccess(false);
    
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      const endpoint = isLogin 
        ? 'https://uni-talk-backend-production.up.railway.app/api/auth/login'
        : 'https://uni-talk-backend-production.up.railway.app/api/auth/register';
      
      const payload = isLogin 
        ? { email: data.email, password: data.password }
        : data;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include' // This ensures cookies are sent and received
      });
      
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `${isLogin ? 'Login' : 'Registration'} failed`);
      }
      
      if (result.success) {
        setSubmitSuccess(true);
        
        // Store token as fallback for cross-origin cookie issues
        if (result.token) {
          storeToken(result.token);
        }
        
        gsap.to(cardRef.current, {
          scale: 1.02,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
        
        // Test authentication immediately after login
        setTimeout(async () => {
          try {
            const authToken = localStorage.getItem('authToken');
            const verifyResponse = await fetch('https://uni-talk-backend-production.up.railway.app/api/auth/verify', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            });
            
            if (verifyResponse.ok) {
              console.log('Authentication verified, redirecting...');
              router.push('/dashboard');
            } else {
              console.error('Authentication verification failed');
              setErrorMessage('Authentication verification failed. Please try logging in again.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            setErrorMessage('Network error during verification. Please try again.');
          }
        }, 1000);
      } else {
        throw new Error(result.message || 'Authentication failed');
      }
      
    } catch (error) {
      let message = error.message;
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        message = 'Network error - please check your connection and try again';
      }
      setErrorMessage(message || 'An unexpected error occurred');
      
      gsap.to(cardRef.current, {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
        {shapeSizes.map((size, i) => (
          <div
            key={i}
            ref={el => shapesRef.current[i] = el}
            className={`absolute rounded-full opacity-20 ${
              i % 3 === 0 ? 'bg-purple-400' : 
              i % 3 === 1 ? 'bg-blue-400' : 'bg-indigo-400'
            }`}
            style={{
              width: `${size.width}px`,
              height: `${size.height}px`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 size-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 size-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>

      <Card 
        ref={cardRef} 
        className="w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl relative z-10"
        style={{ perspective: '1000px' }}
      >
        <CardHeader className="text-center space-y-2">
          <div className="form-element flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <CardTitle className="form-element text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="form-element text-white/70">
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join our academic community today'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div ref={formRef} className="space-y-4">
            
            {!isLogin && (
              <div className="form-element space-y-2">
                <Label htmlFor="username" className="text-white/90 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-all duration-300"
                    {...register('username', { 
                      required: !isLogin ? 'Username is required' : false 
                    })}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-sm">{errors.username.message}</p>
                )}
              </div>
            )}

            <div className="form-element space-y-2">
              <Label htmlFor="email" className="text-white/90 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-all duration-300"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="form-element space-y-2">
              <Label htmlFor="password" className="text-white/90 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-all duration-300"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/60 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>

            {!isLogin && (
              <>
                <div className="form-element space-y-2">
                  <Label htmlFor="university" className="text-white/90 font-medium">
                    University <span className="text-white/50">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="university"
                      placeholder="Enter your university"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-all duration-300"
                      {...register('university')}
                    />
                  </div>
                </div>

                <div className="form-element space-y-2">
                  <Label htmlFor="department" className="text-white/90 font-medium">
                    Department <span className="text-white/50">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="department"
                      placeholder="Enter your department"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-all duration-300"
                      {...register('department')}
                    />
                  </div>
                </div>
              </>
            )}

            {errorMessage && (
              <Alert className="form-element bg-red-500/20 border-red-500/50 text-red-100">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {submitSuccess && (
              <Alert className="form-element bg-green-500/20 border-green-500/50 text-green-100">
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  {isLogin ? 'Login successful! Redirecting to dashboard...' : 'Account created successfully! Logging you in...'}
                </AlertDescription>
              </Alert>
            )}

            <Button
              ref={buttonRef}
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="form-element w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
            
            <div className="form-element text-center">
              <button
                type="button"
                onClick={toggleForm}
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}