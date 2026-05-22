const imagenes = document.querySelectorAll(".img-negocio");
const modal = document.querySelector(".modal2");
const img = document.querySelector(".modal-img");
const btn = document.querySelector(".modal--boton");
const p_Back = document.querySelector(".p_right");
const p_Next = document.querySelector(".p_left");
let indexImg = 0;

for(let i = 0; i<imagenes.length; i++){      
    imagenes[i].addEventListener("click", function(e){ 
        // abre lightbox   
        modal.classList.add("modal--open");
        let src1 = e.target.src;
        img.setAttribute("src", src1);

    })
    
}
 
// Cierra Lighbtox
btn.addEventListener("click",()=>{
    modal.classList.remove("modal--open");
});

// Botones de direccion

const nextImage = ()=>{
    if(indexImg === imagenes.length -1){
        indexImg = -1;
    }
    img.src = imagenes[indexImg + 1].src;
    indexImg++;
}

const backImg = ()=>{
    if(indexImg === 0){
        indexImg = imagenes.length;
    }
    img.src = imagenes[indexImg - 1].src;
    indexImg--;
}

p_Next.addEventListener("click", nextImage);

p_Back.addEventListener("click", backImg);   

