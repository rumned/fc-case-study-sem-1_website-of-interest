const timeline = document.querySelector(".timeline");
const timelineElements = document.querySelectorAll(".timeline-box");
const metersPerVH = 1;
const maxAltitude = 100100;
const minAltitude = -11100;
const rangeAltitude = maxAltitude - minAltitude;
const timelineHeightVH = rangeAltitude / metersPerVH;

const cursor = document.querySelector(".cursor");
const landingPage = document.getElementById("landing-page");

timeline.style.height = `${timelineHeightVH}vh`;

// Ruler marks along the timeline. Most of these were previously ~185 hand-written
// <div class="distance-marker"> elements in index.html; generating them here removes
// that repetition. `id` lets other links jump to this mark; `href` makes the mark
// itself a link to another anchor further up/down the page.
const distanceMarkers = [
  { altitude: 100000 },
  { altitude: 99000 },
  { altitude: 98000 },
  { altitude: 97000 },
  { altitude: 96000 },
  { altitude: 95000 },
  { altitude: 94000 },
  { altitude: 93000 },
  { altitude: 92000 },
  { altitude: 91000 },
  { altitude: 90000, href: "100km" },
  { altitude: 89000 },
  { altitude: 88000 },
  { altitude: 87000 },
  { altitude: 86000 },
  { altitude: 85000 },
  { altitude: 84000 },
  { altitude: 83000 },
  { altitude: 82000 },
  { altitude: 81000 },
  { altitude: 80000, href: "90km" },
  { altitude: 79000 },
  { altitude: 78000 },
  { altitude: 77000 },
  { altitude: 76000 },
  { altitude: 75000 },
  { altitude: 74000 },
  { altitude: 73000 },
  { altitude: 72000 },
  { altitude: 71000 },
  { altitude: 70000, id: "70km", href: "80km" },
  { altitude: 69000 },
  { altitude: 68000 },
  { altitude: 67000 },
  { altitude: 66000 },
  { altitude: 65000 },
  { altitude: 64000 },
  { altitude: 63000 },
  { altitude: 62000 },
  { altitude: 61000 },
  { altitude: 60000, href: "70km" },
  { altitude: 59000 },
  { altitude: 58000 },
  { altitude: 57000 },
  { altitude: 56000 },
  { altitude: 55000 },
  { altitude: 54000 },
  { altitude: 53000 },
  { altitude: 52000 },
  { altitude: 51000 },
  { altitude: 50000, id: "50km", href: "60km" },
  { altitude: 49000 },
  { altitude: 48000 },
  { altitude: 47000 },
  { altitude: 46000 },
  { altitude: 45000 },
  { altitude: 44000 },
  { altitude: 43000 },
  { altitude: 42000 },
  { altitude: 41000 },
  { altitude: 40000, id: "40km", href: "50km" },
  { altitude: 39000 },
  { altitude: 38000 },
  { altitude: 37000 },
  { altitude: 36000 },
  { altitude: 35000 },
  { altitude: 34000 },
  { altitude: 33000 },
  { altitude: 32000 },
  { altitude: 31000 },
  { altitude: 30000, id: "30km", href: "40km" },
  { altitude: 29000 },
  { altitude: 28000 },
  { altitude: 27000 },
  { altitude: 26000 },
  { altitude: 25000 },
  { altitude: 24000 },
  { altitude: 23000 },
  { altitude: 22000 },
  { altitude: 21000 },
  { altitude: 20000, href: "30km" },
  { altitude: 19500 },
  { altitude: 19000 },
  { altitude: 18500 },
  { altitude: 18000 },
  { altitude: 17500 },
  { altitude: 17000 },
  { altitude: 16500 },
  { altitude: 16000 },
  { altitude: 15500 },
  { altitude: 15000 },
  { altitude: 14500 },
  { altitude: 14000 },
  { altitude: 13500 },
  { altitude: 13000 },
  { altitude: 12500 },
  { altitude: 12000 },
  { altitude: 11500 },
  { altitude: 11000 },
  { altitude: 10500 },
  { altitude: 10000, href: "20km" },
  { altitude: 9500 },
  { altitude: 9000 },
  { altitude: 8500 },
  { altitude: 8000 },
  { altitude: 7500 },
  { altitude: 7000 },
  { altitude: 6500 },
  { altitude: 6000 },
  { altitude: 5500 },
  { altitude: 5000, href: "10km" },
  { altitude: 4500 },
  { altitude: 4000 },
  { altitude: 3500 },
  { altitude: 3000 },
  { altitude: 2750 },
  { altitude: 2500, href: "landing-page" },
  { altitude: 2250 },
  { altitude: 2000 },
  { altitude: 1750 },
  { altitude: 1500 },
  { altitude: 1250 },
  { altitude: 1000 },
  { altitude: 750 },
  { altitude: 500 },
  { altitude: 250 },
  { altitude: -100, href: "-1000m" },
  { altitude: -200 },
  { altitude: -300 },
  { altitude: -400 },
  { altitude: -500, href: "-1000m" },
  { altitude: -600 },
  { altitude: -700 },
  { altitude: -800 },
  { altitude: -900 },
  { altitude: -1000, id: "-1000m", href: "-2000m" },
  { altitude: -1100 },
  { altitude: -1200 },
  { altitude: -1300 },
  { altitude: -1400 },
  { altitude: -1500 },
  { altitude: -1600 },
  { altitude: -1700 },
  { altitude: -1800 },
  { altitude: -1900 },
  { altitude: -2000, id: "-2000m", href: "-3000m" },
  { altitude: -2100 },
  { altitude: -2200 },
  { altitude: -2300 },
  { altitude: -2400 },
  { altitude: -2500 },
  { altitude: -2600 },
  { altitude: -2700 },
  { altitude: -2800 },
  { altitude: -2900 },
  { altitude: -3000, id: "-3000m", href: "-4000m" },
  { altitude: -3100 },
  { altitude: -3200 },
  { altitude: -3300 },
  { altitude: -3400 },
  { altitude: -3500 },
  { altitude: -3600 },
  { altitude: -3700 },
  { altitude: -3800 },
  { altitude: -3900 },
  { altitude: -4000, id: "-4000m", href: "-5000m" },
  { altitude: -4100 },
  { altitude: -4200 },
  { altitude: -4300 },
  { altitude: -4400 },
  { altitude: -4500 },
  { altitude: -5000, id: "-5000m", href: "-10000m" },
  { altitude: -6000 },
  { altitude: -6500 },
  { altitude: -7000 },
  { altitude: -7500 },
  { altitude: -8000 },
  { altitude: -8500 },
  { altitude: -9000 },
  { altitude: -9500 },
  { altitude: -10000, id: "-10000m", href: "bottom-page" },
  { altitude: -10500 },
  { altitude: -11000 },
];
function buildDistanceMarkers(markers) {
  const fragment = document.createDocumentFragment();

  markers.forEach(({ altitude, id, href }) => {
    const marker = document.createElement("div");
    marker.className = "distance-marker";
    marker.dataset.altitude = altitude;
    if (id) marker.id = id;

    const label = document.createElement("strong");
    label.textContent = `${altitude}m`;

    if (href) {
      const link = document.createElement("a");
      link.href = `#${href}`;
      link.appendChild(label);
      marker.appendChild(link);
    } else {
      marker.appendChild(label);
    }

    fragment.appendChild(marker);
  });

  return fragment;
}

