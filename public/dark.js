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
    localStorage.setItem("dark-mode-storage", mode);

    if (mode === "dark") {
        darkTheme.disabled = false;
        toggle.className = "fas fa-sun";
        document.documentElement.setAttribute("data-theme", "dark");
    } else if (mode === "light") {
        darkTheme.disabled = true;
        toggle.className = "fas fa-moon";
        document.documentElement.removeAttribute("data-theme");
    }
}

// the default theme is light
let savedTheme = localStorage.getItem("dark-mode-storage") || "light";
setTheme(savedTheme);
