const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("attivo");
    document.body.classList.toggle("menu-attivo");
});

document.addEventListener("click", (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);

    if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains("attivo")) {
        menu.classList.remove("attivo");
        document.body.classList.remove("menu-attivo");
    }
});