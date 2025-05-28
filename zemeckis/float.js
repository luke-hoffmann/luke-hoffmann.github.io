const feather = document.getElementById('feather');

let y = 0;
let xOffset = 0;
let angle = 0;
const scrollHeight = document.documentElement.scrollHeight;

function animate() {
  y += 1.2;
  angle += 0.05;
  xOffset = Math.sin(angle) * 100;

  feather.style.top = y + 'px';
  feather.style.left = `calc(50% + ${xOffset}px)`;

  if (y < scrollHeight) {
    requestAnimationFrame(animate);
  } else {
    feather.remove();
  }
}

animate();
