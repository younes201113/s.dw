let current = [...games];
const grid = document.getElementById("grid");
const search = document.getElementById("search");

function render(list) {
  grid.innerHTML = "";
  list.forEach(g => {
    grid.innerHTML += `
      <div class="card">
        <img src="${g.image}">
        <div class="body">
          <h4>${g.name}</h4>
          <div class="meta">
            📦 ${g.size}GB · ⬇️ ${g.downloads} · ⭐ ${g.rating}
          </div>
          <a class="download" href="game.html?id=${g.id}">تفاصيل</a>
        </div>
      </div>
    `;
  });
}

function filterCategory(cat) {
  current = games.filter(g => g.category === cat);
  render(current);
}

function filterGenre(gen) {
  current = games.filter(g => g.genre.includes(gen));
  render(current);
}

function sortBy(type) {
  current.sort((a,b) => b[type] - a[type]);
  render(current);
}

search.oninput = e => {
  const v = e.target.value.toLowerCase();
  render(current.filter(g => g.name.toLowerCase().includes(v)));
};

render(current);
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.onclick = () => {
  sidebar.classList.toggle("open");
};
