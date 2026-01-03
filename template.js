export function heart(count) {
  const arr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    arr[i * 3] = x * 0.02;
    arr[i * 3 + 1] = y * 0.02;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }

  return arr;
}
