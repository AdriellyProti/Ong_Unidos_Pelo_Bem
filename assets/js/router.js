// Router baseado em hash (#/rota)
export const routes = {
  '/home': 'pages/home.html',
  '/sobre': 'pages/sobre.html',
  '/projetos': 'pages/projetos.html',
  '/doacao': 'pages/doacao.html',
  '/contato': 'pages/contato.html'
};

export async function navigateTo(path) {
  const target = document.getElementById('app');
  console.log('[router] navigateTo ->', path);
  try {
    const file = routes[path] ?? 'pages/404.html';
    const res = await fetch(file, { headers: { 'Content-Type': 'text/html' } });
    if (!res.ok) throw new Error(`HTTP ${res.status} ao carregar ${file}`);
    const html = await res.text();
    target.innerHTML = html;
    target.classList.add('fade-in');
    setTimeout(() => target.classList.remove('fade-in'), 400);
    activateNav(path);
    window.dispatchEvent(new CustomEvent('page:loaded', { detail: { path } }));
  } catch (err) {
    console.error('[router] erro:', err);
    target.innerHTML = `<section><h2>Erro</h2><p>${err.message}</p></section>`;
  }
}

export function currentPath() {
  const hash = window.location.hash || '#/home';
  return hash.replace('#', '');
}

function activateNav(path) {
  document.querySelectorAll('[data-link]').forEach(a => {
    const href = a.getAttribute('href').replace('#', '');
    a.classList.toggle('active', href === path);
  });
}


