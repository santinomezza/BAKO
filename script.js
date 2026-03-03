const viewer = document.getElementById("viewer");
const totalFrames = 24;
let currentFrame = 1;

function updateImage() {
  viewer.src = `assets/img/gorra_360_${String(currentFrame).padStart(2, "0")}.png`;
}

const hero = document.querySelector(".hero");

hero.addEventListener("mousemove", (e) => {

  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const width = rect.width;

  // Calcula porcentaje horizontal del mouse
  const percent = x / width;

  // Convierte porcentaje en frame
  currentFrame = Math.ceil(percent * totalFrames);

  if (currentFrame < 1) currentFrame = 1;
  if (currentFrame > totalFrames) currentFrame = totalFrames;

  updateImage();
});