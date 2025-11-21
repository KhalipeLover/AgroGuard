import { useState } from 'react';
import motion from './ui/motion-replacement';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sprout, ArrowLeft, User, ShieldCheck, Copy, Check } from 'lucide-react';
import { toast } from './ui/simple-toast';
import ThemeToggle from './ThemeToggle';
import type { User as UserType } from '../App';
import { getDemoCredentials } from '../data';

interface LoginPageProps {
  onNavigate: (page: 'landing' | 'device-setup') => void;
  onLogin: (user: UserType) => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [userEmailError, setUserEmailError] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');
  const [adminUsernameError, setAdminUsernameError] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Get demo credentials
  const demoCredentials = getDemoCredentials();

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setUserEmailError('');
    setUserPasswordError('');

    // Validation
    if (!userEmail.trim()) {
      setUserEmailError('Email wajib diisi');
      toast.error('Mohon lengkapi semua field!');
      return;
    }

    if (!userPassword) {
      setUserPasswordError('Password wajib diisi');
      toast.error('Mohon lengkapi semua field!');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setUserEmailError('Format email tidak valid');
      toast.error('Format email tidak valid!');
      return;
    }

    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      try {
        // Get registered users
        const users = JSON.parse(localStorage.getItem('agroguard_users') || '[]');
        const user = users.find((u: any) => u.email === userEmail && u.password === userPassword);

        if (user) {
          toast.success(`Selamat datang, ${user.name}!`);
          onLogin({
            id: user.id,
            name: user.name,
            email: user.email,
            role: 'user'
          });
        } else {
          // Check if email exists but password wrong
          const emailExists = users.some((u: any) => u.email === userEmail);
          if (emailExists) {
            setUserPasswordError('Password salah');
            toast.error('Password yang Anda masukkan salah!');
          } else {
            setUserEmailError('Email tidak terdaftar');
            toast.error('Email tidak terdaftar! Silakan daftar terlebih dahulu.');
          }
        }
      } catch (error) {
        toast.error('Terjadi kesalahan. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setAdminUsernameError('');
    setAdminPasswordError('');

    // Validation
    if (!adminUsername.trim()) {
      setAdminUsernameError('Username wajib diisi');
      toast.error('Mohon lengkapi semua field!');
      return;
    }

    if (!adminPassword) {
      setAdminPasswordError('Password wajib diisi');
      toast.error('Mohon lengkapi semua field!');
      return;
    }

    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      // Admin credentials
      if (adminUsername === 'Admin_AGROGUARD' && adminPassword === 'Admin@321') {
        toast.success('Selamat datang, Administrator!');
        onLogin({
          id: 'admin-001',
          name: 'Administrator',
          email: 'admin@agroguard.com',
          role: 'admin'
        });
      } else {
        if (adminUsername !== 'Admin_AGROGUARD') {
          setAdminUsernameError('Username salah');
        }
        if (adminPassword !== 'Admin@321') {
          setAdminPasswordError('Password salah');
        }
        toast.error('Username atau password admin salah!');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleCopyCredentials = (email: string, password: string) => {
    setUserEmail(email);
    setUserPassword(password);
    setCopiedEmail(email);
    toast.success('Credentials copied to form!');
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-[#e0f2fe] to-[#dbeafe] dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] transition-colors relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B945E] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0077B6] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto max-w-md px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="mb-8 glass-card dark:glass-card-dark hover:bg-white/20 dark:hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Kembali
          </Button>

          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] p-4 rounded-2xl inline-block mb-6 shadow-xl glow-primary">
              <Sprout className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl text-foreground mb-3">
              AGROGUARD IoT
            </h1>
            <p className="text-muted-foreground">Masuk ke dashboard Anda</p>
          </div>

          <Card className="p-8 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-2xl">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 gap-3 !p-2 !h-auto mb-8 !bg-white/50 dark:!bg-white/5 backdrop-blur-md border-2 border-white/40 dark:border-white/10 rounded-xl shadow-lg">
                <TabsTrigger 
                  value="user" 
                  className="flex items-center justify-center gap-2 !h-12 rounded-lg transition-all duration-300 !text-muted-foreground hover:!text-foreground data-[state=active]:!bg-gradient-to-br data-[state=active]:from-[#3B945E] data-[state=active]:to-[#4CAF6E] data-[state=active]:!text-white data-[state=active]:shadow-xl data-[state=active]:glow-primary hover:bg-white/50 dark:hover:bg-white/10 data-[state=active]:scale-[1.02]"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">User</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className="flex items-center justify-center gap-2 !h-12 rounded-lg transition-all duration-300 !text-muted-foreground hover:!text-foreground data-[state=active]:!bg-gradient-to-br data-[state=active]:from-[#0077B6] data-[state=active]:to-[#0099E6] data-[state=active]:!text-white data-[state=active]:shadow-xl data-[state=active]:glow-accent hover:bg-white/50 dark:hover:bg-white/10 data-[state=active]:scale-[1.02]"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-medium">Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleUserLogin}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="user-email" className="text-foreground">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        setUserEmailError('');
                      }}
                      placeholder="email@example.com"
                      className={`h-11 glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth ${
                        userEmailError ? 'border-red-500 dark:border-red-500' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {userEmailError && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">{userEmailError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-password" className="text-foreground">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      value={userPassword}
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                        setUserPasswordError('');
                      }}
                      placeholder="Masukkan password"
                      className={`h-11 glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth ${
                        userPasswordError ? 'border-red-500 dark:border-red-500' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {userPasswordError && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">{userPasswordError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 neumorphic-button bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] hover:from-[#2d7347] hover:to-[#3B945E] text-white shadow-xl hover:shadow-2xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <User className="mr-2 w-4 h-4" />
                        Login sebagai User
                      </>
                    )}
                  </Button>

                  <div className="space-y-3 pt-2">
                    <p className="text-sm text-muted-foreground text-center">
                      Belum punya akun?{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('device-setup')}
                        className="text-[#3B945E] dark:text-[#4CAF6E] hover:underline"
                        disabled={isLoading}
                      >
                        Daftar device baru
                      </button>
                    </p>
                    
                    <div className="glass-card dark:glass-card-dark border-2 border-amber-200/30 dark:border-amber-800/30 rounded-lg p-4 shadow-md">
                      <p className="text-xs mb-3">
                        <strong className="block mb-2 text-amber-900 dark:text-amber-200">🎯 Demo Accounts (Click to use):</strong>
                      </p>
                      <div className="space-y-2">
                        {demoCredentials.map((cred, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleCopyCredentials(cred.email, cred.password)}
                            disabled={isLoading}
                            className="w-full flex items-start gap-2 p-2 rounded-lg glass-card dark:glass-card-dark hover:bg-white/30 dark:hover:bg-white/10 transition-smooth border border-white/20 dark:border-white/10 text-left group"
                          >
                            {copiedEmail === cred.email ? (
                              <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-[#3B945E] transition-colors flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-foreground truncate">{cred.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{cred.email}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        Password semua akun demo: <strong className="text-foreground">demo123</strong>
                      </p>
                    </div>
                  </div>
                </motion.form>
              </TabsContent>

              <TabsContent value="admin">
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleAdminLogin}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="admin-username" className="text-foreground">Username Admin</Label>
                    <Input
                      id="admin-username"
                      type="text"
                      value={adminUsername}
                      onChange={(e) => {
                        setAdminUsername(e.target.value);
                        setAdminUsernameError('');
                      }}
                      placeholder="Admin_AGROGUARD"
                      className={`h-11 glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#0077B6]/50 focus:ring-[#0077B6]/20 transition-smooth ${
                        adminUsernameError ? 'border-red-500 dark:border-red-500' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {adminUsernameError && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">{adminUsernameError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-foreground">Password Admin</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        setAdminPasswordError('');
                      }}
                      placeholder="Masukkan password admin"
                      className={`h-11 glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#0077B6]/50 focus:ring-[#0077B6]/20 transition-smooth ${
                        adminPasswordError ? 'border-red-500 dark:border-red-500' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {adminPasswordError && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">{adminPasswordError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 neumorphic-button bg-gradient-to-br from-[#0077B6] to-[#0099E6] hover:from-[#005a8c] hover:to-[#0077B6] text-white shadow-xl hover:shadow-2xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 w-4 h-4" />
                        Login sebagai Admin
                      </>
                    )}
                  </Button>

                  <div className="glass-card dark:glass-card-dark border-2 border-amber-200/30 dark:border-amber-800/30 rounded-lg p-4 mt-4 shadow-md">
                    <p className="text-sm text-foreground">
                      <strong className="block mb-2 text-amber-900 dark:text-amber-200">Demo Credentials:</strong>
                      <span className="text-muted-foreground">
                        Username: Admin_AGROGUARD<br />
                        Password: Admin@321
                      </span>
                    </p>
                  </div>
                </motion.form>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}