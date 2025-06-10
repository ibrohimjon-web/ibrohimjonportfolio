import './Banner.css';
import { FaTelegramPlane, FaGithub, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Banner = () => {
  const fullText = 'Men full stack dasturchiman';
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const [aboutComment, setAboutComment] = useState('');
  const [tarmoqlar, setTarmoqlar] = useState({
    telegram: '',
    email: '',
    git_hub: '',
    number: '',
  });

  // Typing effekt
  useEffect(() => {
    if (index <= fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.substring(0, index));
        setIndex(index + 1);
        if (index === fullText.length) {
          setIsTypingComplete(true);
        }
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Smooth scroll
  useEffect(() => {
    const links = document.querySelectorAll('.banner-btns a');

    const handleClick = (e, targetId) => {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    links.forEach((link) => {
      const targetId = link.getAttribute('href').replace('#', '');
      link.addEventListener('click', (e) => handleClick(e, targetId));
    });

    return () => {
      links.forEach((link) => {
        const targetId = link.getAttribute('href').replace('#', '');
        link.removeEventListener('click', (e) => handleClick(e, targetId));
      });
    };
  }, []);

  // GET ma'lumotlar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutRes = await api.get('/about');
        if (Array.isArray(aboutRes.data) && aboutRes.data.length > 0) {
          setAboutComment(aboutRes.data[0].comment || '');
        }

        const tarmoqlarRes = await api.get('/tarmoqlar');
        if (Array.isArray(tarmoqlarRes.data) && tarmoqlarRes.data.length > 0) {
          const t = tarmoqlarRes.data[0];
          setTarmoqlar({
            telegram: t.telegram || '',
            email: t.email || '',
            git_hub: t.git_hub || '',
            number: t.number || '',
          });
        }
      } catch (err) {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='banner' id='home'>
      <div className='banner-overlay'>
        <h3>Assalomu aleykum, Hush kelib siz menig portfolioyimga</h3>

        <div className='typing-container'>
          <h1 className='typing-text'>
            {text}
            {!isTypingComplete && <span>|</span>}
          </h1>
        </div>

        <p>
          {aboutComment ||
            'I create efficient and beautiful web applications using modern technologies. With a focus on user experience and clean code, I bring ideas to life.'}
        </p>

        <div className='banner-btns'>
          <a href='#projects' className='banner-btn banner-btn-1'>
            View My Projects
          </a>
          <a href='#contact' className='banner-btn banner-btn-2'>
            Contact Me
          </a>
        </div>

        <div className='banner-links'>
          {tarmoqlar.telegram && (
            <a href={tarmoqlar.telegram} target='_blank' rel='noopener noreferrer'>
              <FaTelegramPlane className='banner-icon' />
              Telegram
            </a>
          )}
          {tarmoqlar.email && (
            <a href={`mailto:${tarmoqlar.email}`}>
              <MdEmail className='banner-icon' />
              Email
            </a>
          )}
          {tarmoqlar.git_hub && (
            <a href={tarmoqlar.git_hub} target='_blank' rel='noopener noreferrer'>
              <FaGithub className='banner-icon' />
              GitHub
            </a>
          )}
          {tarmoqlar.number && (
            <a href={`tel:${tarmoqlar.number.replace(/\s/g, '')}`}>
              <FaPhoneAlt className='banner-icon' />
              {tarmoqlar.number}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
