// Reads timelineConfig / timelineSections / timelinePoints / distanceMarkers
// from timeline-data.js and builds the whole page from them. index.html only
// holds the static shell (spine + cursor).

const timeline = document.querySelector(".timeline");
const cursor = document.querySelector(".cursor");

// Positioning is done entirely in CSS via calc() against these two custom
// properties (see style.css). Setting a custom property is the one
// inline-style exception we use throughout this file — every other bit of
// presentation stays in style.css.
document.documentElement.style.setProperty("--max-altitude", timelineConfig.maxAltitude);

const timelineHeightVH = timelineConfig.maxAltitude - timelineConfig.minAltitude;
timeline.style.setProperty("--timeline-height", timelineHeightVH);

function positionElement(element, altitude) {
  element.dataset.altitude = altitude;
  element.style.setProperty("--altitude", altitude);
}

function buildSection({ id, variant, altitude, content }) {
  const section = document.createElement("div");
  section.className = `section ${variant}-section`;
  section.id = id;
  section.innerHTML = content;
  positionElement(section, altitude);
  return section;
}

function buildPoint({ altitude, side, anchorId, revealId, content, altContent }) {
  const fragment = document.createDocumentFragment();

  const point = document.createElement("div");
  point.className = "timeline-point";
  if (anchorId) point.id = anchorId;
  positionElement(point, altitude);
  fragment.appendChild(point);

  const box = document.createElement("div");
  box.className = `timeline-box ${side}`;
  if (revealId) box.id = revealId;
  box.innerHTML = content;
  positionElement(box, altitude);

  // Click-to-reveal: swap between the two states stored in the data file.
  if (altContent) {
    let showingAlt = false;
    box.addEventListener("click", () => {
      box.innerHTML = showingAlt ? content : altContent;
      showingAlt = !showingAlt;
    });
  }

  fragment.appendChild(box);
  return fragment;
}

function buildDistanceMarker({ altitude, id, href }) {
  const marker = document.createElement("div");
  marker.className = "distance-marker";
  if (id) marker.id = id;
  positionElement(marker, altitude);

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

  return marker;
}

const timelineContent = document.createDocumentFragment();
timelineSections.forEach((section) => timelineContent.appendChild(buildSection(section)));
timelinePoints.forEach((point) => timelineContent.appendChild(buildPoint(point)));
distanceMarkers.forEach((marker) => timelineContent.appendChild(buildDistanceMarker(marker)));
timeline.appendChild(timelineContent);

// Everything above must run before this: it depends on #landing-page and
// .timeline-box elements existing in the DOM.
const landingPage = document.getElementById("landing-page");
const timelineBoxes = document.querySelectorAll(".timeline-box");

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

timelineBoxes.forEach((element) => {
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
  cursor.style.setProperty("--cursor-y", cursorY);
  requestAnimationFrame(animateCursor); //window method
}

animateCursor();