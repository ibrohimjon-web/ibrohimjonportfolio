import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axios';
import './Projects.css';

const Projects = ({ darkMode }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Loyihalarni yuklashda xatolik:', err);
        setError("Loyihalarni yuklab bo'lmadi");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  // if (loading) {
  //   return (
  //     <section className={`projects ${darkMode ? 'dark-mode' : 'light-mode'}`} id='projects'>
  //       <div className='loading-spinner'>
  //         <div className='spinner'></div>
  //         <p>Loyihalar yuklanmoqda...</p>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section className={`projects ${darkMode ? 'dark-mode' : 'light-mode'}`} id='projects'>
  //       <div className='error-message'>
  //         <p>{error}</p>
  //         <button onClick={() => window.location.reload()}>Qayta urinish</button>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className={`projects ${darkMode ? 'dark-mode' : 'light-mode'}`} id='projects'>
      <div className='projects-bg-overlay'></div>
      <div className='container'>
        <div className='projects-wrapper'>
          <h2 className='projects-heading animate-slide-down'>Mening Loyihalarim</h2>

          {projects.length === 0 ? (
            <div className='no-projects'>
              <p>Hozircha loyihalar mavjud emas</p>
            </div>
          ) : (
            <>
              <div className='projects-container'>
                {visibleProjects.map((project, index) => (
                  <a
                    href={project.project_url || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`project-card animate-fade-in`}
                    key={project.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className='project-image-container'>
                      <img
                        src={project.image || 'https://via.placeholder.com/600x400?text=No+Image'}
                        alt={project.project_name}
                        className='project-image'
                        loading='lazy'
                      />
                    </div>
                    <div className='project-content'>
                      <h3 className='project-title'>{project.project_name}</h3>
                      <p className='project-description'>{project.comment}</p>
                      <div className='project-tags'>
                        {project.technologies?.map((tag) => (
                          <span key={tag} className='project-tag'>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {projects.length > 3 && (
                <button
                  className='show-more-btn animate-pulse'
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? 'Kamroq koʻrsatish' : 'Barcha loyihalar'}
                </button>
              )}
            </>
          )}

          <ToastContainer position='top-right' autoClose={2500} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
