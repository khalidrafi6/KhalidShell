let toggle = document.getElementById("dark-mode-toggle");
let darkTheme = document.getElementById("dark-mode-theme");

toggle.addEventListener("click", () => {
    if (toggle.className === "fas fa-moon") {
        setTheme("dark");
    } else if (toggle.className === "fas fa-sun") {
        setTheme("light");
    }
});

function setTheme(mode) {
    if (mode === "dark") {
        darkTheme.disabled = false;
        toggle.className = "fas fa-sun";
    } else if (mode === "light") {
        darkTheme.disabled = true;
        toggle.className = "fas fa-moon";
    }
}
