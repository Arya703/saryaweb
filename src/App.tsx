import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { X, Github, Linkedin, Facebook, Instagram, Moon, Sun, ExternalLink, Code, GraduationCap, User, Home, Briefcase, Award, Mail, Menu } from 'lucide-react';

function App() {
  // ... (other state variables)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const fullText = "Hello, I'm Arya Sitaula";
    const [typeIndex, setTypeIndex] = useState(0);
    const [formData, setFormData] = useState({
      user_name: '',
      user_email: '',
      message: ''
    });

  // Load environment variables (do this only once at the top)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const apiKey = import.meta.env.VITE_EMAILJS_API_KEY;
  
  useEffect(() => {
    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);
    console.log('API Key:', apiKey);
  
    if (!serviceId || !templateId || !apiKey) {
      console.error('EmailJS environment variables are not set correctly.');
    }
  }, [serviceId, templateId, apiKey]);

    useEffect(() => {
      if (typeIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(prev => prev + fullText[typeIndex]);
          setTypeIndex(prev => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }, [typeIndex, fullText]);
  
    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll('section');
        let current = '';
  
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.id;
          }
        });
  
        setActiveSection(current);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    };
  
    useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
      }
    }, []);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormStatus('');
  
      if (serviceId && templateId && apiKey) {
        emailjs.send(serviceId, templateId, formData, apiKey)
        .then((result) => {
          console.log(result.text);
          setFormStatus('Message sent successfully!');
          setFormData({ user_name: '', user_email: '', message: '' });
          setIsSubmitting(false);
        })
        .catch((error) => {
          console.error(error.text);
          setFormStatus('Failed to send message. Please try again.');
          setIsSubmitting(false);
        });
      } else {
        console.error('EmailJS environment variables are not set correctly.');
        setFormStatus('Failed to send message. Please try again.');
        setIsSubmitting(false);
      }
  
      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    };
  
    const navItems = [
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'about', icon: User, label: 'About' },
      { id: 'skills', icon: Code, label: 'Skills' },
      { id: 'certifications', icon: Award, label: 'Certifications' },
      { id: 'projects', icon: Briefcase, label: 'Projects' },
      { id: 'contact', icon: Mail, label: 'Contact' },
    ];
  
    const skills = {
      technical: [
        'C', 'C++', 'SQL', 'Git', 'Github', 'Python', 'Machine Learning',
      ],
      soft: [
        'Problem Solving', 'Team Leadership', 'Public Speaking', 'Project Management', 'Critical Thinking', 'Growth Mindset',
      ]
    };
  
    const certifications = [
      // ... (certification data)
       {
        title: "Git and Github",
        issuer: "365 Data Science",
        link: "https://learn.365datascience.com/certificates/CC-E6D72296D2/"
      },
      {
        title: "Intro to ChatGPT and Generative AI",
        issuer: "365 Data Science",
        link: "https://learn.365datascience.com/certificates/CC-686A3D57F8/"
      },
      {
        title: "Introduction to Snowflake",
        issuer: "DataCamp",
        link: "https://www.datacamp.com/statement-of-accomplishment/course/a4cdf4cca1774ff0b14dbc18faeb010cf795ecbd?raw=1"
      },
      {
        title: "Joining Data In SQL",
        issuer: "DataCamp",
        link: "https://www.datacamp.com/statement-of-accomplishment/course/0cdcca19f6e6da6f1723859869ac420b2d3824bc?raw=1"
      },
      {
        title: "Intermediate Python",
        issuer: "DataCamp",
        link: "https://www.datacamp.com/statement-of-accomplishment/course/43b8cdf1e841c5dd203e4298f2418e677a377d0b?raw=1"
      },
      {
        title: "Generative AI Concepts",
        issuer: "DataCamp",
        link: "https://www.datacamp.com/statement-of-accomplishment/course/6a2dc16ee224b582594a8b39a836732bfb8225cd?raw=1"
      },
      {
        title: "SQL for Data Science",
        issuer: "Great Learning",
        link: "https://olympus.mygreatlearning.com/courses/40120/certificate?pb_id=581"
      }
    ];
  
    const projects = [
      // ... (project data)
       {
        title: 'Email Spam Classifier',
        description: 'Built an AI-powered email spam detection system using NLP and machine learning. Used TF-IDF for feature extraction and combined Random Forest and Gradient Boosting to analyze email content, subject lines, and headers, achieving high accuracy in filtering spam.',
        tech: ['Python', 'scikit-learn', 'NLTK', 'TF-IDF', 'Random Forest', 'Gradient Boosting'],
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2'
      },
      {
        title: 'Fake News Detection Using Deep Learning',
        description: 'Developed a fake news detection system using NLP and deep learning. Leveraged Word2Vec embeddings and BiLSTM layers to analyze news headlines and content, effectively identifying fake news based on textual patterns and context.',
        tech: ['Python', 'TensorFlow', 'Word2Vec', 'BiLSTM'],
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'
      }
    ];
  
  
    return (
  <div className={`min-h-screen bg-gradient-to-br from-[#FFF8DC] to-[#FFE4C4] dark:from-gray-900 dark:to-black transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        {/* Navigation */}
    <nav className="fixed w-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text">AS</span> {/* Replace with your logo or name */}
          </div>
  
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`
                  ${activeSection === id
                    ? 'text-pink-600 dark:text-pink-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300'
                  } hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200
                `}
              >
               {label}
              </a>
            ))}
                  <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
  
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
             {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
  
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white/95 dark:bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ id, icon: Icon, label }) => (
              <a
              key={id}
              href={`#${id}`}
              className={`
                ${activeSection === id
                  ? 'text-pink-600 dark:text-pink-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300'
                } block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200
              `}
            onClick = {() => setIsMenuOpen(false)}
            >
  
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
  
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="text-center md:text-left md:w-1/2 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">{typedText}</span>
          <span className="animate-blink">|</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-8 animate-slide-in">
          Computer Engineering Student driven by an interest for AI and Machine Learning.
        </p>
        <div className="flex justify-center md:justify-start space-x-4 mb-8">
          <a href="https://github.com/Arya703" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6" style={{ color: '#333' }} />
          </a>
          <a href="https://www.linkedin.com/in/arya-sitaula-b4704b232/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6" style={{ color: '#0077B5' }} />
          </a>
          <a href="https://www.facebook.com/arya.sitaula.7" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6" style={{ color: '#1877F2' }} />
          </a>
          <a href="https://www.instagram.com/arya_sitaula/" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6" style={{ color: '#E4405F' }} />
          </a>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 animate-float">
        <div className="relative w-64 h-80 mx-auto"> {/* Adjust size as needed */}
          <img
            src="https://i.ibb.co/ft7fK7t/photo-2025-01-20-14-41-33.jpg"
            alt="Arya Sitaula"
            className="rounded-lg shadow-lg w-full h-full object-cover border-4 border-white dark:border-gray-800"
          />
        </div>
      </div>
    </div>
  </section>
  
        {/* About Section */}
        <section id="about" className="py-20 bg-[#FFF8DC]/50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-12 animate-bounce-slow">About Me</h2>
            <div className="flex justify-center">
              <div className="max-w-3xl bg-white/80 dark:bg-black/80 p-8 rounded-xl shadow-lg backdrop-blur-sm animate-fade-in hover:transform hover:scale-105 transition-all duration-300">
                <div className="space-y-6">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    As a tech enthusiast, I'm passionate about leveraging technology to solve complex real-world problems. My journey in tech has been driven by an insatiable curiosity and a desire to create meaningful solutions that can improve people's lives.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Beyond research and coding, I find joy in singing, listening to a variety of songs, reading supplementary books, and traveling to new places. At my core, I love learning, creating, and making a positive impact through technology and beyond. 
                  </p>
                </div>
              </div>
          </div>
          </div>
        </section>
  
  
   {/* Education Section */}
  <section className="py-16 bg-[#FFF8DC]/30 dark:bg-gray-900/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-[#9370DB] dark:text-[#9370DB] mb-12">Education</h2>
      <div className="space-y-6 animate-slide-in">
        <div className="space-y-8">
          <div className="transform hover:scale-105 transition-all duration-300 p-4 rounded-lg bg-white/50 dark:bg-black/50 hover:shadow-xl">
            <div className="flex items-center space-x-4">
              <GraduationCap className="w-8 h-8 text-[#9370DB]" />
              <div>
                <p className="text-black dark:text-white font-bold text-lg animate-pulse">Bachelor's in Computer Engineering</p>
                <p className="text-gray-700 dark:text-gray-300">Khwopa College Of Engineering(TU)</p>
                <p className="text-gray-600 dark:text-gray-400">2019-2024</p>
              </div>
            </div>
          </div>
  
          <div className="transform hover:scale-105 transition-all duration-300 p-4 rounded-lg bg-white/50 dark:bg-black/50 hover:shadow-xl">
                  <div className="flex items-center space-x-4">
                    <Award className="w-8 h-8 text-[#9370DB]" />
                    <div>
                      <p className="text-black dark:text-white font-bold text-lg animate-pulse">+2 Science</p>
                      <p className="text-gray-700 dark:text-gray-300">Kathmandu Model College(KMC), Bagbazar</p>
                      <p className="text-gray-600 dark:text-gray-400">2017-2019</p>
                    </div>
                  </div>
                </div>
             </div>
           </div>
         </div>
       </section>
  
  
        {/* Skills Section */}
        <section id="skills" className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-[#9370DB] dark:text-[#9370DB] mb-12">Skills</h2>
      <div className="space-y-12">
  
  
        <div>
          <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.technical.map((skill, index) => (
              <div
                key={skill}
                className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 border border-orange-200 dark:border-orange-700"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-orange-800 dark:text-orange-100 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
  
          <div>
          <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6">Soft Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.soft.map((skill, index) => (
                <div
                key={skill}
                className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 border border-orange-200 dark:border-orange-700"
                  style={{ animationDelay: `${index * 0.1}s` }} // Add animation delay here
                >
                  <span className="text-orange-800 dark:text-orange-100 font-medium">{skill}</span>
                </div>
                    ))}
                  </div>
                </div>
              </div>  
            </div>
          </section>
  
        {/* Certifications Section */}
        <section id="certifications" className="py-20 bg-[#FFF8DC]/50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-12">Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-pink-200 dark:border-pink-800"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{cert.issuer}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sky-500 hover:text-sky-600"
                  >
                    View Certificate <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#9370DB] dark:text-[#9370DB] mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"> {/*Change lg:grid-cols-3 to lg:grid-cols-2*/}
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-pink-200 dark:border-pink-800"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* You can add a link to the project here if needed */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-[#FFF8DC]/50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#9370DB] dark:text-[#9370DB] mb-12">Get in Touch</h2>
            <form onSubmit={sendEmail} className="space-y-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
  
  
    <div className="space-y-4">
      <label htmlFor="user_name" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Name</label>
      <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="user_email" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Email</label>
                <input
  
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="message" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Message</label>
  <textarea
                  id="message"
                  name="message"
                  rows={5} // Adjust number of rows as needed
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                ></textarea>
  
              </div>
  
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
   {formStatus && (
                <div className="text-center text-green-600 dark:text-green-400">
                  {formStatus}
                </div>
              )}
  
            </form>
          </div>
        </section>
  
        {/* Footer */}
   <footer className="bg-white/80 dark:bg-black/80 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/Arya703" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6" style={{ color: '#333' }} />
              </a>
              <a
                href="https://www.linkedin.com/in/arya-sitaula-b4704b232/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" style={{ color: '#0077B5' }} />
              </a>
              <a href="https://www.facebook.com/arya.sitaula.7" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6" style={{ color: '#1877F2' }} />
              </a>
              <a href="https://www.instagram.com/arya_sitaula/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6" style={{ color: '#E4405F' }} />
              </a>
            </div>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              © 2024 Arya Sitaula. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
  
  export default App;