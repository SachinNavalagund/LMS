'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Loading from '@/components/Loading';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import NavBar from '@/components/NavBar';
import ChaptersSidebar from './user/courses/[courseId]/ChaptersSidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  /* eslint-disable no-useless-escape */
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);

  if (!isLoaded) return <Loading />;
  if (!user) return <div className="">Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          {courseId && <ChaptersSidebar />}
          <div
            className={cn(
              'dashboard__main',
              isCoursePage && 'dashboard__main--not-course'
            )}
            style={{ height: '100vh' }}
          >
            <NavBar isCoursePage={isCoursePage} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
