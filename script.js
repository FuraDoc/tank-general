// ===== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА =====
let currentLang = 'ru';

function setLang(lang) {
  currentLang = lang;

  // Обновляем все элементы с data-ru / data-en
  document.querySelectorAll('[data-ru]').forEach(el => {
    if (el.dataset[lang]) {
      el.textContent = el.dataset[lang];
    }
  });

  // Активная кнопка языка
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
  });

  // Меняем видео: RU → Rutube, EN → YouTube
  const trailer = document.getElementById('game-trailer');
  if (trailer) {
    if (lang === 'ru') {
      trailer.src = 'https://rutube.ru/play/embed/6f72fcbc467d477ea1df48f8608042ba';
    } else {
      trailer.src = 'https://www.youtube.com/embed/ABb8AAlzOXk';
    }
  }

  // Сохраняем выбор
  localStorage.setItem('lang', lang);
}

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Закрываем меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== NAVBAR — подсветка активного пункта при скролле =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNav() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top    = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < bottom) {
      navItems.forEach(a => {
        a.classList.toggle('nav-active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ===== NAVBAR — фон при скролле =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(6, 6, 8, 0.98)'
    : 'rgba(6, 6, 8, 0.92)';
});

// ===== ВОССТАНОВЛЕНИЕ ЯЗЫКА =====
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'ru';
  setLang(saved);
});

// ===== LIGHTBOX НАСТРОЙКИ =====
if (typeof lightbox !== 'undefined') {
  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    albumLabel: '%1 / %2',
    fadeDuration: 300,
  });
}