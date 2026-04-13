// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-bs-target');
            const targetCollapse = document.querySelector(targetId);
            const allCollapses = document.querySelectorAll('.accordion-collapse');
            const allButtons = document.querySelectorAll('.accordion-button');

            // Close all other accordion items
            allCollapses.forEach(collapse => {
                if (collapse !== targetCollapse) {
                    collapse.classList.remove('show');
                }
            });

            // Remove active class from all buttons
            allButtons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                }
            });

            // Always keep accordion item open (no closing)
            targetCollapse.classList.add('show');
            this.classList.add('active');
        });
    });

    // Mobile hamburger menu functionality
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navmenu = document.querySelector('#navmenu');
    const getStartedBtn = document.querySelector('.btn-getstarted');

    if (mobileNavToggle && navmenu) {
        mobileNavToggle.addEventListener('click', function () {
            navmenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');

            // Hide/show Get Started button on mobile
            if (getStartedBtn) {
                getStartedBtn.classList.toggle('hidden');
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.navmenu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navmenu.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                if (getStartedBtn) {
                    getStartedBtn.classList.remove('hidden');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navmenu.contains(event.target) && !mobileNavToggle.contains(event.target)) {
                navmenu.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                if (getStartedBtn) {
                    getStartedBtn.classList.remove('hidden');
                }
            }
        });
    }

    // Header scroll blur effect
    const header = document.querySelector('#header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.style.backdropFilter = 'blur(5px)';
            header.style.backgroundColor = 'rgba(79, 97, 255, 0.2)';
        } else {
            header.style.backdropFilter = 'none';
            header.style.backgroundColor = 'rgba(79, 97, 255, 0.2)';
        }

        lastScrollTop = scrollTop;
    });

    // Testimonial Slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const cardsPerPage = 3; // Show 3 cards at a time
    let totalSlides = Math.ceil(testimonialCards.length / cardsPerPage);

    function showSlide(index) {
        // Hide all cards
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });

        // Calculate which cards to show (overlapping groups)
        const startIndex = index; // Start from the dot number
        const endIndex = Math.min(startIndex + 3, testimonialCards.length); // Show 3 cards

        // Show current set of cards
        for (let i = startIndex; i < endIndex; i++) {
            testimonialCards[i].style.display = 'flex';
        }

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    // Initialize slider
    if (testimonialCards.length > 0 && dots.length > 0) {
        // Show first slide initially
        showSlide(0);

        // Add click handlers to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
});
// END FAQ Accordion functionality
