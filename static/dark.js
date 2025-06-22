let toggles = document.getElementsByClassName("dark-mode-toggle");

Array.from(toggles).forEach(toggle => {
  toggle.addEventListener("click", () => {
    if (toggle.classList.contains("moon")) {
      setTheme("dark");
    } else if (toggle.classList.contains("sun")) {
      setTheme("light");
    }
  });

});

function setTheme(mode) {
  localStorage.setItem("dark-mode-storage", mode);

  if (mode === "dark") {
    document.body.classList.add("dark-theme");
    Array.from(toggles).forEach(toggle => {
      toggle.classList.remove("moon");
      toggle.classList.add("sun");

      toggle.innerHTML = '☀️';
    });
  } else if (mode === "light") {
    Array.from(toggles).forEach(toggle => {
      toggle.classList.remove("sun");
      toggle.classList.add("moon");

      toggle.innerHTML = '🌗';
    });
    document.body.classList.remove("dark-theme");
  }
}

// the default theme is light
let savedTheme = localStorage.getItem("dark-mode-storage") || "dark";
setTheme(savedTheme);
