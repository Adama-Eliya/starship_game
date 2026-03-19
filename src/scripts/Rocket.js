import Mobile from "./Mobile";
import rocketImgSrc from "./assets/images/rocket.png";

export default class Rocket extends Mobile{
    static ROCKET_HEIGHT = 38;
  

    constructor(x,y){
        super(x,y,6,0,rocketImgSrc);
    }
}