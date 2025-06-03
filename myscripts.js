// Parallax effect for the hero background
        document.addEventListener('mousemove', function(e) {
            const heroBg = document.getElementById('heroBg');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroBg.style.transform = 'translate(-' + x * 20 + 'px, -' + y * 20 + 'px) scale(1.05)';
        });

        // Reset position when mouse leaves
        document.querySelector('.hero').addEventListener('mouseleave', function() {
            document.getElementById('heroBg').style.transform = 'translate(0, 0)';
        });
        const sections = document.querySelectorAll('.content-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });

        // Previous JavaScript for hero parallax remains
        document.addEventListener('mousemove', function(e) {
            const heroBg = document.getElementById('heroBg');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroBg.style.transform = 'translate(-' + x * 20 + 'px, -' + y * 20 + 'px) scale(1.05)';
        });

        // Initialize all cards
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
          const progressBar = card.querySelector('.progress-bar');
          let holdTimer;
          
          // Touch events
          card.addEventListener('touchstart', () => startHold(card, progressBar));
          card.addEventListener('touchend', () => endHold(card, progressBar));
          card.addEventListener('touchcancel', () => endHold(card, progressBar));
          
          // Mouse events
          card.addEventListener('mousedown', () => startHold(card, progressBar));
          card.addEventListener('mouseup', () => endHold(card, progressBar));
          card.addEventListener('mouseleave', () => endHold(card, progressBar));
        });
        
        function startHold(card, progressBar) {
          card.classList.add('flipped');
          progressBar.style.width = '100%';
          
          holdTimer = setTimeout(() => {
            // Get the next card in sequence
            const nextCard = card.closest('.card-container').nextElementSibling;
            
            if (nextCard) {
              // Scroll to next card
              nextCard.scrollIntoView({ behavior: 'smooth' });
            } else {
              // Last card - proceed to next section
              window.location.href = "next-section.html";
            }
          }, 120000);
        }
        
        function endHold(card, progressBar) {
          card.classList.remove('flipped');
          progressBar.style.width = '0';
          clearTimeout(holdTimer);
        }

        document.addEventListener('DOMContentLoaded', function() {
        const cardsContainer = document.getElementById('cardsContainer');
        const cards = document.querySelectorAll('.timeline-card');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        
        // Function to update active card
        function updateActiveCard(index) {
            cards.forEach((card, i) => {
                if (i === index) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
        
        // Function to scroll to card
        function scrollToCard(index) {
            const card = cards[index];
            const containerWidth = cardsContainer.offsetWidth;
            const cardWidth = card.offsetWidth;
            const scrollPosition = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
            
            cardsContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateActiveCard(currentIndex);
        }
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                scrollToCard(currentIndex + 1);
            }
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            }
        });
        
        // Initialize
        updateActiveCard(0);
        
        // Handle scroll events
        let scrollTimeout;
        cardsContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const containerWidth = cardsContainer.offsetWidth;
                const scrollPosition = cardsContainer.scrollLeft + (containerWidth / 2);
                
                let closestCard = null;
                let closestDistance = Infinity;
                
                cards.forEach((card, index) => {
                    const cardPosition = card.offsetLeft + (card.offsetWidth / 2);
                    const distance = Math.abs(scrollPosition - cardPosition);
                    
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestCard = index;
                    }
                });
                
                if (closestCard !== null && closestCard !== currentIndex) {
                    currentIndex = closestCard;
                    updateActiveCard(currentIndex);
                }
            }, 100);
        });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
                scrollToCard(currentIndex + 1);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
            // Sample logo data (replace with your actual logo paths)
            const logos = [
                'https://via.placeholder.com/160x80?text=Company+1',
                'https://via.placeholder.com/160x80?text=Company+2',
                'https://via.placeholder.com/160x80?text=Company+3',
                'https://via.placeholder.com/160x80?text=Company+4',
                'https://via.placeholder.com/160x80?text=Company+5',
                'https://via.placeholder.com/160x80?text=Company+6',
                'https://via.placeholder.com/160x80?text=Company+7',
                'https://via.placeholder.com/160x80?text=Company+8'
            ];
            
            const logoTrack = document.querySelector('.logo-track');
            const logoContainer = document.querySelector('.logo-container');
            
            // Create logo cards
            function createLogoCards() {
                // Add original logos
                logos.forEach(logo => {
                    const card = document.createElement('div');
                    card.className = 'logo-card';
                    card.innerHTML = `<img src="${logo}" alt="Partner Logo">`;
                    logoTrack.appendChild(card);
                });
                
                // Clone logos for seamless looping (add enough duplicates to cover screen width)
                for (let i = 0; i < 2; i++) {
                    logos.forEach(logo => {
                        const card = document.createElement('div');
                        card.className = 'logo-card';
                        card.innerHTML = `<img src="${logo}" alt="Partner Logo">`;
                        logoTrack.appendChild(card.cloneNode(true));
                    });
                }
            }
            
            createLogoCards();
            
            // Auto-scroll animation
            let animationId;
            let speed = 1;
            let position = 0;
            let isHovering = false;
            
            function animate() {
                if (!isHovering) {
                    position -= speed;
                    
                    // Reset position when we've scrolled all original logos
                    const firstLogo = document.querySelector('.logo-card');
                    if (firstLogo) {
                        const firstLogoWidth = firstLogo.offsetWidth;
                        if (-position >= firstLogoWidth * logos.length) {
                            position += firstLogoWidth * logos.length;
                        }
                    }
                    
                    logoTrack.style.transform = `translateX(${position}px)`;
                }
                
                animationId = requestAnimationFrame(animate);
            }
            
            // Start animation
            animate();
            
            // Pause on hover
            logoTrack.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            
            logoTrack.addEventListener('mouseleave', () => {
                isHovering = false;
            });
            
            // Mobile swipe functionality
            let touchStartX = 0;
            let touchEndX = 0;
            let isDragging = false;
            
            logoContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                isDragging = true;
                cancelAnimationFrame(animationId);
            }, { passive: true });
            
            logoContainer.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                touchEndX = e.touches[0].clientX;
                const diff = touchStartX - touchEndX;
                position -= diff * 0.5;
                logoTrack.style.transform = `translateX(${position}px)`;
                touchStartX = touchEndX;
            }, { passive: true });
            
            logoContainer.addEventListener('touchend', () => {
                isDragging = false;
                animate();
            }, { passive: true });
            
            // Responsive adjustments
            function handleResize() {
                // Adjust speed based on screen size
                speed = window.innerWidth > 768 ? 1 : 0.5;
            }
            
            window.addEventListener('resize', handleResize);
            handleResize();
        });
