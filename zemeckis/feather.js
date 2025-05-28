function spawnFeather() {
  const feather = document.createElement('img');
  feather.src = 'feather.png';
  feather.className = 'feather';
  feather.style.position = 'absolute';
  document.body.appendChild(feather);

  let y = Math.random()* 40;
  let angle = Math.random() * Math.PI * 2;
  const angleSpeed = 0.05 + Math.random() * 0.02;
  const drift = 20 + Math.random() * 20;
  const xBase = (Math.random() -.5) * (window.innerWidth/ (4/3)) 
  const fallSpeed = 0.5 + Math.random();
  const scrollHeight = document.documentElement.scrollHeight;

  function animate() {
    y += fallSpeed;
    angle += angleSpeed;
    const xOffset = Math.sin(angle) * drift;

    feather.style.top = y + 'px';
    feather.style.left = `calc(50% + ${xBase + xOffset}px)`;

    if (y < scrollHeight) {
      requestAnimationFrame(animate);
    } else {
      feather.remove();
    }
  }

  animate();
}

