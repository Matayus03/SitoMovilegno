const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("attivo");
    document.body.classList.toggle("menu-attivo");

    if (!menu.classList.contains("attivo")) {
        document.querySelectorAll(".has-submenu").forEach(item => {
            item.classList.remove("active");
        });
    }
});

const submenuButtons = document.querySelectorAll(".submenu-toggle");

submenuButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        const parent = button.parentElement;

        document.querySelectorAll(".has-submenu").forEach(item => {
            if (item !== parent) {
                item.classList.remove("active");
            }
        });

        parent.classList.toggle("active");
    });
});

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove("attivo");
        document.body.classList.remove("menu-attivo");

        document.querySelectorAll(".has-submenu").forEach(item => {
            item.classList.remove("active");
        });
    }
});