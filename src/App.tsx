import { useEffect, useState } from 'react';
import './App.css';
import JARVISDisplay from './components/JARVISDisplay';
import GithubDiagnostics from './components/GithubDiagnostics';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'media' | 'resume' | 'blog' | 'github'>('home');
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

    // Parallax effect for Deep Space Background
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const stars1 = document.querySelector('.stars') as HTMLElement;
      const stars2 = document.querySelector('.stars2') as HTMLElement;
      const stars3 = document.querySelector('.stars3') as HTMLElement;
      const galaxy = document.querySelector('.distant-galaxy') as HTMLElement;

      if (stars1) stars1.style.transform = `translateY(${scrollY * -0.1}px)`;
      if (stars2) stars2.style.transform = `translateY(${scrollY * -0.2}px)`;
      if (stars3) stars3.style.transform = `translateY(${scrollY * -0.3}px)`;
      if (galaxy) galaxy.style.transform = `translateY(${scrollY * -0.05}px) rotate(-15deg)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      twObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, selectedArticle]);

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
      summary: "Setting up CUDA on Ubuntu 22.04 (Jammy Jellyfish) is not as straightforward as it seems. While official documentation exists, version mismatches between NVIDIA drivers, CUDA Toolkit, cuDNN, and deep learning frameworks can easily break GPU acceleration.",
      content: (
        <>
          <h3 className="blog-subtitle">Introduction</h3>
          <p className="blog-paragraph text-muted">Setting up CUDA on Ubuntu 22.04 (Jammy Jellyfish) is not as straightforward as it seems. While official documentation exists, version mismatches between NVIDIA drivers, CUDA Toolkit, cuDNN, and deep learning frameworks can easily break GPU acceleration.</p>
          <p className="blog-paragraph text-muted">This article documents the complete setup process and the key issues I encountered while configuring CUDA for deep learning workloads.</p>

          <h3 className="blog-subtitle">System Overview</h3>
          <ul className="blog-list text-muted">
            <li><strong>OS:</strong> Ubuntu 22.04 LTS (Jammy Jellyfish)</li>
            <li><strong>GPU:</strong> NVIDIA GPU</li>
            <li><strong>Use Case:</strong> PyTorch-based deep learning models</li>
          </ul>

          <h3 className="blog-subtitle">Step 1: Installing NVIDIA Drivers</h3>
          <p className="blog-paragraph text-muted">First, verify GPU detection:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>lspci | grep -i nvidia</code></pre>
          <p className="blog-paragraph text-muted">Then install recommended drivers:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>sudo ubuntu-drivers autoinstall</code></pre>
          <p className="blog-paragraph text-muted">Reboot and confirm:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>nvidia-smi</code></pre>
          <p className="blog-paragraph text-muted"><strong>Issue Faced:</strong> After a kernel update, the driver module failed to load.</p>
          <p className="blog-paragraph text-muted"><strong>Resolution:</strong> Reinstalled drivers and ensured correct DKMS module build before rebooting.</p>

          <h3 className="blog-subtitle">Step 2: Installing CUDA Toolkit</h3>
          <ul className="blog-list text-muted">
            <li>Downloaded compatible CUDA version from NVIDIA’s official archive (important to match driver version).</li>
            <li>Installed via local deb installer instead of apt repository to avoid dependency conflicts.</li>
          </ul>
          <p className="blog-paragraph text-muted">Verified installation:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>nvcc --version</code></pre>

          <h3 className="blog-subtitle">Step 3: Setting Environment Variables</h3>
          <p className="blog-paragraph text-muted">Added to .bashrc:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>export PATH=/usr/local/cuda/bin:$PATH{'\n'}export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH</code></pre>
          <p className="blog-paragraph text-muted">Reloaded shell:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>source ~/.bashrc</code></pre>
          <p className="blog-paragraph text-muted"><strong>Issue Faced:</strong> CUDA binaries worked, but PyTorch did not detect GPU.</p>
          <p className="blog-paragraph text-muted"><strong>Root Cause:</strong> Environment variables were not properly loaded in non-interactive shells.</p>
          <p className="blog-paragraph text-muted"><strong>Fix:</strong> Ensured variables were exported system-wide and verified using:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>echo $LD_LIBRARY_PATH</code></pre>

          <h3 className="blog-subtitle">Step 4: Installing cuDNN</h3>
          <ul className="blog-list text-muted">
            <li>Installed version compatible with installed CUDA version.</li>
            <li>Manually copied files to CUDA directories:</li>
          </ul>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>sudo cp cuda/include/cudnn*.h /usr/local/cuda/include{'\n'}sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64</code></pre>
          <p className="blog-paragraph text-muted">Updated permissions accordingly.</p>

          <h3 className="blog-subtitle">Major Challenges Faced</h3>
          <ul className="blog-list text-muted">
            <li>Driver–CUDA version mismatch</li>
            <li>Broken apt dependencies</li>
            <li>Kernel module conflicts after system updates</li>
            <li>PyTorch detecting CPU only</li>
            <li>Inconsistent environment variables</li>
          </ul>
          <p className="blog-paragraph text-muted">The most critical lesson was verifying the compatibility matrix before installing anything.</p>

          <h3 className="blog-subtitle">Final Verification</h3>
          <p className="blog-paragraph text-muted">Tested using PyTorch:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>import torch{'\n'}print(torch.cuda.is_available()){'\n'}print(torch.cuda.get_device_name(0))</code></pre>
          <p className="blog-paragraph text-muted">Output confirmed successful GPU detection.</p>

          <h3 className="blog-subtitle">Key Takeaways</h3>
          <ul className="blog-list text-muted">
            <li>Always verify NVIDIA driver and CUDA compatibility first</li>
            <li>Avoid mixing apt-based and manual installations</li>
            <li>Recheck environment variables carefully</li>
            <li>Test with deep learning framework, not just nvcc</li>
          </ul>
          <p className="blog-paragraph text-muted">Proper CUDA setup requires strict version alignment and careful validation at each step.</p>
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
          <h3 className="blog-subtitle">Introduction</h3>
          <p className="blog-paragraph text-muted">Integrating Microsoft AirSim with Unreal Engine 5 on Windows 11 is a powerful setup for reinforcement learning and autonomous systems research. However, the integration process involves multiple toolchains and strict version compatibility.</p>
          <p className="blog-paragraph text-muted">This article outlines the setup process and the major build and configuration challenges I encountered.</p>

          <h3 className="blog-subtitle">System Overview</h3>
          <ul className="blog-list text-muted">
            <li><strong>OS:</strong> Windows 11</li>
            <li><strong>Engine:</strong> Unreal Engine 5</li>
            <li><strong>Simulator:</strong> Microsoft AirSim</li>
            <li><strong>Development:</strong> Visual Studio (C++ toolchain)</li>
          </ul>

          <h3 className="blog-subtitle">Step 1: Installing Unreal Engine 5</h3>
          <ul className="blog-list text-muted">
            <li>Installed via Epic Games Launcher.</li>
            <li>Created a blank C++ project.</li>
          </ul>

          <h3 className="blog-subtitle">Step 2: Installing Visual Studio</h3>
          <p className="blog-paragraph text-muted">Installed required components:</p>
          <ul className="blog-list text-muted">
            <li>Desktop development with C++</li>
            <li>MSVC v143 toolset</li>
            <li>Windows 10/11 SDK</li>
          </ul>
          <p className="blog-paragraph text-muted"><strong>Issue Faced:</strong> Build errors due to incorrect SDK version.</p>
          <p className="blog-paragraph text-muted"><strong>Resolution:</strong> Installed exact SDK version required by Unreal Engine build configuration.</p>

          <h3 className="blog-subtitle">Step 3: Cloning and Building AirSim</h3>
          <p className="blog-paragraph text-muted">Cloned AirSim repository and executed build script:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>build.cmd</code></pre>
          <p className="blog-paragraph text-muted">Build succeeded after resolving dependency paths.</p>

          <h3 className="blog-subtitle">Step 4: Integrating AirSim Plugin</h3>
          <ul className="blog-list text-muted">
            <li>Copied AirSim plugin folder into Unreal project's Plugins directory.</li>
            <li>Regenerated project files.</li>
            <li>Built solution from Visual Studio.</li>
          </ul>

          <h3 className="blog-subtitle">Major Issues Faced</h3>

          <h4 className="blog-subtitle" style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.8rem' }}>1. Plugin Compilation Errors</h4>
          <p className="blog-paragraph text-muted" style={{ marginBottom: '0.5rem' }}><strong>Cause:</strong> Toolchain mismatch</p>
          <p className="blog-paragraph text-muted"><strong>Fix:</strong> Verified MSVC version and rebuilt project files</p>

          <h4 className="blog-subtitle" style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.8rem' }}>2. Drone Spawning But No Manual Control</h4>
          <p className="blog-paragraph text-muted" style={{ marginBottom: '0.5rem' }}><strong>Cause:</strong> Incorrect input bindings and missing configuration in settings.json</p>
          <p className="blog-paragraph text-muted"><strong>Fix:</strong> Verified input mappings and updated configuration file</p>

          <h4 className="blog-subtitle" style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.8rem' }}>3. Physics Instability in Simulation</h4>
          <p className="blog-paragraph text-muted" style={{ marginBottom: '0.5rem' }}><strong>Cause:</strong> Unreal physics settings conflicting with AirSim defaults</p>
          <p className="blog-paragraph text-muted"><strong>Fix:</strong> Adjusted physics substepping and ensured correct simulation tick rate</p>

          <h4 className="blog-subtitle" style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.8rem' }}>4. Plugin Not Loading</h4>
          <p className="blog-paragraph text-muted" style={{ marginBottom: '0.5rem' }}><strong>Cause:</strong> Incorrect folder structure</p>
          <p className="blog-paragraph text-muted"><strong>Fix:</strong> Ensured AirSim plugin was placed inside:</p>
          <pre className="blog-code" style={{ display: 'block', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflowX: 'auto', marginBottom: '1rem' }}><code>ProjectFolder/Plugins/AirSim</code></pre>

          <h3 className="blog-subtitle">Testing and Validation</h3>
          <p className="blog-paragraph text-muted">Tested using:</p>
          <ul className="blog-list text-muted">
            <li>Sample environment</li>
            <li>API control via Python</li>
            <li>Manual keyboard control</li>
          </ul>
          <p className="blog-paragraph text-muted">Verified drone movement, sensor data, and camera feeds.</p>

          <h3 className="blog-subtitle">Key Takeaways</h3>
          <ul className="blog-list text-muted">
            <li>Toolchain alignment is critical (Unreal + Visual Studio + SDK)</li>
            <li>Always test in sample environment before custom maps</li>
            <li>Validate plugin placement carefully</li>
            <li>Troubleshoot incrementally, not all at once</li>
          </ul>
          <p className="blog-paragraph text-muted">Simulation-based RL environments demand precise system-level configuration and debugging discipline.</p>
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

        {/* DISTANT GALAXY BACKGROUND */}
        <div className="distant-galaxy"></div>
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
            className={`tab-btn ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            ./my_github_activity
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
            <header className="site-header animate-on-scroll hero-landscape">
              <div className="hero-left-col">
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
                  <a href="/resume.pdf" download="Sanjay_Kumar_S_Resume.pdf" className="btn btn-secondary">Download Resume</a>
                </div>
              </div>
              <div className="hero-right-col">
                <div className="hero-glow"></div>
              </div>
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
          /* MEDIA / DEMOS SECTION (UNDER DEVELOPMENT) */
          <section className="section animate-on-scroll" id="media-demos" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '4rem' }}>
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h2 className="mono" style={{ color: 'var(--accent-blue)', opacity: 0.8, fontSize: '1rem', letterSpacing: '1px', marginBottom: '2rem' }}>
                <span className="typewriter-container"><span className="typewriter">project-demo-media/</span></span>
              </h2>

              <div style={{ width: '100%', margin: '0 auto', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                <JARVISDisplay />
              </div>
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
                <a href="/resume.pdf" download="Sanjay_Kumar_S_Resume.pdf" className="btn btn-secondary">Download PDF</a>
              </div>
              <div className="resume-wrapper" style={{ width: '100%', height: '80vh', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
                <iframe
                  src="/resume.pdf"
                  title="Sanjay Kumar S Resume"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                >
                  <p>Your browser does not support PDFs. <a href="/resume.pdf" download="Sanjay_Kumar_S_Resume.pdf">Download the PDF</a>.</p>
                </iframe>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'github' && (
          /* GITHUB HUD SECTION */
          <section className="section animate-on-scroll" id="github-hud">
            <h2 className="section-title mono" style={{ marginBottom: '1rem' }}>
              <span className="typewriter-container"><span className="typewriter">my_github_activity/</span></span>
            </h2>
            <div className="mono text-muted" style={{ marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Live development diagnostics and contribution metrics.
            </div>

            <GithubDiagnostics />
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
