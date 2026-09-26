const timeline = document.querySelector(".timeline");
const timelineElements = document.querySelectorAll(".timeline-box");
const metersPerVH = 1;
const maxAltitude = 100100;
const minAltitude = -11100;
const rangeAltitude = maxAltitude - minAltitude;
let rangeCounter = rangeAltitude;
const timelineHeightVH = rangeAltitude / metersPerVH;

const cursorContainer = document.querySelector(".cursor-container");
const cursor = document.querySelector(".cursor");
const landingPage = document.getElementById("landing-page");
const topPage = document.getElementById("top-page");
const bottomPage = document.getElementById("bottom-page");
const titanicClick = document.getElementById("titanic");
const challengerDeepClick = document.getElementById("challengerdeep");
const blueWhaleClick = document.getElementById("bluewhale");
const auroraClick = document.getElementById("aurora");
const issClick = document.getElementById("iss");
const burningClick = document.getElementById("burning");
const kinabaluClick = document.getElementById("kinabalu");

let cursorY = 0;
let targetCursorY = 0;
let titanicCount = 0;
let challengerCount = 0;
let blueWhaleCount = 0;
let auroraCount = 0;
let issClickCount = 0;
let burningCount = 0;
let kinabaluCount = 0;

let topPageVisible = false;
let bottomPageVisible = false;

timeline.style.height = `${timelineHeightVH}vh`;

window.addEventListener("load", () => {
  if (landingPage) {
    landingPage.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});

document.querySelectorAll("[data-altitude]").forEach((box) => {
  const meters = Number(box.dataset.altitude);
  if (Number.isNaN(meters)) return;
  const altitudeVH = (maxAltitude - meters) / metersPerVH;
  box.style.top = `${altitudeVH}vh`;
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

// Updates cursor position when scrolling event fires
window.addEventListener("scroll", () => {
  const distanceFromTop = (window.scrollY / window.innerHeight) * 100;

  // map distanceFromTop to a small viewport offset
  const maxOffsetVH = 12; // visual limit
  const scale = 0.05; // sensitivity

  //ensures that the cursor does not go off screen while scrolling
  targetCursorY = Math.max(-1, Math.min(maxOffsetVH, distanceFromTop * scale));

  // Cursor shape based on height
  if (distanceFromTop < 20000) {
    cursor.textContent = "🚀";
  } else if (distanceFromTop < 40000) {
    cursor.textContent = "🔥";
  } else if (distanceFromTop < 80000) {
    cursor.textContent = "🎈";
  } else if (distanceFromTop < 99000) {
    cursor.textContent = "✈️";
  } else if (distanceFromTop < 100160) {
    cursor.textContent = "😀";
  } else {
    cursor.textContent = "🤿";
  }
  // Body background based on height
  document.body.classList.remove(
    "defaultcolor",
    "transition1",
    "troposphere",
    "transition2",
    "stratosphere",
    "transition3",
    "mesosphere",
    "transition4",
    "aurora",
    "starrynight",
    "ozoneclouds",
    "lightclouds",
    "meteor",
    "dark"
  );

  if (distanceFromTop <= 10500) {
    document.body.classList.add("starrynight");
  } else if (distanceFromTop <= 20040) {
    document.body.classList.add("aurora");
  } else if (distanceFromTop <= 40020) {
    document.body.classList.add("meteor");
  } else if (distanceFromTop <= 87500) {
    document.body.classList.add("ozoneclouds");
  } else if (distanceFromTop <= 97500) {
    document.body.classList.add("lightclouds");
  } else if (distanceFromTop <= 100550) {
    document.body.classList.add("transition1");
  } else if (distanceFromTop <= 100770) {
    document.body.classList.add("transition2");
  } else if (distanceFromTop <= 100950) {
    document.body.classList.add("transition3");
  } else if (distanceFromTop <= 101500) {
    document.body.classList.add("mesosphere");
  } else if (distanceFromTop <= 102000) {
    document.body.classList.add("transition4");
  } else if (distanceFromTop <= 125000) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.add("defaultcolor");
  }
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

titanicClick.addEventListener("click", () => {
  if (titanicCount == 0) {
    titanicClick.innerHTML = `<img src ="assets/oceangate.jpg"/>
    <strong>OceanGate incident [3775m]</strong><br />
        18 June 2023, near the wrecksite of Titanic`;
    titanicCount = 1;
  } else {
    titanicClick.innerHTML = `<img src="assets/titanic.jpg" />
        <strong>Titanic wreckage <br />[3800 m]</strong><br />
        15 April 1912, 325 nmi (600 km) south-southeast of Newfoundland, North
        Atlantic Ocean
      </div>n`;
    titanicCount = 0;
  }
});

challengerDeepClick.addEventListener("click", () => {
  if (challengerCount == 0) {
    challengerDeepClick.innerHTML = `<strong>First solo dive</strong><br />
        James Cameron, 25 March 2012`;
    challengerCount = 1;
  } else {
    challengerDeepClick.innerHTML = `<strong>Deepest known point of the Earth seabed [~10935m]</strong><br />
        Challenger Deep, Mariana Trench, 200 km east of Mariana Islands, Pacific
        Ocean`;
    challengerCount = 0;
  }
});

blueWhaleClick.addEventListener("click", () => {
  if (blueWhaleCount == 0) {
    blueWhaleClick.innerHTML = ` <strong
          >Photosynthesis ends completely; bioluminescence common [1,000
          m]</strong
        >`;
    blueWhaleCount = 1;
  } else {
    blueWhaleClick.innerHTML = `<img src="assets/bluewhale.jpg" />
        <strong>Blue whales <br />[~1000 m]</strong><br />
        Prefer depths of 400-1,000 meters for krill, but also seen closer to
        shore.
      </div>`;
    blueWhaleCount = 0;
  }
});

auroraClick.addEventListener("click", () => {
  if (auroraCount == 0) {
    auroraClick.innerHTML = `<img src = "assets/aurora-borealis.jpg"/>`;
    auroraCount = 1;
  } else {
    auroraClick.innerHTML = `<strong>Auroras form <br />[above 80,000 m]</strong><br />`;
    auroraCount = 0;
  }
});

issClick.addEventListener("click", () => {
  if (issClickCount == 0) {
    issClick.innerHTML = `<img src = "assets/ISS.jpg"/>`;
    issClickCount = 1;
  } else {
    issClick.innerHTML = `<strong
          >International Space Station orbital drag becomes measurable
          <br />[90,000 m]</strong
        ><br />`;
    issClickCount = 0;
  }
});

burningClick.addEventListener("click", () => {
  if (burningCount == 0) {
    burningClick.innerHTML = `<img src = "assets/burningstar.avif"/>`;
    burningCount = 1;
  } else {
    burningClick.innerHTML = `<strong
          >Meteor begins to burn due to atmospheric friction <br />[60,000
          m]</strong
        ><br />
        This atmospheric region is called mesosphere`;
    burningCount = 0;
  }
});

kinabaluClick.addEventListener("click", () => {
  if (kinabaluCount == 0) {
    kinabalu.innerHTML = `<img src = "assets/me_kinabalu.png"/>`;
    kinabaluCount = 1;
  } else {
    kinabaluClick.innerHTML = `<img src="assets/kinabalu.jpg" />
        <strong>Mount Kinabalu highest peak <br />[4,095 m]</strong><br />
        Tallest mountain in Malaysia`;
    kinabaluCount = 0;
  }
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