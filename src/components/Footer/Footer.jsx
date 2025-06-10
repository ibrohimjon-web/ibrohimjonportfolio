import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaGithub, FaHeart, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import './Footer.css';

const Footer = () => {
  const [tarmoqlar, setTarmoqlar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/tarmoqlar');
        setTarmoqlar(res.data);
      } catch (err) {
        toast.error("Ma'lumotlarni yuklashda xatolik!");
      }
    };

    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const socialVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      color: '#3f82f7',
      transition: {
        type: 'spring',
        stiffness: 400,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  const oxirgiTarmoq = tarmoqlar.slice(-1)[0]; // Oxirgi element

  return (
    <motion.footer
      className='footer'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className='footer-overlay'></div>
      <div className='container'>
        <div className='footer-top'>
          <motion.h2
            className='footer-logo'
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              textShadow: '0 0 10px rgba(63, 130, 247, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Ibrohimjon's Portfolio
          </motion.h2>

          {oxirgiTarmoq && (
            <motion.div className='footer-socials' variants={itemVariants}>
              {oxirgiTarmoq.git_hub && (
                <motion.a
                  href={oxirgiTarmoq.git_hub}
                  target='_blank'
                  rel='noopener noreferrer'
                  variants={socialVariants}
                  whileHover='hover'
                  whileTap='tap'
                >
                  <FaGithub />
                </motion.a>
              )}
              {oxirgiTarmoq.linkdin && (
                <motion.a
                  href={oxirgiTarmoq.linkdin}
                  target='_blank'
                  rel='noopener noreferrer'
                  variants={socialVariants}
                  whileHover='hover'
                  whileTap='tap'
                >
                  <FaLinkedin />
                </motion.a>
              )}
              {oxirgiTarmoq.telegram && (
                <motion.a
                  href={oxirgiTarmoq.telegram}
                  target='_blank'
                  rel='noopener noreferrer'
                  variants={socialVariants}
                  whileHover='hover'
                  whileTap='tap'
                >
                  <FaTelegram />
                </motion.a>
              )}
              {oxirgiTarmoq.email && (
                <motion.a
                  href={`mailto:${oxirgiTarmoq.email}`}
                  variants={socialVariants}
                  whileHover='hover'
                  whileTap='tap'
                >
                  <FaEnvelope />
                </motion.a>
              )}
            </motion.div>
          )}
        </div>

        <motion.div className='footer-bottom' variants={itemVariants}>
          <p>&copy; {currentYear} Ibrohimjon Ikromjonov. All rights reserved.</p>
          <motion.p whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            Built with <FaHeart className='heart-icon' /> in Namangan, Uzbekistan
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
