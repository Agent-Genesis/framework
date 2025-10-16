// Framework data with three dimensions
const scopeLevels = [
  { name: "Nano", color: "#e67e22", position: 0 },
  { name: "Micro", color: "#f1c40f", position: 1 },
  { name: "Meso", color: "#2ecc71", position: 2 },
  { name: "Macro", color: "#3498db", position: 3 },
  { name: "Supra", color: "#9b59b6", position: 4 },
  { name: "Meta", color: "#8e44ad", position: 5 },
];

const timeLevels = [
  { name: "µs", position: 0 },
  { name: "ms", position: 1 },
  { name: "s", position: 2 },
  { name: "min", position: 3 },
  { name: "h", position: 4 },
  { name: "d", position: 5 },
  { name: "wk", position: 6 },
  { name: "mo", position: 7 },
  { name: "q", position: 8 },
  { name: "yr", position: 9 },
];

const concernLevels = [
  { name: "Function", position: 0 },
  { name: "Data", position: 1 },
  { name: "Control", position: 2 },
  { name: "Security", position: 3 },
  { name: "Cost", position: 4 },
  { name: "UX", position: 5 },
];

// Sample data points for the 3D visualization
const dataPoints = [];

// Generate sample data points
for (let s = 0; s < scopeLevels.length; s++) {
  for (let t = 0; t < timeLevels.length; t++) {
    for (let c = 0; c < concernLevels.length; c++) {
      // Only create points where it makes sense (not all combinations are relevant)
      if (Math.random() > 0.7) {
        dataPoints.push({
          scope: scopeLevels[s],
          time: timeLevels[t],
          concern: concernLevels[c],
          description: `${scopeLevels[s].name} level ${concernLevels[c].name} concern at ${timeLevels[t].name} timescale`,
          details: {
            scope: scopeLevels[s].name,
            time: timeLevels[t].name,
            concern: concernLevels[c].name,
            example: `Example of ${concernLevels[c].name} at ${scopeLevels[s].name} level with ${timeLevels[t].name} timescale`,
            considerations: "Key considerations for this combination include...",
          },
        });
      }
    }
  }
}

// Initialize Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 350, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add axes
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Create axis labels
const createLabel = (text, position, color) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 64;

  context.fillStyle = "rgba(255, 255, 255, 0)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "24px Arial";
  context.fillStyle = color;
  context.textAlign = "center";
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 8);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);

  sprite.position.copy(position);
  sprite.scale.set(2, 0.5, 1);

  return sprite;
};

// Add axis labels
scene.add(createLabel("Scope/Scale", new THREE.Vector3(0, 6, 0), "#ff6b6b"));
scene.add(createLabel("Time (Chrono)", new THREE.Vector3(6, 0, 0), "#4ecdc4"));
scene.add(createLabel("Concern/Viewpoint", new THREE.Vector3(0, 0, 6), "#45b7d1"));

// Create grid planes for each axis
const createGridPlane = (axis, color) => {
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions, color, 0xcccccc);

  if (axis === "x") {
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.y = 0;
    gridHelper.position.z = 0;
  } else if (axis === "y") {
    gridHelper.position.x = 0;
    gridHelper.position.z = 0;
  } else if (axis === "z") {
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.rotation.z = Math.PI / 2;
    gridHelper.position.x = 0;
    gridHelper.position.y = 0;
  }

  return gridHelper;
};

scene.add(createGridPlane("x", 0x4ecdc4));
scene.add(createGridPlane("y", 0xff6b6b));
scene.add(createGridPlane("z", 0x45b7d1));

// Create data points
const pointsGroup = new THREE.Group();
scene.add(pointsGroup);

const pointMeshes = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

dataPoints.forEach((point) => {
  // Normalize positions to fit in our 3D space
  const x = (point.time.position / timeLevels.length) * 10 - 5;
  const y = (point.scope.position / scopeLevels.length) * 10 - 5;
  const z = (point.concern.position / concernLevels.length) * 10 - 5;

  // Create a sphere for each data point
  const geometry = new THREE.SphereGeometry(0.2, 16, 16);
  const material = new THREE.MeshPhongMaterial({
    color: point.scope.color,
    emissive: point.scope.color,
    emissiveIntensity: 0.2,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.userData = point;

  pointsGroup.add(mesh);
  pointMeshes.push(mesh);
});

// Add connections between related points
const connectionsGroup = new THREE.Group();
scene.add(connectionsGroup);

// Create connections between points of the same scope level
scopeLevels.forEach((scope) => {
  const scopePoints = pointMeshes.filter((mesh) => mesh.userData.scope.name === scope.name);

  for (let i = 0; i < scopePoints.length; i++) {
    for (let j = i + 1; j < scopePoints.length; j++) {
      // Only connect points that are close in time or concern
      const timeDiff = Math.abs(
        scopePoints[i].userData.time.position - scopePoints[j].userData.time.position
      );
      const concernDiff = Math.abs(
        scopePoints[i].userData.concern.position - scopePoints[j].userData.concern.position
      );

      if (timeDiff <= 1 || concernDiff <= 1) {
        const material = new THREE.LineBasicMaterial({
          color: scope.color,
          opacity: 0.2,
          transparent: true,
        });
        const geometry = new THREE.BufferGeometry().setFromPoints([
          scopePoints[i].position,
          scopePoints[j].position,
        ]);
        const line = new THREE.Line(geometry, material);
        connectionsGroup.add(line);
      }
    }
  }
});

// Set camera position
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Tooltip elements
const tooltip = document.getElementById("tooltip");
const detailsTitle = document.getElementById("details-title");
const detailsContent = document.getElementById("details-content");

function onMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(pointMeshes);

  if (intersects.length > 0) {
    const point = intersects[0].object.userData;
    tooltip.style.display = "block";
    tooltip.textContent = `${point.scope.name} / ${point.time.name} / ${point.concern.name}`;
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.top = `${event.clientY + 10}px`;
    renderer.domElement.style.cursor = "pointer";
  } else {
    tooltip.style.display = "none";
    renderer.domElement.style.cursor = "default";
  }
}

function onMouseClick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(pointMeshes);

  if (intersects.length > 0) {
    const point = intersects[0].object.userData;
    detailsTitle.textContent = `${point.scope.name} / ${point.time.name} / ${point.concern.name}`;
    detailsContent.innerHTML = `
      <div class="details-section">
        <h4>Description</h4>
        <p>${point.description}</p>
      </div>
      <div class="details-section">
        <h4>Example</h4>
        <p>${point.details.example}</p>
      </div>
      <div class="details-section">
        <h4>Considerations</h4>
        <p>${point.details.considerations}</p>
      </div>
    `;
  }
}

renderer.domElement.addEventListener("mousemove", onMouseMove);
renderer.domElement.addEventListener("click", onMouseClick);

// Filter functionality
const concernFilters = {
  Function: document.getElementById("filter-function"),
  Data: document.getElementById("filter-data"),
  Control: document.getElementById("filter-control"),
  Security: document.getElementById("filter-security"),
  Cost: document.getElementById("filter-cost"),
  UX: document.getElementById("filter-ux"),
};

Object.keys(concernFilters).forEach((concern) => {
  concernFilters[concern].addEventListener("change", () => {
    pointMeshes.forEach((mesh) => {
      if (mesh.userData.concern.name === concern) {
        mesh.visible = concernFilters[concern].checked;
      }
    });
  });
});

// Handle window resize
function onWindowResize() {
  camera.aspect = (window.innerWidth - 350) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - 350, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
