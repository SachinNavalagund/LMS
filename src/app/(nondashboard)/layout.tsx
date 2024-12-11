import NonDashboardNavbar from '@/components/NonDashboardNavbar';

import Footer from '@/components/Footer';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
