console.log("Test");

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";

let container;
let renderer;
let scene;
let camera;
let model;
let controls;

function init() {
  container = document.querySelector(".scene");

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Scene setup
  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xdddddd);

  // Camera setup
  let fov = 40;
  let aspectRatio = window.innerWidth / window.innerHeight;
  let near = 0.1;
  let far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
  camera.position.set(10, 20, 30);

  // Light setup
  let smallLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(smallLight);

  let bigLight = new THREE.DirectionalLight(0xffffff, 3);
  bigLight.position.set(10, 20, 100);
  scene.add(bigLight);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  // controls = OrbitControls(camera);
  // controls.addEventListener("change", renderer);

  // Loading 3D model
  let loader = new THREE.GLTFLoader();
  loader.load("./3d/scene.gltf", function (gltf) {
    console.log("gltf log", gltf);
    scene.add(gltf.scene);
    model = gltf.scene.children[0];
    animate();
    // renderer.render(scene, camera);
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // model.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();
