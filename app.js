const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width"); // 선 굵기 변경
const color = document.getElementById("color"); // 선 색상 변경

// 선 or 채우기 색상 선택
// HTML에서 data attribute를 사용하면 원하는 문자열 어떤 값이든 넣어줄 수 있음
const colorOptions = Array.from(
  // forEach를 사용해야 하기때문에 array로 바꿔줌
  document.getElementsByClassName("color-option")
);

const modeBtn = document.getElementById("mode-btn"); // 처음 시작할 때 Fill을 가지고 있음
const destoryBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value; // 자바스크립트가 실행될 때 input의 기본값으로 초기화 (한 번만 실행)

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath(); // 이전에 그려진 선과 새로운 선의 연결을 끊어내기 위함
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  // 선을 그리게 함
  isPainting = true;
}

function cancelPainting() {
  // 마우스 포인터만 움직임
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value; // strokeStyle -> 라인의 색깔을 바꿔줌
  ctx.fillStyle = event.target.value; // fillStyle -> 채우는 색깔을 바꿔줌
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    // 채우기 모드가 아니면 채우기 모드로 바꿔줌
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}
// click => mousedown + mouseup
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destoryBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
