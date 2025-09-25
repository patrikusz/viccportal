// Téma váltás
let theme = localStorage.getItem("theme") || "light";
if (theme === "dark") document.body.classList.add("dark");
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Back to top gomb
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => window.scrollTo({top:0, behavior: 'smooth'}));

document.addEventListener("DOMContentLoaded", () => {
  // Betöltjük a like adatokat localStorage-ból
  let likes = JSON.parse(localStorage.getItem("jokeLikes") || "{}");

  // Minden kártyára beállítjuk a like számlálót
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const btn = card.querySelector(".like-btn");
    const count = card.querySelector(".like-count");

    // Ha van mentett like, betöltjük
    count.textContent = likes[id] || 0;

    // Gomb esemény
    btn.addEventListener("click", () => {
      likes[id] = (likes[id] || 0) + 1;
      count.textContent = likes[id];
      localStorage.setItem("jokeLikes", JSON.stringify(likes));
    });
  });
});