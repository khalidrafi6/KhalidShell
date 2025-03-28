let toggles = document.getElementsByClassName("dark-mode-toggle");
let darkTheme = document.getElementById("dark-mode-theme");

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
    darkTheme.disabled = false;
    Array.from(toggles).forEach(toggle => {
      toggle.classList.remove("moon");
      toggle.classList.add("sun");

      toggle.innerHTML = '☀️';
    });
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (mode === "light") {
    darkTheme.disabled = true;
    Array.from(toggles).forEach(toggle => {
      toggle.classList.remove("sun");
      toggle.classList.add("moon");

      toggle.innerHTML = '🌗';
    });
    document.documentElement.removeAttribute("data-theme");
  }
}

// the default theme is light
let savedTheme = localStorage.getItem("dark-mode-storage") || "light";
setTheme(savedTheme);
