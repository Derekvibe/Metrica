const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const heightOutput = document.querySelector('#height-value');
const weightOutput = document.querySelector('#weight-value');
const bmiOutput = document.querySelector('#bmi-value');
const categoryOutput = document.querySelector('#bmi-category');
const categoryDot = document.querySelector('#category-dot');
const scaleMarker = document.querySelector('#scale-marker');
const currentYear = document.querySelector('#current-year');
const unitButtons = document.querySelectorAll('[data-unit]');

let unit = 'metric';
let heightCm = 170;
let weightKg = 70;

const categories = [
  { max: 18.5, label: 'Underweight', color: '#5a9fd6' },
  { max: 25, label: 'Healthy range', color: '#4c9a6a' },
  { max: 30, label: 'Overweight', color: '#dea64a' },
  { max: Infinity, label: 'Obesity range', color: '#ce695f' },
];

function formatHeight(inches) {
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  return `${feet} ft ${remainingInches} in`;
}

function updateRangeFill(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const progress = ((Number(input.value) - min) / (max - min)) * 100;
  input.style.backgroundImage = `linear-gradient(90deg, #245a43 ${progress}%, #e4e9e3 ${progress}%)`;
  input.style.backgroundSize = '100% 6px';
  input.style.backgroundPosition = 'center';
  input.style.backgroundRepeat = 'no-repeat';
}

function updateDisplay() {
  const displayedHeight =
    unit === 'metric' ? Math.round(heightCm) : Math.round(heightCm / 2.54);
  const displayedWeight =
    unit === 'metric' ? Math.round(weightKg * 10) / 10 : Math.round(weightKg * 2.20462);
  const bmi = weightKg / ((heightCm / 100) ** 2);
  const category = categories.find((item) => bmi < item.max) ?? categories.at(-1);
  const marker = Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100));

  heightInput.value = String(displayedHeight);
  weightInput.value = String(displayedWeight);
  heightOutput.value =
    unit === 'metric' ? `${displayedHeight} cm` : formatHeight(displayedHeight);
  weightOutput.value = unit === 'metric' ? `${displayedWeight.toFixed(1)} kg` : `${displayedWeight} lb`;
  bmiOutput.textContent = bmi.toFixed(1);
  categoryOutput.textContent = category.label;
  categoryDot.style.backgroundColor = category.color;
  scaleMarker.style.left = `${marker}%`;
  updateRangeFill(heightInput);
  updateRangeFill(weightInput);
}

function setUnit(nextUnit) {
  unit = nextUnit;
  const metric = unit === 'metric';

  heightInput.min = metric ? '100' : '40';
  heightInput.max = metric ? '250' : '96';
  heightInput.step = '1';
  weightInput.min = metric ? '30' : '60';
  weightInput.max = metric ? '200' : '440';
  weightInput.step = metric ? '0.1' : '1';

  document.querySelector('#height-min').textContent = metric ? '100 cm' : '3 ft 4 in';
  document.querySelector('#height-max').textContent = metric ? '250 cm' : '8 ft';
  document.querySelector('#weight-min').textContent = metric ? '30 kg' : '60 lb';
  document.querySelector('#weight-max').textContent = metric ? '200 kg' : '440 lb';

  unitButtons.forEach((button) => {
    const active = button.dataset.unit === nextUnit;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  updateDisplay();
}

if (heightInput && weightInput) {
  heightInput.addEventListener('input', () => {
    heightCm = unit === 'metric' ? Number(heightInput.value) : Number(heightInput.value) * 2.54;
    updateDisplay();
  });

  weightInput.addEventListener('input', () => {
    weightKg = unit === 'metric' ? Number(weightInput.value) : Number(weightInput.value) / 2.20462;
    updateDisplay();
  });

  unitButtons.forEach((button) => {
    button.addEventListener('click', () => setUnit(button.dataset.unit));
  });

  updateDisplay();
}

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
