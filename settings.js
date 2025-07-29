let bgColorInput = document.getElementById('bgColorInput');
let secondaryColorInput = document.getElementById('secondaryColorInput');
let accentColorInput = document.getElementById('accentColorInput');

let customCSSInput = document.getElementById('customCSSInput');

let inSettingPopup = (bgColorInput) ? true : false;

if (inSettingPopup) {
  bgColorInput.value = localStorage.getItem('bgColor') || '#1d2a35';
  secondaryColorInput.value = localStorage.getItem('secondaryColor') || '#15202b';
  accentColorInput.value = localStorage.getItem('accentColor') || '#ffffff';
  customCSSInput.value = localStorage.getItem('customCSS') || '';

  bgColorInput.addEventListener('input', saveColors);
  secondaryColorInput.addEventListener('input', saveColors);
  accentColorInput.addEventListener('input', saveColors);
  applyColors();
  customCSSInput.addEventListener('input', saveCustomCSS);
  applyColors();
} else {
  setInterval(applyColors, 200);
  setInterval(applyCustomCSS, 500);
}

function saveColors() {
  if (!inSettingPopup) return;
  localStorage.setItem('bgColor', bgColorInput.value);
  localStorage.setItem('secondaryColor', secondaryColorInput.value);
  localStorage.setItem('accentColor', accentColorInput.value);
  applyColors();
}

function applyColors() {
  document.documentElement.style.setProperty('--background-color', localStorage.getItem('bgColor'));
  document.documentElement.style.setProperty('--secondary-color', localStorage.getItem('secondaryColor'));
  document.documentElement.style.setProperty('--accent-color', localStorage.getItem('accentColor'));
}

document.getElementById('resetButton').addEventListener('click', resetColors);
function resetColors() {
  bgColorInput.value = '#1d2a35';
  secondaryColorInput.value = '#15202b';
  accentColorInput.value = '#ffffff';
  saveColors();
  applyColors();
}

function saveCustomCSS() {
  localStorage.setItem('customCSS', document.getElementById('customCSSInput').value);
  applyCustomCSS();
}

function applyCustomCSS() {
  document.getElementById('customCss')?.remove();
  const style = document.createElement('style');
  style.id = "customCss";
  style.textContent = localStorage.getItem('customCSS');
  document.head.appendChild(style);
}
