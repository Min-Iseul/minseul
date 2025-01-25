const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function init() {
  loop();
}

function loop() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  ctx.font = `bold ${Math.min(width / 5, height / 2)}px monospace`;

  ctx.textAlign = "right";
  ctx.fillStyle = "green";
  ctx.fillText("min", width / 2, height / 2);

  ctx.textAlign = "left";
  ctx.fillStyle = "orange";
  ctx.fillText("seul", width / 2, height / 2);

  requestAnimationFrame(loop);
}

init();