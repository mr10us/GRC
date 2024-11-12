$(document).ready(function () {
  $(".projects__slider").slick({
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendArrows: ".projects__slider-nav",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".reviews__slider").slick({
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    appendArrows: ".reviews__slider-nav",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  const header = document.querySelector("header");

  window.addEventListener("scroll", function() {
    if (this.pageYOffset > 0) {
      header.classList.add("darken");
    }
    else header.classList.remove("darken")
  })
});


