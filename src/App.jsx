import './App.css';
import About from './components/About/About';
import Banner from './components/Banner/Banner';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';
import Scroll from './components/SCROLL/Scroll';
import Skils from './components/Skils/Skils';

const App = () => {
  return (
    <div>
      <Scroll />
      <Navbar />
      <Banner />
      <About />
      <Skils />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
