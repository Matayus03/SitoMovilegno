const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const slider = document.querySelector(".slider");

const overlayTitle = document.getElementById("overlay-title");
const overlayBtn = document.getElementById("overlay-btn");


const slideData = [
    { title: "Impianti di segheria", url: "Pagine/azienda.html" },
    { title: "Impianti di legna da ardere", url: "Pagine/prodotti.html" },
    { title: "Refilatrice", url: "Pagine/news.html" }
    //DA MODIFICARE/AGGIUNGERE
];


let index = 0;
let interval;
let isHoveringSlider = false;
let isHoveringButton = false;

slides[index].classList.add("zoom");
updateOverlay(index);
//Mostra Slide
function showSlide(i) {
    const current = slides[index];
    const next = slides[i];

    current.classList.remove("active");

    next.classList.remove("zoom");
    next.offsetHeight;
    next.classList.add("active", "zoom");

    index = i;

    updateOverlay(i);
}

//Avanti
function nextSlide() {
    showSlide((index + 1) % slides.length);
}

//Indietro
function prevSlide() {
    showSlide((index - 1 + slides.length) % slides.length);
}

//Autoplay
function startAutoplay() {
    if(isHoveringSlider || isHoveringButton) return;
    stopAutoplay();
    interval = setInterval(nextSlide, 4000);
}

//Stop Autoplay
function stopAutoplay() {
    clearInterval(interval);
    interval = null;
}

//Eventi Pulsanti
nextBtn.addEventListener("click", () => { stopAutoplay(); nextSlide(); startAutoplay(); });
prevBtn.addEventListener("click", () => { stopAutoplay(); prevSlide(); startAutoplay(); });

//Ferma Autoplay al passaggio del mouse
slider.addEventListener("mouseenter", () => {
    isHoveringSlider = true;
    stopAutoplay();
});
slider.addEventListener("mouseleave", () => {
    isHoveringSlider = false;
    if (!isHoveringButton) startAutoplay();
});

//Ferma slider quando mouse sopra bottoni
[nextBtn, prevBtn].forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        isHoveringButton = true;
        stopAutoplay()
    });
    btn.addEventListener("mouseleave", () => {
        isHoveringButton = false;
        if (!isHoveringSlider) startAutoplay();
    });
});

//Testo e tasto Overlay
function updateOverlay(i) {
    overlayTitle.style.opacity = 0;
    overlayBtn.style.opacity = 0;

    setTimeout(() => {
        overlayTitle.textContent = slideData[i].title;
        overlayBtn.href = slideData[i].url;

        overlayTitle.style.opacity = 1;
        overlayBtn.style.opacity = 1;
    }, 600);
}

//Avvia Autoplay
startAutoplay();

//Aggiunta Touch-Friendly
let startX = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoplay();
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;

    if (diff > 30) {
        nextSlide();
    } else if (diff < -30) {
        prevSlide();
    }

    startAutoplay();
});