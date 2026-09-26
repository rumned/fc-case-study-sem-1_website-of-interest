// Single source of truth for everything placed along the timeline.
// index.html only holds the page shell; script.js reads this file to build
// the ruler ticks, the trivia points, and the intro/outro sections.

const timelineConfig = {
  "maxAltitude": 100100,
  "minAltitude": -11100
};

// Full-width intro/outro sections. `content` is trusted, author-written HTML.
const timelineSections = [
  {
    "id": "top-page",
    "variant": "top",
    "altitude": 100020,
    "content": "<a href=\"#landing-page\" class=\"section-link\">Outer🛸Space</a>"
  },
  {
    "id": "landing-page",
    "variant": "middle",
    "altitude": 0,
    "content": "<div>\n          <strong>Scroll up or down ↕️</strong><br /><br />\n          <a href=\"#top-page\">--0m above</a>\n          <a href=\"#bottom-page\">sea level--</a>\n        </div>"
  },
  {
    "id": "bottom-page",
    "variant": "bottom",
    "altitude": -11020,
    "content": "<a href=\"#landing-page\" class=\"section-link\">°•🪸Deep⁠⁠°•Sea🪼°•</a>"
  }
];

// Trivia points. `side` places the box left/right of the spine; `anchorId`
// lets other links jump here; `revealId` + `altContent` power the
// click-to-reveal boxes (the box swaps between `content` and `altContent`).
const timelinePoints = [
  {
    "altitude": 100000,
    "side": "right",
    "content": "<strong> Kármán line <br />[100,000 m]</strong><br />\n        Conventional flight mechanics impossible",
    "anchorId": "100km"
  },
  {
    "altitude": 95000,
    "side": "left",
    "content": "<strong> Did you know?</strong>\n        As a star approaches the observer, the wavelength of the emitted light\n        would become shorter, causing the stars to appear more blue.<br />\n        This phenomenon is called \"blue shift\"\n        <br />"
  },
  {
    "altitude": 90000,
    "side": "right",
    "content": "<img src=\"assets/ISS.jpg\" />\n        <strong\n          >International Space Station orbital drag becomes measurable\n          <br />[90,000 m]</strong\n        ><br />",
    "anchorId": "90km",
    "revealId": "iss",
    "altContent": "<img src=\"assets/ISS.jpg\" />"
  },
  {
    "altitude": 80200,
    "side": "left",
    "content": "<img src=\"assets/aurora-borealis.jpg\" />\n        <strong>Auroras form <br />[above 80,000 m]</strong><br />",
    "revealId": "aurora",
    "altContent": "<img src=\"assets/aurora-borealis.jpg\" />"
  },
  {
    "altitude": 80000,
    "side": "right",
    "content": "<strong>Mesosphere ends <br />[80,000 m]</strong><br />",
    "anchorId": "80km"
  },
  {
    "altitude": 60000,
    "side": "left",
    "content": "<strong\n          >Meteor begins to burn due to atmospheric friction <br />[60,000\n          m]</strong\n        ><br />\n        This atmospheric region is called mesosphere",
    "anchorId": "60km",
    "revealId": "burning",
    "altContent": "<img src=\"assets/burningstar.avif\" />"
  },
  {
    "altitude": 53700,
    "side": "right",
    "content": "<strong>Highest scientific balloon <br />[53,700 m]</strong><br />\n        BS 13-08, JAXA, 20 September 2013"
  },
  {
    "altitude": 41492,
    "side": "left",
    "content": "> <strong> Highest freefall parachute jump <br />[41,492 m]</strong\n        ><br />\n        Alan Eustace, 24 October 2014"
  },
  {
    "altitude": 38969,
    "side": "right",
    "content": "<strong>Felix Baumgartner jump <br />[38,969 m]</strong><br />\n        14 October 2012, achieved fastest speed in a freefall <br />[1,357.6\n        km/h], first person to break the sound barrier in a freefall"
  },
  {
    "altitude": 20000,
    "side": "left",
    "content": "<strong>Peak ozone density in the stratosphere <br />[20,000 m]</strong\n        ><br />",
    "anchorId": "20km"
  },
  {
    "altitude": 15000,
    "side": "right",
    "content": "<strong\n          >Ozone concentration begins increasing rapidly <br />[15,000\n          m]</strong\n        ><br />"
  },
  {
    "altitude": 12000,
    "side": "left",
    "content": "<strong>Troposphere ends <br />[12,000 m]</strong><br />\n        Troposphere is where most weather phenomena happen"
  },
  {
    "altitude": 11300,
    "side": "right",
    "content": "<img src=\"assets/vulture.jpg\" />\n        <strong>Highest-flying bird <br />[11,300 m]</strong><br />\n        Rüppell's Griffon Vulture - reportedly discovered to fly at this height\n        after being struck by an airplane"
  },
  {
    "altitude": 10000,
    "side": "left",
    "content": "<strong>Commercial flight height<br />[10000 m]</strong><br />\n        Flights commonly fly at 9000m ~ 12000m",
    "anchorId": "10km"
  },
  {
    "altitude": 8848,
    "side": "right",
    "content": "<img src=\"assets/everest.jpg\" />\n        <strong>Mount Everest summit <br />[8,848 m]</strong><br />"
  },
  {
    "altitude": 7000,
    "side": "left",
    "content": "<strong\n          >Oxygen supplementation required for non-acclimated humans\n          <br />[7,000 m]</strong\n        ><br />"
  },
  {
    "altitude": 6000,
    "side": "right",
    "content": "<strong>Everest base camps location <br />[6,000 m]</strong><br />"
  },
  {
    "altitude": 5100,
    "side": "left",
    "content": "<img src=\"assets/la_rinconada.jpg\" />\n        <strong>Highest permanent settlement <br />[5,100 m]</strong><br />\n        La Rinconada, Peru"
  },
  {
    "altitude": 4095,
    "side": "right",
    "content": "<img src=\"assets/kinabalu.jpg\" />\n        <strong>Mount Kinabalu highest peak <br />[4,095 m]</strong><br />\n        Tallest mountain in Malaysia",
    "revealId": "kinabalu",
    "altContent": "<img src=\"assets/me_kinabalu.png\" />"
  },
  {
    "altitude": 3000,
    "side": "left",
    "content": "<strong>Eagles & migratory birds flight height <br />[3,000 m]</strong\n        ><br />"
  },
  {
    "altitude": 2750,
    "side": "right",
    "content": "<strong>First clouds (cumulus) often start <br />[2,750 m]</strong\n        ><br />"
  },
  {
    "altitude": 1000,
    "side": "left",
    "content": "<strong>Typical altitude of light aircraft <br />[1,000 m]</strong\n        ><br />"
  },
  {
    "altitude": 830,
    "side": "right",
    "content": "<img src=\"assets/burjkhalifa.jpg\" />\n        <strong>Tip of Burj Khalifa <br />[830 m]</strong><br />\n        Tallest skyscraper"
  },
  {
    "altitude": 452,
    "side": "left",
    "content": "<img src=\"assets/klcc.jpg\" />\n        <strong\n          >Petronas Twin Towers — tallest twin buildings <br />[452 m]</strong\n        ><br />"
  },
  {
    "altitude": -100,
    "side": "left",
    "content": "<strong\n          >Technical dive certifications maximum depth <br />[100 m]</strong\n        ><br />\n        Divers could go deeper with training and specialized gear",
    "anchorId": "-100m"
  },
  {
    "altitude": -332,
    "side": "right",
    "content": "<strong>Deepest scuba dive <br />[332 m]</strong><br />\n        Ahmed Gabr, 18-19 September 2014"
  },
  {
    "altitude": -500,
    "side": "left",
    "content": "<strong\n          >Upper mesopelagic (twilight zone); sunlight rapidly fading <br />[500\n          m]</strong\n        >"
  },
  {
    "altitude": -1000,
    "side": "right",
    "content": "<img src=\"assets/bluewhale.jpg\" />\n        <strong>Blue whales <br />[~1000 m]</strong><br />\n        Prefer depths of 400-1,000 meters for krill, but also seen closer to\n        shore.",
    "revealId": "bluewhale",
    "altContent": "<strong\n          >Photosynthesis ends completely; bioluminescence common [1,000\n          m]</strong\n        >"
  },
  {
    "altitude": -1750,
    "side": "right",
    "content": "<img src=\"assets/amphipod.jpg\" />\n        <strong\n          >Cold, dark waters; deep-sea shrimp and amphipods <br />[1,750\n          m]</strong\n        >"
  },
  {
    "altitude": -2500,
    "side": "left",
    "content": "<strong\n          >Bathypelagic (midnight zone); total darkness <br />[2,500 m]</strong\n        >"
  },
  {
    "altitude": -3000,
    "side": "right",
    "content": "<img src=\"assets/anglerfish.jpg\" />\n        <strong\n          >Deep-sea anglerfish and gulper eels common <br />[3,000 m]</strong\n        >",
    "revealId": "anglerfish"
  },
  {
    "altitude": -3800,
    "side": "right",
    "content": "<img src=\"assets/titanic.jpg\" />\n        <strong>Titanic wreckage <br />[3800 m]</strong><br />\n        15 April 1912, 325 nmi (600 km) south-southeast of Newfoundland, North\n        Atlantic Ocean",
    "revealId": "titanic",
    "altContent": "<img src=\"assets/oceangate.jpg\" />\n    <strong>OceanGate incident [3775m]</strong><br />\n    18 June 2023, near the wrecksite of Titanic"
  },
  {
    "altitude": -4500,
    "side": "right",
    "content": "<img src=\"assets/seacucumber.jpg\" />\n        <strong\n          >Sea cucumbers and brittle stars dominate <br />[4,500 m]</strong\n        >",
    "revealId": "sea-cucumbers"
  },
  {
    "altitude": -6250,
    "side": "right",
    "content": "<img src=\"assets/snailfish.jpg\" />\n        <strong>Snailfish adapted to extreme pressure <br />[6,250 m]</strong>",
    "revealId": "snailfish"
  },
  {
    "altitude": -7250,
    "side": "right",
    "content": "<strong\n          >Near-total isolation from surface ecosystems <br />[7,250 m]</strong\n        >"
  },
  {
    "altitude": -10935,
    "side": "right",
    "content": "<strong>Deepest known point of the Earth seabed <br />[~10935 m]</strong\n        ><br />\n        Challenger Deep, Mariana Trench, 200 km east of Mariana Islands, Pacific\n        Ocean",
    "revealId": "challengerdeep",
    "altContent": "<strong>First solo dive</strong><br />\n        James Cameron, 25 March 2012"
  }
];

