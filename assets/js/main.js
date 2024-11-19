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
          infinite: true
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
});

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

  // MAP

  const root = document.documentElement;
  const violetColor = getComputedStyle(root)
    .getPropertyValue("--violet")
    .trim();

  const width = 1100;
  const height = 600;

  const regionsWithPins = [
    { name: "Ukraine", coordinates: [31.1656, 48.3794], link: "/#/" },
    { name: "Kurdistan / Iraq", coordinates: [44.3661, 36.1911], link: "/#/" },
    { name: "Yemen", coordinates: [45.0373, 15.5527], link: "/#/" },
    {
      name: "Democratic People Republic Korea",
      coordinates: [127.5101, 40.339], link: "/#/",
    },
    { name: "North Korea", coordinates: [127.5101, 40.3399], link: "/#/" },
    { name: "Damascus, Syria", coordinates: [36.2913, 33.5138], link: "/#/" },
    { name: "Gaza", coordinates: [34.45, 31.5], link: "/#/" },
    { name: "Pakistan", coordinates: [69.3451, 30.3753], link: "/#/" },
  ];

  const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const projection = d3
    .geoMercator()
    .translate([width / 2.5, height / 1.3333])
    .scale(220);
  const path = d3.geoPath().projection(projection);

  d3.json("/assets/countries.geojson").then((data) => {
    svg
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#D0B2C04D")
      .attr("stroke", "#D0B2C04D");

    svg
      .selectAll(".pin")
      .data(regionsWithPins)
      .enter()
      .append("g")
      .attr("class", "map-pin")
      .attr("r", 10)
      .attr("transform", (d) => `translate(${projection(d.coordinates)})`)
      .each(function () {
        d3.select(this)
          .append("circle")
          .attr("r", 10)
          .attr("fill", "none")
          .attr("stroke", "var(--violet)")
          .attr("stroke-width", 1)
          .attr("class", "pulse-circle");

        d3.select(this)
          .append("circle")
          .attr("class", "map-pin")
          .attr("r", 5)
          .attr("fill", "var(--violet)");
      });

    svg
      .selectAll(".map-pin") // Выбираем только основной пин
      .on("mouseover", function () {
        d3.select(this).attr("fill", violetColor + "80");
      })
      .on("mouseout", function () {
        // Возврат цвета
        d3.select(this).attr("fill", "var(--violet)"); // Исходный цвет
      })
      .on("click", function (event, d) {
        d3.select(".tooltip").remove();

        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 1).html(`
            <span>${d.name}</span>
            <a href="${d.link}" target="_blank">View projects</a>
          `);

        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);

        d3.select("body").on("click", function () {
          d3.select(".tooltip").remove();
        });

        event.stopPropagation();
      });

    d3.select("body").on("click", function () {
      d3.select(".tooltip").remove();
    });
  });

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
