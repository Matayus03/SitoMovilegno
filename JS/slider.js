const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const slider = document.querySelector(".slider");

let index = 0;
let interval;
let pauseTimeout;

//Mostra Slide
function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

//Avanti
function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

//Indietro
function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

//Autoplay
function startAutoplay() {
    interval = setInterval(nextSlide, 4000);
}

//Ferma Autoplay e riavvia dopo 2 secondi
function pauseAutoplay() {
    clearInterval(interval);
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(startAutoplay, 2000);
}

//Eventi Pulsanti
nextBtn.addEventListener("click", () => { nextSlide(); pauseAutoplay(); });
prevBtn.addEventListener("click", () => { prevSlide(); pauseAutoplay(); });

//Ferma Autoplay al passaggio del mouse
slider.addEventListener("mouseenter", () => { clearInterval(interval); });
slider.addEventListener("mouseleave", () => { pauseAutoplay(); });

//Avvia Autoplay
startAutoplay();
