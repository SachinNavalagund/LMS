import { useClerk, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  Briefcase,
  DollarSign,
  PanelLeft,
  Settings,
  User,
} from 'lucide-react';
import Loading from './Loading';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AppSidebar = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const navLinks = {
    student: [
      { icon: BookOpen, label: 'Courses', href: '/user/courses' },
      { icon: Briefcase, label: 'Billings', href: '/user/billing' },
      { icon: User, label: 'Profile', href: '/user/profile' },
      { icon: Settings, label: 'Settings', href: '/user/settings' },
    ],
    teacher: [
      { icon: BookOpen, label: 'Courses', href: '/teacher/courses' },
      { icon: DollarSign, label: 'Billings', href: '/teacher/billing' },
      { icon: User, label: 'Profile', href: '/teacher/profile' },
      { icon: Settings, label: 'Settings', href: '/teacher/settings' },
    ],
  };

  if (!isLoaded) return <Loading />;
  if (!user) return <div className="">User not found</div>;

  const userType = user.publicMetadata.userType as 'student' | 'teacher';
  const currentNavLinks = navLinks[userType];

  return (
    <Sidebar
      collapsible="icon"
      style={{ height: '100vh' }}
      className="border-none bg-customgreys-primarybg shadow-lg"
    >
      <SidebarHeader>
        <SidebarMenu className="app-sidebar__menu">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => toggleSidebar}
              className="group hover:bg-customgreys-secondarybg"
            >
              <div className="app-sidebar__logo-container group">
                <div className="app-sidebar__logo-wrapper">
                  <Image
                    src="/studying.png"
                    width={30}
                    height={50}
                    alt="Logo"
                    className="app-sidebar__logo"
                  />
                  <p className="app-sidebar__title">LMS</p>
                </div>
                <PanelLeft className="app-sidebar__collapse-icon" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="app-sidebar__nav-menu">
          {currentNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  'app-sidebar__nav-item',
                  isActive && 'bg-gray-800'
                )}
              >
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className={cn(
                    'app-sidebar__nav-button',
                    !isActive && 'text-customgreys-dirtyGrey'
                  )}
                >
                  <Link href={link.href} className="app-sidebar__nav-link">
                    <link.icon
                      className={isActive ? 'text-white-50' : 'text-gray-500'}
                    >
                      <span
                        className={cn(
                          'app-sidebar__nav-text',
                          isActive ? 'text-white-50' : 'text-gray-500'
                        )}
                      >
                        {link.label}
                      </span>
                    </link.icon>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;