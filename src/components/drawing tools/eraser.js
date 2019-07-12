export default class Eraser {
  constructor(obj) {
    this.erase = true;
    this.objData = obj;
  }

  mousedown(obj) {
    obj.mouse.x = obj.event.pageX - obj.canvas.offsetLeft + obj.offsetScale;
    obj.mouse.y = obj.event.pageY - obj.canvas.offsetTop + obj.offsetScale;
    this.objData.context.clearRect(obj.mouse.x / obj.speedMouse, obj.mouse.y / obj.speedMouse, 1, 1);
  }

  mousemove(e) {
    this.objData.mouse.x = (e.pageX - this.objData.canvas.offsetLeft + this.objData.offsetScale) / this.objData.speedMouse;
    this.objData.mouse.y = (e.pageY - this.objData.canvas.offsetTop + this.objData.offsetScale) / this.objData.speedMouse;
    if (this.erase === true) {
      this.objData.context.clearRect(this.objData.mouse.x, this.objData.mouse.y, 1, 1);
    }
  }
}
