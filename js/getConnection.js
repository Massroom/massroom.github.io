// Get the current network speed
const speed = navigator.connection.downlink;

// Determine network strength based on speed
let strength;
if (speed < 0.5) {
  strength = 'weak';
} else if (speed < 2) {
  strength = 'medium';
} else {
  strength = 'strong';
}

// Toggle SVG display based on network strength
const svgWeak = document.getElementById('svg-weak');
const svgMedium = document.getElementById('svg-medium');
const svgStrong = document.getElementById('svg-strong');

switch (strength) {
  case 'weak':
    svgWeak.style.display = 'block';
    svgMedium.style.display = 'none';
    svgStrong.style.display = 'none';
    break;
  case 'medium':
    svgWeak.style.display = 'none';
    svgMedium.style.display = 'block';
    svgStrong.style.display = 'none';
    break;
  case 'strong':
    svgWeak.style.display = 'none';
    svgMedium.style.display = 'none';
    svgStrong.style.display = 'block';
    break;
}
