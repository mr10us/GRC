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

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  const sliderSections = Array.from(
    document.querySelectorAll('[class*="__slider"]')
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          // Загружаем jQuery и slick.js в правильном порядке
          loadScript("//code.jquery.com/jquery-1.11.0.min.js")
            .then(() => loadScript("//code.jquery.com/jquery-migrate-1.2.1.min.js"))
            .then(() => loadScript("/assets/js/slick.min.js"))
            .then(initializeSliders)
            .catch((error) => console.error("Ошибка загрузки скриптов:", error));
        }
      });
    },
    { root: null, rootMargin: "400px", threshold: 0.1 }
  );

  sliderSections.forEach((section) => {
    observer.observe(section);
  });
});

function initializeSliders() {
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
}


document.addEventListener("DOMContentLoaded", function () {
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
