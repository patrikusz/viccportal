/* categories.js */
document.addEventListener('DOMContentLoaded', function() {
    fetch('/jokes')
        .then(res => res.json())
        .then(jokes => {
            renderCategories(jokes);
        });
});

function renderCategories(jokes) {
  const categoriesSection = document.getElementById("categories");
  categoriesSection.innerHTML = `<h2>Kategóriák</h2>`;
  const categories = [...new Set(jokes.map(j => j.category || j.category_id))];

  // Kategória smiley-k
  const categoryEmojis = {
    "Állatos": "🐶",
    "Rendőrös": "👮",
    "Pistike": "🧒",
    "Szőke nős": "👱‍♀️",
    "Munkahelyi": "💼",
    "Egyéb": "😂"
  };

  // Like adatok betöltése
  let likes = JSON.parse(localStorage.getItem("jokeLikes") || "{}");

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category";

    const header = document.createElement("div");
    header.className = "category-header";
    // Smileyt illesztünk a kategória elé
    const emoji = categoryEmojis[cat] || "😄";
    header.innerHTML = `${emoji} ${cat} <span>+</span>`;
    header.addEventListener("click", () => {
      div.classList.toggle("open");
      header.querySelector("span").textContent = div.classList.contains("open") ? '-' : '+';
    });

    const content = document.createElement("div");
    content.className = "category-content";
    jokes.filter(j => (j.category || j.category_id) === cat).forEach(j => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.id = j.id;
      card.innerHTML = `
        <h3>Vicc #${j.id}</h3>
        <p>„${j.text}”</p>
        <button class="like-btn">👍</button>
        <span class="like-count">${likes[j.id] || 0}</span>
      `;
      // Like gomb esemény
      const btn = card.querySelector(".like-btn");
      const count = card.querySelector(".like-count");
      btn.addEventListener("click", () => {
        likes[j.id] = (likes[j.id] || 0) + 1;
        count.textContent = likes[j.id];
        localStorage.setItem("jokeLikes", JSON.stringify(likes));
      });
      content.appendChild(card);
    });

    div.appendChild(header);
    div.appendChild(content);
    categoriesSection.appendChild(div);
  });
}

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