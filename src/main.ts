import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.y = 10;
camera.position.z = 10;

// light
const directLight = new THREE.DirectionalLight("#fff", 5);
directLight.castShadow = true;
directLight.position.set(3, 4, 5);
directLight.lookAt(0, 0, 0);
scene.add(directLight);

const floorGeometry = new THREE.BoxGeometry(20, 20);
const floorMetrial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const floor = new THREE.Mesh(floorGeometry, floorMetrial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
floor.name = "FLOOR";
scene.add(floor);

// * BoxGeometry
const textureLoader = new THREE.TextureLoader();
const texture = await textureLoader.loadAsync("/image/images.png");

const textureGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMetrial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: texture,
  side: THREE.DoubleSide,
});
const textureMesh = new THREE.Mesh(textureGeometry, textureMetrial);
textureMesh.position.y = 5;
textureMesh.position.x = -2;
textureMesh.castShadow = true;
scene.add(textureMesh);

// * BoxGeometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const metrial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, metrial);
mesh.position.y = 1;
mesh.castShadow = true;
scene.add(mesh);

// * CapsuleGeometry
const capsuleGeometry = new THREE.CapsuleGeometry(1, 5, 20, 30);
const capsuleMetrial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMetrial);
capsule.position.set(3, 5, 1);
capsule.castShadow = true;
scene.add(capsule);

// * CylinderGeometry
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1);
const cylinderMetrial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMetrial);
cylinder.position.set(-3, 2, 1);
cylinder.castShadow = true;
scene.add(cylinder);

// * CylinderGeometry
const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMetrial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
});
const torus = new THREE.Mesh(torusGeometry, torusMetrial);
torus.position.set(0, 0.5, 1);
torus.castShadow = true;
torus.position.y = 1;
scene.add(torus);

// * ShapeGeometry
const startShape = new THREE.Shape();

startShape.moveTo(0, 1);
startShape.lineTo(0.2, 0.2);
startShape.lineTo(1, 0.2);
startShape.lineTo(0.4, -0.2);
startShape.lineTo(0.6, -1);
startShape.lineTo(0, -0.6);
startShape.lineTo(-0.6, -1);
startShape.lineTo(-0.4, -0.2);
startShape.lineTo(-1, 0.2);
startShape.lineTo(-0.2, 0.2);

const shapeGeometry = new THREE.ShapeGeometry(startShape);
const shapeMetrial = new THREE.MeshStandardMaterial({
  color: 0xff00ff,
});
const shape = new THREE.Mesh(shapeGeometry, shapeMetrial);
shape.position.set(0, 1, 2);
shape.castShadow = true;
shape.position.y = 2;
scene.add(shape);

const extrudeSetting: THREE.ExtrudeGeometryOptions = {
  steps: 1,
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.3,
  bevelSegments: 100,
};

const extrudeGeometry = new THREE.ExtrudeGeometry(startShape, extrudeSetting);
const extrudeMetrial = new THREE.MeshStandardMaterial({
  color: 0x0ddaaf,
});
const extrude = new THREE.Mesh(extrudeGeometry, extrudeMetrial);
extrude.position.set(2, 1.3, 2);
extrude.castShadow = true;
extrude.position.y = 2;
scene.add(extrude);

// * SphereGeometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMetrial = new THREE.MeshStandardMaterial({
  color: 0x00daff,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMetrial);
sphere.position.set(0, 1, -2);
sphere.castShadow = true;
sphere.position.y = 2;
scene.add(sphere);

// * point
const pointNum = 1000;
const position = new Float32Array(pointNum * 3);

for (let i = 0; i < pointNum * 3; i++) {
  const x = (Math.random() - 0.5) * 1;
  const y = (Math.random() - 0.5) * 1;
  const z = (Math.random() - 0.5) * 1;

  position[i * 3] = x;
  position[i * 3 + 1] = y;
  position[i * 3 + 2] = z;
}

const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
const pointsMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 0.05,
});
// const points = new THREE.Points(bufferGeometry, pointsMaterial);
const points = new THREE.Points(sphereGeometry, pointsMaterial);
points.position.set(0, 5, 0);
scene.add(points);

// loader
const gltfLoader = new GLTFLoader();
const gltf = await gltfLoader.loadAsync("/image/dancer.glb");
const character = gltf.scene;
const animationClips = gltf.animations;
character.position.set(0, 1.5, 5);
character.scale.set(0.01, 0.01, 0.01);
character.traverse((obj) => {
  if (obj?.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
  // if(obj.isMesh)
});
scene.add(character);

// action
const mixer = new THREE.AnimationMixer(character);
const action = mixer.clipAction(animationClips[5]);
action.play();

// rayzer
const newPosition = new THREE.Vector3(0, 1, 0);
const raycaster = new THREE.Raycaster();

renderer.domElement.addEventListener("pointerdown", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -((e.clientY / window.innerHeight) * 2 - 1);

  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  const intersects = raycaster.intersectObjects(scene.children);

  const intersectsFloor = intersects.find((i) => i.object.name === "FLOOR");
  if (intersectsFloor?.point) {
    newPosition.copy(intersectsFloor?.point);
    newPosition.y = 1;
  }
});

// controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;

// event
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

// render
const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();

const render = () => {
  character.lookAt(newPosition);
  targetVector
    .subVectors(newPosition, character.position)
    .normalize()
    .multiplyScalar(0.01);

  if (
    Math.abs(character.position.x - newPosition.x) >= 1 ||
    Math.abs(character.position.z - newPosition.z) >= 1
  ) {
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
    action.stop();
  }
  action.play();

  renderer.render(scene, camera);
  textureMesh.rotation.y += 0.03;
  orbitControls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }

  requestAnimationFrame(render);
};

render();
