document.addEventListener('DOMContentLoaded', function () {
    const moonToggle = `<path fill="currentColor" d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"></path>`;
    const sunToggle = `<g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path>
            <path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path>
            <path d="M1 12h2"></path><path d="M21 12h2"></path>
            <path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path>
        </g>`;

    const selectedColorMode = localStorage.getItem("colorMode");

    if (!selectedColorMode) {
        setupPreferredColorMode();
        window.colorMode = window.prefersDarkMode ? "dark" : "light";
    } else {
        window.colorMode = selectedColorMode;
    }

    appendThemeClassName(window.colorMode);
    updateThemeIcon(window.colorMode);


    function setupPreferredColorMode() {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        window.prefersDarkMode = darkModeMediaQuery.matches
    }

    function appendThemeClassName(colorMode) {
        window.document.querySelector('body').classList.remove("light-theme");
        window.document.querySelector('body').classList.remove("dark-theme");
        window.document.querySelector('body').classList.add(colorMode + "-theme")
    }

    function updateThemeIcon(colorMode) {
        const themeIcon = document.getElementById('theme-icon');
        if (colorMode === 'dark') {
            themeIcon.innerHTML = sunToggle;
        } else {
            themeIcon.innerHTML = moonToggle;
        }
    }

    document.getElementById('theme-toggle').addEventListener('click', function () {
        window.colorMode = window.colorMode === 'dark' ? 'light' : 'dark';

        appendThemeClassName(window.colorMode);
        updateThemeIcon(window.colorMode);

        localStorage.setItem("colorMode", window.colorMode);
    });

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

})