document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const hero = document.getElementById('hero');
    const textSets = document.querySelectorAll('.text-set');

    // Background image slideshow
    const backgroundImages = [
        'sofa-hero-bg.webp',
        'bed-hero-bg.jpg',
        'table-hero-bg.jpg'
    ];
    let currentImageIndex = 0;

    function createBackgroundImage(src, index) {
        const img = document.createElement('div');
        img.style.backgroundImage = `url(${src})`;
        img.classList.add('background-image');
        img.style.zIndex = -1;
        img.style.opacity = index === 0 ? 1 : 0;
        hero.appendChild(img);
        return img;
    }

    const bgImages = backgroundImages.map((src, index) => createBackgroundImage(src, index));

    function changeBackgroundImage() {
        const currentImage = bgImages[currentImageIndex];
        const nextIndex = (currentImageIndex + 1) % bgImages.length;
        const nextImage = bgImages[nextIndex];

        currentImage.style.transform = 'translateX(-100%)';
        nextImage.style.transform = 'translateX(0)';
        nextImage.style.opacity = 1;

        // Change text
        textSets[currentImageIndex].classList.remove('active');
        textSets[nextIndex].classList.add('active');

        setTimeout(() => {
            currentImage.style.transform = 'translateX(0)';
            currentImage.style.opacity = 0;
        }, 500);

        currentImageIndex = nextIndex;
    }

    // Initial text set
    textSets[0].classList.add('active');

    // Change background image every 8 seconds
    setInterval(changeBackgroundImage, 8000);

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href') === `#${current}`) {
                li.querySelector('a').classList.add('active');
            }
        });
    });
});

