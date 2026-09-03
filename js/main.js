/**
 * Umesh Gimhan — Portfolio 2026 Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbarScrollSpy();
  initMobileMenu();
  initProjectFilteringAndModal();
  initContactForm();
  initScrollObserver();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (storedTheme === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }

  updateThemeIcons(storedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      const newTheme = isLight ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(icon => {
    if (theme === 'light') {
      icon.className = 'theme-toggle-icon fas fa-sun text-amber-500';
    } else {
      icon.className = 'theme-toggle-icon fas fa-moon text-indigo-400';
    }
  });
}

/* ==========================================================================
   2. Hero Typing Animation
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'System Implementation Specialist & Developer',
    'Full-Stack Developer (MERN & Go)',
    'QA Intern @ 21C Care',
    'System Implementation Engineer',
    'Android & Mobile Developer',
    'QA & Automation Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navbar Sticky & ScrollSpy Active Links
   ========================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Glass navbar shadow effect
    if (window.scrollY > 40) {
      navbar?.classList.add('shadow-lg', 'border-b', 'border-gray-800/50');
    } else {
      navbar?.classList.remove('shadow-lg');
    }

    // ScrollSpy active link detection
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active-link');
      }
    });
  });
}

/* ==========================================================================
   4. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileDrawer) return;

  function toggleMenu(open) {
    if (open) {
      mobileDrawer.classList.remove('translate-x-full');
      mobileDrawerOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      mobileDrawer.classList.add('translate-x-full');
      mobileDrawerOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    toggleMenu(!isExpanded);
  });

  mobileDrawerOverlay?.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   5. Projects Filtering & Detail Modal
   ========================================================================== */
