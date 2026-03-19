import Mobile from "./Mobile";
import basketImgSrc from "./assets/images/basket.png";

export default class Basket extends Mobile {
  #moving;
  constructor(x, y) {
    super(x, y, 0, 0, basketImgSrc);
  }

  moveLeft() {
    this.deltaX = -10; // le déplacement se fera vers la gauche, par pas de 10px
  }
  moveRight() {
    this.deltaX = +10; // le déplacement se fera vers la droite, par pas de 10px
  }
  stopMoving() {
    this.deltaX = 0;
    this.deltaY = 0;
  }
  moveUp() {
    this.deltaY = -10; // le déplacement se fera vers le haut
  }
  moveDown() {
    this.deltaY = +10; // le déplacement se fera vers le bas
  }

  move(box) {
    // déplace sans sortir des limites de *box*
    this.x = Math.max(
      0,
      Math.min(box.width - this.width, this.x + this.deltaX),
    );
    this.y = Math.max(
      0,
      Math.min(box.height - this.height, this.y + this.deltaY),
    );
  }

  handleMoveKeys(keyManager) {
    this.stopMoving(); // on réinitialise les déplacements
    if (keyManager.left)
      // touche flèche gauche pressée ?
      this.moveLeft();
    if (keyManager.right)
      // touche flèche droite pressée ?
      this.moveRight();
    if (keyManager.up) {
        // touche flèche haut pressée
        this.moveUp();
    }
    if (keyManager.down) {
        // touche flèche bas pressée
        this.moveDown();
    }
  }

}