timeline.appendChild(buildDistanceMarkers(distanceMarkers));

// Position every element that declares a data-altitude (timeline points, boxes,
// sections, and the distance markers just added above).
document.querySelectorAll("[data-altitude]").forEach((box) => {
  const meters = Number(box.dataset.altitude);
  if (Number.isNaN(meters)) return;
  const altitudeVH = (maxAltitude - meters) / metersPerVH;
  box.style.top = `${altitudeVH}vh`;
});

window.addEventListener("load", () => {
  if (landingPage) {
    landingPage.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});

const timelineObserverCallback = (entries) => {
  entries.forEach((entry) => {
    // Check if the element is intersecting (coming into view)
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else {
      entry.target.classList.remove("is-visible");
    }
  });
};

const timelineObserverOptions = {
  root: null, // use the viewport as the root
  rootMargin: "0px",
  threshold: 0.7,
};

const observer = new IntersectionObserver(
  timelineObserverCallback,
  timelineObserverOptions
);

timelineElements.forEach((element) => {
  observer.observe(element);
});

// Cursor icon by scroll distance (checked in order, first match wins).
const cursorIcons = [
  { belowDistance: 20000, icon: "🚀" },
  { belowDistance: 40000, icon: "🔥" },
  { belowDistance: 80000, icon: "🎈" },
  { belowDistance: 99000, icon: "✈️" },
  { belowDistance: 100160, icon: "😀" },
];
const DEFAULT_CURSOR_ICON = "🤿";

function iconForDistance(distance) {
  const zone = cursorIcons.find((z) => distance < z.belowDistance);
  return zone ? zone.icon : DEFAULT_CURSOR_ICON;
}

// Body background class by scroll distance (checked in order, first match wins).
const backgroundZones = [
  { maxDistance: 10500, className: "starrynight" },
  { maxDistance: 20040, className: "aurora" },
  { maxDistance: 40020, className: "meteor" },
  { maxDistance: 87500, className: "ozoneclouds" },
  { maxDistance: 97500, className: "lightclouds" },
  { maxDistance: 100550, className: "transition1" },
  { maxDistance: 100770, className: "transition2" },
  { maxDistance: 100950, className: "transition3" },
  { maxDistance: 101500, className: "mesosphere" },
  { maxDistance: 102000, className: "transition4" },
  { maxDistance: 125000, className: "dark" },
];
const DEFAULT_BACKGROUND_CLASS = "defaultcolor";
const backgroundClassNames = [
  DEFAULT_BACKGROUND_CLASS,
  ...backgroundZones.map((z) => z.className),
];

function backgroundClassForDistance(distance) {
  const zone = backgroundZones.find((z) => distance <= z.maxDistance);
  return zone ? zone.className : DEFAULT_BACKGROUND_CLASS;
}

let cursorY = 0;
let targetCursorY = 0;

// Updates cursor position when scrolling event fires
window.addEventListener("scroll", () => {
  const distanceFromTop = (window.scrollY / window.innerHeight) * 100;

  // map distanceFromTop to a small viewport offset
  const maxOffsetVH = 12; // visual limit
  const scale = 0.05; // sensitivity

  //ensures that the cursor does not go off screen while scrolling
  targetCursorY = Math.max(-1, Math.min(maxOffsetVH, distanceFromTop * scale));

  cursor.textContent = iconForDistance(distanceFromTop);

  document.body.classList.remove(...backgroundClassNames);
  document.body.classList.add(backgroundClassForDistance(distanceFromTop));
});

function linearInterpolation(current, target, factor) {
  return current + (target - current) * factor;
}

// Controls easing of the cursor
function animateCursor() {
  cursorY = linearInterpolation(cursorY, targetCursorY, 0.15);

  cursor.style.transform = `translateY(${cursorY}vh)`;

  requestAnimationFrame(animateCursor); //window method
}

animateCursor();

// Click-to-reveal boxes: each one swaps between its original HTML (as written in
// index.html) and an alternate version, toggling back and forth on every click.
const toggleContent = [
  {
    id: "titanic",
    alt: `<img src="assets/oceangate.jpg" />
    <strong>OceanGate incident [3775m]</strong><br />
    18 June 2023, near the wrecksite of Titanic`,
  },
  {
    id: "challengerdeep",
    alt: `<strong>First solo dive</strong><br />
        James Cameron, 25 March 2012`,
  },
  {
    id: "bluewhale",
    alt: `<strong
          >Photosynthesis ends completely; bioluminescence common [1,000
          m]</strong
        >`,
  },
  { id: "aurora", alt: `<img src="assets/aurora-borealis.jpg" />` },
  { id: "iss", alt: `<img src="assets/ISS.jpg" />` },
  { id: "burning", alt: `<img src="assets/burningstar.avif" />` },
  { id: "kinabalu", alt: `<img src="assets/me_kinabalu.png" />` },
];

toggleContent.forEach(({ id, alt }) => {
  const element = document.getElementById(id);
  if (!element) return;

  const original = element.innerHTML;
  let showingAlt = false;

  element.addEventListener("click", () => {
    element.innerHTML = showingAlt ? original : alt;
    showingAlt = !showingAlt;
  });
});

const altitudeInput = document.getElementById("altitude-input");
const goBtn = document.getElementById("go-btn");
const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");

// Helper function to scroll to a specific altitude in meters
function scrollToAltitude(targetAltitude) {
  // Constrain the target within the timeline's min and max bounds
  const clampedAltitude = Math.max(minAltitude, Math.min(maxAltitude, targetAltitude));

  // Calculate the target viewport height (vh) based on existing timeline logic
  const altitudeVH = (maxAltitude - clampedAltitude) / metersPerVH;

  // Convert vh to pixels for the window.scrollTo method
  const targetPixels = (altitudeVH * window.innerHeight) / 100;

  window.scrollTo({
    top: targetPixels,
    behavior: "smooth"
  });
}

// "Go" button event listener
goBtn.addEventListener("click", () => {
  const target = parseFloat(altitudeInput.value);
  if (!isNaN(target)) {
    scrollToAltitude(target);
  }
});

// Allow hitting "Enter" in the input field to trigger the scroll
altitudeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const target = parseFloat(altitudeInput.value);
    if (!isNaN(target)) {
      scrollToAltitude(target);
    }
  }
});

// "Up" button logic: Calculates current altitude from scroll position and jumps up 1000m
upBtn.addEventListener("click", () => {
  const currentVH = (window.scrollY * 100) / window.innerHeight;
  const currentAltitude = maxAltitude - (currentVH * metersPerVH);
  
  scrollToAltitude(currentAltitude + 1000);
});

// "Down" button logic: Calculates current altitude from scroll position and jumps down 1000m
downBtn.addEventListener("click", () => {
  const currentVH = (window.scrollY * 100) / window.innerHeight;
  const currentAltitude = maxAltitude - (currentVH * metersPerVH);
  
  scrollToAltitude(currentAltitude - 1000);
});