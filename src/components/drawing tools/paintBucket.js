export default class PaintBucket {
  constructor(obj) {
    this.width = obj.canvas.width;
    this.height = obj.canvas.height;
    this.imageData = obj.context.getImageData(0, 0, this.width, this.height);
  }

  fill(obj) {
    const xMouse = obj.event.pageX - obj.canvas.offsetLeft + obj.offsetScale;
    const yMouse = obj.event.pageY - obj.canvas.offsetTop + obj.offsetScale;
    const calcCoord = (x, y) => {
      const restTop = y % obj.speedMouse;
      const restLeft = x % obj.speedMouse;
      const coordY = (y - restTop) / obj.speedMouse;
      const coordX = (x - restLeft) / obj.speedMouse;
      return {
        X: coordX,
        Y: coordY,
      };
    };
    const newCoord = calcCoord(xMouse, yMouse);
    const newY = newCoord.Y;
    const newX = newCoord.X;
    const pixelStack = [[newX, newY]];
    const start = obj.context.getImageData(newX, newY, 1, 1);
    const startR = start.data[0];
    const startG = start.data[1];
    const startB = start.data[2];
    const startAlpha = start.data[3];
    if (startAlpha === 255 && obj.nameTool === 'allPixelsColor') {
      for (let i = 0; i < this.imageData.data.length; i += 4) {
        if (this.imageData.data[i + 3] === 255) {
          this.imageData.data[i + 0] = obj.color[0];
          this.imageData.data[i + 1] = obj.color[1];
          this.imageData.data[i + 2] = obj.color[2];
        }
      }
    }
    const matchStartColor = (pixelPos) => {
      const r = this.imageData.data[pixelPos];
      const g = this.imageData.data[pixelPos + 1];
      const b = this.imageData.data[pixelPos + 2];
      return (r === startR && g === startG && b === startB);
    };

    const colorPixel = (pixelPos) => {
      this.imageData.data[pixelPos] = obj.color[0];
      this.imageData.data[pixelPos + 1] = obj.color[1];
      this.imageData.data[pixelPos + 2] = obj.color[2];
      this.imageData.data[pixelPos + 3] = 255;
    };
    if (startR === obj.color[0] && startG === obj.color[1] && startB === obj.color[2]) {
      return;
    }
    while (pixelStack.length) {
      const newPos = pixelStack.pop();
      const x = newPos[0];
      let y = newPos[1];
      let pixelPos = (y * this.width + x) * 4;
      while (y-- >= 0 && matchStartColor(pixelPos)) {
        pixelPos -= this.width * 4;
      }
      pixelPos += this.width * 4;
      ++y;
      let reachLeft = false;
      let reachRight = false;
      while (y++ < this.height - 1 && matchStartColor(pixelPos)) {
        colorPixel(pixelPos);
        if (x > 0) {
          if (matchStartColor(pixelPos - 4)) {
            if (!reachLeft) {
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }
        if (x < this.width - 1) {
          if (matchStartColor(pixelPos + 4)) {
            if (!reachRight) {
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += this.width * 4;
      }
    }
    obj.context.putImageData(this.imageData, 0, 0);
    obj.previewContext.drawImage(obj.canvas, 0, 0);
  }
}
