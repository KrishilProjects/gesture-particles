import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { Hands } from 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';

export const handState = {
  scale: 1,
  rotation: 0,
  openness: 0
};

export async function initHand() {
  const video = document.getElementById('video');

  // Start webcam (native, reliable)
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  await video.play();

  const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`;
  }
});


  hands.setOptions({
    maxNumHands: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  let lastTime = 0;

  hands.onResults(results => {
    const now = performance.now();
    if (now - lastTime < 50) return; // throttle to 20 FPS
    lastTime = now;

    if (!results.multiHandLandmarks) return;

    const lm = results.multiHandLandmarks[0];
    const palm = lm[0];
    const index = lm[8];
    const thumb = lm[4];

    handState.scale = THREE.MathUtils.clamp(
      1 - palm.z * 5,
      0.7,
      1.8
    );

    handState.rotation = Math.atan2(
      lm[5].y - lm[17].y,
      lm[5].x - lm[17].x
    );

    handState.openness = Math.hypot(
      index.x - thumb.x,
      index.y - thumb.y
    );
  });

  async function loop() {
    await hands.send({ image: video });
    requestAnimationFrame(loop);
  }

  loop();
}

