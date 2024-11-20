$(document).ready(function () {
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

  // longitude, latitude
  const regionsWithPins = [
    { name: "Guatemala", link: "/#/" },
    { name: "China", link: "/#/" },
    { name: "North Korea", coordinates: [127.5, 40.3399], link: "/#/" },
    { name: "Mozambique", link: "/#/" },
    { name: "Pakistan", link: "/#/" },
    { name: "Indonesia", link: "/#/" },
    { name: "Malaysia", link: "/#/" },
    { name: "Philippines", link: "/#/" },
    { name: "Thailand", link: "/#/" },
    { name: "Bangladesh", link: "/#/" },
    { name: "Ukraine", link: "/#/" },
    { name: "South Sudan", coordinates: [31.1656, 30.3162], link: "/#/" },
    { name: "Israel", link: "/#/" },
    { name: "Rwanda", link: "/#/" },
    { name: "Sierra Leone", link: "/#/" },
    { name: "Syria", link: "/#/" },
    { name: "Hong Kong", coordinates: [114.1095, 22.3964], link: "/#/" },
    { name: "Yemen", link: "/#/" },
    { name: "African Union", coordinates: [38.74, 9.03], link: "/#/" },
    { name: "Moldova", link: "/#/" },
    { name: "Laos", coordinates: [102.4955, 19.8563], link: "/#/" },
    { name: "Zimbabwe", link: "/#/" },
    { name: "Libya", link: "/#/" },
    { name: "Uganda", link: "/#/" },
    { name: "Mali", link: "/#/" },
    { name: "Somalia", link: "/#/" },
    { name: "Cambodia", link: "/#/" },
    { name: "Maldives", coordinates: [73.2207, 3.2028], link: "/#/" },
    { name: "Vietnam", link: "/#/" },
    { name: "Armenia", link: "/#/" },
    { name: "Iraq", link: "/#/" },
    { name: "Gaza", coordinates: [34.4669, 31.5013], link: "/#/" },
    { name: "Guatemala", link: "/#/" },
    { name: "Ethiopia", link: "/#/" },
    { name: "Bosnia", coordinates: [43.8563, 18.4131], link: "/#/" },
    { name: "Venezuela", link: "/#/" },
    { name: "Serbia", link: "/#/" },
    { name: "Netherlands", link: "/#/" },
    { name: "France", link: "/#/" },
    { name: "Sweden", link: "/#/" },
    { name: "Germany", link: "/#/" },
    { name: "United Kingdom", link: "/#/" },
    { name: "Netherlands", link: "/#/" },
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
    // Отображение карты
    svg
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#D0B2C04D")
      .attr("stroke", "#D0B2C04D");

    // Расчет центра страны для пинов
    const countryCenters = {};
    data.features.forEach((feature) => {
      const countryName = feature.properties.name;
      const centroid = path.centroid(feature);
      countryCenters[countryName] = centroid;
    });

    console.log(countryCenters);

    // Отображение пинов
    svg
      .selectAll(".pin")
      .data(regionsWithPins)
      .enter()
      .append("g")
      .attr("class", "map-pin")
      .attr("transform", (d) => {
        const coordinates = d.coordinates
          ? projection(d.coordinates)
          : countryCenters[d.name];
        return `translate(${coordinates})`;
      })
      .each(function () {
        d3.select(this)
          .append("circle")
          .attr("r", 10)
          .attr("fill", "none")
          .attr("stroke", violetColor)
          .attr("stroke-width", 1)
          .attr("class", "pulse-circle");

        d3.select(this)
          .append("circle")
          .attr("class", "map-pin")
          .attr("r", 5)
          .attr("fill", violetColor);
      });

    // Обработчики событий для пинов
    svg
      .selectAll(".map-pin")
      .on("mouseover", function () {
        d3.select(this)
          .select("circle.map-pin")
          .attr("fill", violetColor + "80");
      })
      .on("mouseout", function () {
        d3.select(this).select("circle.map-pin").attr("fill", violetColor);
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

  // Map auto scroll on mobile

  const map = document.querySelector("#map");

  const mapObserver = new IntersectionObserver(function (entry) {
    if (entry[0].isIntersecting) {
      const mapLength = map.scrollWidth;
      map.scrollTo({
        left: mapLength / 2.5,
        behavior: "smooth",
      });
    } else {
      map.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, options);

  mapObserver.observe(map);
});
