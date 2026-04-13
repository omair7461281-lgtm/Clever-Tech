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

    // Testimonial Slider functionality with smooth sliding
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoSlideInterval;

    if (testimonialsWrapper && testimonialCards.length > 0) {
        // Calculate card width and gap
        const cardWidth = 350; // min-width from CSS
        const gap = 30; // gap from CSS
        const cardsPerView = 3; // Number of cards visible at once
        const slideWidth = cardWidth + gap;

        function slideToIndex(index) {
            // Calculate the maximum slide index
            const maxSlide = Math.max(0, testimonialCards.length - cardsPerView);
            
            // Ensure index is within bounds
            index = Math.max(0, Math.min(index, maxSlide));
            
            // Apply smooth slide transformation
            const offset = -index * slideWidth;
            testimonialsWrapper.style.transform = `translateX(${offset}px)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }

        function nextSlide() {
            const maxSlide = Math.max(0, testimonialCards.length - cardsPerView);
            const nextIndex = currentSlide >= maxSlide ? 0 : currentSlide + 1;
            slideToIndex(nextIndex);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000); // Slide every 4 seconds
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }

        // Initialize slider
        slideToIndex(0);
        startAutoSlide();

        // Add click handlers to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                slideToIndex(index);
                startAutoSlide();
            });
        });

        // Pause on hover
        testimonialsWrapper.addEventListener('mouseenter', stopAutoSlide);
        testimonialsWrapper.addEventListener('mouseleave', startAutoSlide);

        // Handle window resize
        window.addEventListener('resize', () => {
            slideToIndex(currentSlide);
        });
    }
});
// END FAQ Accordion functionality
