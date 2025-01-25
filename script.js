const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let images = [];

function init() {

  let imageElements = [...document.querySelectorAll("img")];

  imageElements.forEach(imageEl => {
    imageEl.onload = () => {
      images.push({
        image: imageEl,
        x: Math.random(),
        y: Math.random()
      });
    }
  });

  loop();
}

function loop() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < images.length; i++) {
    let image = images[i];

    ctx.drawImage(image.image, image.x * width - image.image.width / 2, image.y * height - image.image.height / 2);
  }

  ctx.font = `bold ${Math.min(width / 5, height / 2)}px monospace`;
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "white";
  ctx.lineWidth = Math.min(width / 5, height / 2) / 100;

  ctx.textAlign = "right";
  ctx.fillStyle = "green";
  ctx.fillText("min", width / 2, height / 2);
  ctx.strokeText("min", width / 2, height / 2);

  ctx.textAlign = "left";
  ctx.fillStyle = "orange";
  ctx.fillText("seul", width / 2, height / 2);
  ctx.strokeText("seul", width / 2, height / 2);

  requestAnimationFrame(loop);
}

window.addEventListener("DOMContentLoaded", init);
