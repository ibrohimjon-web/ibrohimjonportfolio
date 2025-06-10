import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/axios'; // Axios client
import './Skils.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/konikma');
        // Set `color` field randomly or based on index if backend doesn't send it
        const withColor = res.data.map((skill, index) => ({
          ...skill,
          color: generateColor(index),
        }));
        setSkills(withColor);
      } catch (err) {
        toast.error("Ko'nikmalarni yuklashda xatolik!");
        // Set default skills if API fails
        setSkills(getDefaultSkills());
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getDefaultSkills = () => {
    const defaultSkills = [
      { technologie_name: 'HTML', color: '#E44D26' },
      { technologie_name: 'CSS', color: '#264DE4' },
      { technologie_name: 'JavaScript', color: '#F0DB4F' },
      { technologie_name: 'React', color: '#61DAFB' },
      { technologie_name: 'Next.js', color: '#000000' },
      { technologie_name: 'Vue', color: '#68A063' },
    ];
    return defaultSkills;
  };

  const generateColor = (index) => {
    const colors = [
      '#E44D26',
      '#264DE4',
      '#F0DB4F',
      '#61DAFB',
      '#68A063',
      '#000000',
      '#4DB33D',
      '#F34F29',
      '#38B2AC',
      '#3178C6',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return <div className='loading'>Yuklanmoqda...</div>;
  }

  return (
    <div className='skills' id='skills'>
      <div className='container'>
        <div className='skills-wrapper'>
          <h3 className='section-subtitle'>Mening Ko'nikmalarim</h3>
          <h2 className='section-title'>Texnik Tajriba</h2>
          <h3 className='section-description'>Men ishlaydigan texnologiyalar va vositalar</h3>

          <div className='chart-container'>
            {/* Radial Progress Chart */}
            <div className='radial-chart'>
              <h4>Asosiy Texnologiyalar</h4>
              <div className='radial-grid'>
                {skills.slice(0, 6).map((skill, index) => (
                  <div key={index} className='radial-item'>
                    <div
                      className='radial-progress'
                      style={{
                        '--progress': '80%',
                        '--color': skill.color,
                      }}
                    >
                      <span>{skill.technologie_name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Half-Circle Chart */}
            <div className='half-circle-chart'>
              <h4>Texnologiya Buluti</h4>
              <div className='half-circle-container'>
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className='half-circle-segment'
                    style={{
                      '--start': `${index * (100 / skills.length)}%`,
                      '--end': `${(index + 1) * (100 / skills.length)}%`,
                      '--color': skill.color,
                      '--value': '80%',
                    }}
                  ></div>
                ))}
                <div className='half-circle-center'>
                  <small>Texnologiyalar</small>
                </div>
              </div>
              <div className='half-circle-legend'>
                {skills.map((skill, index) => (
                  <div key={index} className='legend-item'>
                    <span className='legend-color' style={{ backgroundColor: skill.color }}></span>
                    <span className='legend-label'>{skill.technologie_name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills List with Animated Bars */}
          <div className='skills-list'>
            <h3>Batafsil Ko'nikmalar:</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>
                  <div className='skill-info'>
                    <span className='skill-name'>{skill.technologie_name}</span>
                  </div>
                  <div className='skill-bar'>
                    <div
                      className='skill-progress'
                      style={{
                        '--width': '100%',
                        backgroundColor: skill.color,
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Hexagon Skill Cloud */}
          <div className='skill-cloud'>
            <h3>Texnologiya Buluti</h3>
            <div className='hex-grid'>
              {skills.map((skill, index) => {
                const size = 60 + (index % 3) * 20; // Vary size based on index
                return (
                  <div
                    key={index}
                    className='hexagon'
                    style={{
                      '--size': `${size}px`,
                      '--color': skill.color,
                      '--delay': `${index * 0.1}s`,
                    }}
                  >
                    <div className='hex-content'>
                      <span>{skill.technologie_name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
