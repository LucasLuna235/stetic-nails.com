// Header scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });

    // Mobile menu
    const btn = document.getElementById('mobileBtn');
    const links = document.getElementById('navLinks');
    btn.addEventListener('click', () => links.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('active'));
    });

    // Filtros
    const filtros = document.querySelectorAll('.filtro-btn');
    const items = document.querySelectorAll('.galeria-item');
    filtros.forEach(filtro => {
      filtro.addEventListener('click', () => {
        filtros.forEach(f => f.classList.remove('activo'));
        filtro.classList.add('activo');
        const cat = filtro.getAttribute('data-filtro');
        items.forEach(item => {
          if (cat === 'todos' || item.getAttribute('data-categoria') === cat) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const cerrar = document.getElementById('cerrarLightbox');

    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = item.getAttribute('data-titulo');
        lightbox.classList.add('activo');
        document.body.style.overflow = 'hidden';
      });
    });

    cerrar.addEventListener('click', () => {
      lightbox.classList.remove('activo');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('activo');
        document.body.style.overflow = '';
      }
    });