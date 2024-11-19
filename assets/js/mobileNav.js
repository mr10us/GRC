window.addEventListener("load", function () {
  const header = document.querySelector("header");
  const burger = document.querySelector(".menu-btn");
  const menu = document.querySelector(".mobile-menu");
  const html = document.querySelector("html");
  const body = document.body

  for (let i = 0; i < 3; i++) {
    burger.appendChild(document.createElement("span"));
  }

  this.addEventListener("click", ({ target }) => {
    const isBurgerClicked = target === burger || target.parentNode === burger;
    if (isBurgerClicked) {
      burger.classList.toggle("active");
      menu.classList.toggle("active");
      header.classList.toggle("active");

      body.style.overflowY === "hidden" ? (body.style.overflowY = null) : body.style.overflowY = "hidden";
    }
    if (!target.closest(".mobile-menu") && !isBurgerClicked) {
      burger.classList.remove("active");
      menu.classList.remove("active");
      header.classList.remove("active");

      body.style.overflowY = null;
    }
  });

  const childDropdowns = document.querySelectorAll(
    ".mobile-menu__content-dropdown__container"
  );

  childDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
  });

  window.addEventListener("scroll", function () {
    const scrollTop = this.pageYOffset;

    if (scrollTop > 0) {
      header.classList.add("darken");
    } else {
      header.classList.remove("darken");
    }
  });
});
