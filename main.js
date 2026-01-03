import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { initHand, handState } from './hand.js';
import { ParticleSystem } from './particles.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1); // LOW-END SAFE
document.body.appendChild(renderer.domElement);

const particles = new ParticleSystem(scene);
initHand();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  particles.update(handState);
  renderer.render(scene, camera);
}

animate();
