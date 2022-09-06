const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200, 200, 15, 100);
ctx.fillRect(360, 200, 15, 100);
ctx.fillRect(260, 200, 60, 200);

ctx.arc(290, 150, 50, 0, 2 * Math.PI);
ctx.fill();
