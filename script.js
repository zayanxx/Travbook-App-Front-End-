document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------
     HEADER: STICKY + SHRINK
  ------------------------- */
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav') || document.querySelector('.primary-nav');
  
  // Scroll shrink + blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header?.classList.add('scrolled', 'shrink');
    else header?.classList.remove('scrolled', 'shrink');
  });

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('active');
    primaryNav?.classList.toggle('open');
  });

  // Dynamic tagline rotation
const text = document.getElementById("dynamic-text");
const phrases = [
  "Adventure Awaits",
  "Discover New Places",
  "Make Memories",
  "Travel Smarter"
];
let index = 0;

function typePhrase() {
  text.textContent = "";
  const letters = phrases[index].split("");
  letters.forEach((char, i) => {
    setTimeout(() => {
      text.textContent += char;
    }, i * 80);
  });
  setTimeout(() => {
    index = (index + 1) % phrases.length;
    typePhrase();
  }, 3500);
}
typePhrase();

// Scroll reveal animation
const heroElements = document.querySelectorAll(".hero-content, .hero-media");
const revealOnScroll = () => {
  heroElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Initial check on load

// Smooth scroll for scroll-down button
document.querySelector(".scroll-down").addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
});

  /* -------------------------
     SCROLL REVEAL ANIMATION
  ------------------------- */
  const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.85;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('visible');
  });
});


  /* -------------------------
     CAROUSEL (Deals Section)
  ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("dealsCarousel");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsWrap = document.getElementById("carouselDots");

  if (!carousel || !dotsWrap) return;

  const cards = Array.from(carousel.querySelectorAll(".deal-card"));
  const total = cards.length;
  let index = 0;
  let autoplayInterval;
  const delay = 4000;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));

  const updateCarousel = () => {
    const card = cards[index];
    carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: "smooth" });
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  };

  const nextSlide = () => { index = (index + 1) % total; updateCarousel(); };
  const prevSlide = () => { index = (index - 1 + total) % total; updateCarousel(); };
  const goTo = i => { index = i; updateCarousel(); restartAutoplay(); };

  nextBtn?.addEventListener("click", () => { nextSlide(); restartAutoplay(); });
  prevBtn?.addEventListener("click", () => { prevSlide(); restartAutoplay(); });

  // Autoplay
  const startAutoplay = () => autoplayInterval = setInterval(nextSlide, delay);
  const stopAutoplay = () => clearInterval(autoplayInterval);
  const restartAutoplay = () => { stopAutoplay(); startAutoplay(); };

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // Touch swipe support
  let startX = 0;
  carousel.addEventListener("touchstart", e => (startX = e.touches[0].clientX));
  carousel.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    restartAutoplay();
  });

  // Initialize
  updateCarousel();
  startAutoplay();
});

  /* -------------------------
     NEWSLETTER FORM
  ------------------------- */
 const form = document.getElementById('newsletterForm');
const emailInput = document.getElementById('newsletterEmail');
const msg = document.getElementById('newsletterMsg');

if (form && emailInput && msg) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#ff4d4f';
      emailInput.focus();
      emailInput.setAttribute('aria-invalid', 'true');
      return;
    }

    msg.textContent = '✅ Thank you! You are subscribed.';
    msg.style.color = '#4caf50';
    emailInput.removeAttribute('aria-invalid');
    form.reset();
  });
}


  /* -------------------------
     FLOATING GLOW DOTS IN FOOTER
  ------------------------- */
  // Update year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Footer floating dots
const footer = document.querySelector('.footer');
if (footer) {
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement('span');
    dot.className = 'glow-dot';
    const size = Math.random() * 6 + 2;
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${Math.random() * 6 + 4}s`;
    footer.appendChild(dot);
  }
}

// Footer newsletter form
const footerForm = document.getElementById('footerNewsletter');
const footerInput = footerForm.querySelector('input[type="email"]');
const footerMsg = footerForm.querySelector('.newsletter-msg');

footerForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = footerInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    footerMsg.textContent = 'Please enter a valid email address.';
    footerMsg.style.color = '#ff4d4f';
    footerInput.focus();
    return;
  }

  footerMsg.textContent = '✅ Thank you! You are subscribed.';
  footerMsg.style.color = '#4caf50';
  footerForm.reset();
});
});
