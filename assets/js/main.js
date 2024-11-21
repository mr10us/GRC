document.addEventListener("DOMContentLoaded", function () {
  const videoElement = document.getElementById("responsive-video");
  const isMobile = window.matchMedia("(max-width: 425px)").matches;

  const videoSrc = isMobile
    ? videoElement.dataset.mobile
    : videoElement.dataset.desktop;

  const sourceElement = document.createElement("source");
  sourceElement.src = videoSrc;
  sourceElement.type = "video/mp4";
  videoElement.appendChild(sourceElement);

  videoElement.load();
});

$(document).ready(function () {
  $(".projects__slider").slick({
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    appendArrows: ".projects__slider-nav",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  });

  $(".reviews__slider").slick({
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    appendArrows: ".reviews__slider-nav",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".logo-scroller").slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 2000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  if (window.matchMedia("(max-width: 640px)").matches) {
    if (!$(".insights__slider").hasClass("slick-initialized")) {
      $(".insights__slider").slick({
        speed: 300,
        arrows: false,
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1,
      });
    }
  } else {
    if ($(".insights__slider").hasClass("slick-initialized")) {
      $(".insights__slider").slick("unslick");
    }
  }

  // Animate circles

  const circles = document.querySelectorAll(".about__circles .circle");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(animateCircle, options);

  function animateCircle(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        // } else {
        //   entry.target.classList.remove("animated");
      }
    });
  }

  circles.forEach((circle) => {
    observer.observe(circle);
  });
});