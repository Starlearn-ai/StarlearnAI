import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import { appName, facebookClientId, serverURL } from '@/constants';
import Logo from '../res/logo.svg';
import axios from 'axios';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from '@greatsumini/react-facebook-login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      redirectHome();
    }
  }, []); // Empty dependency array to run effect only once on mount

  function redirectHome() {
    navigate("/dashboard");
  }

  const handleLoginSuccess = (userData: { email: string; mName: string; _id: string; type: string; }) => {
    sessionStorage.setItem('email', userData.email);
    sessionStorage.setItem('mName', userData.mName);
    sessionStorage.setItem('auth', 'true');
    sessionStorage.setItem('uid', userData._id);
    sessionStorage.setItem('type', userData.type);
    toast({
      title: "Login successful",
      description: `Welcome back to ${appName}`,
      duration: 3000,
    });
    const sharedId = sessionStorage.getItem('shared');
    if (sharedId) {
      getDataFromDatabase(sharedId);
    } else {
      redirectHome();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const postURL = `${serverURL}/api/signin`;
      const response = await axios.post(postURL, { email, password });
      if (response.data.success) {
        handleLoginSuccess(response.data.userData);
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Failed to login. Please check your credentials or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  async function getDataFromDatabase(id: string) {
    const postURL = `${serverURL}/api/shareable?id=${id}`;
    try {
        const response = await axios.get(postURL);
        const { content: dat, type, mainTopic } = response.data[0];
        const user = sessionStorage.getItem('uid');
        
        await axios.post(`${serverURL}/api/courseshared`, { user, content: dat, type: type.toLowerCase(), mainTopic });
        sessionStorage.removeItem('shared');
    } catch (error) {
        console.error("Error fetching shared course data:", error);
    } finally {
        redirectHome(); // Always redirect home after attempting to process shared data
    }
  }

  // --- Google Login Handlers ---
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    setError('');
    try {
      const decoded: { email: string; name: string } = jwtDecode(credentialResponse.credential as string);
      const postURL = `${serverURL}/api/social`;
      const response = await axios.post(postURL, { email: decoded.email, name: decoded.name });

      if (response.data.success) {
        handleLoginSuccess(response.data.userData);
      } else {
        setError(response.data.message || 'Google login failed. Please try again.');
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError('An error occurred during Google login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setIsLoading(false);
    setError('Google login failed. Please try again.');
  };

  // --- Facebook Login Handlers ---
  const handleFacebookFail = (error: { status?: string }) => {
    console.error("Facebook login failed:", error);
    if (error.status !== 'cancelled') {
        setError('Facebook login failed. Please try again.');
    }
    setIsLoading(false);
  };

  const handleFacebookProfileSuccess = async (response: { email?: string; name?: string }) => {
    setIsLoading(true);
    setError('');
    try {
      if (!response.email || !response.name) {
        throw new Error('Email or Name not provided by Facebook.');
      }
      const postURL = `${serverURL}/api/social`;
      const apiResponse = await axios.post(postURL, { email: response.email, name: response.name });

      if (apiResponse.data.success) {
        handleLoginSuccess(apiResponse.data.userData);
      } else {
        setError(apiResponse.data.message || 'Facebook login failed.');
      }
    } catch (error) {
      console.error("Facebook login error:", error);
      setError('An error occurred during Facebook login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-foreground/5 to-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex flex-col items-center space-y-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
            >
              <img src={Logo} alt={`${appName} Logo`} className='h-8 w-8' />
            </motion.div>
            <span className="font-display font-bold text-2xl text-foreground mt-2 group-hover:text-primary transition-colors">{appName}</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Welcome back!</h1>
          <p className="mt-2 text-muted-foreground text-base">Sign in to your account to continue your learning journey.</p>
        </div>

        <Card className="p-6 sm:p-8 border border-border/60 shadow-xl">
          <CardContent className="pt-4">
            {error && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <Alert variant="destructive" className="mb-4 bg-red-100 dark:bg-red-900 border-red-400 text-red-800 dark:text-red-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Login Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 text-base focus:border-primary-foreground/50 transition-colors"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 text-base focus:border-primary-foreground/50 transition-colors"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
                <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>) 
                             : (<>Sign in <ArrowRight className="ml-2 h-4 w-4" /></>)}
                </Button>
              </motion.div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/40" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
                <GoogleLogin
                  theme='outline'
                  type='standard'
                  width='400'
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </motion.div>
              
              {/* Corrected Facebook Login Implementation */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
                <FacebookLogin
                  appId={facebookClientId}
                  onFail={handleFacebookFail}
                  onProfileSuccess={handleFacebookProfileSuccess}
                  className="w-full"
                >
                  <Button
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 h-11 text-base font-semibold"
                  >
                    <svg fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Sign in with Facebook
                  </Button>
                </FacebookLogin>
              </motion.div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t border-border/60 p-6">
            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;