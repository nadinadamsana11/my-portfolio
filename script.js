
// 1. Navigation Component
const Navbar = ({ darkMode, toggleTheme }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navRef = React.useRef(null);

    // Smooth Scroll Function (Header එකට යට නොවී නියමිත තැනට Scroll කිරීම)
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 0; // CSS padding මගින් පාලනය වන නිසා 0 ලෙස වෙනස් කරන ලදී
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    // මෙනුවෙන් පිටත ක්ලික් කළ විට මෙනුව වැසීම (Close menu on outside click)
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [navRef]);

    return (
        <nav ref={navRef} className={`navbar navbar-expand-lg fixed-top shadow-sm ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'}`}>
            <div className="container">
                <a className="navbar-brand fw-bold" href="#">Nadina Damsana</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-3 p-3 p-lg-0">
                        <li className="nav-item w-100 w-lg-auto">
                            <a className="nav-link custom-nav-link text-center" href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
                        </li>
                        <li className="nav-item w-100 w-lg-auto">
                            <a className="nav-link custom-nav-link text-center" href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
                        </li>
                        <li className="nav-item w-100 w-lg-auto">
                            <a className="nav-link custom-nav-link text-center" href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
                        </li>
                        <li className="nav-item w-100 w-lg-auto">
                            <a className="nav-link custom-nav-link text-center" href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
                        </li>
                        <li className="nav-item w-100 w-lg-auto">
                            <a className="nav-link custom-nav-link text-center" href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')}>Reviews</a>
                        </li>
                        <li className="nav-item w-100 w-lg-auto">
                            <a className="nav-link custom-nav-link text-center" href="#blog" onClick={(e) => scrollToSection(e, 'blog')}>Blog</a>
                        </li>
                        <li className="nav-item w-100 w-lg-auto">
                            <a className="btn btn-primary rounded-pill px-4 w-100 w-lg-auto" href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                        </li>
                        <li className="nav-item">
                            <button className="theme-toggle-btn" onClick={toggleTheme}>
                                <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// 2. Hero Section (Introduction)
const Hero = ({ darkMode }) => {
    const shape1Ref = React.useRef(null);
    const shape2Ref = React.useRef(null);
    const cubeRef = React.useRef(null);
    const isRendering = React.useRef(false);

    const handleMouseMove = (e) => {
        if (!isRendering.current) {
            const clientX = e.clientX;
            const clientY = e.clientY;
            const width = window.innerWidth;
            const height = window.innerHeight;

            requestAnimationFrame(() => {
                const x = (clientX / width - 0.5) * 40;
                const y = (clientY / height - 0.5) * 40;

                if (shape1Ref.current) shape1Ref.current.style.transform = `translate(${x * -1.5}px, ${y * -1.5}px)`;
                if (shape2Ref.current) shape2Ref.current.style.transform = `translate(${x}px, ${y}px)`;
                if (cubeRef.current) cubeRef.current.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
                
                isRendering.current = false;
            });
            isRendering.current = true;
        }
    };

    return (
        <section 
            id="home" 
            className={`hero d-flex align-items-center ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}
            onMouseMove={handleMouseMove}
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-right">
                        <h1 className="display-4 fw-bold mb-3">Hi, I'm <span className="text-primary">Nadina Damsana</span></h1>
                        <h2 className="h3 mb-4">Freelance Web Developer</h2>
                        <p className="lead mb-4">
                            I specialize in building high-quality, responsive websites and applications. 
                            Let's turn your ideas into reality with modern web technologies.
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                            <a href="#contact" className="btn btn-vibrant btn-lg px-4 shadow">Hire Me</a>
                            <a href="assets/cv.pdf" download className={`btn btn-lg px-4 shadow ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                                Download CV <i className="bi bi-download ms-2"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 mb-5 mb-lg-0" data-aos="fade-left">
                        <div className="hero-visual">
                            {/* Floating Shapes (Parallax Effect) */}
                            <div ref={shape1Ref} className="shape shape-1"></div>
                            <div ref={shape2Ref} className="shape shape-2"></div>
                            
                            {/* 3D Rotating Cube */}
                            <div ref={cubeRef} className="cube-wrapper">
                                <div className="cube-container">
                                    <div className="cube-face front"><i className="bi bi-code-slash"></i></div>
                                    <div className="cube-face back"><i className="bi bi-laptop"></i></div>
                                    <div className="cube-face right"><i className="bi bi-database"></i></div>
                                    <div className="cube-face left"><i className="bi bi-braces"></i></div>
                                    <div className="cube-face top"><i className="bi bi-cpu"></i></div>
                                    <div className="cube-face bottom"><i className="bi bi-globe"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 3. About Section (New)
const About = ({ darkMode }) => {
    return (
        <section id="about" className={`section-fullscreen ${darkMode ? 'bg-black text-white' : 'bg-light'}`}>
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
                        <img src="https://placehold.co/600x600/png?text=About+Me" alt="About Me" className="img-fluid rounded-3 shadow-lg" />
                    </div>
                    <div className="col-lg-6" data-aos="fade-left">
                        <h2 className="display-5 fw-bold mb-4">About Me</h2>
                        <p className="lead mb-4">
                            I am a passionate developer with a keen eye for detail and a drive for creating exceptional digital experiences.
                        </p>
                        <p className="mb-4">
                            With over 5 years of experience in the industry, I have worked on a diverse range of projects, from small business websites to large-scale enterprise applications. My approach combines technical expertise with creative problem-solving to deliver solutions that not only meet but exceed client expectations.
                        </p>
                        <div className="row g-3 mb-4">
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    <span>Problem Solver</span>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    <span>Creative Thinker</span>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    <span>Team Player</span>
                                </div>
                            </div>
                        </div>
                        <a href="#contact" className="btn btn-primary px-4 rounded-pill">Contact Me</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 3. Skills Section
const Skills = ({ darkMode }) => {
    // තරු නිර්මාණය කිරීම (Stars Generation)
    const stars = React.useMemo(() => [...Array(50)].map((_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2
    })), []);

    const skills = [
        { name: "React JS", icon: "bi-filetype-jsx", color: "text-info" },
        { name: "JavaScript", icon: "bi-filetype-js", color: "text-warning" },
        { name: "Bootstrap", icon: "bi-bootstrap", color: "text-primary" },
        { name: "Tailwind", icon: "bi-wind", color: "text-success" },
        { name: "Node JS", icon: "bi-hexagon", color: "text-success" },
        { name: "Database", icon: "bi-database", color: "text-secondary" },
    ];
    return (
        <section id="skills" className={`section-fullscreen position-relative ${darkMode ? 'bg-black' : 'bg-light'}`}>
            {/* Starry Background (Visible in Dark Mode) */}
            {darkMode && (
                <div className="stars-container">
                    {stars.map((s, i) => (
                        <div key={i} className="star" style={{
                            left: `${s.left}%`,
                            top: `${s.top}%`,
                            width: `${s.size}px`,
                            height: `${s.size}px`,
                            animationDuration: `${s.duration}s`
                        }}></div>
                    ))}
                </div>
            )}
            <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className={`fw-bold display-6 ${darkMode ? 'text-white' : ''}`}>My Skills</h2>
                    <p className={`lead ${darkMode ? 'text-light opacity-75' : 'text-secondary fw-bold'}`}>Technologies I work with</p>
                </div>
                
                <div className="orbit-container">
                    <div className="orbit-center">
                        <img 
                            src="https://placehold.co/150x150/png?text=Me" 
                            alt="Profile" 
                            className="rounded-circle shadow-lg" 
                            style={{ width: '100px', height: '100px', objectFit: 'cover', zIndex: 20 }} 
                        />
                    </div>
                    <div className="orbit-system">
                        {skills.map((s, i) => (
                            <div key={i} className="skill-item" style={{ '--i': i, '--total': skills.length }}>
                                <div className="skill-rotator">
                                    <div className={`skill-card ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-white'}`}>
                                        <i className={`bi ${s.icon} fs-2 ${s.color}`}></i>
                                        <span className="small fw-bold mt-1">{s.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// 4. Projects Section
const Projects = ({ darkMode }) => {
    const projects = [
        { title: "E-Commerce Platform", desc: "Full-stack shopping platform.", img: "https://placehold.co/600x400/png?text=Project+1", link: "https://github.com" },
        { title: "Portfolio Website", desc: "Modern personal portfolio.", img: "https://placehold.co/600x400/png?text=Project+2", link: "https://github.com" },
        { title: "Task Management", desc: "Productivity tool.", img: "https://placehold.co/600x400/png?text=Project+3", link: "https://github.com" },
        { title: "Social Media App", desc: "Connect with friends.", img: "https://placehold.co/600x400/png?text=Project+4", link: "https://github.com" },
        { title: "Weather Dashboard", desc: "Real-time weather updates.", img: "https://placehold.co/600x400/png?text=Project+5", link: "https://github.com" },
        { title: "Fitness Tracker", desc: "Track your workouts.", img: "https://placehold.co/600x400/png?text=Project+6", link: "https://github.com" },
        { title: "Blog Platform", desc: "Share your thoughts.", img: "https://placehold.co/600x400/png?text=Project+7", link: "https://github.com" },
        { title: "Recipe Finder", desc: "Discover new meals.", img: "https://placehold.co/600x400/png?text=Project+8", link: "https://github.com" },
        { title: "Chat Application", desc: "Real-time messaging.", img: "https://placehold.co/600x400/png?text=Project+9", link: "https://github.com" },
        { title: "Finance Visualizer", desc: "Track expenses.", img: "https://placehold.co/600x400/png?text=Project+10", link: "https://github.com" },
    ];
    return (
        <section id="projects" className={`portfolio ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <div className="container-fluid overflow-hidden">
                <div className="section-title" data-aos="fade-up">
                    <h2 className={`fw-bold display-6 ${darkMode ? 'text-white' : ''}`}>Featured Projects</h2>
                    <p>Some of my recent work</p>
                </div>
                
                {/* Marquee Scrolling Container */}
                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* අඛණ්ඩව ගලා යාම සඳහා ලැයිස්තුව දෙවරක් පෙන්වීම */}
                        {[...projects, ...projects].map((p, i) => (
                            <div key={i} className="project-card">
                            <img src={p.img} className="project-image" alt={p.title} />
                            <div className="project-info">
                                <h3 className="h5 fw-bold">{p.title}</h3>
                                <p className="small">{p.desc}</p>
                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded-pill px-4 mt-2">View Details</a>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// 5. Testimonials / Reviews Section (New)
const Testimonials = ({ darkMode }) => {
    const reviews = [
        { name: "John Doe", role: "CEO, TechCorp", text: "Nadina is an exceptional developer. The attention to detail and code quality is outstanding.", img: "https://placehold.co/100x100/png?text=JD" },
        { name: "Jane Smith", role: "Marketing Director", text: "Working with Nadina was a pleasure. Delivered on time and exceeded our expectations.", img: "https://placehold.co/100x100/png?text=JS" },
        { name: "Mike Johnson", role: "Product Manager", text: "Great communication skills and technical ability. Highly recommended for any web project.", img: "https://placehold.co/100x100/png?text=MJ" }
    ];

    return (
        <section id="reviews" className={`section-fullscreen ${darkMode ? 'bg-black text-white' : 'bg-light'}`}>
            <div className="container py-5">
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className="fw-bold display-6">Client Reviews</h2>
                    <p className="text-muted">What people say about my work</p>
                </div>
                <div className="row g-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={`card h-100 border-0 shadow-sm p-4 testimonial-card ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}>
                                <div className="d-flex align-items-center mb-4">
                                    <img src={review.img} alt={review.name} className="rounded-circle me-3" width="50" height="50" />
                                    <div>
                                        <h5 className="mb-0 fw-bold">{review.name}</h5>
                                        <small className="text-muted">{review.role}</small>
                                    </div>
                                </div>
                                <p className="card-text fst-italic">"{review.text}"</p>
                                <div className="mt-3 text-warning">
                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 6. Blog Section (New)
const Blog = ({ darkMode }) => {
    const [allPosts, setAllPosts] = React.useState([]); // සියලුම Posts ගබඩා කිරීමට
    const [visibleCount, setVisibleCount] = React.useState(3); // දැනට පෙන්වන ප්‍රමාණය
    const [loading, setLoading] = React.useState(true); // Loading State එක

    React.useEffect(() => {
        // Blogger JSON Feed එකෙන් දත්ත ලබා ගැනීම
        fetch('https://blackwebproject.blogspot.com/feeds/posts/default?alt=json')
            .then(res => res.json())
            .then(data => {
                const entries = data.feed.entry || []; // Entry නොමැති නම් හිස් Array එකක්
                const fetchedPosts = entries.map(entry => {
                    // 1. Link එක ලබා ගැනීම
                    const link = entry.link.find(l => l.rel === 'alternate').href;
                    
                    // 2. Image එක ලබා ගැනීම (Thumbnail එක ලොකු කර ගැනීම)
                    let img = "https://placehold.co/600x400/png?text=No+Image";
                    if (entry.media$thumbnail) {
                        // s72-c (කුඩා) වෙනුවට w600-h400-c (ලොකු) ලෙස වෙනස් කිරීම
                        img = entry.media$thumbnail.url.replace(/\/s[0-9]+(-c)?\//, "/w600-h400-c/"); 
                    } else if (entry.content && entry.content.$t) {
                        // Content එකේ img tag එකක් තිබේදැයි බැලීම
                        const doc = new DOMParser().parseFromString(entry.content.$t, 'text/html');
                        const imgTag = doc.querySelector('img');
                        if (imgTag) img = imgTag.src;
                    }

                    // 3. කෙටි විස්තරය (Excerpt) සකසා ගැනීම
                    let excerpt = "";
                    if (entry.summary) {
                        excerpt = entry.summary.$t;
                    } else if (entry.content) {
                        const doc = new DOMParser().parseFromString(entry.content.$t, 'text/html');
                        excerpt = doc.body.textContent || "";
                    }
                    excerpt = excerpt.substring(0, 100) + "...";

                    // 4. දිනය ආකෘතිකරණය
                    const date = new Date(entry.published.$t).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'short', day: 'numeric' 
                    });

                    return { title: entry.title.$t, date, excerpt, img, link };
                });
                setAllPosts(fetchedPosts);
                setLoading(false); // දත්ත ලැබුණු පසු Loading නවැත්වීම
            })
            .catch(err => {
                console.error("Failed to fetch blog posts", err);
                setLoading(false);
            });
    }, []);

    // Load More Button Click Event
    const handleLoadMore = (e) => {
        e.preventDefault();
        setVisibleCount(prev => prev + 3); // තවත් 3ක් පෙන්වන්න
    };

    return (
        <section id="blog" className={`section-fullscreen ${darkMode ? 'bg-dark text-white' : 'bg-white'}`}>
            <div className="container py-5">
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className="fw-bold display-6">Latest Blog Posts</h2>
                    <p className="text-muted">Thoughts and insights on technology</p>
                </div>
                <div className="row g-4">
                    {loading ? (
                        // Loading Animation (Skeleton Loader) - පෙන්වීමට කාඩ්පත් 3ක්
                        [1, 2, 3].map((n) => (
                            <div key={n} className="col-md-4">
                                <div className={`card h-100 border-0 shadow-sm overflow-hidden ${darkMode ? 'bg-secondary bg-opacity-10' : ''}`}>
                                    <div className="skeleton skeleton-img"></div>
                                    <div className="card-body p-4">
                                        <div className="skeleton skeleton-text w-25"></div>
                                        <div className="skeleton skeleton-title"></div>
                                        <div className="skeleton skeleton-text"></div>
                                        <div className="skeleton skeleton-text"></div>
                                        <div className="skeleton skeleton-text w-50"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // දත්ත ලැබුණු පසු Posts පෙන්වීම
                        allPosts.slice(0, visibleCount).map((post, index) => (
                            <div key={index} className="col-md-4" data-aos="fade-up">
                                <div className={`card h-100 border-0 shadow-sm overflow-hidden blog-card ${darkMode ? 'bg-secondary bg-opacity-10 text-white' : ''}`}>
                                    <img src={post.img} className="card-img-top" alt={post.title} />
                                    <div className="card-body p-4">
                                        <small className="text-primary fw-bold">{post.date}</small>
                                        <h5 className="card-title fw-bold mt-2">{post.title}</h5>
                                        <p className="card-text small opacity-75">{post.excerpt}</p>
                                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none fw-bold">Read More <i className="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="text-center mt-5">
                    {/* තවත් Posts තිබේ නම් පමණක් Load More බොත්තම පෙන්වීම */}
                    {!loading && visibleCount < allPosts.length && (
                        <button onClick={handleLoadMore} className="btn btn-primary rounded-pill px-4 me-2">Load More</button>
                    )}
                    <a href="https://blackwebproject.blogspot.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-pill px-4">Visit Blog</a>
                </div>
            </div>
        </section>
    );
};

// 5. Contact Section
const Contact = ({ darkMode }) => {

    // reCAPTCHA Script එක load කිරීම (Component එක mount වූ පසු)
    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        
        return () => document.body.removeChild(script);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. reCAPTCHA Validation (Client-side)
        // reCAPTCHA එක click කර නැත්නම් මෙතැනින් නවතී
        if (window.grecaptcha && window.grecaptcha.getResponse().length === 0) {
            alert("Please verify that you are not a robot.");
            return;
        }

        // 2. AJAX Submission (Redirect issue විසඳීමට)
        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                window.location.href = "thankyou.html"; // සාර්ථක වූ පසු Redirect කිරීම
            } else {
                alert("Oops! There was a problem submitting your form.");
            }
        } catch (error) {
            alert("Oops! There was a problem submitting your form.");
        }
    };

    return (
        <section id="contact" className={`section-fullscreen ${darkMode ? 'bg-black text-white' : 'bg-light'}`}>
            <div className="container py-5">
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className="fw-bold display-6">Get In Touch</h2>
                    <p className="text-muted">Let's discuss your project</p>
                </div>

                <div className="row g-5 align-items-stretch">
                    {/* Contact Info */}
                    <div className="col-lg-5" data-aos="fade-right">
                        <div className={`p-5 rounded-4 h-100 d-flex flex-column justify-content-center ${darkMode ? 'bg-dark' : 'bg-white shadow-sm'}`}>
                            <h3 className="fw-bold mb-4">Contact Information</h3>
                            <p className="mb-5 text-muted">Fill up the form and I will get back to you within 24 hours.</p>
                            
                            <div className="d-flex align-items-center mb-4">
                                <div className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
                                    <i className="bi bi-telephone-fill fs-5"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="fw-bold mb-0">Phone</h6>
                                    <p className="text-muted mb-0">+94 7X XXX XXXX</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <div className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
                                    <i className="bi bi-envelope-fill fs-5"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="fw-bold mb-0">Email</h6>
                                    <p className="text-muted mb-0">contact@nadina.dev</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
                                    <i className="bi bi-geo-alt-fill fs-5"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="fw-bold mb-0">Location</h6>
                                    <p className="text-muted mb-0">Colombo, Sri Lanka</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="col-lg-7" data-aos="fade-left">
                        <div className={`p-5 rounded-4 h-100 position-relative ${darkMode ? 'bg-dark' : 'bg-white shadow-sm'}`}>
                            
                            <form action="https://formspree.io/f/xaqyawyj" method="POST" onSubmit={handleSubmit}>
                                {/* 1. Submission එකෙන් පසු Redirect කිරීම සඳහා */}
                                <input type="hidden" name="_next" value="thankyou.html" />
                                
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">YOUR NAME</label>
                                        <input type="text" name="name" className={`form-control p-3 ${darkMode ? 'bg-black text-white border-secondary' : 'bg-light border-0'}`} placeholder="John Doe" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">YOUR EMAIL</label>
                                        <input type="email" name="email" className={`form-control p-3 ${darkMode ? 'bg-black text-white border-secondary' : 'bg-light border-0'}`} placeholder="john@example.com" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-muted">SUBJECT</label>
                                        <input type="text" name="subject" className={`form-control p-3 ${darkMode ? 'bg-black text-white border-secondary' : 'bg-light border-0'}`} placeholder="Project Discussion" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-muted">MESSAGE</label>
                                        <textarea name="message" className={`form-control p-3 ${darkMode ? 'bg-black text-white border-secondary' : 'bg-light border-0'}`} rows="5" placeholder="Tell me about your project..." required></textarea>
                                    </div>
                                    
                                    {/* 2. Google reCAPTCHA එකතු කිරීම (Spam වැළැක්වීමට) */}
                                    <div className="col-12">
                                        <div className="g-recaptcha" data-sitekey="6Ld4PzosAAAAAH3AhnujLnaYgvrOwk_L0WsW4Lwo"></div>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3">
                                            <span>Send Message <i className="bi bi-send-fill ms-2"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 6. Footer Component
const Footer = ({ darkMode }) => {
    return (
        <footer className={`py-4 text-center ${darkMode ? 'bg-black text-white border-top border-secondary' : 'bg-secondary text-white'}`}>
            <div className="container">
                <div className="social-links mb-3">
                    <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-github"></i></a>
                </div>
                <p className="mb-0 small opacity-75">
                    &copy; {new Date().getFullYear()} <strong>Nadina Damsana</strong>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

// 7. Back to Top Button Component
const BackToTop = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    // Scroll කරන විට බටන් එක පෙන්වීම/සැඟවීම
    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Back to Top බටන් එක පෙනෙන විට Terminal Icon එක ඉහළට ගැනීම
    React.useEffect(() => {
        const terminalIcon = document.getElementById('terminal-icon');
        if (terminalIcon) {
            if (isVisible) {
                terminalIcon.classList.add('move-up');
            } else {
                terminalIcon.classList.remove('move-up');
            }
        }
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button 
            className={`back-to-top ${isVisible ? 'visible' : ''}`} 
            onClick={scrollToTop}
        >
            <i className="bi bi-arrow-up"></i>
        </button>
    );
};

// Main App Component
function App() {
    // වෙලාව අනුව Dark Mode ස්වයංක්‍රීයව සැකසීම (සවස 6 සිට උදෑසන 6 දක්වා)
    const [darkMode, setDarkMode] = React.useState(() => {
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6;
    });

    React.useEffect(() => {
        // Initialize AOS Animation
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        const html = document.documentElement;
        if (darkMode) {
            html.setAttribute('data-bs-theme', 'dark');
            document.body.classList.add('bg-dark');
        } else {
            html.setAttribute('data-bs-theme', 'light');
            document.body.classList.remove('bg-dark');
        }
    }, [darkMode]);

    return (
        <React.Fragment>
            <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            <Skills darkMode={darkMode} />
            <Projects darkMode={darkMode} />
            <Testimonials darkMode={darkMode} />
            <Blog darkMode={darkMode} />
            <Contact darkMode={darkMode} />
            <Footer darkMode={darkMode} />
            <BackToTop />
        </React.Fragment>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

// Terminal Functionality
(() => {
    const terminalIcon = document.getElementById('terminal-icon');
    const terminalWindow = document.getElementById('terminal-window');
    const closeTerminal = document.getElementById('close-terminal');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalResizer = document.getElementById('terminal-resizer');

    if (!terminalIcon || !terminalWindow) return;

    // Initial Welcome Message
    const welcomeMessage = `
        <div style="margin-bottom: 10px; color: #4ade80;">
            <p>Welcome to Nadina's Portfolio Terminal v1.0.0</p>
            <p>Available commands:</p>
            <ul style="list-style: none; padding-left: 15px;">
                <li>> <strong>about</strong> - Who am I?</li>
                <li>> <strong>projects</strong> - View my projects</li>
                <li>> <strong>skills</strong> - My technical skills</li>
                <li>> <strong>contact</strong> - Get in touch</li>
                <li>> <strong>clear</strong> - Clear terminal</li>
            </ul>
        </div>
    `;
    terminalOutput.innerHTML = welcomeMessage;

    // Show/Hide Terminal
    terminalIcon.addEventListener('click', function () {
        terminalWindow.style.display = 'flex';
        terminalIcon.style.display = 'none';
    });

    closeTerminal.addEventListener('click', function () {
        terminalWindow.style.display = 'none';
        terminalIcon.style.display = 'flex';
    });

    // Handle Input
    terminalInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            terminalOutput.innerHTML += `<p>&gt; ${command}</p>`;

            if (command === 'about') {
                terminalOutput.innerHTML += `<p>I am Nadina Damsana, a freelance web developer.</p>`;
            } else if (command === 'projects') {
                terminalOutput.innerHTML += `
                    <p>Featured Projects:</p>
                    <ul style="list-style: none; padding-left: 15px;">
                        <li>- E-Commerce Platform</li>
                        <li>- Portfolio Website</li>
                        <li>- Task Management App</li>
                    </ul>`;
            } else if (command === 'skills') {
                terminalOutput.innerHTML += `<p>Skills: React JS, JavaScript, Bootstrap, Tailwind, Node JS, Database</p>`;
            } else if (command === 'contact') {
                terminalOutput.innerHTML += `<p>Email: contact@nadina.dev<br>GitHub: github.com/nadina</p>`;
            } else if (command === 'help') {
                terminalOutput.innerHTML += welcomeMessage;
            } else if (command === 'clear') {
                terminalOutput.innerHTML = '';
            } else {
                terminalOutput.innerHTML += `<p style="color: #ef4444;">Command not recognized. Type 'help' for list.</p>`;
            }

            terminalInput.value = '';
            // Auto scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    // Resize Functionality (උස වෙනස් කිරීම)
    let isResizing = false;

    terminalResizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        document.body.style.userSelect = 'none'; // Resize කරන විට අකුරු select වීම වැළැක්වීම
    });

    function resize(e) {
        if (!isResizing) return;
        const newHeight = window.innerHeight - e.clientY;
        // අවම උස 60px (Header + Input පමණක් පෙනෙන පරිදි) සහ උපරිම උස තිරයෙන් 50px අඩුවෙන් තැබීම
        if (newHeight > 60 && newHeight < window.innerHeight - 50) {
            terminalWindow.style.height = `${newHeight}px`;
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
        document.body.style.userSelect = '';
    }
})();

// Custom Cursor Logic
(() => {
    const cursor = document.querySelector('.cursor-dot');
    if (!cursor) return;

    // 1. මවුස් එක චලනය වන විට රවුම ගමන් කරවීම
    document.addEventListener('mousemove', (e) => {
        // සරලව left සහ top අගයන් වෙනස් කිරීම
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. Button හෝ Link එකක් මතට ගිය විට ලොකු කිරීම (Event Delegation)
    // React භාවිතා කරන නිසා කෙලින්ම elements තෝරාගැනීමට වඩා මෙය සාර්ථකයි
    document.addEventListener('mouseover', (e) => {
        const target = e.target;

        // Terminal එක මතදී Custom Cursor එක සැඟවීම
        if (target.closest('#terminal-window')) {
            cursor.classList.add('hidden');
        } else {
            cursor.classList.remove('hidden');
        }

        if (target.closest('a') || 
            target.closest('button') || 
            target.closest('.btn') || 
            target.closest('input') || 
            target.closest('textarea') ||
            target.closest('.project-card') ||
            target.closest('.skill-card')) {
            cursor.classList.add('active');
        } else {
            cursor.classList.remove('active');
        }
    });

    // 3. Click කරන විට Animation එකක් එකතු කිරීම
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicked');
    });
})();