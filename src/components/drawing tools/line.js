export default class Line {
  constructor(obj) {
    this.line = true;
    this.objData = obj;
    this.newCoord = '';
    this.setPixel = (x, y, c) => {
      const p = obj.auxiliaryContext.createImageData(1, 1);
      p.data[0] = c.r;
      p.data[1] = c.g;
      p.data[2] = c.b;
      p.data[3] = c.a;
      // const data = obj.auxiliaryContext.getImageData(x, y, 1, 1).data;
      obj.auxiliaryContext.putImageData(p, x, y);
    };
    this.drawLine = (x1, y1, x2, y2, color) => {
      const deltaX = Math.abs(x2 - x1);
      const deltaY = Math.abs(y2 - y1);
      const signX = x1 < x2 ? 1 : -1;
      const signY = y1 < y2 ? 1 : -1;
      //
      let error = deltaX - deltaY;
      this.setPixel(x2, y2, color);
      while (x1 != x2 || y1 != y2) {
        this.setPixel(x1, y1, color);
        const error2 = error * 2;
        //
        if (error2 > -deltaY) {
          error -= deltaY;
          x1 += signX;
        }
        if (error2 < deltaX) {
          error += deltaX;
          y1 += signY;
        }
      }
    };
    this.calcCoord = (x, y) => {
      const restTop = y % this.objData.speedMouse;
      const restLeft = x % this.objData.speedMouse;
      const coordY = (y - restTop) / this.objData.speedMouse;
      const coordX = (x - restLeft) / this.objData.speedMouse;
      return {
        X: coordX,
        Y: coordY,
      };
    };
  }

  mousedown(e) {
    this.lineDraw = true;
    const xMouse = e.pageX - this.objData.auxiliaryCanvas.offsetLeft + this.objData.offsetScale;
    const yMouse = e.pageY - this.objData.auxiliaryCanvas.offsetTop + this.objData.offsetScale;
    this.newCoord = this.calcCoord(xMouse, yMouse);
    this.setPixel(this.newCoord.X, this.newCoord.Y, {
      r: this.objData.color[0],
      g: this.objData.color[1],
      b: this.objData.color[2],
      a: 255,
    });
  }

  mousemove(e) {
    const xMouse = e.pageX - this.objData.auxiliaryCanvas.offsetLeft + this.objData.offsetScale;
    const yMouse = e.pageY - this.objData.auxiliaryCanvas.offsetTop + this.objData.offsetScale;
    const newCoord2 = this.calcCoord(xMouse, yMouse);

    if (this.lineDraw === true) {
      this.objData.auxiliaryContext.clearRect(0, 0, this.objData.auxiliaryCanvas.width, this.objData.auxiliaryCanvas.height);
      this.drawLine(this.newCoord.X, this.newCoord.Y, newCoord2.X, newCoord2.Y, {
        r: this.objData.color[0],
        g: this.objData.color[1],
        b: this.objData.color[2],
        a: 255,
      });
      this.objData.auxiliaryContext.drawImage(this.objData.canvas, 0, 0);
    }
  }

  mouseup() {
    this.objData.canvas.style.cursor = 'url(\'src/screens/canvas/images/pen.cur\'),auto';
    this.objData.context.drawImage(this.objData.auxiliaryCanvas, 0, 0);
    // this.objData.auxiliaryCanvas.style.visibility = 'hidden';
    this.lineDraw = false;
    // this.objData.auxiliaryContext.clearRect(0, 0, 32, 32);

  }
}
