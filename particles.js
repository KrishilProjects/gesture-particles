import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { heart } from './templates.js';

const COUNT = 5000;

export class ParticleSystem {
  constructor(scene) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(heart(COUNT), 3)
    );

    const material = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xff3366,
      transparent: true,
      depthWrite: false
    });

    this.points = new THREE.Points(geometry, material);
    scene.add(this.points);

    this.material = material;
  }

  update(hand) {
    this.points.scale.setScalar(hand.scale);
    this.points.rotation.y += hand.rotation * 0.01;

    const hue = THREE.MathUtils.mapLinear(
      hand.openness,
      0.02,
      0.15,
      0,
      1
    );

    this.material.color.setHSL(hue, 1, 0.6);
  }
}
