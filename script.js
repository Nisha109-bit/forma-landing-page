// Interactive fixed navigation: scroll state, active section, and accessible mobile menu.
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

function updateNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 24);
  const marker = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });
  links.forEach((link) => {
    const selected = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  navLinks.classList.remove('open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navLinks.classList.toggle('open', !isOpen);
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 640) closeMenu();
  updateNavigation();
});

document.querySelector('#year').textContent = new Date().getFullYear();
updateNavigation();
