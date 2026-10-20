
const contenedor = document.getElementById("galeriaGrid");

document.addEventListener("DOMContentLoaded", cargarGaleria);

async function cargarGaleria() {
    if (!contenedor) {
        console.error("No se encontró el elemento #galeriaGrid en el HTML.");
        return;
    }

    try {
        const respuesta = await fetch("../data/galeria.json");

        if (!respuesta.ok) {
            throw new Error(
                `Error al cargar galeria.json: HTTP ${respuesta.status}`
            );
        }

        const fotos = await respuesta.json();

        if (!Array.isArray(fotos)) {
            throw new Error("El JSON debe contener un arreglo de fotos.");
        }

        contenedor.innerHTML = "";

        fotos.forEach(foto => {
            const elemento = document.createElement("div");
            elemento.classList.add("galeria-item");

            elemento.dataset.categoria = foto.categoria;
            elemento.dataset.titulo = foto.titulo;

            const imagen = document.createElement("img");
            imagen.src = foto.imagen;
            imagen.alt = foto.titulo || "Trabajo de Stetic & Nails";
            imagen.loading = "lazy";

            imagen.addEventListener("error", () => {
                console.error("No se pudo cargar la imagen:", foto.imagen);
            });

            elemento.appendChild(imagen);
            contenedor.appendChild(elemento);
        });

        console.log(`Galería cargada: ${fotos.length} fotos.`);

    } catch (error) {
        console.error("Error en la galería:", error);
        contenedor.innerHTML =
            "<p>No se pudo cargar la galería. Revisá la consola.</p>";
    }
}