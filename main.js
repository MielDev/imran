
        // Menu mobile
    function toggleMenu() {
            const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
        }

    // Carrousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    // Créer les indicateurs
    const indicatorsContainer = document.getElementById('carouselIndicators');
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
            const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Mettre à jour les indicateurs
    const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
            });
        }

        // Auto-play carousel
        setInterval(() => {
        moveCarousel(1);
        }, 5000);

        // Fermer le menu mobile lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mainNav').classList.remove('active');
        });
        });

    // Gestion du formulaire
    function handleSubmit(e) {
        e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
    e.target.reset();
        }

    // Animation au scroll
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