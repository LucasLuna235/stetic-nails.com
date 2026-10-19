document.addEventListener('DOMContentLoaded',cargarGaleria);



const contenedor = document.getElementById("galeriaGrid");

async function cargarGaleria() {
    try {
        const respuesta = await fetch("../data/galeria.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }

        const fotos = await respuesta.json();

        contenedor.innerHTML = "";

        fotos.forEach(foto => {
            const elemento = document.createElement("div");

            elemento.classList.add("galeria-item");
            elemento.dataset.categoria = foto.categoria;
            elemento.dataset.titulo = foto.titulo;

            const imagen = document.createElement("img");

            imagen.src = foto.imagen;
            imagen.alt = foto.titulo;
            imagen.loading = "lazy";

            elemento.appendChild(imagen);
            contenedor.appendChild(elemento);
        });

    } catch (error) {
        console.error("Error al cargar la galería:", error);
        contenedor.innerHTML = "<p>No se pudo cargar la galería.</p>";
    }
}

document.addEventListener("DOMContentLoaded", cargarGaleria);
