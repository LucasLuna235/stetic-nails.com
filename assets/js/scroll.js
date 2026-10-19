 // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });

    // Mobile menu
    const btn = document.getElementById('mobileBtn');
    const links = document.getElementById('navLinks');
    btn.addEventListener('click', () => links.classList.toggle('active'));

    // Close mobile menu on click
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('active'));
    });