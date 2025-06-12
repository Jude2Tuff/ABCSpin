const wheel = document.getElementById("wheel");
const minSlider = document.getElementById("minPrice");
const maxSlider = document.getElementById("maxPrice");
const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");

let items = [];

function updateRangeDisplays() {
  minValue.textContent = minSlider.value;
  maxValue.textContent = maxSlider.value;
}
minSlider.addEventListener("input", updateRangeDisplays);
maxSlider.addEventListener("input", updateRangeDisplays);

function populateWheel() {
  items = [];
  wheel.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    let price = Math.floor(Math.random() * 100);
    let item = document.createElement("div");
    item.className = "item";
    item.textContent = `$${price}`;
    item.dataset.price = price;
    wheel.appendChild(item);
    items.push(item);
  }
}
populateWheel();

function spin() {
  const min = parseInt(minSlider.value);
  const max = parseInt(maxSlider.value);
  
  const eligible = items.filter(item => {
    const price = parseInt(item.dataset.price);
    return price >= min && price <= max;
  });

  if (eligible.length === 0) {
    alert("No items in selected price range.");
    return;
  }

  // Pick a random index among all items to land on (simulate random)
  const targetIndex = Math.floor(Math.random() * items.length);
  const offset = targetIndex * 140; // item width + margin

  wheel.style.transition = "none";
  wheel.style.transform = `translateX(0px)`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wheel.style.transition = "transform 3s ease-out";
      wheel.style.transform = `translateX(-${offset}px)`;
    });
  });
}
