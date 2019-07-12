export default class Frame {
  constructor() {
    this.id = 0;
    // this.frame = document.getElementById(this.id);
    this.newFrame = '';
    this.signature = '';
    this.defaultBackgroundFrame = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAC+CAIAAAAEFiLKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHFSURBVHhe7dIxAQAADMOg+bdZI/OQGzRwg0QdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdInWI1CFSh0gdku0Bnhc1njj1szkAAAAASUVORK5CYII=';
    this.image = '';
  }

  addAndDelete(frames) {
    const frame = document.getElementById(this.id);
    const newFrame = frame.cloneNode(true);
    this.image = newFrame.getElementsByTagName('img')[0];
    this.image.src = this.defaultBackgroundFrame;
    if (newFrame.classList.contains('active')) {
      newFrame.classList.remove('active');
    }
    this.signature = newFrame.children[0];
    const deleteButton = newFrame.children[2];
    newFrame.id = this.id + 1;
    this.signature.innerHTML = newFrame.id;
    deleteButton.addEventListener('click', (e) => {
      e.currentTarget.parentElement.remove();
      this.id--;
      for (let i = 0; i < frames.children.length - 1; i++) {
        frames.children[i].id = i;
        frames.children[i].children[0].innerHTML = i;
      }
    });
    frame.parentNode.insertBefore(newFrame, frame.nextSibling);
    this.id++;
  }
}
