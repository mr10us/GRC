function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback;
  document.body.appendChild(script);
}
// MAP

function initializeMap() {
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
}

// Наблюдение за секцией карты
const mapSection = document.querySelector("#map-section");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadScript("https://d3js.org/d3.v7.min.js", initializeMap);
      }
    });
  },
  { root: null, rootMargin: "400px", threshold: 0.1 }
);

observer.observe(mapSection);
