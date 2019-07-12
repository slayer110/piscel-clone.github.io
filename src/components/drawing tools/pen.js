export default class Pen {
  constructor(obj) {
    this.objData = obj;
    this.draw = true;
    this.imageData = this.objData.context.createImageData(1, 1);
  }

  mousedown(obj) {
    obj.mouse.x = (obj.event.pageX - obj.canvas.offsetLeft + obj.offsetScale) / obj.speedMouse;
    obj.mouse.y = (obj.event.pageY - obj.canvas.offsetTop + obj.offsetScale) / obj.speedMouse;
    this.imageData.data[0] = obj.color[0];
    this.imageData.data[1] = obj.color[1];
    this.imageData.data[2] = obj.color[2];
    this.imageData.data[3] = 255;
    obj.context.putImageData(this.imageData, obj.mouse.x, obj.mouse.y);
  }

  mousemove(e) {
    this.objData.mouse.x = (e.pageX - this.objData.canvas.offsetLeft + this.objData.offsetScale) / this.objData.speedMouse;
    this.objData.mouse.y = (e.pageY - this.objData.canvas.offsetTop + this.objData.offsetScale) / this.objData.speedMouse;
    if (this.draw === true) {
      this.objData.context.putImageData(this.imageData, this.objData.mouse.x, this.objData.mouse.y);
    }
  }
}
