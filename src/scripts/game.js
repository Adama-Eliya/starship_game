import Basket from "./Basket";
import Egg from "./Egg";
import KeyManager from "./keyManager";
import Rocket from "./Rocket";
import collectSoundSrc from "./assets/sounds/collect.mp3";
import hitSoundSrc from "./assets/sounds/hit.mp3";
import gameOverSoundSrc from "./assets/sounds/gameover.mp3";

export default class Game {
   static POINT_COLL_OEUF_PANIER = 100;
   static POINT_COLL_ROCKET_PANIER = 500;
   static PROBA_OEUF = 0.75;
   static PROBA_ROCKET = 0.5;

  #canvas;
  #context;
  #listEgg;
  #listRocket;
  #score;
  #basket;


  constructor(canvas) {
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d");
    this.#listEgg = [];
    this.#listRocket = [];
    this.#score = document.getElementById("score");
    this.#basket = new Basket(canvas.width / 2, canvas.height / 2);
    this.requete = null;
    this.keyManager = new KeyManager();
    this.timer = null;
    this.life = 3;
    this.collectSound = new Audio(collectSoundSrc);
    this.hitSound = new Audio(hitSoundSrc);
    this.gameOverSound = new Audio(gameOverSoundSrc);
    this.collectSound.volume = 0.3;
    this.hitSound.volume = 0.5;
    this.gameOverSound.volume = 0.7;
  }

  /** donne accès au canvas correspondant à la zone de jeu */

  get canvas() {
    return this.#canvas;
  }

  animate() {

    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    if (this.#basket) {
      this.#basket.handleMoveKeys(this.keyManager);
      this.#basket.move(this.canvas);
      this.#basket.draw(this.#context);
   }
   
    this.#listEgg.forEach((egg) => egg.move(this.#canvas));
    this.#listEgg = this.#listEgg.filter(
      (egg) => {
         if (this.#basket && egg.collisionWith(this.#basket)) {
            this.collectSound.currentTime = 0;
            this.collectSound.play();
            this.#score.textContent = parseInt(this.#score.textContent) + Game.POINT_COLL_OEUF_PANIER + "";
         }
         return egg.y < this.#canvas.height - egg.height && this.#basket && !egg.collisionWith(this.#basket);
      } );
   /** filtre des collision avec fusée */
   this.#listRocket.forEach(rocket => {
      this.#listEgg = this.#listEgg.filter(egg => { 
        if (rocket.collisionWith(egg)){
          this.hitSound.currentTime = 0;
          this.hitSound.play();
          return false;
        }
        return true;
      });
   })

    this.#listRocket.forEach((rocket) => rocket.move(this.#canvas));
    this.#listRocket = this.#listRocket.filter(
      (rocket) => {
         
         if (this.#basket && rocket.collisionWith(this.#basket) ) {
            this.hitSound.currentTime = 0;
            this.hitSound.play();
            document.getElementById(`life-${this.life}`).style.display = "none";
            this.life -= 1;
            this.#score.textContent = parseInt(this.#score.textContent) - Game.POINT_COLL_ROCKET_PANIER  + "";
            if (this.life <= 0) {
              this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
               this.gameOver();
               
            }
         }
         
         return rocket.x < this.canvas.width - rocket.width && this.#basket && !rocket.collisionWith(this.#basket);
      });

    this.#listEgg.forEach((egg) => egg.draw(this.#context));
    this.#listRocket.forEach((rocket) => rocket.draw(this.#context));

    this.requete = window.requestAnimationFrame(() => this.animate());
  }
  alea(n) {
    return Math.floor(Math.random() * n);
  }
  addEgg() {
    const prop = Math.random();
    if (prop < Game.PROBA_OEUF) {
      const width = this.#canvas.width - Egg.EGG_WIDTH;
      const x = this.alea(width);
      const y = 0;
      this.#listEgg.push(new Egg(x, y));
    }
  }

  addRocket() {
    const prop = Math.random();
    if (prop < Game.PROBA_ROCKET) {
      const height = this.#canvas.height - Rocket.ROCKET_HEIGHT;
      const x = 0;
      const y = this.alea(height);
      this.#listRocket.push(new Rocket(x, y));
    }
  }

  startAndStop() {
    if (this.requete != null) {
      window.cancelAnimationFrame(this.requete);
      this.requete = null;
      clearInterval(this.timer);
      this.timer = null;
    } else {
      this.requete = window.requestAnimationFrame(() => this.animate());
      this.timer = setInterval(() => {
        this.addEgg();
        this.addRocket();
      }, 1000);
    }
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "Left":
        this.keyManager.leftPressed();
        break;
      case "ArrowRight":
      case "Right":
        this.keyManager.rightPressed();
        break;
      case "ArrowUp":
      case "Up":
        this.keyManager.upPressed();
        break;
      case "ArrowDown":
      case "Down":
        this.keyManager.downPressed();
        break;

      default:
        return;
    }
    event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "Left":
        this.keyManager.leftReleased();
        break;
      case "ArrowRight":
      case "Right":
        this.keyManager.rightReleased();
        break;
      case "ArrowUp":
      case "Up":
        this.keyManager.upReleased();
        break;
      case "ArrowDown":
      case "Down":
        this.keyManager.downReleased();
        break;

      default:
        return;
    }
    event.preventDefault();
  }
gameOver() {
  this.gameOverSound.play();
  this.#listEgg = [];
  this.#listRocket = [];
  this.#basket = null;

  cancelAnimationFrame(this.requete);
  clearInterval(this.timer);
  this.requete = null;
  this.timer = null;
  this.#score.textContent = "0";

  setTimeout(() =>{
    alert("perdu")
  },50);
}
moveBasketTo(x,y){
  if (!this.#basket) {
    return;
  }
  this.#basket.x = x - this.#basket.width / 2;
  this.#basket.y = y - this.#basket.height / 2;
}
}
