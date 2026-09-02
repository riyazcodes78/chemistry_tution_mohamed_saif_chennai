const menu=document.querySelector('.menu-btn'),nav=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }), {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// Review filters
const reviewFilters=document.querySelectorAll('.review-filter');
const reviewCards=document.querySelectorAll('.review-card');
reviewFilters.forEach(btn=>{
  btn.addEventListener('click',()=>{
    reviewFilters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    reviewCards.forEach(card=>{
      const type=card.dataset.type;
      let show=filter==='all'||type===filter;
      if(filter==='recent') show=['parent','student'].includes(type) && card.querySelector('small')?.textContent.includes('2023');
      card.style.display=show?'block':'none';
    });
  });
});

// All reviews modal
const reviewsModal=document.getElementById('reviewsModal');
const showAllReviews=document.getElementById('showAllReviews');
const closeReviewButtons=document.querySelectorAll('[data-close-review]');
showAllReviews?.addEventListener('click',()=>{reviewsModal.classList.add('open');reviewsModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'});
closeReviewButtons.forEach(btn=>btn.addEventListener('click',()=>{reviewsModal.classList.remove('open');reviewsModal.setAttribute('aria-hidden','true');document.body.style.overflow=''}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reviewsModal?.classList.contains('open')){reviewsModal.classList.remove('open');document.body.style.overflow=''}}));

// Student result gallery lightbox
const resultLightbox = document.getElementById('resultLightbox');
const resultLightboxImage = document.getElementById('resultLightboxImage');
const resultLightboxLabel = document.getElementById('resultLightboxLabel');
const resultOpenImage = document.getElementById('resultOpenImage');
const resultCards = document.querySelectorAll('.result-card');
const closeResultButtons = document.querySelectorAll('[data-close-result]');

resultCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (!img || !resultLightbox) return;
    resultLightboxImage.src = img.src;
    resultLightboxImage.alt = img.alt;
    resultLightboxLabel.textContent = `RESULT ${card.dataset.result.padStart(2,'0')}`;
    resultOpenImage.href = img.src;
    resultLightbox.classList.add('open');
    resultLightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});

closeResultButtons.forEach(btn => btn.addEventListener('click', () => {
  resultLightbox?.classList.remove('open');
  resultLightbox?.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && resultLightbox?.classList.contains('open')) {
    resultLightbox.classList.remove('open');
    resultLightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
});
