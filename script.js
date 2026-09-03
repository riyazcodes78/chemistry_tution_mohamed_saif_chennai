const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');
if(menu && nav){
  menu.type='button';
  const overlay=document.createElement('div');
  overlay.className='mobile-menu-overlay';
  overlay.setAttribute('aria-hidden','true');
  const drawer=document.createElement('aside');
  drawer.className='mobile-menu-drawer';
  drawer.setAttribute('aria-hidden','true');
  drawer.innerHTML=`
    <div class="mobile-menu-head">
      <div><strong>MOHAMED SAIF</strong><span>CHEMISTRY HOME TUITION</span></div>
      <button class="mobile-menu-close" type="button" aria-label="Close menu">×</button>
    </div>
    <nav class="mobile-menu-links" aria-label="Mobile navigation"></nav>
    <div class="mobile-menu-contact">
      <small>QUICK CONTACT</small>
      <a href="tel:+919841774459"><span class="label">PHONE</span>+91 98417 74459</a>
      <a href="https://wa.me/919841774459?text=Hello%20Sir%2C%20I%20would%20like%20to%20know%20about%20Chemistry%20tuition." target="_blank" rel="noopener"><span class="label">WHATSAPP</span>Message Mohamed Saif ↗</a>
      <a href="#contact"><span class="label">ADDRESS</span>Z Block, AD Block, Anna Nagar, Chennai — 600040</a>
    </div>`;
  document.body.append(overlay,drawer);
  const mobileLinks=drawer.querySelector('.mobile-menu-links');
  nav.querySelectorAll('a').forEach(a=>{
    const clone=a.cloneNode(true);
    mobileLinks.appendChild(clone);
  });
  const closeBtn=drawer.querySelector('.mobile-menu-close');
  const closeMenu=()=>{drawer.classList.remove('open');overlay.classList.remove('open');drawer.setAttribute('aria-hidden','true');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');};
  const openMenu=()=>{drawer.classList.add('open');overlay.classList.add('open');drawer.setAttribute('aria-hidden','false');overlay.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');menu.setAttribute('aria-expanded','true');};
  menu.setAttribute('aria-expanded','false');
  menu.addEventListener('click',openMenu);
  closeBtn.addEventListener('click',closeMenu);
  overlay.addEventListener('click',closeMenu);
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
}
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
