console.log("Test");

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";

let container;
let renderer;
let scene;
let camera;
let model;
let animateList;
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
  let fov = 30;
  let aspectRatio = window.innerWidth / window.innerHeight;
  let near = 0.7;
  let far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
  // camera.position.set(10, 20, 30);
  camera.position.set(15, 10, 10);

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
  // loader.load("https://raw.githubusercontent.com/pulkit-jasti/threejs-test/master/3d/scene.gltf", function (gltf) {
  // loader.load("./3d/meta.glb", function (gltf) {
  loader.load("./3d/islands.glb", function (gltf) {
    console.log("gltf log", gltf);
    scene.add(gltf.scene);
    // model = gltf.scene.children[ 2 ];
    animateList = [
      gltf.scene.children[0],
      gltf.scene.children[2],
      gltf.scene.children[13],
      gltf.scene.children[14],
      gltf.scene.children[15],
      gltf.scene.children[16],
      gltf.scene.children[17],
    ];
    animate();
    // renderer.render(scene, camera);
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // model.rotation.y += 0.01;

  animateList[0].rotation.y += 0.03;
  animateList[1].rotation.y += 0.03;
  animateList[2].rotation.z += -0.03;
  animateList[3].rotation.z += -0.03;
  animateList[4].rotation.z += -0.03;
  animateList[5].rotation.z += -0.03;
  animateList[6].rotation.z += -0.03;

  // animateList.forEach((item) => {
  //   item.rotation.y += 0.03;
  // });

  renderer.render(scene, camera);
}

init();
