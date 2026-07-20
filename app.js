const demoTabs = document.querySelectorAll(".demo-tab");
const demoPanels = document.querySelectorAll(".demo-panel");

demoTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    demoTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    demoPanels.forEach((panel) => {
      panel.classList.remove("active");
      panel.hidden = true;
    });

    const target = document.querySelector(`#${tab.dataset.demo}`);
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    target.hidden = false;
    requestAnimationFrame(() => target.classList.add("active"));
  });
});

let bookingStep = 1;
let selectedDuration = 30;
let selectedPrice = 88;
let selectedWalker = "Mia";

const bookingScreens = document.querySelectorAll(".booking-screen");
const stepLabel = document.querySelector("#booking-step-label");
const progress = document.querySelector("#booking-progress");
const bookingBack = document.querySelector("#booking-back");
const bookingNext = document.querySelector("#booking-next");
const bookingSummary = document.querySelector("#booking-summary");
const bookingFeatures = document.querySelector("#booking-features");
const trackingToggle = document.querySelector("#tracking-toggle");
const videoToggle = document.querySelector("#video-toggle");

function updateBooking() {
  bookingScreens.forEach((screen) => {
    screen.classList.toggle("active", Number(screen.dataset.step) === bookingStep);
  });
  stepLabel.textContent = `Step ${bookingStep} / 3`;
  progress.style.width = `${(bookingStep / 3) * 100}%`;
  bookingBack.disabled = bookingStep === 1;
  bookingNext.textContent = bookingStep === 3 ? "重新体验" : "下一步";

  if (bookingStep === 3) {
    bookingSummary.textContent = `${selectedWalker} · ${selectedDuration} 分钟 · ¥${selectedPrice}`;
    const features = [];
    if (trackingToggle.checked) features.push("实时路线");
    if (videoToggle.checked) features.push("视频更新");
    bookingFeatures.textContent = features.length ? `包含${features.join("与")}` : "标准安全保障";
  }
}

document.querySelectorAll(".choice-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedDuration = Number(button.dataset.duration);
    selectedPrice = Number(button.dataset.price);
  });
});

document.querySelectorAll(".walker-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".walker-option").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedWalker = button.dataset.walker;
  });
});

bookingBack.addEventListener("click", () => {
  bookingStep = Math.max(1, bookingStep - 1);
  updateBooking();
});

bookingNext.addEventListener("click", () => {
  bookingStep = bookingStep === 3 ? 1 : bookingStep + 1;
  updateBooking();
});

updateBooking();

const searchInput = document.querySelector("#market-search");
const filterButtons = document.querySelectorAll(".filter-chip");
const marketItems = document.querySelectorAll("#market-results article");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#market-empty");
let activeCategory = "all";

function filterMarket() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  marketItems.forEach((item) => {
    const matchesCategory = activeCategory === "all" || item.dataset.category === activeCategory;
    const matchesQuery = !query || item.textContent.toLowerCase().includes(query) || item.dataset.keywords.includes(query);
    const isVisible = matchesCategory && matchesQuery;
    item.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  resultCount.textContent = visibleCount;
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    filterMarket();
  });
});

searchInput.addEventListener("input", filterMarket);