// Plain ruler ticks. `id`/`href` mirror the anchors used elsewhere on the page.
const distanceMarkers = [
  {
    "altitude": 100000
  },
  {
    "altitude": 99000
  },
  {
    "altitude": 98000
  },
  {
    "altitude": 97000
  },
  {
    "altitude": 96000
  },
  {
    "altitude": 95000
  },
  {
    "altitude": 94000
  },
  {
    "altitude": 93000
  },
  {
    "altitude": 92000
  },
  {
    "altitude": 91000
  },
  {
    "altitude": 90000,
    "href": "100km"
  },
  {
    "altitude": 89000
  },
  {
    "altitude": 88000
  },
  {
    "altitude": 87000
  },
  {
    "altitude": 86000
  },
  {
    "altitude": 85000
  },
  {
    "altitude": 84000
  },
  {
    "altitude": 83000
  },
  {
    "altitude": 82000
  },
  {
    "altitude": 81000
  },
  {
    "altitude": 80000,
    "href": "90km"
  },
  {
    "altitude": 79000
  },
  {
    "altitude": 78000
  },
  {
    "altitude": 77000
  },
  {
    "altitude": 76000
  },
  {
    "altitude": 75000
  },
  {
    "altitude": 74000
  },
  {
    "altitude": 73000
  },
  {
    "altitude": 72000
  },
  {
    "altitude": 71000
  },
  {
    "altitude": 70000,
    "id": "70km",
    "href": "80km"
  },
  {
    "altitude": 69000
  },
  {
    "altitude": 68000
  },
  {
    "altitude": 67000
  },
  {
    "altitude": 66000
  },
  {
    "altitude": 65000
  },
  {
    "altitude": 64000
  },
  {
    "altitude": 63000
  },
  {
    "altitude": 62000
  },
  {
    "altitude": 61000
  },
  {
    "altitude": 60000,
    "href": "70km"
  },
  {
    "altitude": 59000
  },
  {
    "altitude": 58000
  },
  {
    "altitude": 57000
  },
  {
    "altitude": 56000
  },
  {
    "altitude": 55000
  },
  {
    "altitude": 54000
  },
  {
    "altitude": 53000
  },
  {
    "altitude": 52000
  },
  {
    "altitude": 51000
  },
  {
    "altitude": 50000,
    "id": "50km",
    "href": "60km"
  },
  {
    "altitude": 49000
  },
  {
    "altitude": 48000
  },
  {
    "altitude": 47000
  },
  {
    "altitude": 46000
  },
  {
    "altitude": 45000
  },
  {
    "altitude": 44000
  },
  {
    "altitude": 43000
  },
  {
    "altitude": 42000
  },
  {
    "altitude": 41000
  },
  {
    "altitude": 40000,
    "id": "40km",
    "href": "50km"
  },
  {
    "altitude": 39000
  },
  {
    "altitude": 38000
  },
  {
    "altitude": 37000
  },
  {
    "altitude": 36000
  },
  {
    "altitude": 35000
  },
  {
    "altitude": 34000
  },
  {
    "altitude": 33000
  },
  {
    "altitude": 32000
  },
  {
    "altitude": 31000
  },
  {
    "altitude": 30000,
    "id": "30km",
    "href": "40km"
  },
  {
    "altitude": 29000
  },
  {
    "altitude": 28000
  },
  {
    "altitude": 27000
  },
  {
    "altitude": 26000
  },
  {
    "altitude": 25000
  },
  {
    "altitude": 24000
  },
  {
    "altitude": 23000
  },
  {
    "altitude": 22000
  },
  {
    "altitude": 21000
  },
  {
    "altitude": 20000,
    "href": "30km"
  },
  {
    "altitude": 19500
  },
  {
    "altitude": 19000
  },
  {
    "altitude": 18500
  },
  {
    "altitude": 18000
  },
  {
    "altitude": 17500
  },
  {
    "altitude": 17000
  },
  {
    "altitude": 16500
  },
  {
    "altitude": 16000
  },
  {
    "altitude": 15500
  },
  {
    "altitude": 15000
  },
  {
    "altitude": 14500
  },
  {
    "altitude": 14000
  },
  {
    "altitude": 13500
  },
  {
    "altitude": 13000
  },
  {
    "altitude": 12500
  },
  {
    "altitude": 12000
  },
  {
    "altitude": 11500
  },
  {
    "altitude": 11000
  },
  {
    "altitude": 10500
  },
  {
    "altitude": 10000,
    "href": "20km"
  },
  {
    "altitude": 9500
  },
  {
    "altitude": 9000
  },
  {
    "altitude": 8500
  },
  {
    "altitude": 8000
  },
  {
    "altitude": 7500
  },
  {
    "altitude": 7000
  },
  {
    "altitude": 6500
  },
  {
    "altitude": 6000
  },
  {
    "altitude": 5500
  },
  {
    "altitude": 5000,
    "href": "10km"
  },
  {
    "altitude": 4500
  },
  {
    "altitude": 4000
  },
  {
    "altitude": 3500
  },
  {
    "altitude": 3000
  },
  {
    "altitude": 2750
  },
  {
    "altitude": 2500,
    "href": "landing-page"
  },
  {
    "altitude": 2250
  },
  {
    "altitude": 2000
  },
  {
    "altitude": 1750
  },
  {
    "altitude": 1500
  },
  {
    "altitude": 1250
  },
  {
    "altitude": 1000
  },
  {
    "altitude": 750
  },
  {
    "altitude": 500
  },
  {
    "altitude": 250
  },
  {
    "altitude": -100,
    "href": "-1000m"
  },
  {
    "altitude": -200
  },
  {
    "altitude": -300
  },
  {
    "altitude": -400
  },
  {
    "altitude": -500,
    "href": "-1000m"
  },
  {
    "altitude": -600
  },
  {
    "altitude": -700
  },
  {
    "altitude": -800
  },
  {
    "altitude": -900
  },
  {
    "altitude": -1000,
    "id": "-1000m",
    "href": "-2000m"
  },
  {
    "altitude": -1100
  },
  {
    "altitude": -1200
  },
  {
    "altitude": -1300
  },
  {
    "altitude": -1400
  },
  {
    "altitude": -1500
  },
  {
    "altitude": -1600
  },
  {
    "altitude": -1700
  },
  {
    "altitude": -1800
  },
  {
    "altitude": -1900
  },
  {
    "altitude": -2000,
    "id": "-2000m",
    "href": "-3000m"
  },
  {
    "altitude": -2100
  },
  {
    "altitude": -2200
  },
  {
    "altitude": -2300
  },
  {
    "altitude": -2400
  },
  {
    "altitude": -2500
  },
  {
    "altitude": -2600
  },
  {
    "altitude": -2700
  },
  {
    "altitude": -2800
  },
  {
    "altitude": -2900
  },
  {
    "altitude": -3000,
    "id": "-3000m",
    "href": "-4000m"
  },
  {
    "altitude": -3100
  },
  {
    "altitude": -3200
  },
  {
    "altitude": -3300
  },
  {
    "altitude": -3400
  },
  {
    "altitude": -3500
  },
  {
    "altitude": -3600
  },
  {
    "altitude": -3700
  },
  {
    "altitude": -3800
  },
  {
    "altitude": -3900
  },
  {
    "altitude": -4000,
    "id": "-4000m",
    "href": "-5000m"
  },
  {
    "altitude": -4100
  },
  {
    "altitude": -4200
  },
  {
    "altitude": -4300
  },
  {
    "altitude": -4400
  },
  {
    "altitude": -4500
  },
  {
    "altitude": -5000,
    "id": "-5000m",
    "href": "-10000m"
  },
  {
    "altitude": -6000
  },
  {
    "altitude": -6500
  },
  {
    "altitude": -7000
  },
  {
    "altitude": -7500
  },
  {
    "altitude": -8000
  },
  {
    "altitude": -8500
  },
  {
    "altitude": -9000
  },
  {
    "altitude": -9500
  },
  {
    "altitude": -10000,
    "id": "-10000m",
    "href": "bottom-page"
  },
  {
    "altitude": -10500
  },
  {
    "altitude": -11000
  }
];