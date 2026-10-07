const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');

menu?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    nav?.classList.remove('open');
  });
});


// ========================================
// REVEAL ANIMATIONS
// ========================================

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

} else {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });
}


// ========================================
// GOOGLE REVIEWS
// ========================================
//
// IMPORTANT:
// Replace this URL with Mohammed Saif's actual
// Google Business Profile / Google Reviews URL.
//
// Example:
// const GOOGLE_REVIEWS_URL =
//   "https://www.google.com/maps/place/...";
//
// ========================================

const GOOGLE_REVIEWS_URL =
  "https://share.google/avXJiaWEXMYj7BVIh";


// Connect every Google review button/link
document.querySelectorAll('[data-google-reviews]').forEach(link => {
  link.href = GOOGLE_REVIEWS_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});


// ========================================
// REVIEW FILTERS
// ========================================

const reviewFilters = document.querySelectorAll('.review-filter');
const reviewCards = document.querySelectorAll('.review-card');

reviewFilters.forEach(button => {

  button.addEventListener('click', () => {

    reviewFilters.forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    const filter = button.dataset.filter;

    reviewCards.forEach(card => {

      const type = card.dataset.type;

      let show =
        filter === 'all' ||
        type === filter;

      if (filter === 'recent') {
        const dateText =
          card.querySelector('small')?.textContent || '';

        show = dateText.includes('2023');
      }

      card.style.display = show ? '' : 'none';

    });

  });

});


// ========================================
// STUDENT RESULT GALLERY LIGHTBOX
// ========================================

const resultLightbox =
  document.getElementById('resultLightbox');

const resultLightboxImage =
  document.getElementById('resultLightboxImage');

const resultLightboxLabel =
  document.getElementById('resultLightboxLabel');

const resultOpenImage =
  document.getElementById('resultOpenImage');

const resultCards =
  document.querySelectorAll('.result-card');

const closeResultButtons =
  document.querySelectorAll('[data-close-result]');


resultCards.forEach(card => {

  card.addEventListener('click', () => {

    const img = card.querySelector('img');

    if (!img || !resultLightbox) return;

    resultLightboxImage.src = img.src;
    resultLightboxImage.alt = img.alt;

    const resultNumber =
      card.dataset.result || '1';

    resultLightboxLabel.textContent =
      `RESULT ${String(resultNumber).padStart(2, '0')}`;

    resultOpenImage.href = img.src;

    resultLightbox.classList.add('open');

    resultLightbox.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.style.overflow = 'hidden';

  });

});


closeResultButtons.forEach(button => {

  button.addEventListener('click', () => {

    resultLightbox?.classList.remove('open');

    resultLightbox?.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.style.overflow = '';

  });

});


document.addEventListener('keydown', event => {

  if (
    event.key === 'Escape' &&
    resultLightbox?.classList.contains('open')
  ) {

    resultLightbox.classList.remove('open');

    resultLightbox.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.style.overflow = '';

  }

});