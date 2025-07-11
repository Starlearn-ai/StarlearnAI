// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, User, DollarSign, LogOut, Sparkles, Menu, Settings2Icon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { appLogo, appName, serverURL, websiteURL } from '@/constants'; // appLogo is imported from constants
// import Logo from '../../res/logo.svg'; // This line is no longer needed/commented out
import { DownloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useSidebar } from '@/components/ui/sidebar';

const DashboardLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [installPrompt, setInstallPrompt] = useState(null);
  const { toast } = useToast();
  const { setOpenMobile } = useSidebar(); // Get setOpenMobile from context

  // Helper to check active route
  const isActive = (path: string) => location.pathname === path;
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('uid') === null) {
      window.location.href = websiteURL + '/login';
    }
    async function dashboardData() {
      const postURL = serverURL + `/api/dashboard`;
      const response = await axios.post(postURL);
      sessionStorage.setItem('adminEmail', response.data.admin.email);
      if (response.data.admin.email === sessionStorage.getItem('email')) {
        setAdmin(true);
      }
    }
    if (sessionStorage.getItem('adminEmail')) {
      if (sessionStorage.getItem('adminEmail') === sessionStorage.getItem('email')) {
        setAdmin(true);
      }
    } else {
      dashboardData();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    });
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return
    installPrompt.prompt()
    installPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted install')
      }
      setInstallPrompt(null)
    })
  }

  function Logout() {
    sessionStorage.clear();
    toast({
      title: "Logged Out",
      description: "You have logged out successfully",
    });
    window.location.href = websiteURL + '/login';
  }

  const mobileHeaderHeight = '4rem';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background to-muted/30">
        {isMobile && (
          <header
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-sm shadow-sm"
            style={{ height: mobileHeaderHeight }}
          >
            <SidebarTrigger className="mr-2">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-indigo-500 text-gradient">{appName}</h1>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>
        )}

        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="border-b border-border/40">
            <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-3">
              <div className="h-8 w-8 rounded-md bg-primary from-primary flex items-center justify-center">
                <img src={appLogo} alt="Logo" className='h-6 w-6' /> {/* Using appLogo */}
              </div>
              <span className="font-display text-lg font-bold bg-primary text-gradient">{appName}</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Home" isActive={isActive('/dashboard')}>
                      <Link
                        to="/dashboard"
                        className={cn(isActive('/dashboard') && "text-primary")}
                        onClick={isMobile ? () => setOpenMobile(false) : undefined}
                      >
                        <Home />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile" isActive={isActive('/dashboard/profile')}>
                      <Link
                        to="/dashboard/profile"
                        className={cn(isActive('/dashboard/profile') && "text-primary")}
                        onClick={isMobile ? () => setOpenMobile(false) : undefined}
                      >
                        <User />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Pricing" isActive={isActive('/dashboard/pricing')}>
                      <Link
                        to="/dashboard/pricing"
                        className={cn(isActive('/dashboard/pricing') && "text-primary")}
                        onClick={isMobile ? () => setOpenMobile(false) : undefined}
                      >
                        <DollarSign />
                        <span>Pricing</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Generate Course" isActive={isActive('/dashboard/generate-course')}>
                      <Link
                        to="/dashboard/generate-course"
                        className={cn(isActive('/dashboard/generate-course') && "text-primary")}
                        onClick={isMobile ? () => setOpenMobile(false) : undefined}
                      >
                        <Sparkles />
                        <span>Generate Course</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {admin ?
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Admin Panel" isActive={isActive('/admin')}>
                        <Link
                          to="/admin"
                          className={cn(isActive('/admin') && "text-primary")}
                          onClick={isMobile ? () => setOpenMobile(false) : undefined}
                        >
                          <Settings2Icon />
                          <span>Admin Panel</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    :
                    <></>}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <div className="px-2">
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary shadow-md transition-all"
                    size="sm"
                    asChild
                  >
                    <Link
                      to="/dashboard/generate-course"
                      onClick={isMobile ? () => setOpenMobile(false) : undefined}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Course
                    </Link>
                  </Button>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/40">
            <SidebarMenu>
              {installPrompt && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Theme">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={handleInstallClick}
                        variant="ghost"
                        size="icon"
                      >
                        <DownloadIcon className='h-5 w-5' />
                        <span className='sr-only'>Desktop App</span>
                      </Button>
                      <span>Desktop App</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
              }
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Theme">
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <span>Toggle Theme</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Link onClick={Logout} className="text-muted-foreground hover:text-destructive transition-colors">
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <main
          className="flex-1 overflow-auto p-4 md:p-6 lg:p-8"
          style={isMobile ? { paddingTop: mobileHeaderHeight } : {}}
        >
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;