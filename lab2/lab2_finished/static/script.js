let button = document
    .querySelector('.theme-toggle button')
    .addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    });

document.querySelectorAll('.subscribe-btn').forEach((value) => {
    value.addEventListener('click', () => {
        document.querySelector('.modal-subscribe-backdrop').style = '';
    });
});

document
    .querySelector('.modal-subscribe-close')
    .addEventListener('click', () => {
        document.querySelector('.modal-subscribe-backdrop').style =
            'display: none';
    });

    const wrapper = document.querySelector('#slider-wrapper-2e9d1f8c47032283');
    const slides = Array.from(document.querySelectorAll('.slider-slide-action'));
    const nextButton = document.querySelector('.slider-button-next');
    const prevButton = document.querySelector('.slider-button-prev');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function updateSlideClasses() {
        slides.forEach((slide, index) => {
            slide.classList.remove('slider-slide-action-active', 'slider-slide-action-prev', 'slider-slide-action-next');
            
            // Assign active, prev, and next classes based on currentSlide
            if (index === currentSlide) {
                slide.classList.add('slider-slide-action-active');
            } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
                slide.classList.add('slider-slide-action-prev');
            } else if (index === (currentSlide + 1) % totalSlides) {
                slide.classList.add('slider-slide-action-next');
            }
        });
    }
    
    function reorderSlides() {
        const activeSlide = slides[currentSlide];
    
        // Reorder slides by adjusting their translateX position
        slides.forEach((slide, index) => {
            const slideOffset = index - currentSlide;
            const slideWidth = wrapper.offsetWidth;
            const translateX = slideOffset * slideWidth;
            
            slide.style.transform = `translate3d(${translateX}px, 0, 0)`;
        });
        
        // Move active slide to the start visually
        activeSlide.style.transform = 'translate3d(0, 0, 0)';
    }
    
    function updateSlider() {
        updateSlideClasses();
        reorderSlides();
    }
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    window.addEventListener('resize', updateSlider); // Update position on window resize
    
    // Initialize
    updateSlider();

const sideMenu = document.querySelector('.my-drawer');

document.querySelector('.burger-btn').addEventListener('click', function () {
    sideMenu.style.visibility = 'visible';
    sideMenu.style.transform = 'translate3d(0, 0, 0)';

    sideMenu.setAttribute('aria-hidden', 'false');
});

document.querySelector('.close-icon').addEventListener('click', function () {
    sideMenu.style.visibility = 'hidden';
    sideMenu.style.transform = 'translate3d(-100%, 0, 0)';

    sideMenu.setAttribute('aria-hidden', 'true');
});

const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
});


const panelItems = document.querySelectorAll('.side-panel-item-opened, .side-panel-item-closed');
    const images = document.querySelectorAll('.feature-image-shown, .feature-image-hidden');

    panelItems.forEach(item => {
        item.addEventListener('click', function () {
            const imageId = this.getAttribute('data-image');

            panelItems.forEach(panel => {
                panel.classList.remove('side-panel-item-opened');
                panel.classList.add('side-panel-item-closed');

                const panelContent = panel.querySelector('.rah-static');
                if (panelContent) {
                    panelContent.style.height = '0';
                    panelContent.style.opacity = '0';
                }
            });

            this.classList.remove('side-panel-item-closed');
            this.classList.add('side-panel-item-opened');

            const currentContent = this.querySelector('.rah-static');
            if (currentContent) {
                currentContent.style.height = 'auto';
                currentContent.style.opacity = '1';
            }

            images.forEach(img => {
                img.classList.remove('feature-image-shown');
                img.classList.add('feature-image-hidden');
            });

            const selectedImage = document.querySelector(`.feature-image-hidden[data-id="${imageId}"]`);
            if (selectedImage) {
                selectedImage.classList.remove('feature-image-hidden');
                selectedImage.classList.add('feature-image-shown');
            }
        });
    });
