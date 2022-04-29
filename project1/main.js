import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const donutTexture = new THREE.TextureLoader().load('donut-seamless-background-texture-pattern-vector-4957743.png')

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ map: donutTexture });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



function addStar() {
  const eyeTexture = new THREE.TextureLoader().load('eye_0001_c.jpeg');
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map:eyeTexture });
  const star = new THREE.Mesh(geometry, material);

  
  const [x, y, z] = Array(4)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(399).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('wp9116447.jpeg');
scene.background = spaceTexture;


const jeffTexture = new THREE.TextureLoader().load('texture-bitmap-182084195.jpeg');

const jeff = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(4, 0.4, 200,50), new THREE.MeshNormalMaterial({ map:jeffTexture } ));

scene.add(jeff);


const eyeTexture = new THREE.TextureLoader().load('eye_0001_c.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: eyeTexture,

  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);



jeff.position.z = -5;
jeff.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;


  renderer.render(scene, camera);
}

animate();