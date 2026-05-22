const slider = document.getElementById("slider");
let sliderSection = document.querySelectorAll(".slider--section");
let sliderSectionLast = sliderSection[sliderSection.length-1];


const btnRight = document.getElementById("btn--right");
const btnLeft = document.getElementById("btn--left");

slider.insertAdjacentElement('afterbegin',sliderSectionLast);

function Next(){
    let sliderSectionFirst = document.querySelectorAll(".slider--section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all .5s";
    setTimeout(function(){
    slider.style.transition = "none";
    slider.insertAdjacentElement('beforeend',sliderSectionFirst);
    slider.style.marginLeft = "-100%";    
    },500);
}
 
function Back(){
    let sliderSection = document.querySelectorAll(".slider--section");
    let sliderSectionLast = sliderSection[sliderSection.length-1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all .5s";
    setTimeout(function(){
    slider.style.transition = "none";
    slider.insertAdjacentElement('afterbegin',sliderSectionLast);
    slider.style.marginLeft = "-100%";    
    },500);
}


btnRight.addEventListener('click',Next);
btnLeft.addEventListener('click',Back);

setInterval(() => {
    Next();    
},5000);