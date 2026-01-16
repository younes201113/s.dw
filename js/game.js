const params = new URLSearchParams(window.location.search);
const gameId = parseInt(params.get("id"));

const game = games.find(g => g.id === gameId);

const box = document.getElementById("gameBox");

if (!game) {
  box.innerHTML = "<p>اللعبة غير موجودة</p>";
} else {
  box.innerHTML = `
    <div class="game-detail">
      <img src="${game.image}">
      <div class="info">
        <h2>${game.name}</h2>
        <p>📦 الحجم: ${game.size} GB</p>
        <p>⬇️ التحميلات: ${game.downloads}</p>
        <p>⭐ التقييم: ${game.rating}</p>

        <a href="${game.download || '#'}" class="download big">
          تحميل اللعبة
        </a>
      </div>
    </div>
  `;
}
