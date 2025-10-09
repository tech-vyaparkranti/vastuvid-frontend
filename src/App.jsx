import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
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
  useEffect(() => {
    const IMG_FALLBACK = 'https://placehold.co/800x500?text=Image';
    const VIDEO_FALLBACK = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';

    const onImgError = (e) => {
      const t = e.target;
      if (!t || t.tagName !== 'IMG') return;
      if (t.dataset && t.dataset._fallback) return;
      if (t.src && t.src.indexOf('data:') === 0) return; // skip data URIs
      t.dataset._fallback = '1';
      t.src = IMG_FALLBACK;
    };

    const onVideoError = (e) => {
      const v = e.target;
      if (!v || v.tagName !== 'VIDEO') return;
      if (v.dataset && v.dataset._fallback) return;
      v.dataset._fallback = '1';
      while (v.firstChild) v.removeChild(v.firstChild);
      const s = document.createElement('source');
      s.src = VIDEO_FALLBACK;
      s.type = 'video/mp4';
      v.appendChild(s);
      try { v.load(); v.play && v.play(); } catch (_) {}
    };

    function setBgWithFallback(el, url) {
      if (!url) { el.style.backgroundImage = `url("${IMG_FALLBACK}")`; return; }
      const probe = new Image();
      probe.onload = () => { el.style.backgroundImage = `url("${url}")`; };
      probe.onerror = () => { el.style.backgroundImage = `url("${IMG_FALLBACK}")`; };
      probe.src = url;
    }

    function initBackgrounds(ctx) {
      const root = ctx || document;
      const nodes = root.querySelectorAll('[data-bg-src]');
      nodes.forEach((n) => setBgWithFallback(n, n.getAttribute('data-bg-src')));
      const styled = root.querySelectorAll('[style*="background-image"]');
      styled.forEach((n) => {
        const m = (n.style.backgroundImage || '').match(/url\(("|')?(.*?)(\1)\)/);
        if (m && m[2]) setBgWithFallback(n, m[2]);
      });
    }

    document.addEventListener('error', onImgError, true);
    document.addEventListener('error', onVideoError, true);
    initBackgrounds(document);

    const obs = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes && m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          initBackgrounds(node);
        });
      });
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('error', onImgError, true);
      document.removeEventListener('error', onVideoError, true);
      obs.disconnect();
    };
  }, []);

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
