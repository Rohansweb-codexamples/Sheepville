```javascript
import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";


/* =========================================================
   SCENE
========================================================= */

const scene = new THREE.Scene();

scene.background =
  new THREE.Color(0x8bd8ff);

scene.fog =
  new THREE.Fog(
    0x8bd8ff,
    35,
    120
  );


/* =========================================================
   CAMERA
========================================================= */

const camera =
  new THREE.PerspectiveCamera(
    65,
    innerWidth / innerHeight,
    0.1,
    200
  );

camera.position.set(
  0,
  5,
  12
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
  new THREE.WebGLRenderer({
    antialias: true
  });

renderer.setPixelRatio(
  Math.min(devicePixelRatio, 2)
);

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

document.body.prepend(
  renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */

const hemisphere =
  new THREE.HemisphereLight(
    0xbfeeff,
    0x6c934d,
    2.2
  );

scene.add(hemisphere);


const sun =
  new THREE.DirectionalLight(
    0xffffff,
    3.2
  );

sun.position.set(
  -25,
  35,
  20
);

sun.castShadow = true;

sun.shadow.mapSize.set(
  2048,
  2048
);

scene.add(sun);


/* =========================================================
   MATERIAL HELPERS
========================================================= */

function material(
  color,
  roughness = 1
) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness
  });

}


function box(
  width,
  height,
  depth,
  mat,
  x,
  y,
  z
) {

  const mesh =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),
      mat
    );

  mesh.position.set(
    x,
    y,
    z
  );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);

  return mesh;
}


function sphere(
  radius,
  mat,
  x,
  y,
  z
) {

  const mesh =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        radius,
        20,
        16
      ),
      mat
    );

  mesh.position.set(
    x,
    y,
    z
  );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);

  return mesh;
}


function cylinder(
  radius,
  height,
  mat,
  x,
  y,
  z
) {

  const mesh =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        radius,
        radius,
        height,
        18
      ),
      mat
    );

  mesh.position.set(
    x,
    y,
    z
  );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);

  return mesh;
}


/* =========================================================
   MATERIALS
========================================================= */

const grass =
  material(0x65b95d);

const dirt =
  material(0xd99b62);

const wool =
  material(0xfff8e9);

const sheepDark =
  material(0x344454);

const pink =
  material(0xff9aab);

const leaf =
  material(0x45a85d);

const wood =
  material(0x9b6339);


/* =========================================================
   WORLD
========================================================= */

box(
  150,
  0.5,
  150,
  grass,
  0,
  -0.25,
  0
);


/* =========================================================
   PATHS
========================================================= */

function path(
  x,
  z,
  width,
  depth
) {

  box(
    width,
    0.04,
    depth,
    dirt,
    x,
    0.02,
    z
  );

}


path(
  0,
  0,
  8,
  150
);

path(
  0,
  0,
  150,
  8
);

path(
  -34,
  -28,
  50,
  5
);

path(
  34,
  28,
  50,
  5
);


/* =========================================================
   TREES
========================================================= */

function tree(
  x,
  z,
  scale = 1
) {

  cylinder(
    0.35 * scale,
    2.4 * scale,
    wood,
    x,
    1.2 * scale,
    z
  );

  sphere(
    1.7 * scale,
    leaf,
    x,
    3 * scale,
    z
  );

  sphere(
    1.2 * scale,
    leaf,
    x + scale,
    2.7 * scale,
    z + .3 * scale
  );

  sphere(
    1.3 * scale,
    leaf,
    x - scale,
    2.8 * scale,
    z - .2 * scale
  );

}


for (
  let i = 0;
  i < 45;
  i++
) {

  const x =
    (Math.random() - .5) * 125;

  const z =
    (Math.random() - .5) * 125;

  if (
    Math.abs(x) < 9 ||
    Math.abs(z) < 9
  ) {

    continue;

  }

  tree(
    x,
    z,
    .65 + Math.random() * .55
  );

}


/* =========================================================
   FLOWERS
========================================================= */

function flower(
  x,
  z,
  color
) {

  cylinder(
    .035,
    .35,
    leaf,
    x,
    .2,
    z
  );

  sphere(
    .13,
    material(color),
    x,
    .42,
    z
  );

  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const angle =
      i * Math.PI * 2 / 5;

    sphere(
      .08,
      material(color),
      x +
        Math.cos(angle) * .12,
      .42,
      z +
        Math.sin(angle) * .12
    );

  }

}


const flowerColors = [
  0xff8f9f,
  0xffdc55,
  0xb98cff,
  0xffffff
];


for (
  let i = 0;
  i < 110;
  i++
) {

  flower(
    (Math.random() - .5) * 110,
    (Math.random() - .5) * 110,
    flowerColors[
      i % flowerColors.length
    ]
  );

}


/* =========================================================
   SHEEP CREATOR
========================================================= */

function createSheep(
  x,
  z,
  scale = 1,
  bodyColor = 0xfff8e9
) {

  const group =
    new THREE.Group();

  group.position.set(
    x,
    0,
    z
  );

  group.scale.setScalar(
    scale
  );


  /* BODY */

  const body =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.35,
        24,
        18
      ),
      material(bodyColor)
    );

  body.scale.set(
    1.25,
    .9,
    .85
  );

  body.position.y =
    1.75;

  body.castShadow = true;

  group.add(body);


  /* FLUFF */

  for (
    let i = 0;
    i < 9;
    i++
  ) {

    const angle =
      i * Math.PI * 2 / 9;

    const puff =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          .5,
          16,
          12
        ),
        wool
      );

    puff.position.set(
      Math.cos(angle) * 1.05,
      2 + Math.sin(angle) * .45,
      Math.sin(angle) * .7
    );

    puff.castShadow = true;

    group.add(puff);

  }


  /* HEAD */

  const head =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        .68,
        20,
        16
      ),
      sheepDark
    );

  head.position.set(
    0,
    1.75,
    1.35
  );

  head.scale.set(
    .9,
    1,
    .75
  );

  head.castShadow = true;

  group.add(head);


  /* FACE */

  const face =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        .46,
        18,
        14
      ),
      material(0x4b5661)
    );

  face.position.set(
    0,
    1.72,
    1.8
  );

  group.add(face);


  /* EYES */

  [-.24, .24].forEach(
    eyeX => {

      const eye =
        new THREE.Mesh(
          new THREE.SphereGeometry(
            .075,
            12,
            10
          ),
          wool
        );

      eye.position.set(
        eyeX,
        1.95,
        2.14
      );

      group.add(eye);

    }
  );


  /* EARS */

  [-.5, .5].forEach(
    earX => {

      const ear =
        new THREE.Mesh(
          new THREE.SphereGeometry(
            .23,
            14,
            10
          ),
          sheepDark
        );

      ear.scale.set(
        1,
        .45,
        1
      );

      ear.position.set(
        earX,
        2.02,
        1.48
      );

      ear.rotation.z =
        earX > 0
          ? -.35
          : .35;

      group.add(ear);

    }
  );


  /* LEGS */

  [-.65, .65].forEach(
    legX => {

      const leg =
        new THREE.Mesh(
          new THREE.CylinderGeometry(
            .13,
            .13,
            .75,
            12
          ),
          sheepDark
        );

      leg.position.set(
        legX,
        .65,
        .25
      );

      leg.castShadow = true;

      group.add(leg);

    }
  );


  scene.add(group);

  return group;

}


/* =========================================================
   PLAYER
========================================================= */

const player =
  createSheep(
    0,
    8,
    1.15
  );

player.name =
  "player";


/* =========================================================
   FRIEND SHEEP
========================================================= */

const friends = [

  {
    x: -14,
    z: -13,
    name: "Milly",
    issue:
      "Someone posted a hurtful comment about my wool online.",
    icon: "🐑"
  },

  {
    x: 19,
    z: -9,
    name: "Pip",
    issue:
      "A group chat keeps sending mean messages.",
    icon: "🐏"
  },

  {
    x: -21,
    z: 19,
    name: "Cloud",
    issue:
      "Someone shared a picture of me without asking.",
    icon: "🐑"
  },

  {
    x: 27,
    z: 20,
    name: "Daisy",
    issue:
      "I saw another sheep being left out on purpose.",
    icon: "🐑"
  },

  {
    x: 0,
    z: -34,
    name: "Baailey",
    issue:
      "A friend wants to reply to a bully with an even meaner message.",
    icon: "🐏"
  }

];


friends.forEach(
  (friend, index) => {

    friend.mesh =
      createSheep(
        friend.x,
        friend.z,
        .95
      );

    friend.mesh.userData.friend =
      friend;

  }
);


/* =========================================================
   KINGDOM CASTLE
========================================================= */

const castle =
  new THREE.Group();

castle.position.set(
  0,
  0,
  -57
);

scene.add(castle);


const castleWall =
  new THREE.Mesh(
    new THREE.BoxGeometry(
      16,
      7,
      4
    ),
    material(0xffc65b)
  );

castleWall.position.y =
  3.5;

castle.add(castleWall);


[-6, 6].forEach(
  x => {

    const tower =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          2,
          2,
          11,
          24
        ),
        material(0xffa85a)
      );

    tower.position.set(
      x,
      5.5,
      0
    );

    tower.castShadow = true;

    castle.add(tower);

  }
);


const door =
  new THREE.Mesh(
    new THREE.BoxGeometry(
      5,
      6,
      1.2
    ),
    material(0x77bde8)
  );

door.position.set(
  0,
  3,
  -2.4
);

castle.add(door);


/* =========================================================
   GAME STATE
========================================================= */

const keys = {};

let yaw = 0;
let pitch = -.18;

let kindness = 0;
let stars = 0;

let mission = 0;

let activeFriend = null;


/* =========================================================
   MISSIONS
========================================================= */

const missions = [

  [
    "Welcome to the meadow",
    "Walk to Milly and listen carefully before responding."
  ],

  [
    "Group chat challenge",
    "Help Pip choose a safe response to repeated hurtful messages."
  ],

  [
    "Respect & consent",
    "Cloud needs help after a private picture was shared."
  ],

  [
    "Be an upstander",
    "Daisy saw someone being excluded. Choose a supportive action."
  ],

  [
    "Don't feed the bully",
    "Baailey needs a calm plan instead of sending more insults."
  ]

];


/* =========================================================
   KEYBOARD
========================================================= */

addEventListener(
  "keydown",
  event => {

    keys[
      event.key.toLowerCase()
    ] = true;

  }
);


addEventListener(
  "keyup",
  event => {

    keys[
      event.key.toLowerCase()
    ] = false;

  }
);


/* =========================================================
   DOM HELPERS
========================================================= */

function $(id) {
  return document.getElementById(id);
}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

  $("kindness").textContent =
    kindness;

  $("stars").textContent =
    stars;

  $("mission").textContent =
    `${Math.min(mission + 1, 5)}/5`;

}


/* =========================================================
   MISSION DISPLAY
========================================================= */

function showMission() {

  if (
    mission >= missions.length
  ) {

    $("missionTitle").textContent =
      "Kingdom complete!";

    $("missionText").textContent =
      "You helped every sheep with a kindness challenge.";

    $("missionAction").textContent =
      "Explore the kingdom";

  } else {

    $("missionTitle").textContent =
      missions[mission][0];

    $("missionText").textContent =
      missions[mission][1];

    $("missionAction").textContent =
      "Start quest";

  }

  $("missionCard")
    .classList
    .remove("hidden");

}


/* =========================================================
   FRIEND DIALOG
========================================================= */

function openFriend(friend) {

  activeFriend =
    friend;

  $("dialogIcon").textContent =
    friend.icon;

  $("dialogTitle").textContent =
    friend.name;

  $("dialogText").textContent =
    friend.issue;


  const choices =
    $("dialogChoices");

  choices.innerHTML = "";


  const options = [

    {
      text:
        "Listen, save evidence, block/report, and tell a trusted adult.",
      good: true
    },

    {
      text:
        "Send an even nastier message back.",
      good: false
    },

    {
      text:
        "Share it with everyone so more people can see.",
      good: false
    }

  ];


  options.forEach(
    option => {

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "choice";

      button.textContent =
        option.text;


      button.onclick =
        () => {

          if (
            option.good
          ) {

            kindness += 20;

            stars += 1;

            mission =
              Math.min(
                mission + 1,
                missions.length
              );


            friend.mesh.position.y =
              -50;


            $("dialog")
              .classList
              .add("hidden");


            updateHUD();

            showMission();

          } else {

            $("dialogText").textContent =
              "That could make the situation worse. Try a response that keeps people safe and gets support.";

          }

        };


      choices.appendChild(
        button
      );

    }
  );


  $("dialog")
    .classList
    .remove("hidden");

}


/* =========================================================
   BUTTONS
========================================================= */

$("missionAction")
  .onclick = () => {

    $("missionCard")
      .classList
      .add("hidden");

  };


$("helpBtn")
  .onclick = () => {

    $("help")
      .classList
      .remove("hidden");

  };


$("closeHelp")
  .onclick = () => {

    $("help")
      .classList
      .add("hidden");

  };


$("resume")
  .onclick = () => {

    $("help")
      .classList
      .add("hidden");

  };


$("closeDialog")
  .onclick = () => {

    $("dialog")
      .classList
      .add("hidden");

  };


/* =========================================================
   INTERACTION RAYCASTING
========================================================= */

const raycaster =
  new THREE.Raycaster();


function interact() {

  raycaster.setFromCamera(
    new THREE.Vector2(0, 0),
    camera
  );


  const hits =
    raycaster.intersectObjects(
      scene.children,
      true
    );


  for (
    const hit of hits
  ) {

    let object =
      hit.object;


    while (
      object &&
      object !== scene
    ) {

      if (
        object.userData.friend
      ) {

        openFriend(
          object.userData.friend
        );

        return;

      }

      object =
        object.parent;

    }

  }

}


renderer.domElement
  .addEventListener(
    "click",
    interact
  );


/* =========================================================
   MOUSE CAMERA
========================================================= */

let dragging = false;

let lastX = 0;
let lastY = 0;


renderer.domElement
  .addEventListener(
    "pointerdown",
    event => {

      dragging = true;

      lastX =
        event.clientX;

      lastY =
        event.clientY;

    }
  );


renderer.domElement
  .addEventListener(
    "pointerup",
    () => {

      dragging = false;

    }
  );


renderer.domElement
  .addEventListener(
    "pointermove",
    event => {

      if (!dragging)
        return;


      const dx =
        event.clientX -
        lastX;

      const dy =
        event.clientY -
        lastY;


      lastX =
        event.clientX;

      lastY =
        event.clientY;


      yaw -=
        dx * .004;

      pitch -=
        dy * .003;


      pitch =
        Math.max(
          -.8,
          Math.min(.5, pitch)
        );

    }
  );


/* =========================================================
   MOBILE JOYSTICK
========================================================= */

const joystick =
  $("joystick");

const stick =
  $("stick");


const joystickState = {
  x: 0,
  y: 0
};


function moveJoystick(event) {

  const rect =
    joystick.getBoundingClientRect();


  const centerX =
    rect.left +
    rect.width / 2;

  const centerY =
    rect.top +
    rect.height / 2;


  let dx =
    event.clientX -
    centerX;

  let dy =
    event.clientY -
    centerY;


  const distance =
    Math.hypot(
      dx,
      dy
    );


  const max =
    45;


  if (
    distance > max
  ) {

    dx =
      dx / distance * max;

    dy =
      dy / distance * max;

  }


  joystickState.x =
    dx / max;

  joystickState.y =
    dy / max;


  stick.style.transform =
    `translate(${dx}px, ${dy}px)`;

}


joystick.addEventListener(
  "pointerdown",
  event => {

    joystick.setPointerCapture(
      event.pointerId
    );

    moveJoystick(event);

  }
);


joystick.addEventListener(
  "pointermove",
  event => {

    moveJoystick(event);

  }
);


joystick.addEventListener(
  "pointerup",
  () => {

    joystickState.x = 0;
    joystickState.y = 0;

    stick.style.transform =
      "translate(0,0)";

  }
);


/* =========================================================
   TOUCH DETECTION
========================================================= */

if (
  "ontouchstart" in window
) {

  $("touch")
    .classList
    .remove("hidden");

  $("crosshair")
    .classList
    .add("hidden");

}


/* =========================================================
   GAME LOOP
========================================================= */

let previousTime = 0;


function animate(time) {

  requestAnimationFrame(
    animate
  );


  const delta =
    Math.min(
      .035,
      (time - previousTime) / 1000
    );


  previousTime =
    time;


  /* MOVEMENT */

  let horizontal =
    0;

  let vertical =
    0;


  if (
    keys.w ||
    keys.arrowup
  ) {

    vertical -= 1;

  }


  if (
    keys.s ||
    keys.arrowdown
  ) {

    vertical += 1;

  }


  if (
    keys.a ||
    keys.arrowleft
  ) {

    horizontal -= 1;

  }


  if (
    keys.d ||
    keys.arrowright
  ) {

    horizontal += 1;

  }


  horizontal +=
    joystickState.x;

  vertical +=
    joystickState.y;


  const length =
    Math.hypot(
      horizontal,
      vertical
    );


  if (
    length > 1
  ) {

    horizontal /=
      length;

    vertical /=
      length;

  }


  /* DIRECTION */

  const forward =
    new THREE.Vector3(
      Math.sin(yaw),
      0,
      Math.cos(yaw)
    );


  const right =
    new THREE.Vector3(
      Math.cos(yaw),
      0,
      -Math.sin(yaw)
    );


  const speed =
    8;


  player.position
    .addScaledVector(
      right,
      horizontal *
      speed *
      delta
    );


  player.position
    .addScaledVector(
      forward,
      vertical *
      speed *
      delta
    );


  /* WORLD LIMIT */

  player.position.x =
    THREE.MathUtils.clamp(
      player.position.x,
      -68,
      68
    );


  player.position.z =
    THREE.MathUtils.clamp(
      player.position.z,
      -68,
      68
    );


  /* SHEEP ROTATION */

  player.rotation.y =
    yaw + Math.PI;


  /* LITTLE BOUNCE */

  player.position.y =
    Math.sin(
      time * .006
    ) * .025;


  /* CAMERA */

  const cameraTarget =
    player.position.clone();

  cameraTarget.y += 2.6;


  const cameraPosition =
    player.position.clone();


  cameraPosition.x +=
    Math.sin(yaw) * 7;


  cameraPosition.y +=
    4.1;


  cameraPosition.z +=
    Math.cos(yaw) * 7;


  camera.position.lerp(
    cameraPosition,
    .12
  );


  camera.lookAt(
    cameraTarget
  );


  /* FRIEND ANIMATION */

  friends.forEach(
    friend => {

      if (
        friend.mesh.position.y <
        -20
      ) {

        return;

      }


      friend.mesh.rotation.y =
        Math.sin(
          time * .0015
        ) * .08;

    }
  );


  renderer.render(
    scene,
    camera
  );

}


/* =========================================================
   RESIZE
========================================================= */

addEventListener(
  "resize",
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      innerWidth,
      innerHeight
    );

  }
);


/* =========================================================
   START GAME
========================================================= */

setTimeout(
  () => {

    $("loading")
      .classList
      .add("hidden");

    $("hud")
      .classList
      .remove("hidden");

    $("crosshair")
      .classList
      .remove("hidden");

    updateHUD();

    showMission();

  },
  1800
);


animate(0);
```
