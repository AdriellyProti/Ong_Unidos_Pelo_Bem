import { navigateTo, currentPath } from './router.js';
import { attachContactFormValidation } from './validators.js';

// Ano no rodapé
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

// Montagem inicial
async function mount() {
  if (!location.hash) {
    location.hash = '#/home';
  }
  console.log('[app] mount ->', currentPath());
  await navigateTo(currentPath());
}

// Roteamento
window.addEventListener('hashchange', () => {
  console.log('[app] hashchange ->', currentPath());
  navigateTo(currentPath());
});
window.addEventListener('DOMContentLoaded', mount);

// Hooks pós-carregamento de página
window.addEventListener('page:loaded', ({ detail }) => {
  console.log('[app] page:loaded ->', detail.path);
  if (detail.path === '/contato') {
    attachContactFormValidation?.();
  }
});
// ==== MENU MOBILE ====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? '✖' : '☰';
    });

    // Fecha o menu ao clicar em um link
    nav.addEventListener('click', e => {
      if (e.target.matches('a[data-link]')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.textContent = '☰';
      }
    });
  }
});


