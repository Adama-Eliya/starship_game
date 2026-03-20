
// importation de la classe Game.js
import Game from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler Greedy
const init = () => {
   const canvas = document.getElementById("playfield");
   const game = new Game(canvas);
   let isDragging = false;

   document.getElementById("stopAndStartGame").addEventListener("click", () => game.startAndStop())
   canvas.addEventListener("pointerdown",(e) => {isDragging = true});
   canvas.addEventListener("pointerup", (e) => {isDragging = false});
   canvas.addEventListener("pointermove",(e) => {
      if (!isDragging) {
         return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      game.moveBasketTo(x,y);
   })
   window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
   window.addEventListener('keyup', game.keyUpActionHandler.bind(game));
}
window.addEventListener("DOMContentLoaded",init);


//
console.log('le bundle a été généré');
