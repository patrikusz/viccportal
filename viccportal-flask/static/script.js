/* script.js */
// Viccek adatai
const jokes = [
  {id: 1, text: "Miért nem tud a csiga repülni? Mert nincs szárnya!", category: "Állatos", views: 0, likes: 0, comments: []},
  {id: 2, text: "Hogy hívják a kínai titkárnőt? Gépelin.", category: "Szóviccek", views: 0, likes: 0, comments: []},
  {id: 3, text: "Mi az: kicsi, sárga és veszélyes? Egy kanári géppisztollyal.", category: "Rövid", views: 0, likes: 0, comments: []},
  {id: 4, text: "Mit csinál a tehén a fagyiban? Bőőőőőő!", category: "Állatos", views: 0, likes: 0, comments: []},
  {id: 5, text: "Melyik a leglustább hegy? A Himalája (hí’ ma’ lájja).", category: "Szóviccek", views: 0, likes: 0, comments: []}
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

// Kezdőlap renderelés
function renderHome(jokes) {
  const home = document.getElementById("home");
  home.innerHTML = "";
  let title = document.getElementById("home-title");
  if (!title) {
    title = document.createElement("h2");
    title.id = "home-title";
    title.textContent = "Kiemelt viccek";
    home.parentNode.insertBefore(title, home);
  }
  jokes.slice(0, 3).forEach(joke => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>Vicc #${joke.id}</h3>
      <p>„${joke.text}”</p>
      <small>Kategória: ${joke.category}</small>
    `;
    home.appendChild(card);
  });

  // Legtöbbet likelt viccek
  let likes = JSON.parse(localStorage.getItem("jokeLikes") || "{}");
  // Viccekhez hozzárendeljük a like számot
  let jokesWithLikes = jokes.map(j => ({...j, likes: likes[j.id] || 0}));
  // Csökkenő sorrendbe rendezzük, majd kiválasztjuk a top 3-at
  let topLiked = jokesWithLikes.sort((a, b) => b.likes - a.likes).slice(0, 3);

  // Kiemelt szakasz
  const likedTitle = document.createElement("h2");
  likedTitle.textContent = "Legtöbbet likelt viccek";
  home.appendChild(likedTitle);

  topLiked.forEach(joke => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>Vicc #${joke.id}</h3>
      <p>„${joke.text}”</p>
      <small>Kategória: ${joke.category}</small>
      <span class="like-count">👍 ${joke.likes}</span>
    `;
    home.appendChild(card);
  });
}

// Véletlen vicc
function renderRandom(jokes) {
  const randomSection = document.getElementById("random");
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  // Feliratot külön elemként, nem a grid részeként
  randomSection.innerHTML = "";
  let title = document.getElementById("random-title");
  if (!title) {
    title = document.createElement("h2");
    title.id = "random-title";
    title.textContent = "Véletlen vicc";
    randomSection.parentNode.insertBefore(title, randomSection);
  }
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<p>„${joke.text}”</p><small>Kategória: ${joke.category || joke.category_id}</small>`;
  randomSection.appendChild(card);
}

// Napi vicc
function renderDaily(jokes) {
  const dailySection = document.getElementById("daily");
  const index = new Date().getDate() % jokes.length;
  const joke = jokes[index];
  // Feliratot külön elemként, nem a grid részeként
  dailySection.innerHTML = "";
  let title = document.getElementById("daily-title");
  if (!title) {
    title = document.createElement("h2");
    title.id = "daily-title";
    title.textContent = "Napi vicc";
    dailySection.parentNode.insertBefore(title, dailySection);
  }
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<p>„${joke.text}”</p><small>Kategória: ${joke.category || joke.category_id}</small>`;
  dailySection.appendChild(card);
}

// Oldal betöltéskor
window.addEventListener("DOMContentLoaded", () => {
  fetch('/jokes')
      .then(res => res.json())
      .then(jokes => {
          renderHome(jokes);
          renderRandom(jokes);
          renderDaily(jokes);
      });
});
