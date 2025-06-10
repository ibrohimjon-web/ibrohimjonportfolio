import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './Scroll.css';

const Scroll = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <div className='scroll-top' onClick={scrollTop}>
        <FaArrowUp />
      </div>
    )
  );
};

export default Scroll;
