import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, Lock, User, AlertTriangle, Loader2, Phone } from 'lucide-react';
import { appLogo, appName, companyName, facebookClientId, serverURL, websiteURL } from '@/constants';
import Logo from '../res/logo.svg';
import axios from 'axios';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'; // Import CredentialResponse type
import { jwtDecode } from "jwt-decode";
import FacebookLogin from '@greatsumini/react-facebook-login';

const Signup = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      redirectHome();
    }
  }, []);

  function redirectHome() {
    navigate("/dashboard");
  }

  async function sendEmail(mEmail: string, mName: string) {
    try {
      const dataToSend = {
        subject: `Welcome to ${appName}`,
        to: mEmail,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                <html lang="en">
                
                  <head></head>
                   <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">Welcome to AiCourse<div> ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏</div>
                
                  <body style="padding:20px; margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:#f6f9fc;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
                    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" height="80%" width="100%" style="max-width:37.5em;max-height:80%; margin-left:auto;margin-right:auto;margin-top:80px;margin-bottom:80px;width:465px;border-radius:0.25rem;border-width:1px;background-color:#fff;padding:20px">
                      <tr style="width:100%">
                        <td>
                          <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-top:32px">
                            <tbody>
                              <tr>
                                <td><img alt="Vercel" src="${appLogo}" width="40" height="37" style="display:block;outline:none;border:none;text-decoration:none;margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px" /></td>
                              </tr>
                            </tbody>
                          </table>
                          <h1 style="margin-left:0px;margin-right:0px;margin-top:30px;margin-bottom:30px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:rgb(0,0,0)">Welcome to <strong>${appName}</strong></h1>
                          <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hello <strong>${mName}</strong>,</p>
                          <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Welcome to <strong>${appName}</strong>, Unleash your AI potential with our platform, offering a seamless blend of theory and video courses. Dive into comprehensive lessons, from foundational theories to real-world applications, tailored to your learning preferences. Experience the future of AI education with ${appName} – where theory meets engaging visuals for a transformative learning journey!</p>
                          <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-bottom:32px;margin-top:32px;text-align:center">
                            <tbody>
                              <tr>
                                <td><a href="${websiteURL}" target="_blank" style="p-x:20px;p-y:12px;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px;border-radius:0.25rem;background-color: #007BFF;text-align:center;font-size:12px;font-weight:600;color:rgb(255,255,255);text-decoration-line:none"><span></span><span style="p-x:20px;p-y:12px;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:9px"><span>Get Started</span></a></td>
                              </tr>
                            </tbody>
                          </table>
                          <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Best,<p target="_blank" style="color:rgb(0,0,0);text-decoration:none;text-decoration-line:none">The <strong>${companyName}</strong> Team</p></p>
                          </td>
                      </tr>
                    </table>
                  </body>
                
                </html>`
      };
      const postURL = serverURL + '/api/data';
      await axios.post(postURL, dataToSend).then(res => {
        redirectHome();
      }).catch(error => {
        console.error("Error sending welcome email:", error);
        redirectHome();
      });

    } catch (error) {
      console.error("Error in sendEmail function:", error);
      redirectHome();
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !phone) {
      setError('Please fill out all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{7,}$/.test(phone)) { // Basic validation: at least 7 digits
        setError('Please enter a valid phone number (digits only, at least 7 characters).');
        return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    if (password.length < 9) {
      setError('Password should be at least 9 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const postURL = serverURL + '/api/signup';
      const type = 'free';

      const response = await axios.post(postURL, { email, mName: name, password, type, phone });
      if (response.data.success) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('mName', name);
        sessionStorage.setItem('auth', 'true');
        sessionStorage.setItem('uid', response.data.userId);
        sessionStorage.setItem('type', 'free');
        toast({
          title: "Account created!",
          description: "Welcome to " + appName + ".",
        });
        await sendEmail(email, name);
      } else {
        setError(response.data.message);
      }

    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
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
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Create your account</h1>
          <p className="mt-2 text-muted-foreground text-base">Try {appName} for free</p>
        </div>

        <Card className="p-6 sm:p-8 border border-border/60 shadow-xl">
          <CardContent className="pt-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mb-4 bg-red-100 dark:bg-red-900 border-red-400 text-red-800 dark:text-red-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Sign Up Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 text-base focus:border-primary-foreground/50 transition-colors"
                    disabled={isLoading}
                  />
                </div>
              </div>

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

              {/* New Phone Number Field */}
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel" // Use type="tel" for phone numbers
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-11 text-base focus:border-primary-foreground/50 transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  (e.g., 2348012345678 for Nigerian numbers or 1234567890 for US numbers).
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 text-base focus:border-primary-foreground/50 transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 9 characters long.
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  disabled={isLoading}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    terms of service
                  </Link>
                  {" "}and{" "}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full"
              >
                <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                    </>
                  ) : (
                    <>
                      Create account <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Google Login Button */}
              <GoogleLogin
                theme='outline'
                type='standard'
                width='400'
                onSuccess={async (credentialResponse: CredentialResponse) => { // Use CredentialResponse type
                  try {
                    setIsLoading(true);
                    const decoded: any = jwtDecode(credentialResponse.credential as string); // Type assertion for jwtDecode
                    const email = decoded.email;
                    const name = decoded.name;
                    const postURL = serverURL + '/api/social';

                    const response = await axios.post(postURL, { email, name });

                    if (response.data.success) {
                      toast({
                        title: "Login successful",
                        description: "Welcome to " + appName + ".",
                      });
                      sessionStorage.setItem('email', decoded.email);
                      sessionStorage.setItem('mName', decoded.name);
                      sessionStorage.setItem('auth', 'true');
                      sessionStorage.setItem('uid', response.data.userData._id);
                      sessionStorage.setItem('type', response.data.userData.type);
                      await sendEmail(decoded.email, decoded.name);
                    } else {
                      setError(response.data.message);
                    }
                  } catch (error) {
                    console.error("Google login error:", error);
                    setError('Failed to log in with Google. Please try again.');
                  } finally {
                    setIsLoading(false);
                  }
                }}
                onError={() => {
                  setIsLoading(false);
                  setError('Google login failed. Please try again.');
                }}
                // Removed custom render prop as it's not supported by @react-oauth/google in this way
                // The component renders its own button based on theme, type, width.
                // You can apply styles to its parent container if needed for layout.
              />

              {/* Facebook Login Button */}
              <FacebookLogin
                appId={facebookClientId}
                // Corrected render prop usage: `disabled` is not available directly from the callback
                // Instead, the custom button's disabled state is controlled by `isLoading`
                render={({ onClick }) => (
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      onClick={onClick}
                      disabled={isLoading} // Control disabled state with component's isLoading
                      className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 h-11 text-base font-semibold"
                    >
                      <svg fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Sign up with Facebook
                    </Button>
                  </motion.div>
                )}
                onFail={(error: any) => {
                  console.error("Facebook login failed:", error);
                  setIsLoading(false);
                  setError('Facebook login failed. Please try again.');
                }}
                onProfileSuccess={async (response: any) => {
                  try {
                    setIsLoading(true);
                    const email = response.email;
                    const name = response.name;
                    const postURL = serverURL + '/api/social';

                    const apiResponse = await axios.post(postURL, { email, name });

                    if (apiResponse.data.success) {
                      toast({
                        title: "Login successful",
                        description: "Welcome to " + appName + ".",
                      });
                      sessionStorage.setItem('email', email);
                      sessionStorage.setItem('mName', name);
                      sessionStorage.setItem('auth', 'true');
                      sessionStorage.setItem('uid', apiResponse.data.userData._id);
                      sessionStorage.setItem('type', apiResponse.data.userData.type);
                      await sendEmail(email, name);
                    } else {
                      setError(apiResponse.data.message);
                    }
                  } catch (error) {
                    console.error("Facebook login error:", error);
                    setError('Failed to log in with Facebook. Please try again.');
                  } finally {
                    setIsLoading(false);
                  }
                }}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t border-border/60 p-6">
            <div className="text-center text-sm">
              Existing user?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;