/* ============================================
   DORY PET STORE - MARKETPLACE JAVASCRIPT
   ============================================ */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initProductFilter();
    initSearch();
    initCartUI();
    initProductModal();
  });

  /* ============================================
     PRODUCT DATA (PLACEHOLDER)
     ============================================ */
  window.products = [
    {
      id: 1,
      name: 'سمكة كلownfish (نموذج)',
      category: 'fish',
      price: 150,
      oldPrice: 200,
      image: '',
      badge: 'sale',
      description: 'سمكة كلownfish جميلة وممتعة، مثالية لحوض السمك المنزلي.',
      inStock: true
    },
    {
      id: 2,
      name: 'ببغاء أليف (نموذج)',
      category: 'birds',
      price: 800,
      oldPrice: null,
      image: '',
      badge: 'new',
      description: 'ببغاء أليف يتكلم، لون أخضر جميل مع أصفر.',
      inStock: true
    },
    {
      id: 3,
      name: 'حوض سمك زجاجي 50 لتر',
      category: 'accessories',
      price: 1200,
      oldPrice: 1500,
      image: '',
      badge: 'sale',
      description: 'حوض سمك زجاجي عالي الجودة مع فلتر وفتحة تغذية.',
      inStock: true
    },
    {
      id: 4,
      name: 'طعام سمك فاخر',
      category: 'food',
      price: 75,
      oldPrice: null,
      image: '',
      badge: null,
      description: 'طعام سمك عالي الجودة غني بالفيتامينات والمعادن.',
      inStock: true
    },
    {
      id: 5,
      name: 'بومة بيضاء (نموذج)',
      category: 'birds',
      price: 2500,
      oldPrice: null,
      image: '',
      badge: 'new',
      description: 'بومة بيضاء نادرة وأنيقة، مثالية للهواة.',
      inStock: false
    },
    {
      id: 6,
      name: 'بيت طيور خشبي',
      category: 'accessories',
      price: 350,
      oldPrice: 450,
      image: '',
      badge: 'sale',
      description: 'بيت طيور خشبي متين مع حامل وصينية.',
      inStock: true
    },
    {
      id: 7,
      name: 'سمكة زينة أنجيل',
      category: 'fish',
      price: 120,
      oldPrice: null,
      image: '',
      badge: null,
      description: 'سمكة أنجيل جميلة، سهلة العناية وممتعة للمشاهدة.',
      inStock: true
    },
    {
      id: 8,
      name: 'طعام طيور متنوع',
      category: 'food',
      price: 60,
      oldPrice: null,
      image: '',
      badge: null,
      description: 'خليط طعام طيور متنوع يحتوي على بذور وفواكه مجففة.',
      inStock: true
    },
    {
      id: 9,
      name: 'سلحفاة برمائية',
      category: 'reptiles',
      price: 450,
      oldPrice: null,
      image: '',
      badge: 'new',
      description: 'سلحفاة برمائية صغيرة، سهلة العناية ومحبوبة للأطفال.',
      inStock: true
    },
    {
      id: 10,
      name: 'قفص طيور كبير',
      category: 'accessories',
      price: 900,
      oldPrice: 1100,
      image: '',
      badge: 'sale',
      description: 'قفص طيور كبير ومريح مع أدوات تعليق وألعاب.',
      inStock: true
    },
    {
      id: 11,
      name: 'سمكة ديسكوس',
      category: 'fish',
      price: 300,
      oldPrice: null,
      image: '',
      badge: null,
      description: 'سمكة ديسكوس ملونة، من أجمل أنواع سمك الزينة.',
      inStock: true
    },
    {
      id: 12,
      name: 'طعام كلاب جاف',
      category: 'food',
      price: 200,
      oldPrice: null,
      image: '',
      badge: null,
      description: 'طعام كلاب جاف عالي الجودة، مناسب لجميع الأعمار.',
      inStock: true
    }
  ];

  /* ============================================
     PRODUCT FILTERING
     ============================================ */
  function initProductFilter() {
    const filterBtns = document.querySelectorAll('.product-filter-btn');
    const productGrid = document.querySelector('.products-grid');

    if (!filterBtns.length || !productGrid) return;

    renderProducts(products);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filtered = filter === 'all' 
          ? products 
          : products.filter(p => p.category === filter);

        renderProducts(filtered);
      });
    });
  }

  function renderProducts(productList) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    grid.innerHTML = productList.map(product => `
      <div class="product-card reveal" data-id="${product.id}">
        <div class="product-image">
          <div class="placeholder-img" style="min-height: 220px;">
            <span style="position:absolute;bottom:10px;font-size:0.8rem;color:var(--mid-gray);">
              صورة المنتج ${product.id}
            </span>
          </div>
          ${product.badge ? `<span class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</span>` : ''}
          ${!product.inStock ? '<span class="product-badge badge-out">نفذت الكمية</span>' : ''}
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-price-row">
            <div class="product-price">
              <span class="current">${product.price} ج.م</span>
              ${product.oldPrice ? `<span class="old">${product.oldPrice} ج.م</span>` : ''}
            </div>
            <button class="btn btn-primary product-btn" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
              ${product.inStock ? 'اطلب الآن' : 'نفذت الكمية'}
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Re-init scroll reveal for new elements
    const reveals = grid.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  function getBadgeText(badge) {
    const map = { sale: 'خصم', new: 'جديد', hot: 'الأكثر مبيعاً' };
    return map[badge] || badge;
  }

  /* ============================================
     SEARCH
     ============================================ */
  function initSearch() {
    const searchInput = document.querySelector('.product-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', window.debounce(function() {
      const query = this.value.toLowerCase().trim();
      const filtered = query 
        ? products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
        : products;
      renderProducts(filtered);
    }, 300));
  }

  /* ============================================
     CART UI (Visual only - no backend)
     ============================================ */
  function initCartUI() {
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    document.addEventListener('click', function(e) {
      if (e.target.closest('.product-btn') && !e.target.closest('.product-btn').disabled) {
        count++;
        if (cartCount) {
          cartCount.textContent = count;
          cartCount.style.animation = 'none';
          requestAnimationFrame(() => {
            cartCount.style.animation = 'scale-in 0.3s ease';
          });
        }
        showToast('تمت إضافة المنتج للطلب! تواصل معنا على واتساب');
      }
    });
  }

  /* ============================================
     PRODUCT MODAL
     ============================================ */
  function initProductModal() {
    document.addEventListener('click', function(e) {
      const card = e.target.closest('.product-card');
      if (!card || e.target.closest('.product-btn')) return;

      const id = parseInt(card.dataset.id);
      const product = products.find(p => p.id === id);
      if (!product) return;

      showProductModal(product);
    });
  }

  function showProductModal(product) {
    const existing = document.querySelector('.product-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-grid">
          <div class="modal-image">
            <div class="placeholder-img" style="min-height:300px;">
              <span style="position:absolute;bottom:10px;font-size:0.8rem;color:var(--mid-gray);">
                صورة المنتج ${product.id}
              </span>
            </div>
          </div>
          <div class="modal-details">
            ${product.badge ? `<span class="badge badge-${product.badge === 'sale' ? 'coral' : 'cyan'}">${getBadgeText(product.badge)}</span>` : ''}
            <h2>${product.name}</h2>
            <p class="modal-desc">${product.description}</p>
            <div class="modal-price">
              <span class="current">${product.price} ج.م</span>
              ${product.oldPrice ? `<span class="old">${product.oldPrice} ج.م</span>` : ''}
            </div>
            <div class="modal-actions">
              <a href="https://wa.me/201001959950?text=مرحباً%20دوري،%20أريد%20طلب%20${encodeURIComponent(product.name)}" 
                 class="btn btn-primary" target="_blank">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.38 3.55 1.07 5.11L2 22l4.89-1.07A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.66 0-3.22-.51-4.52-1.38l-.32-.21-2.9.64.64-2.83-.21-.32A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.24-5.76c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.59.75-.72.9-.13.15-.27.17-.5.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.36.1-.48.1-.1.23-.27.34-.4.11-.14.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13 0-.29-.02-.44-.02-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.9s.82 2.2.93 2.35c.12.15 1.61 2.46 3.9 3.45.55.24.97.38 1.3.49.55.17 1.05.15 1.45.09.44-.06 1.36-.56 1.55-1.09.19-.54.19-1 .13-1.09-.05-.1-.19-.15-.4-.27z"/></svg>
                اطلب عبر واتساب
              </a>
              <a href="tel:01001959950" class="btn btn-secondary">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                اتصل الآن
              </a>
            </div>
            <div class="modal-note">
              <svg width="16" height="16" fill="var(--dory-cyan)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              للطلب والاستفسار، تواصل معنا مباشرة
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => modal.classList.add('active'));

    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(modal));
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }

})();
