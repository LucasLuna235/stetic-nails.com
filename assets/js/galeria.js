const JSON_URL = "../data/galeria.json";

const grid = document.getElementById('galeriaGrid');
const btnFiltros = document.querySelectorAll('.filtro-btn');
let datos = [];

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const btnCerrar = document.getElementById('cerrarLightbox');

// Cargar JSON
async function cargarGaleria() {
  try {
    const respuesta = await fetch(JSON_URL);
    if (!respuesta.ok) throw new Error('No se pudo cargar el JSON: ' + respuesta.status);
    datos = await respuesta.json();
    renderizar('todos');
  } catch (error) {
    console.error('Error galería:', error);
    if (grid) grid.innerHTML = `<p style="text-align:center;color:#c2185b;grid-column:1/-1;">Error cargando la galería: ${error.message}</p>`;
  }
}

// Renderizar tarjetas
function renderizar(categoria) {
  if (!grid) return;
  grid.innerHTML = '';

  const filtrados = categoria === 'todos'
    ? datos
    : datos.filter(item => item.categoria === categoria);

  filtrados.forEach(item => {
    const card = document.createElement('div');
    card.className = 'galeria-item';
    card.dataset.categoria = item.categoria;
    card.dataset.titulo = item.titulo;

    card.innerHTML = `
      <img src="${item.archivo}" alt="${item.titulo}" loading="lazy">
    `;

    card.addEventListener('click', () => abrirLightbox(item));
    grid.appendChild(card);
  });
}

// Filtros
btnFiltros.forEach(btn => {
  btn.addEventListener('click', () => {
    btnFiltros.forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');
    renderizar(btn.dataset.filtro);
  });
});

// Lightbox
function abrirLightbox(item) {
  if (!lightbox) return;
  lightboxImg.src = item.archivo;
  lightboxImg.alt = item.titulo;
  lightboxCaption.textContent = item.titulo;
  lightbox.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
  lightbox.classList.remove('activo');
  document.body.style.overflow = '';
}

if (btnCerrar) btnCerrar.addEventListener('click', cerrarLightbox);

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) cerrarLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('activo')) {
    cerrarLightbox();
  }
});

// Iniciar
document.addEventListener('DOMContentLoaded', cargarGaleria);