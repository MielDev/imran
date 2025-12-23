// Menu mobile
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    if (nav && menuToggle) {
        // Basculer les classes active
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');

        // Empêcher le défilement de la page quand le menu est ouvert
        if (nav.classList.contains('active')) {
            body.style.overflow = 'hidden';
            // Ajouter un écouteur pour fermer le menu en cliquant à l'extérieur
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            body.style.overflow = '';
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }
}

// Fermer le menu en cliquant à l'extérieur
function closeMenuOnClickOutside(e) {
    const nav = document.getElementById('mainNav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (nav && menuToggle &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Initialisation du carrousel
document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initScrollAnimations();
    initMobileMenu();
});

function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!track || !indicatorsContainer || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Créer les indicateurs
    indicatorsContainer.innerHTML = ''; // Vider les indicateurs existants
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === 0 ? ' active' : '');
        indicator.onclick = () => goToSlide(i);
        indicatorsContainer.appendChild(indicator);
    }

    function moveCarousel(direction) {
        currentSlide += direction;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function updateCarousel() {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Mettre à jour les indicateurs
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Gestion des touches du clavier
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') moveCarousel(-1);
        if (e.key === 'ArrowRight') moveCarousel(1);
    });

    // Gestion du survol pour l'auto-play
    const carousel = track.closest('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', pauseCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }

    // Boutons précédent/suivant
    document.querySelectorAll('.carousel-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const direction = button.classList.contains('prev-btn') ? -1 : 1;
            moveCarousel(direction);
        });
    });

    function startCarousel() {
        slideInterval = setInterval(() => moveCarousel(1), 5000);
    }

    function pauseCarousel() {
        clearInterval(slideInterval);
    }

    // Démarrer l'auto-play
    startCarousel();
}

function initMobileMenu() {
    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('mainNav');
            if (nav) nav.classList.remove('active');
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .catalog-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Gestion du formulaire
function handleSubmit(e) {
    e.preventDefault();
    // Récupérer les valeurs du formulaire
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Données du formulaire :', formProps);

    // Afficher un message de confirmation
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');

    // Réinitialiser le formulaire
    e.target.reset();
}