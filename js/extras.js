/* ============================================
   DORY PET STORE - EXTRAS JAVASCRIPT
   Loading Screen | Theme Toggle | Cookie Consent
   ============================================ */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initThemeToggle();
    initCookieConsent();
  });

  /* ============================================
     LOADING SCREEN
     ============================================ */
  function initLoadingScreen() {
    // Don't show loader on 404 page
    if (document.querySelector('.error-page')) return;

    const loader = document.createElement('div');
    loader.className = 'loading-screen';
    loader.id = 'loading-screen';
    loader.innerHTML = `
      <div class="loading-fish">🐠</div>
      <div class="loading-text">
        <span class="gradient-text">دوري</span>
      </div>
      <div class="loading-bar">
        <div class="loading-bar-fill"></div>
      </div>
      <div class="loading-subtext">جاري تحميل عالم الحيوانات...</div>
    `;
    document.body.appendChild(loader);

    // Hide after load + animation
    window.addEventListener('load', function() {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }, 500);
    });

    // Fallback: hide after 4 seconds max
    setTimeout(() => {
      if (loader.parentNode) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }
    }, 4000);
  }

  /* ============================================
     THEME TOGGLE (Dark/Light)
     ============================================ */
  function initThemeToggle() {
    // Don't show on 404
    if (document.querySelector('.error-page')) return;

    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'تبديل الوضع');
    toggle.innerHTML = `
      <svg class="sun-icon" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000 1.41.996.996 0 001.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06z"/></svg>
      <svg class="moon-icon" style="display:none;" viewBox="0 0 24 24"><path d="M9 2c-1.05 0-2.05.16-3 .46 1.69 1.24 2.79 3.25 2.79 5.54 0 3.87-3.13 7-7 7-.68 0-1.34-.1-1.96-.28C1.04 17.58 4.73 21 9 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/></svg>
    `;
    document.body.appendChild(toggle);

    // Check saved preference
    const savedTheme = localStorage.getItem('dory-theme');
    const sunIcon = toggle.querySelector('.sun-icon');
    const moonIcon = toggle.querySelector('.moon-icon');

    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }

    toggle.addEventListener('click', function() {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('dory-theme', isLight ? 'light' : 'dark');

      if (isLight) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    });
  }

  /* ============================================
     COOKIE CONSENT BANNER
     ============================================ */
  function initCookieConsent() {
    // Check if user already decided
    if (localStorage.getItem('dory-cookies')) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="container">
        <p class="cookie-text">
          نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك. باستمرارك في تصفح الموقع، فإنك توافق على استخدامها.
          <a href="privacy.html">سياسة الخصوصية</a>
        </p>
        <div class="cookie-buttons">
          <button class="cookie-btn cookie-btn-accept" id="cookie-accept">موافق</button>
          <button class="cookie-btn cookie-btn-decline" id="cookie-decline">رفض</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Show after a short delay
    setTimeout(() => banner.classList.add('visible'), 1500);

    document.getElementById('cookie-accept').addEventListener('click', function() {
      localStorage.setItem('dory-cookies', 'accepted');
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });

    document.getElementById('cookie-decline').addEventListener('click', function() {
      localStorage.setItem('dory-cookies', 'declined');
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });
  }

})();
