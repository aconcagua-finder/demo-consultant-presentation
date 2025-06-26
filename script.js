document.addEventListener('DOMContentLoaded', function() {
    // Get all tiles and content sections
    const tiles = document.querySelectorAll('.tile');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Initialize - show the first section by default
    if (contentSections.length > 0) {
        contentSections[0].classList.add('active');
        tiles[0].classList.add('active');
    }
    
    // Add click event listeners to all tiles
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all tiles and content sections
            tiles.forEach(t => t.classList.remove('active'));
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active class to clicked tile
            this.classList.add('active');
            
            // Find and show corresponding content section
            const targetContent = document.getElementById(targetSection);
            if (targetContent) {
                // Use setTimeout to ensure smooth transition
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 50);
            }
            
            // Add click animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover sound effect simulation (visual feedback)
        tile.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        tile.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Add smooth scrolling for content sections
    contentSections.forEach(section => {
        section.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                this.scrollTop = 0; // Scroll to top when section becomes active
            }
        });
    });
    
    // Add parallax effect to background
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        // Apply subtle parallax effect to body background
        document.body.style.backgroundPosition = `${50 + mouseX * 0.1}% ${50 + mouseY * 0.1}%`;
    });
    
    // Add loading animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Add stagger animation for tiles
    tiles.forEach((tile, index) => {
        tile.style.opacity = '0';
        tile.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            tile.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            tile.style.opacity = '1';
            tile.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
    
    // Add intersection observer for content items animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content items for animation
    const contentItems = document.querySelectorAll('.content-item, .summary-block');
    contentItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeTileIndex = Array.from(tiles).findIndex(tile => tile.classList.contains('active'));
        let nextIndex = activeTileIndex;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                nextIndex = (activeTileIndex + 1) % tiles.length;
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                nextIndex = (activeTileIndex - 1 + tiles.length) % tiles.length;
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                return; // Don't change section, just prevent default
        }
        
        if (nextIndex !== activeTileIndex) {
            tiles[nextIndex].click();
        }
    });
    
    // Add focus management for accessibility
    tiles.forEach(tile => {
        tile.setAttribute('tabindex', '0');
        tile.setAttribute('role', 'button');
        
        tile.addEventListener('focus', function() {
            this.style.outline = '2px solid #2EBDC9';
            this.style.outlineOffset = '4px';
        });
        
        tile.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        tile.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Subtle background variations (removed complex gradients)
    const sectionColors = {
        general: '#1a1a40',
        marketing: '#1a1a40',
        development: '#1a1a40',
        ai: '#1a1a40',
        summary: '#1a1a40'
    };
    
    function updateBackgroundColor(sectionId) {
        if (sectionColors[sectionId]) {
            document.body.style.background = sectionColors[sectionId];
        }
    }
    
    // Performance optimization - debounce resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any size-dependent elements
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.style.transition = 'none';
                // Force reflow
                tile.offsetHeight;
                tile.style.transition = '';
            });
        }, 250);
    });
});