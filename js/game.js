const id = new URLSearchParams(location.search).get("id");
const game = games.find(g => g.id == id);
const box = document.getElementById("game");

box.innerHTML = `
  <h1>${game.name}</h1>
  <img src="${game.image}" style="max-width:600px;border-radius:12px">
  <p>${game.desc}</p>
  <p>📦 الحجم: ${game.size} GB</p>
  <p>⬇️ التحميلات: ${game.downloads}</p>
  <p>⭐ التقييم: ${game.rating}</p>
  <a class="download" href="${game.file}" download>تحميل اللعبة</a>
`;
