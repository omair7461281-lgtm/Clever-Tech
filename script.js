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
});
// END FAQ Accordion functionality
