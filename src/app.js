import './screens/canvas/style.css';
import Template from './screens/canvas/index';
import Pen from './components/drawing tools/pen';
import Eraser from './components/drawing tools/eraser';
import PaintBucket from './components/drawing tools/paintBucket';
import Line from './components/drawing tools/line';
import Frame from './components/animation/frame';

const canvas = new Template(0);
const frame = new Frame(0);
const rightButtonMouse = 3;
let countFrames = 0;
let line;
let eraser;
let pen;
let fill;
let primaryColor = [230, 100, 101];
let secondaryColor;
const objData = {
  previewContext: canvas.preview,
  auxiliaryCanvas: canvas.auxiliaryCanvas,
  auxiliaryContext: canvas.auxiliaryContext,
  canvas: canvas.newCanvas,
  context: canvas.context,
  mouse: canvas.mouse,
  offsetScale: 432,
  speedMouse: 28,
  color: primaryColor,
  frames: canvas.frames,
  images: canvas.images,
};
const zoom = {
  size32: 28,
  size64: 14,
  size128: 7,
};
let funcMouseMove;
const rgb = (color) => {
  let valueRGB = color.match(/[A-Za-z0-9]{2}/g);
  valueRGB = valueRGB.map((v) => {
    return parseInt(v, 16);
  });
  return valueRGB;
};
const hiddenSettings = () => {
  if (canvas.settings.style.visibility === 'visible') {
    canvas.settings.style.visibility = 'hidden';
  } else {
    canvas.settings.style.visibility = 'visible';
  }
};
const auxiliaryForLine = () => {
  line = new Line(objData);
  objData.auxiliaryCanvas.addEventListener('mousedown', (y) => {
    primaryColor = rgb(canvas.primaryColor.value);
    secondaryColor = rgb(canvas.secondaryColor.value);
    objData.color = primaryColor;
    if (y.which === rightButtonMouse) {
      objData.color = secondaryColor;
    }
    line.mousedown(y);
  });
  objData.auxiliaryCanvas.addEventListener('mousemove', (y) => {
    line.mousemove(y);
  });
  objData.auxiliaryCanvas.addEventListener('mouseup', () => {
    line.mouseup();
  });
};
const addFrame = () => {
  frame.addAndDelete(objData.frames);
  const move = () => {
    if (countFrames > objData.images.length - 1) {
      countFrames = 0;
    }
    canvas.preview.src = objData.images[countFrames].src;
    countFrames++;
  };
  setInterval(move, 500);
};
objData.previewContext.src = frame.defaultBackgroundFrame;
objData.frames.addEventListener('click', (e) => {
  if (e.target === canvas.addFrame) {
    return;
  }
  for (let i = 0; i < canvas.frame.length; i++) {
    canvas.frame[i].classList.remove('active');
  }
  e.target.parentElement.classList.add('active');
  objData.context.drawImage(e.target, 0, 0, canvas.newCanvas.width, canvas.newCanvas.height);
});
canvas.buttonSettings.addEventListener('click', hiddenSettings);
objData.canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
objData.auxiliaryCanvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
canvas.resizeCanvas.addEventListener('change', (e) => {
  let parMatrix;
  const image = canvas.context.getImageData(0, 0, canvas.newCanvas.width, canvas.newCanvas.height);
  objData.canvas.width = e.target.value;
  objData.canvas.height = e.target.value;
  objData.auxiliaryCanvas.width = e.target.value;
  objData.auxiliaryCanvas.height = e.target.value;
  objData.context.putImageData(image, 0, 0);
  switch (e.target.value) {
    case '32':
      parMatrix = zoom.size32;
      objData.canvas.style.marginTop = '455px';
      objData.auxiliaryCanvas.style.marginTop = '455px';
      objData.auxiliaryCanvas.style.marginLeft = '-32px';
      objData.speedMouse = 28;
      objData.offsetScale = 415;
      break;
    case '64':
      parMatrix = zoom.size64;
      objData.canvas.style.marginTop = '439px';
      objData.auxiliaryCanvas.style.marginTop = '439px';
      objData.auxiliaryCanvas.style.marginLeft = '-64px';
      objData.speedMouse = 14;
      objData.offsetScale = 415;
      break;
    case '128':
      parMatrix = zoom.size128;
      objData.canvas.style.marginTop = '407px';
      objData.auxiliaryCanvas.style.marginTop = '407px';
      objData.auxiliaryCanvas.style.marginLeft = '-128px';
      objData.speedMouse = 7;
      objData.offsetScale = 383;
      break;
    default:
      break;
  }

  canvas.newCanvas.style.transform = `matrix(${parMatrix}, 0, 0, ${parMatrix}, 0, 0)`;
  canvas.auxiliaryCanvas.style.transform = `matrix(${parMatrix}, 0, 0, ${parMatrix}, 0, 0)`;
});
objData.canvas.addEventListener('mousedown', (e) => {
  primaryColor = rgb(canvas.primaryColor.value);
  secondaryColor = rgb(canvas.secondaryColor.value);
  objData.event = e;
  objData.color = primaryColor;
  objData.nameTool = canvas.state.currentTool;
  if (e.which === rightButtonMouse) {
    objData.color = secondaryColor;
  }
  switch (objData.nameTool) {
    case 'pen':
      pen = new Pen(objData);
      pen.mousedown(objData);
      funcMouseMove = pen.mousemove;
      objData.canvas.addEventListener('mousemove', funcMouseMove.bind(pen));
      document.addEventListener('mouseup', () => {
        const dataURL = objData.canvas.toDataURL();
        const activeFrame = document.getElementsByClassName('active')[0];
        const image = activeFrame.getElementsByTagName('img')[0];
        image.src = dataURL;
        objData.canvas.removeEventListener('mousemove', funcMouseMove.bind(pen));
        pen.draw = false;
      });
      break;
    case 'eraser':
      eraser = new Eraser(objData);
      eraser.mousedown(objData);
      funcMouseMove = eraser.mousemove;
      objData.canvas.addEventListener('mousemove', funcMouseMove.bind(eraser));
      document.addEventListener('mouseup', () => {
        objData.canvas.removeEventListener('mousemove', funcMouseMove.bind(eraser));
        eraser.erase = false;
      });
      break;
    case 'paintBucket':
      if (fill === undefined) {
        fill = new PaintBucket(objData);
      }
      fill.fill(objData);
      break;
    case 'allPixelsColor':
      if (fill === undefined) {
        fill = new PaintBucket(objData);
      }
      fill.fill(objData);
      break;
    case 'straightLine':
      objData.auxiliaryCanvas.style.visibility = 'visible';
      break;
    default:
      break;
  }
});
canvas.menu[0].addEventListener('click', (e) => {
  switch (e.target) {
    case canvas.pen:
      objData.auxiliaryCanvas.style.visibility = 'hidden';
      canvas.eraser.style.border = '';
      canvas.paintBacket.style.border = '';
      canvas.allPixelsColor.style.border = '';
      canvas.straightLine.style = '';
      canvas.pen.style.border = '3px solid red';
      canvas.state.currentTool = 'pen';
      objData.canvas.style.cursor = 'url(\'src/screens/canvas/images/pen.cur\'),auto';
      break;
    case canvas.eraser:
      objData.auxiliaryCanvas.style.visibility = 'hidden';
      canvas.pen.style.border = '';
      canvas.allPixelsColor.style.border = '';
      canvas.paintBacket.style.border = '';
      canvas.straightLine.style = '';
      canvas.eraser.style.border = '3px solid red';
      canvas.state.currentTool = 'eraser';
      objData.canvas.style.cursor = 'url(\'src/screens/canvas/images/eraser.cur\'),auto';
      break;
    case canvas.paintBacket:
      objData.auxiliaryCanvas.style.visibility = 'hidden';
      canvas.pen.style.border = '';
      canvas.allPixelsColor.style.border = '';
      canvas.eraser.style.border = '';
      canvas.straightLine.style = '';
      canvas.paintBacket.style.border = '3px solid red';
      canvas.state.currentTool = 'paintBucket';
      objData.canvas.style.cursor = 'url(\'src/screens/canvas/images/paintBucket.cur\'),auto';
      break;
    case canvas.allPixelsColor:
      objData.auxiliaryCanvas.style.visibility = 'hidden';
      canvas.pen.style.border = '';
      canvas.eraser.style.border = '';
      canvas.paintBacket.style.border = '';
      canvas.straightLine.style = '';
      canvas.allPixelsColor.style.border = '3px solid red';
      canvas.state.currentTool = 'allPixelsColor';
      objData.canvas.style.cursor = 'url(\'src/screens/canvas/images/drop.cur\'),auto';
      break;
    case canvas.straightLine:
      canvas.pen.style.border = '';
      canvas.eraser.style.border = '';
      canvas.paintBacket.style.border = '';
      canvas.allPixelsColor.style.border = '';
      canvas.straightLine.style.border = '3px solid red';
      canvas.state.currentTool = 'straightLine';
      objData.auxiliaryCanvas.style.cursor = 'url(\'src/screens/canvas/images/pen.cur\'),auto';
      objData.auxiliaryCanvas.style.visibility = 'visible';
      objData.auxiliaryContext.clearRect(0, 0, canvas.newCanvas.width, canvas.newCanvas.height);
      objData.auxiliaryContext.drawImage(objData.canvas, 0, 0);
      auxiliaryForLine();
      break;
    default:
      break;
  }
});
canvas.addFrame.addEventListener('click', addFrame);
// canvas.copyButton.addEventListener('click', copyFrame);
