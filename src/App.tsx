// ULTRA-CRITICAL: Import pre-init blocker FIRST (plain JS, runs immediately)
import './pre-init-blocker.js';

// CRITICAL: Import module blocker second to prevent WebAssembly loading
import './components/ModuleBlocker';

// Import initial preloader third - this runs immediately
import './components/InitialPreloader';

import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DeviceSetup from './components/DeviceSetup';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import HasilROI from './components/HasilROI';
import Preloader from './components/Preloader';
import { ToastProvider, GlobalToastListener } from './components/ui/simple-toast';
import { ThemeProvider } from './components/ThemeProvider';
import { seedDemoUsersToLocalStorage } from './data';

type Page = 'landing' | 'device-setup' | 'login' | 'user-dashboard' | 'admin-dashboard' | 'hasil-roi';
type UserRole = 'user' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    // Seed demo users to localStorage on app initialization
    seedDemoUsersToLocalStorage();
    
    // Check if we're on hasil-roi page (URL-based routing)
    if (typeof window !== 'undefined' && window.location) {
      const path = window.location.pathname;
      if (path === '/hasil-roi' || path.includes('hasil-roi')) {
        setCurrentPage('hasil-roi');
        return;
      }
    }
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('agroguard_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserRole(user.role);
      if (user.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('user-dashboard');
      }
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setUserRole(user.role);
    localStorage.setItem('agroguard_user', JSON.stringify(user));
    
    if (user.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('user-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('agroguard_user');
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'device-setup':
        return <DeviceSetup onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'user-dashboard':
        return <UserDashboard user={currentUser} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      case 'hasil-roi':
        return <HasilROI onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}
      {!isLoading && (
        <>
          <ToastProvider>
            {renderPage()}
            <GlobalToastListener />
          </ToastProvider>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;