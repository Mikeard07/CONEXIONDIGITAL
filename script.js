const pages = [
  { src: "assets/portada.png", title: "Portada" },
  { src: "assets/pagina-2.png", title: "Presentación" },
  { src: "assets/pagina-3.png", title: "Identidad digital" },
  { src: "assets/pagina-4.png", title: "Seguridad y encuesta" },
  { src: "assets/pagina-5.png", title: "Historia y ciudadanía" },
  { src: "assets/contraportada.png", title: "Contraportada" }
];

let current = 0;
const currentPage = document.getElementById("currentPage");
const largePage = document.getElementById("largePage");
const pageCount = document.getElementById("pageCount");
const progressBar = document.getElementById("progressBar");
const thumbnails = [...document.querySelectorAll(".thumbnail")];
const lightbox = document.getElementById("lightbox");

function showPage(index) {
  current = (index + pages.length) % pages.length;
  const page = pages[current];
  currentPage.src = page.src;
  currentPage.alt = `${page.title} de Conexión Digital`;
  largePage.src = page.src;
  largePage.alt = `${page.title} ampliada`;
  pageCount.textContent = `${page.title} · ${current + 1} de ${pages.length}`;
  progressBar.style.width = `${((current + 1) / pages.length) * 100}%`;
  thumbnails.forEach((item, i) => {
    item.classList.toggle("active", i === current);
    item.setAttribute("aria-current", i === current ? "page" : "false");
  });
}
function openLightbox() {
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("prevButton").addEventListener("click", () => showPage(current - 1));
document.getElementById("nextButton").addEventListener("click", () => showPage(current + 1));
document.getElementById("prevText").addEventListener("click", () => showPage(current - 1));
document.getElementById("nextText").addEventListener("click", () => showPage(current + 1));
thumbnails.forEach(item => item.addEventListener("click", () => showPage(Number(item.dataset.index))));
document.getElementById("openPage").addEventListener("click", openLightbox);
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
document.getElementById("lightPrev").addEventListener("click", () => showPage(current - 1));
document.getElementById("lightNext").addEventListener("click", () => showPage(current + 1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPage(current - 1);
  if (event.key === "ArrowRight") showPage(current + 1);
});
const menuButton = document.getElementById("menuButton");
menuButton.addEventListener("click", () => {
  const nav = document.querySelector(".top-nav");
  const opened = nav.classList.toggle("show");
  menuButton.setAttribute("aria-expanded", String(opened));
});
showPage(0);