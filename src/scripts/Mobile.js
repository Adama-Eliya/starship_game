export default class Mobile {
  #x;
  #y;
  #deltaX;
  #deltaY;
  #image;

  constructor(x, y, deltaX = 0, deltaY = 0, imageSource) {
    this.#x = x;
    this.#y = y;
    this.#deltaX = deltaX;
    this.#deltaY = deltaY;
    this.#image = this.#createImage(imageSource);
  }
  draw(context) {
    context.drawImage(this.#image, this.#x, this.#y);
  }

  get x() {
    return this.#x;
  }
  set x(n) {
    this.#x = n;
  }
  get y() {
    return this.#y;
  }
  set y(n) {
    this.#y = n;
  }
  get deltaX() {
    return this.#deltaX;
  }
  set deltaX(n) {
    this.#deltaX = n;
  }
  get deltaY() {
    return this.#deltaY;
  }
  set deltaY(n) {
    this.#deltaY = n;
  }

  move(canvas) {
    this.#x += this.#deltaX;
    this.#y += this.#deltaY;
  }

  #createImage(imageSource) {
    const newImg = new Image();
    newImg.src = imageSource;
    return newImg;
  }

  get width() {
    return this.#image.width;
  }
  get height() {
    return this.#image.height;
  }

  max(x,y){
    return (x <y) ? y: x;
  }
  min(x,y){
    return (x <y) ? x: y;
  }
  collisionWith(otherM) {
    const x2 = this.x + this.width;
    const y2 = this.y + this.height;
    const p1x = this.max(this.x, otherM.x);
    const p1y = this.max(this.y, otherM.y);
    const p2x = this.min(x2, otherM.x + otherM.width);
    const p2y = this.min(y2, otherM.y + otherM.height);
    return p1x < p2x && p1y < p2y ? true : false;
  }
}
