/* ============================================
   DORY PET STORE - REVIEWS JAVASCRIPT
   ============================================ */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initReviewsCarousel();
    initStarRating();
  });

  /* ============================================
     REVIEWS CAROUSEL
     ============================================ */
  function initReviewsCarousel() {
    const carousel = document.querySelector('.reviews-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.reviews-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track) return;

    let currentIndex = 0;
    const items = track.querySelectorAll('.review-card');
    const totalItems = items.length;
    let autoPlayInterval;

    function goToSlide(index) {
      if (index < 0) index = totalItems - 1;
      if (index >= totalItems) index = 0;

      currentIndex = index;
      const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
      track.style.transform = `translateX(${currentIndex * itemWidth}px)`;

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      // Update active card
      items.forEach((item, i) => {
        item.classList.toggle('active', i === currentIndex);
      });
    }

    function next() { goToSlide(currentIndex + 1); }
    function prev() { goToSlide(currentIndex - 1); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoPlay();
      });
    });

    // Auto play
    function startAutoPlay() {
      autoPlayInterval = setInterval(next, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    startAutoPlay();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
        resetAutoPlay();
      }
    });

    // Initial state
    goToSlide(0);
  }

  /* ============================================
     STAR RATING DISPLAY
     ============================================ */
  function initStarRating() {
    document.querySelectorAll('.stars').forEach(container => {
      const rating = parseFloat(container.dataset.rating) || 0;
      let html = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          html += '<svg class="star filled" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        } else if (i - 0.5 <= rating) {
          html += '<svg class="star half" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="var(--dory-gold)"/><stop offset="50%" stop-color="var(--mid-gray)"/></linearGradient></defs><path fill="url(#half)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        } else {
          html += '<svg class="star" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        }
      }
      container.innerHTML = html;
    });
  }

})();