const projectsData = [
  {
    id: 'slsba',
    title: 'SLSBA Management Platform',
    category: 'fullstack',
    image: 'images/SLSBA.png',
    fallbackImg: 'https://via.placeholder.com/800x500/6366f1/ffffff?text=SLSBA+Project',
    summary: 'A full MERN stack dashboard for Sri Lanka Schools Badminton Association.',
    problem: 'Sri Lanka Schools Badminton Association needed a centralized, efficient portal to manage national tournament registrations, match schedules, player rosters, and rankings seamlessly.',
    solution: 'Designed and engineered a custom web platform with intuitive admin controls, automated player classification, dynamic tournament draw brackets, and real-time score updates.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://slsba.onrender.com/',
    githubUrl: 'https://github.com/Umesh123971'
  },
  {
    id: 'pizza-billing',
    title: '21C Care Pizza Billing System',
    category: 'fullstack',
    image: 'images/pizza.png',
    fallbackImg: 'https://via.placeholder.com/800x500/fbbf24/ffffff?text=Pizza+Billing',
    summary: 'Full-stack web application for pizza shop operations and billing.',
    problem: 'Fast-paced restaurant counters require instant order creation, accurate pricing calculations, invoice printing, and real-time inventory synchronization without latency.',
    solution: 'Engineered a high-performance backend using Go and PostgreSQL paired with a lightweight React + TypeScript frontend, delivering sub-second invoice generation and POS reliability.',
    tech: ['Go (Golang)', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://pizza-billing-frontend.onrender.com',
    githubUrl: 'https://github.com/Umesh123971/21c-care-pizza-billing'
  },
  {
    id: 'fitness-hub',
    title: 'Ceylon Fitness Hub 🏋️‍♂️',
    category: 'fullstack',
    image: 'images/gym.jpeg',
    fallbackImg: 'https://via.placeholder.com/800x500/9333ea/ffffff?text=Fitness+Hub',
    summary: 'Comprehensive fitness center management platform built with MERN.',
    problem: 'Gym managers faced challenges managing member subscriptions, workout schedule assignments, trainer slots, and automated billing reminders manually.',
    solution: 'Developed an all-in-one gym management portal with secure user authentication, subscription status tracking, class scheduling, and member progress analytics.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    liveUrl: 'https://fitnesshub-ldtq.onrender.com',
    githubUrl: 'https://github.com/Umesh123971/21c-fitness-hub'
  },
  {
    id: 'flood-relief',
    title: 'Flood Relief Management System 💧',
    category: 'fullstack',
    image: 'images/flood.jpg',
    fallbackImg: 'https://via.placeholder.com/800x500/2563eb/ffffff?text=Flood+Relief',
    summary: 'Disaster management platform for coordinating flood relief efforts.',
    problem: 'During natural flood disasters, rescue organizations and victims struggle with fragmented communication, delayed resource allocation, and unverified request lists.',
    solution: 'Built a real-time crisis coordination dashboard allowing affected citizens to submit emergency relief requests while enabling field teams to map, track, and dispatch supplies.',
    tech: ['React', 'Go (Golang)', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://flood-relief-frontend.onrender.com/',
    githubUrl: 'https://github.com/Umesh123971/flood-relief-system'
  },
  {
    id: 'finance-tracker',
    title: 'Personal Finance Tracker App',
    category: 'mobile',
    image: 'images/ft.jpeg',
    fallbackImg: 'https://via.placeholder.com/800x500/10b981/ffffff?text=Finance+Tracker',
    summary: 'Android mobile app to track income, daily expenses, and budgets.',
    problem: 'Individuals often struggle to maintain daily financial discipline due to complex spreadsheet tracking tools or bloated mobile apps.',
    solution: 'Built a sleek native Android application in Kotlin with offline Room DB persistence, expense category breakdowns, budget alerts, and clean visual spending summaries.',
    tech: ['Kotlin', 'Android SDK', 'SQLite / Room', 'Material Design'],
    liveUrl: null,
    githubUrl: 'https://github.com/Umesh123971'
  },
  {
    id: 'rainbowpages',
    title: 'Rainbowpages.lk Modern Redesign',
    category: 'design',
    image: 'images/fu.png',
    fallbackImg: 'https://via.placeholder.com/800x500/ec4899/ffffff?text=Rainbowpages',
    summary: 'Next-generation directory UI/UX redesign created in Figma.',
    problem: 'Legacy directory listing platforms suffer from outdated navigation, cluttered visual elements, and poor mobile search experience.',
    solution: 'Designed a modern, minimalist interface prototype with enhanced search ergonomics, clear typography hierarchy, intuitive filters, and responsive design systems.',
    tech: ['Figma', 'UI/UX Design', 'Wireframing', 'Design Systems'],
    liveUrl: 'https://www.figma.com/design/3TIIugwYQtcxAieBp1Rg3z/Untitled?node-id=0-1&t=22btnn5PoXFUalkj-0',
    githubUrl: null
  },
  {
    id: 'hugo-realestate',
    title: 'HUGO Real Estate Mobile App UI',
    category: 'design',
    image: 'images/fu.png',
    fallbackImg: 'https://via.placeholder.com/800x500/8b5cf6/ffffff?text=HUGO+Real+Estate',
    summary: 'Mobile app UI design for Australian real estate discovery.',
    problem: 'Property buyers need a streamlined mobile interface to browse property listings, filter location features, and schedule virtual viewings quickly.',
    solution: 'Crafted a premium iOS/Android mobile design system featuring high-resolution property cards, interactive map views, agent chat screens, and bookmark workflows.',
    tech: ['Figma', 'Mobile UI', 'Prototyping', 'User Research'],
    liveUrl: 'https://www.figma.com/design/5MvHqGkgreiijAwnJJ0b7V/Untitled?node-id=0-1&t=K27XlMcn297kThVx-1',
    githubUrl: null
  }
];

function initProjectFilteringAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalContainer = document.getElementById('modal-container');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active-filter', 'bg-blue-600', 'text-white'));
      btn.classList.add('active-filter');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.classList.add('flex');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });
    });
  });

  // Modal Open Logic
  document.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('.view-details-btn');
    if (detailBtn) {
      const projectId = detailBtn.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        populateModal(project);
        openModal();
      }
    }
  });

  function openModal() {
    modal?.classList.remove('hidden');
    setTimeout(() => {
      document.body.classList.add('modal-open', 'overflow-hidden');
    }, 10);
  }

  function closeModal() {
    document.body.classList.remove('modal-open', 'overflow-hidden');
    setTimeout(() => {
      modal?.classList.add('hidden');
    }, 200);
  }

  closeModalBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function populateModal(project) {
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalSummary = document.getElementById('modal-summary');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalTechStack = document.getElementById('modal-tech-stack');
  const modalLiveBtn = document.getElementById('modal-live-btn');
  const modalGithubBtn = document.getElementById('modal-github-btn');

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalImage) {
    modalImage.src = project.image;
    modalImage.onerror = () => { modalImage.src = project.fallbackImg; };
  }
  if (modalSummary) modalSummary.textContent = project.summary;
  if (modalProblem) modalProblem.textContent = project.problem;
  if (modalSolution) modalSolution.textContent = project.solution;

  if (modalTechStack) {
    modalTechStack.innerHTML = project.tech
      .map(t => `<span class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-medium">${t}</span>`)
      .join('');
  }

  if (modalLiveBtn) {
    if (project.liveUrl) {
      modalLiveBtn.href = project.liveUrl;
      modalLiveBtn.classList.remove('hidden');
    } else {
      modalLiveBtn.classList.add('hidden');
    }
  }

  if (modalGithubBtn) {
    if (project.githubUrl) {
      modalGithubBtn.href = project.githubUrl;
      modalGithubBtn.classList.remove('hidden');
    } else {
      modalGithubBtn.classList.add('hidden');
    }
  }
}

/* ==========================================================================
   6. Contact Form AJAX Submission (Formspree)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalBtnText = submitBtn.innerHTML;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Sending...`;
    if (formStatus) formStatus.className = 'hidden';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        if (formStatus) {
          formStatus.className = 'p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-2';
          formStatus.innerHTML = `<i class="fas fa-check-circle text-lg"></i> Thank you! Your message has been sent successfully. Umesh will get back to you shortly.`;
        }
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      if (formStatus) {
        formStatus.className = 'p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium flex items-center gap-2';
        formStatus.innerHTML = `<i class="fas fa-exclamation-triangle text-lg"></i> Oops! Something went wrong. Please email directly to <a href="mailto:umeshgimhan723@gmail.com" class="underline font-bold">umeshgimhan723@gmail.com</a>.`;
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/* ==========================================================================
   7. IntersectionObserver Scroll Reveal
   ========================================================================== */
function initScrollObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
    observer.observe(el);
  });
}
