import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/common/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Works } from './pages/Works';
import { Schedule } from './pages/Schedule';
import { Videos } from './pages/Videos';
import { Lesson } from './pages/Lesson';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && (
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/works" element={<Works />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/lesson" element={<Lesson />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      )}

      {isAdmin && (
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      )}
    </>
  );
}

export default App;
