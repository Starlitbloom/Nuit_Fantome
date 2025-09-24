let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  // mover el contenedor
  document.querySelector(".slides").style.transform = 
    `translateX(-${currentIndex * 100}%)`;

  // actualizar puntos
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

document.querySelector(".prev").addEventListener("click", () => showSlide(currentIndex - 1));
document.querySelector(".next").addEventListener("click", () => showSlide(currentIndex + 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

// auto-slide cada 5s
setInterval(() => showSlide(currentIndex + 1), 5000);
