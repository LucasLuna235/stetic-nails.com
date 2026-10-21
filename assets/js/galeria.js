const contenedor = document.getElementById("galeriaGrid");
const filtroBtns = document.querySelectorAll('.filtro-btn');
const grid = document.getElementById('galeriaGrid');
const JSON_URL = "../data/galeria.json";
document.addEventListener("DOMContentLoaded", cargarGaleria);

let datos = [];

// Modal
const modal = document.getElementById("lightbox");
const modalImg = document.getElementById("lightboxImg");
const modalCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("cerrarLightbox");

async function cargarGaleria() {
    console.log("[GALERIA] Cargando JSON desde:", JSON_URL);
    console.log(JSON_URL);
    
    if (!contenedor) {
        console.error("No se encontró el elemento #galeriaGrid en el HTML.");
        return;
    }

    try {
        const respuesta = await fetch(JSON_URL,{cache: "no-cache"});
         console.log("[GALERIA] Estado HTTP:", respuesta.status);
        if (!respuesta.ok) {
            throw new Error(
                `Error al cargar galeria.json: HTTP ${respuesta.status}`
            );
        }

         datos = await respuesta.json();
         
         console.log("[GALERIA] Imágenes cargadas:", datos.length);
        if (!Array.isArray(datos)) {
            throw new Error("El JSON debe contener un arreglo de fotos.");
        }

        if(datos.length > 0){
            console.log("[GALERIA]Primera imagen:",datos[0].imagen);
            renderizar("todos");
        }
        

    } catch (error) {
        console.log("[GALERIA] ERROR:",error);
         if (grid) grid.innerHTML = '<p style="color:#c2185b;text-align:center;padding:40px;">Error cargando galería: ' + error.message + '</p>';
    }


}


function renderizar(categoria) {
  console.log("[GALERIA] Renderizando categoría:", categoria);
  if (!grid) {
    console.error("[GALERIA] No se encontró #galeriaGrid");
    return;
  }
  grid.innerHTML = "";

  const filtrados = categoria === "todos"
    ? datos
    : datos.filter(item => item.categoria === categoria);

  console.log("[GALERIA] Cantidad a mostrar:", filtrados.length);

  filtrados.forEach(item => {
    const card = document.createElement("div");
    card.className = "galeria-item";
    card.style.position = "relative";
    card.style.overflow = "hidden";
    card.style.borderRadius = "16px";
    card.style.aspectRatio = "1";
    card.style.cursor = "pointer";
    card.style.background = "#eee";

    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.titulo}"
           style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.3s;">
      <div style="position:absolute;inset:0;background:rgba(194,24,91,0.7);
           display:flex;align-items:center;justify-content:center;color:white;
           font-family:'Playfair Display',serif;font-size:1.4rem;opacity:0;
           transition:opacity 0.3s;"
           onmouseover="this.style.opacity='1'"
           onmouseout="this.style.opacity='0'">Ver trabajo</div>
    `;

    card.onclick = () => abrirModal(item);
    grid.appendChild(card);
  });
}

filtroBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    filtroBtns.forEach(b => b.classList.remove("activo"));
    this.classList.add("activo");
    const cat = this.getAttribute("data-filtro");
    console.log("[GALERIA] Filtro clickeado:", cat);
    renderizar(cat);
  });
});

function abrirModal(item) {
  console.log("[MODAL] Abriendo con imagen:", item.imagen);
  if (!modal) {
    console.error("[MODAL] No se encontró #modal");
    return;
  }
  modalImg.src = item.imagen;
  modalImg.alt = item.titulo;
  modalCaption.textContent = item.titulo;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "";
}

if (closeBtn) closeBtn.onclick = cerrarModal;
if (modal) {
  modal.onclick = function(e) {
    if (e.target === modal) cerrarModal();
  };
}
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && modal.style.display === "flex") cerrarModal();
});

// Iniciar
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", cargarGaleria);
} else {
  cargarGaleria();
}

