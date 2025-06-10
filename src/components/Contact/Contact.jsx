import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaCode,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTelegram,
  FaTwitter,
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import api from '../../api/axios';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contacts, setContacts] = useState({
    email: 'loading...',
    number: 'loading...',
    git_hub: '',
    linkdin: '',
    telegram: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/tarmoqlar');
        if (res.data.length > 0) {
          // Eng birinchi yozuvni olish yoki default qiymatlar
          const firstContact = res.data[0];
          setContacts({
            email: firstContact.email || 'no-email@example.com',
            number: firstContact.number || '+998 XX XXX XX XX',
            git_hub: firstContact.git_hub || '',
            linkdin: firstContact.linkdin || '',
            telegram: firstContact.telegram || '',
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Ma'lumotlarni yuklashda xatolik:", err);
        setError("Ma'lumotlarni yuklab bo'lmadi");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'backOut',
      },
    },
  };

  useEffect(() => {
    if (inView) {
      document.querySelector('.contact').classList.add('active');
    }
  }, [inView]);

  // if (loading) {
  //   return (
  //     <section className='contact' id='contact'>
  //       <div className='loading-spinner'>
  //         <div className='spinner'></div>
  //         <p>Ma'lumotlar yuklanmoqda...</p>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section className='contact' id='contact'>
  //       <div className='error-message'>
  //         <p>{error}</p>
  //         <button onClick={() => window.location.reload()}>Qayta urinish</button>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className='contact' id='contact'>
      <div className='contact-overlay'></div>
      <div className='container'>
        <motion.div
          className='contact-wrapper'
          ref={ref}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div className='contact-left' variants={itemVariants}>
            <motion.h2 whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              Bog'lanish uchun
            </motion.h2>

            <motion.div className='info-item' variants={itemVariants} whileHover={{ x: 5 }}>
              <FaEnvelope className='icon' />
              <div>
                <h4>Email</h4>
                <p>{contacts.email}</p>
              </div>
            </motion.div>

            <motion.div className='info-item' variants={itemVariants} whileHover={{ x: 5 }}>
              <FaPhone className='icon' />
              <div>
                <h4>Telefon</h4>
                <p>{contacts.number}</p>
              </div>
            </motion.div>

            <motion.div className='info-item' variants={itemVariants} whileHover={{ x: 5 }}>
              <FaMapMarkerAlt className='icon' />
              <div>
                <h4>Manzil</h4>
                <p>Namangan, Uzbekistan</p>
              </div>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Ijtimoiy tarmoqlar
            </motion.h3>

            <motion.div className='social-icons' variants={itemVariants}>
              {contacts.git_hub && (
                <motion.a
                  href={
                    contacts.git_hub.startsWith('http')
                      ? contacts.git_hub
                      : `https://github.com/${contacts.git_hub}`
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ y: -3, scale: 1.1, color: '#3f82f7' }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <FaGithub />
                </motion.a>
              )}

              {contacts.linkdin && (
                <motion.a
                  href={
                    contacts.linkdin.startsWith('http')
                      ? contacts.linkdin
                      : `https://linkedin.com/in/${contacts.linkdin}`
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ y: -3, scale: 1.1, color: '#3f82f7' }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <FaLinkedin />
                </motion.a>
              )}

              {contacts.telegram && (
                <motion.a
                  href={
                    contacts.telegram.startsWith('http')
                      ? contacts.telegram
                      : `https://t.me/${contacts.telegram}`
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ y: -3, scale: 1.1, color: '#3f82f7' }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <FaTelegram />
                </motion.a>
              )}

              <motion.a
                href='https://portfolio.com'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ y: -3, scale: 1.1, color: '#3f82f7' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <FaCode />
              </motion.a>
            </motion.div>

            <motion.div
              className='map'
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47946.77108734797!2d71.60810817623828!3d41.005095185946225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb84e6dfc5ab6b%3A0x84a5cde512a2edfd!2sNamangan%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000'
                width='100%'
                height='200'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Google Map'
              ></iframe>
            </motion.div>
          </motion.div>

          <motion.div className='contact-right' variants={itemVariants}>
            <motion.h2 whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              Xabar yuborish
            </motion.h2>

            <motion.form
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              variants={containerVariants}
              onSubmit={(e) => {
                e.preventDefault();
                // Form submission logic
                console.log('Form submitted');
              }}
            >
              <motion.div className='form-row' variants={formItemVariants}>
                <motion.input
                  type='text'
                  placeholder='Ismingiz'
                  required
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 0 2px rgba(63, 130, 247, 0.5)' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
                <motion.input
                  type='email'
                  placeholder='Emailingiz'
                  required
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 0 2px rgba(63, 130, 247, 0.5)' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
              </motion.div>

              <motion.input
                type='text'
                placeholder='Mavzu'
                required
                variants={formItemVariants}
                whileFocus={{ scale: 1.02, boxShadow: '0 0 0 2px rgba(63, 130, 247, 0.5)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              />

              <motion.textarea
                rows='5'
                placeholder='Xabaringiz'
                required
                variants={formItemVariants}
                whileFocus={{ scale: 1.02, boxShadow: '0 0 0 2px rgba(63, 130, 247, 0.5)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              ></motion.textarea>

              <motion.button
                type='submit'
                variants={formItemVariants}
                whileHover={{
                  y: -2,
                  scale: 1.05,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Xabarni yuborish
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
