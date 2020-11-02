// https://css-tricks.com/converting-color-spaces-in-javascript/#hsl-to-hex
function HSLToHex(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}





const depthControl = document.getElementById('depth-control');

depthControl.addEventListener('change', (event) => {
  refreshTheme();

});


function updateBg(depth) {
  var lightness, saturation;
  var min, max;
  min = .2;
  max = .9;

  lightness = (1 - depth);
  lightness = lightness * (max - min) + min;
  lightness = lightness * 100;

  saturation = depth;
  min = .2;
  max = .24;
  saturation = saturation * (max - min) + min;
  saturation = saturation * 100;
  console.log('S:', saturation);

  document.body.style.background = 'hsla('+hue+', '+saturation+'%, '+lightness+'%, 1)';

  document.getElementById('hex__bg').innerText = HSLToHex(hue, saturation, lightness);
}

function updateUi(depth){
  var uiColour = '#000000';
  var threshold = .4;
  if (depth > threshold) { uiColour = '#ffffff' }
  // document.getElementById('ui')

  var uiTexts = document.querySelectorAll('.ui__text');
  uiTexts.forEach(function(el) {
    el.style.color = uiColour;
  });

  var uiBgs = document.querySelectorAll('.ui__bg');
  uiBgs.forEach(function(el) {
    el.style.backgroundColor = uiColour;
  });

  var uiBorders = document.querySelectorAll('.ui__border');
  uiBorders.forEach(function(el) {
    el.style.borderColor = uiColour;
  });

  document.getElementById('hex__ui').innerText = uiColour;
}

function randomHue(){
  min = Math.ceil(0);
  max = Math.floor(360);
  return Math.floor(Math.random() * (max - min) + min);
}

function refreshTheme(){

  // get depth value from control
  var depth = depthControl.value;
  //console.log(depth);

  // update depth readout
  document.getElementById('depth-control__readout-value').value = depthControl.value;


  updateBg(depth);
  updateUi(depth);


  // console.log(colours);
}

function focusDepthControl(){
  depthControl.focus();
}

function randomiseHue(){
  hue = randomHue();
  refreshTheme();
  focusDepthControl();
}

var hue = randomHue();

focusDepthControl();
refreshTheme();
