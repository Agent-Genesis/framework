# 3D Multi-Level System Framework Visualization

A 3D visualization with three core axes will provide a much richer representation of our framework. Let me create an interactive 3D visualization that captures Scope/Scale, Time, and Concern/Viewpoint dimensions.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>3D Multi-Level System Framework</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #f5f5f5;
      }
      .container {
        display: flex;
        height: 100vh;
      }
      .visualization-container {
        flex: 1;
        position: relative;
      }
      .controls-panel {
        width: 350px;
        background-color: white;
        padding: 20px;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        z-index: 10;
      }
      .panel-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
      }
      .axis-info {
        margin-bottom: 20px;
      }
      .axis-title {
        font-weight: bold;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
      }
      .axis-color {
        width: 15px;
        height: 15px;
        margin-right: 8px;
        border-radius: 3px;
      }
      .axis-values {
        margin-left: 23px;
        font-size: 14px;
        color: #555;
      }
      .details-panel {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
      .details-title {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .details-content {
        font-size: 14px;
      }
      .details-section {
        margin-bottom: 10px;
      }
      .details-section h4 {
        margin-bottom: 3px;
        font-size: 14px;
        color: #555;
      }
      .details-section p {
        margin: 0;
      }
      .legend {
        margin-top: 20px;
      }
      .legend-title {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .legend-items {
        display: flex;
        flex-wrap: wrap;
      }
      .legend-item {
        display: flex;
        align-items: center;
        margin-right: 10px;
        margin-bottom: 5px;
      }
      .legend-color {
        width: 12px;
        height: 12px;
        margin-right: 5px;
        border-radius: 2px;
      }
      .instructions {
        margin-top: 20px;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 5px;
        font-size: 14px;
      }
      .filter-section {
        margin-top: 20px;
      }
      .filter-title {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .filter-options {
        display: flex;
        flex-direction: column;
      }
      .filter-option {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }
      .filter-option input {
        margin-right: 8px;
      }
      .filter-option label {
        font-size: 14px;
      }
      #canvas-container {
        width: 100%;
        height: 100%;
      }
      .tooltip {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        pointer-events: none;
        z-index: 100;
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="visualization-container">
        <div id="canvas-container"></div>
        <div class="tooltip" id="tooltip"></div>
      </div>
      <div class="controls-panel">
        <div class="panel-title">3D Multi-Level System Framework</div>

        <div class="axis-info">
          <div class="axis-title">
            <div class="axis-color" style="background-color: #ff6b6b;"></div>
            Scope/Scale Axis
          </div>
          <div class="axis-values">Nano → Micro → Meso → Macro → Supra</div>
        </div>

        <div class="axis-info">
          <div class="axis-title">
            <div class="axis-color" style="background-color: #4ecdc4;"></div>
            Time (Chrono) Axis
          </div>
          <div class="axis-values">
            µs → ms → s → min → h → d → wk → mo → q → yr
          </div>
        </div>

        <div class="axis-info">
          <div class="axis-title">
            <div class="axis-color" style="background-color: #45b7d1;"></div>
            Concern/Viewpoint Axis
          </div>
          <div class="axis-values">
            Function → Data → Control → Security → Cost → UX
          </div>
        </div>

        <div class="filter-section">
          <div class="filter-title">Filter by Concern:</div>
          <div class="filter-options">
            <div class="filter-option">
              <input type="checkbox" id="filter-function" checked />
              <label for="filter-function">Function</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="filter-data" checked />
              <label for="filter-data">Data</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="filter-control" checked />
              <label for="filter-control">Control</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="filter-security" checked />
              <label for="filter-security">Security</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="filter-cost" checked />
              <label for="filter-cost">Cost</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="filter-ux" checked />
              <label for="filter-ux">UX</label>
            </div>
          </div>
        </div>

        <div class="legend">
          <div class="legend-title">Scope/Scale Legend:</div>
          <div class="legend-items">
            <div class="legend-item">
              <div
                class="legend-color"
                style="background-color: #8e44ad;"
              ></div>
              <span>Meta</span>
            </div>
            <div class="legend-item">
              <div
                class="legend-color"
                style="background-color: #9b59b6;"
              ></div>
              <span>Supra</span>
            </div>
            <div class="legend-item">
              <div
                class="legend-color"
                style="background-color: #3498db;"
              ></div>
              <span>Macro</span>
            </div>
            <div class="legend-item">
              <div
                class="legend-color"
                style="background-color: #2ecc71;"
              ></div>
              <span>Meso</span>
            </div>
            <div class="legend-item">
              <div
                class="legend-color"
                style="background-color: #f1c40f;"
              ></div>
              <span>Micro</span>
            </div>
            <div class="legend-item">
              <div
                class="legend-color"
                style="background-color: #e67e22;"
              ></div>
              <span>Nano</span>
            </div>
          </div>
        </div>

        <div class="details-panel">
          <div class="details-title" id="details-title">
            Select a point for details
          </div>
          <div class="details-content" id="details-content">
            <p>
              Click on any point in the 3D visualization to see details about
              that combination of scope, time, and concern.
            </p>
          </div>
        </div>

        <div class="instructions">
          <strong>Controls:</strong><br />
          • Left click + drag: Rotate<br />
          • Right click + drag: Pan<br />
          • Scroll: Zoom in/out<br />
          • Click on points: View details
        </div>
      </div>
    </div>

    <script>
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
                  considerations: `Key considerations for this combination include...`,
                },
              });
            }
          }
        }
      }

      // Initialize Three.js
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f5f5);

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth - 350, window.innerHeight);
      document
        .getElementById("canvas-container")
        .appendChild(renderer.domElement);

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
      scene.add(
        createLabel("Scope/Scale", new THREE.Vector3(0, 6, 0), "#ff6b6b")
      );
      scene.add(
        createLabel("Time (Chrono)", new THREE.Vector3(6, 0, 0), "#4ecdc4")
      );
      scene.add(
        createLabel("Concern/Viewpoint", new THREE.Vector3(0, 0, 6), "#45b7d1")
      );

      // Create grid planes for each axis
      const createGridPlane = (axis, color) => {
        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(
          size,
          divisions,
          color,
          0xcccccc
        );

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

      dataPoints.forEach((point, index) => {
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
        const scopePoints = pointMeshes.filter(
          (mesh) => mesh.userData.scope.name === scope.name
        );

        for (let i = 0; i < scopePoints.length; i++) {
          for (let j = i + 1; j < scopePoints.length; j++) {
            // Only connect points that are close in time or concern
            const timeDiff = Math.abs(
              scopePoints[i].userData.time.position -
                scopePoints[j].userData.time.position
            );
            const concernDiff = Math.abs(
              scopePoints[i].userData.concern.position -
                scopePoints[j].userData.concern.position
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
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Mouse interaction
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
          tooltip.style.left = `${event.clientX + 10}px`;
          tooltip.style.top = `${event.clientY - 30}px`;
          tooltip.textContent = point.description;

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
    </script>
  </body>
</html>
```

## 3D Visualization Features

This implementation provides:

1. **Three Core Axes**:

   - **Scope/Scale** (vertical): Nano → Micro → Meso → Macro → Supra → Meta
   - **Time (Chrono)** (horizontal): µs → ms → s → min → h → d → wk → mo → q → yr
   - **Concern/Viewpoint** (depth): Function → Data → Control → Security → Cost → UX

2. **Interactive 3D Space**:

   - Rotate, pan, and zoom to explore the framework from different angles
   - Click on any point to see detailed information
   - Hover over points for quick descriptions

3. **Visual Connections**:

   - Lines connecting related points within the same scope level
   - Color coding by scope level for easy identification

4. **Filtering Capabilities**:

   - Toggle visibility of points by concern type
   - Focus on specific aspects of the framework

5. **Detailed Information Panel**:
   - View comprehensive details about any point in the framework
   - Understand the relationships between scope, time, and concern

## Benefits of the 3D Approach

1. **Comprehensive Representation**: Captures the complexity of systems across multiple dimensions
2. **Intuitive Navigation**: Natural 3D interaction makes it easy to explore relationships
3. **Visual Clarity**: Color coding and spatial arrangement help identify patterns
4. **Focused Analysis**: Filtering allows for examination of specific concerns
5. **Holistic Understanding**: Shows how different aspects of systems interact across scales and time

## Usage Instructions

1. **Navigate the 3D Space**: Use mouse controls to rotate, pan, and zoom
2. **Explore Points**: Click on any sphere to see detailed information
3. **Filter Concerns**: Use checkboxes to show/hide specific concerns
4. **Identify Patterns**: Look for clusters and connections between related points

This 3D visualization provides a much richer representation of our framework, allowing for more nuanced analysis and planning across the three core dimensions of Scope/Scale, Time, and Concern/Viewpoint.
