// dropdown

window.addEventListener("load", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    if (dropdown.dataset.position) {
      const position = dropdown.dataset.position;
      const content = dropdown.querySelector(".dropdown__content");

      if (position === "top") {
        dropdown.style.setProperty("--triangle-deg", "-180deg");
        dropdown.style.setProperty("--triangle-origin", "bottom center");
        content.style.top = "unset";
        content.style.bottom = "calc(100% + 8px)";
      }
    }
  });

  (function () {
    const header = document.querySelector("header");

    window.addEventListener("click", ({ target }) => {
      const scrollTop = window.pageYOffset > 0;

      if (
        target.classList.contains("dropdown") ||
        target.parentNode.classList.contains("dropdown")
      ) {
        const dropdown = target.closest(".dropdown");

        dropdown.classList.toggle("active");

        if (!scrollTop && header.classList.contains("active")) {
          header.classList.remove("active");
        } else {
          header.classList.add("active");
        }
      } else {
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });

        if (scrollTop && !target.closest(".mobile-menu")) {
          header.classList.remove("active");
        }
      }
    });
  })();
});
