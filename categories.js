/* categories.js */
const jokes = [
  {id: 1, text: "Miért nem tud a csiga repülni? Mert nincs szárnya!", category: "Állatos"},
  {id: 2, text: "Hogy hívják a kínai titkárnőt? Gépelin.", category: "Szóviccek"},
  {id: 3, text: "Mi az: kicsi, sárga és veszélyes? Egy kanári géppisztollyal.", category: "Rövid"},
  {id: 4, text: "Mit csinál a tehén a fagyiban? Bőőőőőő!", category: "Állatos"},
  {id: 5, text: "Melyik a leglustább hegy? A Himalája (hí’ ma’ lájja).", category: "Szóviccek"}
];

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

// Kategóriák renderelése
function renderCategories() {
  const categoriesSection = document.getElementById("categories");
  categoriesSection.innerHTML = `<h2>Kategóriák</h2>`;
  const categories = [...new Set(jokes.map(j => j.category))];
  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category";

    const header = document.createElement("div");
    header.className = "category-header";
    header.innerHTML = `${cat} <span>+</span>`;
    header.addEventListener("click", () => {
      div.classList.toggle("open");
      header.querySelector("span").textContent = div.classList.contains("open") ? '-' : '+';
    });

    const content = document.createElement("div");
    content.className = "category-content";
    jokes.filter(j => j.category === cat).forEach(j => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>Vicc #${j.id}</h3><p>„${j.text}”</p>`;
      content.appendChild(card);
    });

    div.appendChild(header);
    div.appendChild(content);
    categoriesSection.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderCategories();
});