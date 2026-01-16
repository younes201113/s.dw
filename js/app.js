const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const cards = document.getElementById("cards");
const filterBtn = document.getElementById("filterBtn");

menuBtn.onclick = () => {
  sidebar.classList.toggle("open");
};

const games = [
  {
    title: "IGI 2",
    category: "pc",
    size: "1.2 GB",
    ram: "2 GB",
    img: "https://via.placeholder.com/400x600"
  },
  {
    title: "Call of Duty 4",
    category: "pc",
    size: "6 GB",
    ram: "4 GB",
    img: "https://via.placeholder.com/400x600"
  },
  {
    title: "GTA San Andreas",
    category: "pc",
    size: "4 GB",
    ram: "4 GB",
    img: "https://via.placeholder.com/400x600"
  }
];

function render(list) {
  cards.innerHTML = "";
  list.forEach(g => {
    cards.innerHTML += `
      <div class="card">
        <img src="${g.img}">
        <div class="card-body">
          <h4>${g.title}</h4>
          <p>الحجم: ${g.size} | RAM: ${g.ram}</p>
          <button>تحميل</button>
        </div>
      </div>
    `;
  });
}

function selectSection(section) {
  const filtered = games.filter(g => g.category === section);
  render(filtered);

  filterBtn.classList.toggle("hidden", section !== "pc");
  sidebar.classList.remove("open");
}

render(games);
