import { useEffect, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { TiWeatherSunny } from 'react-icons/ti';
import { FaRegMoon, FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import './Navbar.css';

const sections = ['home', 'about', 'skills', 'projects', 'contact'];

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Theme handling
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Enhanced scroll to section with animation
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setIsScrolling(true);
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;

      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 800;
      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));
        window.scrollTo(0, startPosition + distance * run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          setIsScrolling(false);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  // Scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const currentY = window.scrollY;
      setShowNavbar(currentY < lastScrollY || currentY < 100);
      setLastScrollY(currentY);

      // ScrollSpy
      const scrollPos = currentY + window.innerHeight / 3;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(id);
          window.history.replaceState(null, null, `#${id}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isScrolling]);

  // Handle initial hash if present
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      if (sections.includes(id)) {
        setTimeout(() => scrollToSection(id), 100);
      }
    }
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`navbar ${showNavbar ? 'show' : 'hide'}`}>
      <div className='container'>
        <div className='navbar-wrapper'>
          <div
            className='navbar-brand'
            onClick={() => scrollToSection('home')}
            aria-label='Go to Home'
          >
            <IoPersonOutline className='nav-person-icon' />
            <span>Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <nav className='navbar-desktop'>
            <ul className='nav-links'>
              {sections.map((sec) => (
                <li
                  key={sec}
                  className={`nav-link ${activeSection === sec ? 'active' : ''}`}
                  onClick={() => scrollToSection(sec)}
                >
                  <a
                    href={`#${sec}`}
                    className='nav-link-anchor'
                    onClick={(e) => e.preventDefault()}
                    aria-label={`Go to ${sec}`}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </a>
                  <span className='nav-link-underline'></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className='navbar-actions'>
            <button
              className='theme-toggle'
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <TiWeatherSunny className='mode-icon sun' />
              ) : (
                <FaRegMoon className='mode-icon moon' />
              )}
            </button>
            <button
              className='cv-button'
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/cv.pdf';
                link.download = 'cv.pdf';
                link.click();
              }}
              aria-label='Download CV'
            >
              <FaDownload className='download-icon' />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <ul className='mobile-nav-links'>
          {sections.map((sec) => (
            <li
              key={sec}
              className={`mobile-nav-link ${activeSection === sec ? 'active' : ''}`}
              onClick={() => scrollToSection(sec)}
              aria-label={`Go to ${sec}`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </li>
          ))}
        </ul>
        <div className='mobile-menu-actions'>
          <button
            className='mobile-cv-button'
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/cv.pdf';
              link.download = 'cv.pdf';
              link.click();
            }}
          >
            <FaDownload className='download-icon' />
            <span>Download CV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
