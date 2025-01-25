const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let images = [];
let flakes = [];
let flakeCount,
    mX = -100,
    mY = -100;

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

  setInterval(() => {
    if (images[0] == undefined) return;
    let img = images.shift();
    img.x = Math.random();
    img.y = Math.random();

    images.push(img);
  }, 400);

  flakeCount = prompt("How many snowflakes do you want? (100-500 is pretty reasonable, if you're lagging then you can use a really low number)");

  for (var i = 0; i < flakeCount; i++) {
    var x = Math.floor(Math.random() * canvas.width),
      y = Math.floor(Math.random() * canvas.height),
      size = (Math.random() * 3) + 2,
      speed = (Math.random() * 1) + 0.5,
      opacity = (Math.random() * 0.5) + 0.3;

    flakes.push({
      speed: speed, size: size,
      velY: speed, velX: 0, x: x, y: y,
      stepSize: (Math.random()) / 30,
      step: 0, angle: 180, opacity: opacity
    });
  }

  loop();
}

function loop() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < images.length; i++) {
    let image = images[i];

    let imageWidth = image.image.width;
    let imageHeight = image.image.height;
    let aspectRatio = imageWidth / imageHeight;

    imageHeight = height * 0.7;
    imageWidth = aspectRatio * imageHeight;

    console.log(imageWidth, imageHeight);

    ctx.drawImage(image.image, image.x * width - imageWidth / 2, image.y * height - imageHeight / 2, imageWidth, imageHeight);
  }

  drawFlakes();
  drawText();

  requestAnimationFrame(loop);
}

function drawFlakes() {
  for (var i = 0; i < flakeCount; i++) {
    var flake = flakes[i],
      x = mX,
      y = mY,
      minDist = 150,
      x2 = flake.x,
      y2 = flake.y;

    var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
      dx = x2 - x,
      dy = y2 - y;

    if (dist < minDist) {
      var force = minDist / (dist * dist),
        xcomp = (x - x2) / dist,
        ycomp = (y - y2) / dist,
        deltaV = force / 2;

      flake.velX -= deltaV * xcomp;
      flake.velY -= deltaV * ycomp;

    } else {
      flake.velX *= .98;
      if (flake.velY <= flake.speed) {
        flake.velY = flake.speed
      }
      flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
    }

    ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
    flake.y += flake.velY;
    flake.x += flake.velX;

    if (flake.y >= canvas.height || flake.y <= 0) {
      reset(flake);
    }


    if (flake.x >= canvas.width || flake.x <= 0) {
      reset(flake);
    }

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawText() {
  ctx.font = `bold ${Math.min(width / 5, height / 2) / 2}px monospace`;
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.min(width / 5, height / 2) / 100;

  ctx.textAlign = "right";
  ctx.fillStyle = "lightgreen";
  ctx.fillText("min", width / 2, height / 2);
  ctx.strokeText("min", width / 2, height / 2);

  ctx.textAlign = "left";
  ctx.fillStyle = "orange";
  ctx.fillText("seul", width / 2, height / 2);
  ctx.strokeText("seul", width / 2, height / 2);
}

function reset(flake) {
  flake.x = Math.floor(Math.random() * canvas.width);
  flake.y = 0;
  flake.size = (Math.random() * 3) + 2;
  flake.speed = (Math.random() * 1) + 0.5;
  flake.velY = flake.speed;
  flake.velX = 0;
  flake.opacity = (Math.random() * 0.5) + 0.3;
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("mousemove", e => {
    mX = e.clientX,
    mY = e.clientY
});