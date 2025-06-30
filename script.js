//Background

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const spacing = 40;
const radius = 2;
const activationRadius = 100;

for (let x = 0; x < canvas.width; x += spacing) {
  for (let y = 0; y < canvas.height; y += spacing) {
    dots.push({ x, y });
  }
}

let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot) => {
    const dx = mouse.x - dot.x;
    const dy = mouse.y - dot.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let r = radius;
    let opacity = 0.2;
    if (dist < activationRadius) {
      r = radius + (1 - dist / activationRadius) * 3;
      opacity = 0.1 + (1 - dist / activationRadius) * 0.3;
    }

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  dots.length = 0;
  for (let x = 0; x < canvas.width; x += spacing) {
    for (let y = 0; y < canvas.height; y += spacing) {
      dots.push({ x, y });
    }
  }
});

//------------------

//Clock Logic

setInterval(() => {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();
  const hours = now.getHours();
  const days = now.getDay();
  const dateNow = now.getDate();
  const months = monthName[now.getMonth()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else if (hours < 10) {
    hours = `0${hours}`;
  }


  let myTime = document.getElementById("time");

  const daysOfWeek = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  document.getElementById("day").innerText = daysOfWeek[days];
  document.getElementById("date").innerText = `${dateNow} ${months}`;

  let totalminute;
  if (hours >= 12) {
    totalminute = 720 - ((hours - 12) * 60 + Number(minutes));
  } else {
    totalminute = 720 - (hours * 60 + Number(minutes));
  }


  let circleProgress = document.getElementById("circle-progress");
  circleProgress.setAttribute("stroke-dashoffset", totalminute);
  myTime.innerText = `${hours}:${minutes}`;
}, 1000);
