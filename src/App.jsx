import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Index from './component/Index';
import About from './component/About';
import Service from './component/Service';
import ServiceDetails from './component/ServiceDetails';
import Team from './component/Team';
import TeamDetails from './component/TeamDetails';
import Contact from './component/Contact';
import Blog from './component/Blog';
import BlogDetails from './component/BlogDetails';
import Portfolio from './component/portfolio';
import PortfolioDetails from './component/PortfolioDetails';
import Faq from './component/Faq';
import ErrorPage from './component/ErrorPage';
import Pricing from './component/Pricing';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import ProtectedRoute from './component/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>

      <Navbar />
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/teams" element={<Team />} />
        <Route path="/team-details" element={<TeamDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio-details" element={<PortfolioDetails />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      {/* </Layout> */}
      <Footer />

    </BrowserRouter>
  );
};

export default App;
