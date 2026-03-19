import Mobile from "./Mobile";
import blueEggSrc from "./assets/images/blue-egg.png";
import greenEggSrc from "./assets/images/green-egg.png";
import yellowEggSrc from "./assets/images/yellow-egg.png";


export default class Egg extends Mobile{

    static LIST_IMG_SRC = [blueEggSrc,greenEggSrc,yellowEggSrc];
    static EGG_WIDTH = 64;

    constructor(x,y){
        super(x,y,0,4,Egg.LIST_IMG_SRC[Math.floor(Math.random()*Egg.LIST_IMG_SRC.length)]);
    }
}