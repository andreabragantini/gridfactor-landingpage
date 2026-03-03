const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = 2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#4da6ff";
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let maxDist = 100;

    if (distance < maxDist) {
      let force = (maxDist - distance) / maxDist;
      this.x -= dx * force * 0.05;
      this.y -= dy * force * 0.05;
    } else {
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;
    }
  }
}

let nodes = [];

for (let i = 0; i < 120; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  nodes.push(new Node(x, y));
}

function connectNodes() {
  for (let a = 0; a < nodes.length; a++) {
    for (let b = a; b < nodes.length; b++) {
      let dx = nodes[a].x - nodes[b].x;
      let dy = nodes[a].y - nodes[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = "rgba(77,166,255,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach(node => {
    node.update();
    node.draw();
  });

  connectNodes();
  requestAnimationFrame(animate);
}

animate();
