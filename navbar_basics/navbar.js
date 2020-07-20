var burger=document.querySelector(".burger");
var navbar=document.querySelector(".nav-links");
var navLinks=document.querySelectorAll(".nav-links li");
var navslide=()=>{
    burger.addEventListener("click",()=>{
        navbar.classList.toggle("open");
        navLinks.forEach((link,index)=>{
            if(link.style.animation)
            {
                link.style.animation='';
            }
            else
            {
                link.style.animation='navFade .5s ease forward $(index/7+1.5)s ';
            }
        });
        burger.classList.toggle("toggle");
    });
};
navslide();


