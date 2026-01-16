const sidebar = document.getElementById("sidebar");
const pcOnly = document.querySelectorAll(".pc-only");

function toggleSidebar() {
  sidebar.classList.toggle("closed");
}

function resetAll() {
  current = [...games];
  hidePcFilters();
  render(current);
}

function showPcFilters() {
  pcOnly.forEach(e => e.classList.remove("hidden"));
}

function hidePcFilters() {
  pcOnly.forEach(e => e.classList.add("hidden"));
}

/* override بسيط بدون كسر */
const _filterCategory = filterCategory;
filterCategory = function(cat) {
  _filterCategory(cat);
  cat === "pc" ? showPcFilters() : hidePcFilters();
};
