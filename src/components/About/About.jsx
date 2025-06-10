import { useEffect, useState } from 'react';
import {
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTelegram,
} from 'react-icons/fa';
import profileImg from '../../assets/profile.jpg';
import api from '../../api/axios';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState({ comment: '', about: '' });
  const [socials, setSocials] = useState({
    number: '',
    email: '',
    git_hub: '',
    linkdin: '',
    telegram: '',
  });

  // Ma'lumotlarni olish
  const fetchAbout = async () => {
    try {
      const res = await api.get('/about');
      if (Array.isArray(res.data) && res.data.length > 0) {
        setAboutData(res.data[0]);
      }
    } catch (error) {
      console.error("About ma'lumotlarini olishda xatolik:", error);
    }
  };

  const fetchTarmoqlar = async () => {
    try {
      const res = await api.get('/tarmoqlar');
      if (Array.isArray(res.data) && res.data.length > 0) {
        setSocials(res.data[0]); // Faqat birinchi tarmoq yozuvi olinadi
      }
    } catch (error) {
      console.error('Tarmoqlarni olishda xatolik:', error);
    }
  };

  useEffect(() => {
    fetchAbout();
    fetchTarmoqlar();
  }, []);

  return (
    <div className='about' id='about'>
      <div className='container'>
        <div className='about-wrapper'>
          <h3>
            Men haqimda
            <span className='underline'></span>
          </h3>

          <div className='about-text-wrapper'>
            <div className='about-left'>
              <img src={profileImg} alt='Men haqimda' />
              <div className='image-border'></div>
            </div>

            <div className='about-right'>
              <p className='about-me-text'>
                {aboutData.about || (
                  <>
                    Men Full Stack Web Dasturchiman. 5+ yillik tajribam davomida ko‘plab zamonaviy
                    web ilovalar yaratganman. Asosiy texnologiyalarim: <strong>JavaScript</strong>,{' '}
                    <strong>React.js</strong>, <strong>Node.js</strong>, va <strong>MongoDB</strong>
                    .
                  </>
                )}
              </p>

              <div className='about-me'>
                <h2>
                  <FaEnvelope /> {socials.email || 'ibrohimjon@gmail.com'}
                </h2>
                <h2>
                  <FaPhoneAlt /> {socials.number || '+998 90 222 66 56'}
                </h2>
                <h2>
                  <FaMapMarkerAlt /> O‘zbekiston, Namangan
                </h2>
              </div>

              <div className='about-links'>
                {socials.git_hub && (
                  <a href={socials.git_hub} target='_blank' rel='noopener noreferrer'>
                    <FaGithub /> GitHub profilim
                  </a>
                )}
                {socials.linkdin && (
                  <a href={socials.linkdin} target='_blank' rel='noopener noreferrer'>
                    <FaLinkedin /> LinkedIn profilim
                  </a>
                )}
                {socials.telegram && (
                  <a href={socials.telegram} target='_blank' rel='noopener noreferrer'>
                    <FaTelegram /> Telegram profilim
                  </a>
                )}
              </div>

              <a href='/cv.pdf' download className='about-cv'>
                <FaDownload /> CV'ni yuklab olish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
