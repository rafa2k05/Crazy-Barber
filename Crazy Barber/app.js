document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    const menuIcon = mobileMenuButton.querySelector('i');

    // 1. Add shadow to header on scroll
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // 2. Mobile menu toggle with icon change
    const toggleMobileMenu = () => {
        const isMenuHidden = mainNav.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isMenuHidden);
        menuIcon.classList.toggle('fa-bars', isMenuHidden);
        menuIcon.classList.toggle('fa-times', !isMenuHidden);
    };

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
    
    // 3. Smooth scrolling with header offset
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (!mainNav.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // 4. Highlight active navigation link on scroll
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav ul a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = `#${entry.target.id}`;
                navLinks.forEach(link => {
                    link.classList.toggle('active-link', link.getAttribute('href') === currentSectionId);
                });
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" }); // Activates when section is in the middle of the screen

    sections.forEach(section => sectionObserver.observe(section));

    // 5. Reveal elements on scroll
    const revealElements = document.querySelectorAll('#servicos .grid > div, #portfolio .grid > div, #depoimentos .grid > div, #sobre-nos .md\\:w-1\\/2');
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    // Attach scroll listener
    window.addEventListener('scroll', handleHeaderScroll);
});