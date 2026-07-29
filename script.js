(function () {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const saved = localStorage.getItem("binyan-theme");
  const preferred = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const initial = saved || preferred;
  root.dataset.theme = initial;

  function updateToggle() {
    if (!toggle) return;
    const dark = root.dataset.theme === "dark";
    const icon = toggle.querySelector("i");
    const isChinese = root.lang.toLowerCase().startsWith("zh");
    if (icon) icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    toggle.setAttribute("aria-label", isChinese
      ? (dark ? "切换浅色主题" : "切换深色主题")
      : (dark ? "Use light theme" : "Use dark theme"));
  }

  updateToggle();
  if (toggle) {
    toggle.addEventListener("click", function () {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("binyan-theme", root.dataset.theme);
      updateToggle();
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  const buttons = document.querySelectorAll("[data-filter]");
  const papers = document.querySelectorAll(".paper[data-topic]");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      buttons.forEach(function (item) { item.classList.toggle("is-active", item === button); });
      papers.forEach(function (paper) {
        paper.hidden = filter !== "all" && paper.dataset.topic !== filter;
      });
    });
  });
})();
