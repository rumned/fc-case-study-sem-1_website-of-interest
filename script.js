// Reads timelineConfig / timelineSections / timelinePoints / distanceMarkers
// from timeline-data.js and builds the whole page from them. index.html only
// holds the static shell (spine + cursor).

const timeline = document.querySelector(".timeline");
const cursor = document.querySelector(".cursor");
const cursorContainer = document.querySelector(".cursor-container");
const altitudeReadout = document.querySelector(".altitude-readout");

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

function buildAxisTick(altitude, className = "axis-tick") {
  const tick = document.createElement("div");
  tick.className = className;
  positionElement(tick, altitude);
  return tick;
}

// Minor ticks fill in between the major (distance-marker) ticks, skipping
// altitudes already covered by a major tick.
function generateMinorTickAltitudes({ minAltitude, maxAltitude }, minorStep = 50, majorStep = 1000) {
  const start = Math.ceil(minAltitude / minorStep) * minorStep;
  const altitudes = [];
  for (let altitude = start; altitude <= maxAltitude; altitude += minorStep) {
    if (altitude % majorStep !== 0) altitudes.push(altitude);
  }
  return altitudes;
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

function buildTickLine(altitude) {
  const line = document.createElement("div");
  line.className = "tick-line";
  positionElement(line, altitude);
  return line;
}

// One line every 500m across the full altitude range.
function generateTickLineAltitudes({ minAltitude, maxAltitude }) {
  const step = 500;
  const start = Math.ceil(minAltitude / step) * step;
  const altitudes = [];
  for (let altitude = start; altitude <= maxAltitude; altitude += step) {
    altitudes.push(altitude);
  }
  return altitudes;
}

const timelineContent = document.createDocumentFragment();
timelineSections.forEach((section) => timelineContent.appendChild(buildSection(section)));
timelinePoints.forEach((point) => timelineContent.appendChild(buildPoint(point)));
distanceMarkers.forEach((marker) => timelineContent.appendChild(buildDistanceMarker(marker)));
distanceMarkers.forEach((marker) => timelineContent.appendChild(buildAxisTick(marker.altitude)));
generateMinorTickAltitudes(timelineConfig).forEach((altitude) =>
  timelineContent.appendChild(buildAxisTick(altitude, "axis-tick axis-tick-minor"))
);
// generateTickLineAltitudes(timelineConfig).forEach((altitude) =>
//   timelineContent.appendChild(buildTickLine(altitude))
// );
timeline.appendChild(timelineContent);

// Everything above must run before this: it depends on #landing-page and
// .timeline-box elements existing in the DOM.
const landingPage = document.getElementById("landing-page");
const timelineBoxes = document.querySelectorAll(".timeline-box");

window.addEventListener("load", () => {
  if (landingPage) {
    scrollToAltitude(0); 
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

  // The cursor icon sits fixed at 36vh (+ the current easing offset) down
  // from the viewport top, not at the viewport top itself — the readout
  // needs to reflect the altitude at that visual position, not scrollY.
  const cursorOffsetVH = 36 + targetCursorY;
  const currentAltitude = timelineConfig.maxAltitude - (distanceFromTop + cursorOffsetVH) * metersPerVH;
  altitudeReadout.textContent = `${Math.round(currentAltitude)}m`;

  document.body.classList.remove(...backgroundClassNames);
  document.body.classList.add(backgroundClassForDistance(distanceFromTop));
});

function linearInterpolation(current, target, factor) {
  return current + (target - current) * factor;
}

const altitudeInput = document.getElementById("altitude-input");
const goBtn = document.getElementById("go-btn");
const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");

// Matches the --meters-per-vh custom property set in style.css.
const metersPerVH = 1;

function scrollToAltitude(targetAltitude) {
  const { minAltitude, maxAltitude } = timelineConfig;
  const clampedAltitude = Math.max(minAltitude, Math.min(maxAltitude, targetAltitude));

  // 1. The physical coordinate of the altitude in vh
  const documentVH = (maxAltitude - clampedAltitude) / metersPerVH;

  let targetVH;

  // 2. Exact algebraic reversal of the scroll listener's formula:
  // documentVH = targetVH + 36 + Math.max(-1, Math.min(12, targetVH * 0.05))
  if (documentVH <= 15) {
    // Zone 1: Cursor offset maxed out in the negative direction (-1vh)
    targetVH = documentVH - 35;
  } else if (documentVH >= 288) {
    // Zone 3: Cursor offset maxed out in the positive direction (+12vh)
    targetVH = documentVH - 48;
  } else {
    // Zone 2: Cursor offset is dynamically scaling (targetVH * 0.05)
    targetVH = (documentVH - 36) / 1.05;
  }

  // 3. Convert calculated vh to pixels for scrolling
  const targetPixels = (targetVH * window.innerHeight) / 100;

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
  const currentAltitude = timelineConfig.maxAltitude - (currentVH * metersPerVH);

  scrollToAltitude(currentAltitude + 1000);
});

// "Down" button logic: Calculates current altitude from scroll position and jumps down 1000m
downBtn.addEventListener("click", () => {
  const currentVH = (window.scrollY * 100) / window.innerHeight;
  const currentAltitude = timelineConfig.maxAltitude - (currentVH * metersPerVH);

  scrollToAltitude(currentAltitude - 1000);
});

// Controls easing of the cursor
function animateCursor() {
  cursorY = linearInterpolation(cursorY, targetCursorY, 0.15);
  cursorContainer.style.setProperty("--cursor-y", cursorY);
  requestAnimationFrame(animateCursor); //window method
}

animateCursor();