import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'media' | 'resume' | 'blog'>('home');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);


  useEffect(() => {
    // General scroll observer for fade-ups
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Specific observer for typewriter effect only when scrolled securely into view
    const twObserverCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('typewriter-animate');
        }
      });
    };
    const twObserver = new IntersectionObserver(twObserverCallback, { threshold: 0.5 });
    const twElements = document.querySelectorAll('.typewriter');
    twElements.forEach(el => twObserver.observe(el));

    return () => {
      observer.disconnect();
      twObserver.disconnect();
    };
  }, []);

  const experience = [
    {
      role: "Undergraduate Researcher",
      company: "SRM Institute of Science and Technology",
      date: "2025 – Present",
      points: [
        "Developed reinforcement learning control policies in Unreal Engine 5",
        "Designed reward functions and state representations",
        "Benchmarked autonomous navigation performance",
        "Optimized real-time simulation and system-level pipelines"
      ]
    }
  ];

  const projects = [
    {
      title: "Cattle-Go",
      desc: "AI-powered cattle breed classification system using computer vision and deep learning with multilingual support and RAG chatbot.",
      tags: ["Computer Vision", "Deep Learning", "RAG"],
      github: "https://github.com/Sanjay1712KSK/Cattle-Go"
    },
    {
      title: "Drug MRP Price Prediction",
      desc: "Machine learning model for pharmaceutical MRP estimation using structured data preprocessing and regression techniques.",
      tags: ["Machine Learning", "Regression", "Data Preprocessing"],
      github: "https://github.com/Sanjay1712KSK/Drug-MRP-Price-Prediction"
    },
    {
      title: "Padayappa Paarvai",
      desc: "Interactive repository structure visualizer converting JSON trees into dynamic hierarchical UI.",
      tags: ["Web", "Interactive UI"],
      github: "https://github.com/Sanjay1712KSK/Padayappa-Paarvai"
    },
    {
      title: "Rule-Based Chatbot with UI",
      desc: "React and TypeScript chatbot with persistent conversation handling and rule-processing engine.",
      tags: ["React", "TypeScript"],
      github: "https://github.com/Sanjay1712KSK/Rule-Based-Chatbot-with-UI"
    },
    {
      title: "Simulation-Based Reinforcement Learning for Autonomous Systems",
      desc: "Reinforcement learning control system built using Unreal Engine 5 and Cosys AirSim.",
      tags: ["Reinforcement Learning", "Unreal Engine 5", "Cosys AirSim"],
      github: "https://github.com/Sanjay1712KSK"
    }
  ];

  const mediaDemos = [
    {
      title: "Simulation-Based Autonomous Nav",
      type: "video",
      src: "https://www.youtube.com/embed/placeholder1", // Replace with real links
      desc: "UE5 RL Training Environment"
    },
    {
      title: "Cattle-Go UI Flow",
      type: "video",
      src: "https://www.youtube.com/embed/placeholder2",
      desc: "Computer Vision & RAG Advisory Demo"
    },
    {
      title: "Padayappa Paarvai Interaction",
      type: "image",
      src: "https://via.placeholder.com/600x400/1e1e1e/00f0ff?text=JSON+Visualizer+Demo",
      desc: "Interactive JSON Tree UI"
    },
    {
      title: "Drug Price Forecasting",
      type: "image",
      src: "https://via.placeholder.com/600x400/1e1e1e/8a2be2?text=Prediction+Model+Output",
      desc: "Model inference dashboard"
    }
  ];

  const achievements = [
    {
      title: "SRM SDG Hackathon – 3rd Place",
      year: "2024"
    },
    {
      title: "NLH AI x Legal Hackathon – 2nd Runner-Up",
      year: "2025"
    }
  ];

  const blogs = [
    {
      id: 1,
      title: "Configuring CUDA Toolkit on Ubuntu 22.04 (Jammy Jellyfish) for Deep Learning",
      category: "Systems / GPU / Deep Learning",
      date: "February 2026",
      summary: "A detailed breakdown of installing and configuring NVIDIA drivers, CUDA Toolkit, cuDNN, and resolving version compatibility issues on Ubuntu Jammy for deep learning workflows.",
      content: (
        <>
          <p className="blog-paragraph text-muted">Setting up CUDA correctly on Ubuntu 22.04 can be challenging due to strict driver compatibility, kernel dependencies, and mismatched library versions. This article documents the complete setup process and the major issues encountered during installation.</p>

          <h3 className="blog-subtitle">Key Steps Covered:</h3>
          <ul className="blog-list text-muted">
            <li>Installing correct NVIDIA drivers</li>
            <li>Verifying GPU detection using <code className="blog-code">nvidia-smi</code></li>
            <li>Installing compatible CUDA Toolkit version</li>
            <li>Setting PATH and LD_LIBRARY_PATH variables</li>
            <li>Installing cuDNN</li>
            <li>Verifying installation with <code className="blog-code">nvcc --version</code></li>
          </ul>

          <h3 className="blog-subtitle">Difficulties Faced:</h3>
          <ul className="blog-list text-muted">
            <li>Driver and CUDA version mismatch errors</li>
            <li>Kernel module conflicts after system updates</li>
            <li>Broken dependencies while installing via apt</li>
            <li>Environment variables not recognized after reboot</li>
            <li>PyTorch not detecting CUDA despite correct installation</li>
          </ul>

          <h3 className="blog-subtitle">Solutions Implemented:</h3>
          <ul className="blog-list text-muted">
            <li>Manual driver reinstallation</li>
            <li>Cleaning previous CUDA versions completely</li>
            <li>Verifying compatibility matrix before installation</li>
            <li>Rebuilding environment variables</li>
            <li>Testing with <code className="blog-code">torch.cuda.is_available()</code></li>
          </ul>

          <h3 className="blog-subtitle">Conclusion:</h3>
          <p className="blog-paragraph text-muted">Proper version alignment between driver, CUDA Toolkit, cuDNN, and deep learning frameworks is critical. Verifying compatibility before installation prevents most runtime failures.</p>
        </>
      )
    },
    {
      id: 2,
      title: "Integrating AirSim with Unreal Engine 5 on Windows 11: Setup and Challenges",
      category: "Simulation / Reinforcement Learning",
      date: "February 2026",
      summary: "Step-by-step guide to setting up Microsoft AirSim with Unreal Engine 5 on Windows 11, including common build errors and simulation control issues.",
      content: (
        <>
          <p className="blog-paragraph text-muted">Integrating AirSim with Unreal Engine 5 for reinforcement learning simulations involves careful configuration of Visual Studio, Unreal build tools, and plugin compatibility. This article outlines the setup process and key troubleshooting insights.</p>

          <h3 className="blog-subtitle">Setup Overview:</h3>
          <ul className="blog-list text-muted">
            <li>Installing Unreal Engine 5</li>
            <li>Installing Visual Studio with required C++ build tools</li>
            <li>Cloning AirSim repository</li>
            <li>Building AirSim using build scripts</li>
            <li>Integrating AirSim plugin into Unreal project</li>
            <li>Configuring settings.json for simulation control</li>
          </ul>

          <h3 className="blog-subtitle">Difficulties Faced:</h3>
          <ul className="blog-list text-muted">
            <li>Visual Studio toolchain mismatch</li>
            <li>Unreal build errors during plugin compilation</li>
            <li>Incorrect AirSim settings configuration</li>
            <li>Drone spawning but no manual control</li>
            <li>Physics inconsistencies during simulation</li>
            <li>Plugin not loading due to directory structure errors</li>
          </ul>

          <h3 className="blog-subtitle">Solutions Implemented:</h3>
          <ul className="blog-list text-muted">
            <li>Ensuring correct MSVC and Windows SDK version</li>
            <li>Rebuilding Unreal project files</li>
            <li>Verifying AirSim plugin placement</li>
            <li>Correct input bindings configuration</li>
            <li>Testing with sample environment before custom scene</li>
          </ul>

          <h3 className="blog-subtitle">Conclusion:</h3>
          <p className="blog-paragraph text-muted">Simulation environments require strict toolchain alignment and proper plugin configuration. Testing in incremental stages prevents cascading build errors.</p>
        </>
      )
    }
  ];

  return (
    <>
      {/* DEEP SPACE BACKGROUND */}
      <div className="deep-space-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="shooting-star"></div>
      </div>

      <div className="app-container">

        {/* TOP NAVIGATION / TABS */}
        <nav className="tab-nav mono animate-on-scroll">
          <button
            className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            ./home
          </button>
          <button
            className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => { setActiveTab('blog'); setSelectedArticle(null); }}
          >
            ./blog
          </button>
          <button
            className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            ./project_demo_medias
          </button>
          <button
            className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            ./resume_viewer
          </button>
        </nav>

        {activeTab === 'home' && (
          <>
            {/* HEADER / HERO SECTION */}
            <header className="site-header animate-on-scroll hero-compact">
              <h1 className="name-header">SANJAY KUMAR S</h1>
              <div className="header-subtitle mono text-muted">
                <span>AI Systems Engineer</span>
                <span className="separator">|</span>
                <span>B.Tech CSE (AI &amp; ML)</span>
                <span className="separator">|</span>
                <span>SRM University, Chennai</span>
                <span className="separator">|</span>
                <span className="header-cgpa">CGPA: 9.44</span>
              </div>

              <p className="hero-position-statement mono text-muted" style={{ marginTop: '0.8rem', fontSize: '1.05rem' }}>
                Building AI-driven autonomous and simulation-based systems.
              </p>

              <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
                <a href="#projects" className="btn btn-primary">View Selected Work</a>
                <button onClick={() => { setActiveTab('blog'); setSelectedArticle(null); window.scrollTo(0, 0); }} className="btn btn-secondary">Read My Blog</button>
                <a href="/resume.pdf" target="_blank" className="btn btn-secondary">Download Resume</a>
              </div>

              <div className="hero-glow"></div>
            </header>

            {/* ABOUT SECTION */}
            <section className="section" id="about">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">About</span></span>
              </h2>
              <div className="animate-on-scroll">
                <p className="about-text">
                  Computer Science student specializing in Artificial Intelligence and Machine Learning. Focused on reinforcement learning, computer vision, and simulation-based autonomous systems. Passionate about building reliable AI systems that operate under uncertainty and scale efficiently.
                </p>
              </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section className="section" id="experience">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">Experience</span></span>
              </h2>
              <div className="experience-list">
                {experience.map((exp, idx) => (
                  <div key={idx} className="experience-item animate-on-scroll">
                    <div className="exp-header">
                      <h3 className="exp-role">{exp.role}</h3>
                      <div className="exp-company-date">
                        <span className="exp-company text-muted">{exp.company}</span>
                        <span className="separator mx-2">|</span>
                        <span className="exp-date mono">{exp.date}</span>
                      </div>
                    </div>
                    <ul className="exp-points">
                      {exp.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* CURRENTLY BUILDING SECTION */}
            <section className="section" id="building">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">Currently Building</span></span>
              </h2>
              <div className="building-list mono animate-on-scroll">
                <div className="building-item">&gt; Simulation-based RL for autonomous navigation</div>
                <div className="building-item">&gt; Reward shaping optimization strategies</div>
                <div className="building-item">&gt; RAG-based intelligent advisory systems</div>
                <div className="building-item">&gt; Experimenting with policy benchmarking frameworks</div>
              </div>
            </section>

            {/* TECHNICAL FOCUS SECTION */}
            <section className="section" id="focus">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">Technical Focus</span></span>
              </h2>
              <div className="focus-grid animate-on-scroll">
                <span className="focus-tag">Reinforcement Learning</span>
                <span className="focus-tag">Autonomous Systems</span>
                <span className="focus-tag">Simulation Environments</span>
                <span className="focus-tag">System Performance Optimization</span>
                <span className="focus-tag">Generative AI &amp; LLMs</span>
                <span className="focus-tag">Kernel Fundamentals</span>
              </div>
            </section>

            {/* PROJECTS SECTION */}
            <section className="section" id="projects">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">Selected Work</span></span>
              </h2>
              <div className="projects-grid">
                {projects.map((proj, idx) => (
                  <div key={idx} className={`project-card animate-on-scroll delay-${(idx % 2 === 0 ? 100 : 200)}`}>
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.desc}</p>

                    <div className="project-tags" style={{ marginTop: '1rem' }}>
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="project-tag">{tag}</span>
                      ))}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                      <a href={proj.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TECH STACK SECTION */}
            <section className="section" id="tech">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">Core Technologies</span></span>
              </h2>
              <div className="tech-grid">
                <div className="tech-card animate-on-scroll delay-100">
                  <div className="tech-category">Programming</div>
                  <div className="tech-items">Python, C, C++, Java, Dart, TypeScript</div>
                </div>
                <div className="tech-card animate-on-scroll delay-200">
                  <div className="tech-category">AI / ML</div>
                  <div className="tech-items">Machine Learning, Deep Learning, Reinforcement Learning, Computer Vision, RAG Systems</div>
                </div>
                <div className="tech-card animate-on-scroll delay-300">
                  <div className="tech-category">Frameworks &amp; Tools</div>
                  <div className="tech-items">React 18, Vite, Git, MySQL, Unreal Engine 5, Cosys AirSim</div>
                </div>
                <div className="tech-card animate-on-scroll delay-100">
                  <div className="tech-category">Systems</div>
                  <div className="tech-items">Linux, UNIX, Performance Optimization</div>
                </div>
              </div>
            </section>

            {/* ACHIEVEMENTS SECTION */}
            <section className="section" id="achievements">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">Achievements</span></span>
              </h2>
              <div className="achievements-list">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="achievement-item animate-on-scroll delay-100">
                    <span className="ach-title">{ach.title}</span>
                    <span className="ach-year mono">({ach.year})</span>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="section" id="contact">
              <h2 className="section-title mono">
                <span className="typewriter-container"><span className="typewriter">Connect</span></span>
              </h2>
              <div className="animate-on-scroll delay-100">
                <div className="contact-links">
                  <a href="mailto:sanjayksk1712@gmail.com" className="contact-link">Email: sanjayksk1712@gmail.com</a>
                  <a href="https://github.com/Sanjay1712KSK" className="contact-link" target="_blank" rel="noreferrer">GitHub: https://github.com/Sanjay1712KSK</a>
                  <a href="https://www.linkedin.com/in/sanjaykumarksk/" className="contact-link" target="_blank" rel="noreferrer">LinkedIn: https://www.linkedin.com/in/sanjaykumarksk/</a>
                </div>
                <div style={{ marginTop: '3rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  root@portfolio:~$ <span className="blinking-cursor"></span>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'blog' && (
          /* BLOG SECTION */
          <section className="section animate-on-scroll" id="blog">
            <h2 className="section-title mono">
              <span className="typewriter-container"><span className="typewriter">Blog</span></span>
            </h2>

            {selectedArticle === null ? (
              <div className="animate-on-scroll delay-100">
                <p className="about-text" style={{ marginBottom: '2rem' }}>
                  Engineering notes and troubleshooting breakdowns from real-world AI system setup and simulation environments.
                </p>
                <div className="blog-grid">
                  {blogs.map((blog, idx) => (
                    <div key={idx} className={`blog-card animate-on-scroll delay-${(idx % 2 === 0 ? 100 : 200)}`}>
                      <h3 className="blog-title">{blog.title}</h3>
                      <p className="blog-summary">{blog.summary}</p>
                      <div className="blog-meta mono text-muted">
                        <span>{blog.category}</span>
                        <span className="separator mx-2">|</span>
                        <span>{blog.date}</span>
                      </div>
                      <div className="blog-action" style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => setSelectedArticle(blog.id)}>Read Article</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="article-view animate-on-scroll">
                <button className="btn btn-secondary mb-4" onClick={() => setSelectedArticle(null)} style={{ marginBottom: '2rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  &lt; Back to Blog
                </button>

                {blogs.filter(b => b.id === selectedArticle).map((blog) => (
                  <div key={blog.id} className="article-content terminal-block-alt">
                    <h2 className="article-title">{blog.title}</h2>
                    <div className="blog-meta mono text-muted" style={{ marginBottom: '2.5rem', marginTop: '0.5rem' }}>
                      <span>{blog.category}</span>
                      <span className="separator mx-2">|</span>
                      <span>{blog.date}</span>
                    </div>
                    <div className="article-body">
                      {blog.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'media' && (
          /* MEDIA / DEMOS SECTION */
          <section className="section animate-on-scroll" id="media-demos">
            <h2 className="section-title mono">
              <span className="typewriter-container"><span className="typewriter">Project Demo Media's</span></span>
            </h2>

            <div className="media-grid">
              {mediaDemos.map((media, idx) => (
                <div key={idx} className={`media-card animate-on-scroll delay-${(idx % 2 === 0 ? 100 : 200)}`}>
                  <div className="media-wrapper">
                    {media.type === 'video' ? (
                      <iframe
                        src={media.src}
                        title={media.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="media-content"
                      ></iframe>
                    ) : (
                      <img src={media.src} alt={media.title} className="media-content" />
                    )}
                  </div>
                  <div className="media-info">
                    <h3 className="media-title mono">{media.title}</h3>
                    <p className="media-desc text-muted">{media.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'resume' && (
          /* RESUME VIEWER SECTION */
          <section className="section animate-on-scroll" id="resume-viewer">
            <h2 className="section-title mono">
              <span className="typewriter-container"><span className="typewriter">Resume Viewer</span></span>
            </h2>
            <div className="resume-container" style={{ marginTop: '2rem' }}>
              <div className="resume-actions" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">Open in New Tab</a>
                <a href="/resume.pdf" download className="btn btn-secondary">Download PDF</a>
              </div>
              <div className="resume-wrapper" style={{ width: '100%', height: '80vh', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
                <iframe
                  src="/resume.pdf"
                  title="Sanjay Kumar S Resume"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                >
                  <p>Your browser does not support PDFs. <a href="/resume.pdf">Download the PDF</a>.</p>
                </iframe>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer style={{ textAlign: 'center', padding: '2rem 0', marginTop: '4rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <p className="mono text-muted" style={{ fontSize: '0.9rem' }}>
            Sanjay Kumar S all rights reserved 2026
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
