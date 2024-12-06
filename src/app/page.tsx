import NonDashboardNavbar from '@/components/NonDashboardNavbar';
import Landing from './(nondashboard)/landing/page';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <Landing />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
