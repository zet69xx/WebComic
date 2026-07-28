// ============================================
// Fuente unica de datos para galeria y ranking.
// Evita repetir markup a mano (antes: 8 y 5 bloques identicos).
// ============================================
const CHAPTERS = [
  { tag: 'Cap. 48' },
  { tag: 'Cap. 47' },
  { tag: 'Cap. 46' },
  { tag: 'Especial', accent: true },
  { tag: 'Cap. 45' },
  { tag: 'Cap. 44' },
  { tag: 'Cap. 43' },
  { tag: 'Cap. 42' },
];

const TRENDING = [
  { rank: '01', rating: '4.9', name: 'Ronin de tinta', views: '32.4k vistas' },
  { rank: '02', rating: '4.8', name: 'Distrito Katana', views: '27.1k vistas' },
  { rank: '03', rating: '4.7', name: 'Nocturno Shibuya', views: '21.6k vistas' },
  { rank: '04', rating: '4.6', name: 'El ultimo trazo', views: '18.9k vistas' },
  { rank: '05', rating: '4.5', name: 'Espectros de neon', views: '15.2k vistas' },
];

// Columnas de enlaces del footer. Cada una es solo datos:
// agregar o quitar un link es una linea aca, no markup
// repetido en el HTML. Usan las clases reales del CSS
// (footer-col-title / footer-links) para que se vean bien.
const FOOTER_COLUMNS = [
  {
    title: 'Sitio',
    links: [
      { label: 'F.A.Q.', href: '#' },
      { label: 'Colabora con nosotros', href: '#' },
      { label: 'Normas de la comunidad', href: '#' },
      { label: 'Terminos de uso', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Contacto', href: '#contact' },
    ],
  },
  {
    title: 'Explorar',
    links: [
      { label: 'Capitulos', href: '#showcase' },
      { label: 'Accion', href: '#showcase' },
      { label: 'Drama', href: '#showcase' },
      { label: 'Sobrenatural', href: '#showcase' },
      { label: 'Biblioteca', href: '#' },
    ],
  },
  {
    title: 'Comunidad',
    links: [
      { label: 'Foro', href: '#' },
      { label: 'Colaboradores', href: '#' },
      { label: 'Colectivo Manga LATAM', href: '#' },
      { label: 'Estudio Ronin', href: '#' },
    ],
  },
];

// Tarjetas de comunidad (Discord / Telegram) tambien salen de datos,
// asi sumar una red nueva (ej. Reddit) es una linea, no HTML repetido.
const SOCIAL_CTAS = [
  { variant: 'discord', icon: 'DC', title: 'Unite a Discord', text: 'Chatea con la comunidad' },
  { variant: 'telegram', icon: 'TG', title: 'Unite a Telegram', text: 'Novedades al instante' },
];

// Iconos sociales mini, usados tanto arriba del showcase como en el footer.
// Antes estaban hardcodeados dos veces en el HTML; ahora es una sola fuente
// de datos que alimenta ambos contenedores (#socialMiniTop y #socialMiniFooter).
const SOCIAL_LINKS = [
  { label: 'Instagram', short: 'IG', href: '#' },
  { label: 'X', short: 'X', href: '#' },
  { label: 'Discord', short: 'DC', href: '#' },
];

const renderGallery = (items) => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = items.map(({ tag, accent }) => `
    <div class="gallery-item${accent ? ' accent' : ''}"><span class="tag">${tag}</span></div>
  `).join('');
};

const renderTrending = (items) => {
  const list = document.getElementById('trendingList');
  if (!list) return;
  list.innerHTML = items.map(({ rank, rating, name, views }) => `
    <li class="trending-item">
      <span class="trending-rank">${rank}</span>
      <div class="trending-thumb">
        <span class="rating-badge">${rating}</span>
      </div>
      <div class="trending-info">
        <span class="trending-name">${name}</span>
        <span class="trending-views">${views}</span>
      </div>
    </li>
  `).join('');
};

const renderFooterColumns = (columns) => {
  const container = document.getElementById('footerColumns');
  if (!container) return;
  const columnsHtml = columns.map(({ title, links }) => `
    <div class="footer-col">
      <h4 class="footer-col-title">${title}</h4>
      <ul class="footer-links">
        ${links.map(({ label, href }) => `<li><a href="${href}">${label}</a></li>`).join('')}
      </ul>
    </div>
  `).join('');
  // se insertan ANTES de la 4ta columna (Social), que ya esta fija en el HTML
  container.insertAdjacentHTML('afterbegin', columnsHtml);
};

const renderSocialCtas = (ctas) => {
  const holder = document.getElementById('socialCtas');
  if (!holder) return;
  holder.innerHTML = ctas.map(({ variant, icon, title, text }) => `
    <a href="#" class="community-cta ${variant}">
      <span class="cta-icon">${icon}</span>
      <span class="cta-text">
        <strong>${title}</strong>
        <span>${text}</span>
      </span>
      <span class="cta-arrow">→</span>
    </a>
  `).join('');
};

// Renderiza el mismo array de links sociales en cualquier contenedor que
// se le pase (top del hero y footer), en vez de duplicar markup en el HTML.
const renderSocialMini = (containerId, links) => {
  const holder = document.getElementById(containerId);
  if (!holder) return;
  holder.innerHTML = links.map(({ label, short, href }) => `
    <a href="${href}" aria-label="${label}">${short}</a>
  `).join('');
};

const initTheme = () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initialTheme);
  themeToggle.setAttribute('aria-pressed', String(initialTheme === 'dark'));

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    themeToggle.setAttribute('aria-pressed', String(!isDark));
    localStorage.setItem('theme', nextTheme);
  });
};

const initMobileNav = () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
};

renderGallery(CHAPTERS);
renderTrending(TRENDING);
renderFooterColumns(FOOTER_COLUMNS);
renderSocialCtas(SOCIAL_CTAS);
renderSocialMini('socialMiniTop', SOCIAL_LINKS);
renderSocialMini('socialMiniFooter', SOCIAL_LINKS);
initTheme();
initMobileNav();
