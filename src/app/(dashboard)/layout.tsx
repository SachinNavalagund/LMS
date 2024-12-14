'use client';

import React, { ReactNode, useState } from 'react';

import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Loading from '@/components/Loading';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import NavBar from '@/components/NavBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  // Handle use effect isCoursePage
  if (!isLoaded) return <Loading />;
  if (!user) return <div className="">Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          <div className={cn('dashboard__main')} style={{ height: '100vh' }}>
            <NavBar isCoursePage={false} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
