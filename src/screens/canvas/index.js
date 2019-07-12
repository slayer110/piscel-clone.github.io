export default class Template {
  constructor() {
    this.state = { currentTool: '' };
    this.menu = document.getElementsByClassName('menu');
    this.pen = document.getElementById('pen');
    this.eraser = document.getElementById('eraser');
    this.allPixelsColor = document.getElementById('allPixelsColor');
    this.straightLine = document.getElementById('straightLine');
    this.buttonSettings = document.getElementsByClassName('buttonSettings')[0];
    this.settings = document.getElementsByClassName('settings')[0];
    this.newCanvas = document.getElementById('myCanvas');
    this.auxiliaryCanvas = document.getElementById('auxiliaryCanvas');
    this.auxiliaryContext = this.auxiliaryCanvas.getContext('2d');
    this.preview = document.getElementById('preview');
    // this.contextPreview = this.canvasPreview.getContext('2d');
    this.grid = document.getElementById('grid');
    this.paintBucket = document.getElementById('paintBucket');
    this.context = this.newCanvas.getContext('2d');
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.primaryColor = document.getElementById('primaryColor');
    this.secondaryColor = document.getElementById('secondaryColor');
    this.paintBacket = document.getElementById('paintBucket');
    this.resizeCanvas = document.getElementById('resize');
    this.newCanvas.style.transform = 'matrix(28, 0, 0, 28, 0, 0)';
    this.auxiliaryCanvas.style.transform = 'matrix(28, 0, 0, 28, 0, 0)';
    this.auxiliaryCanvas.style.visibility = 'hidden';
    this.addFrame = document.getElementById('addFrameButton');
    this.copyButton = document.getElementsByClassName('buttonCopy')[0];
    this.frames = document.getElementsByClassName('frames')[0];
    this.images = document.getElementsByClassName('image');
    this.frame = document.getElementsByClassName('frame');
  }
}
