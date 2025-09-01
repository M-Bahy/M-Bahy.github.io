// --- Theme persistence & toggle
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme');
const isLight = savedTheme ? savedTheme === 'light' : prefersLight;
document.documentElement.classList.toggle('light', isLight);

// Theme-aware images: dark -> data-dark, light -> data-light
function applyThemeImages() {
  const isLightMode = document.documentElement.classList.contains('light');
  document.querySelectorAll('img[data-dark][data-light]').forEach(img => {
    const target = isLightMode ? img.getAttribute('data-light') : img.getAttribute('data-dark');
    if (img.getAttribute('src') !== target) img.setAttribute('src', target);
  });
}
// Initial apply
applyThemeImages();
// React to theme class changes
new MutationObserver(applyThemeImages).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = !document.documentElement.classList.contains('light');
  document.documentElement.classList.toggle('light', next);
  localStorage.setItem('theme', next ? 'light' : 'dark');
  // Optional immediate update (observer will also catch it)
  applyThemeImages();
});

function adjustForFixedHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  const apply = () => { document.body.style.paddingTop = header.offsetHeight + 'px'; };
  apply();
  window.addEventListener('resize', apply);
}

adjustForFixedHeader();

// --- Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// --- Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// --- Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// --- Fake downloads (replace with your resume file path)
document.getElementById('downloadCV').addEventListener('click', (e) => {
  if (!e.currentTarget.getAttribute('href') || e.currentTarget.getAttribute('href') === '#') {
    e.preventDefault();
    alert('Tip: Upload resume.pdf and set the Resume button href to /resume.pdf');
  }
});

// --- Contact form (demo only)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'Sending…';
  setTimeout(() => { status.textContent = 'Thanks! I will get back to you shortly.'; e.target.reset(); }, 600);
});

// --- Newsletter (demo only)
document.getElementById('newsletter').addEventListener('submit', (e) => {
  e.preventDefault();
  const st = document.getElementById('newsStatus');
  st.textContent = 'Subscribed. Welcome aboard!';
  e.target.reset();
});

function sendEmail() {
  window.location.href = "mailto:mohamedayman2942002@gmail.com";
}