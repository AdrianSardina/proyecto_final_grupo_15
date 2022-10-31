import { Boton } from "../Componentes/BotonRestart.js";
import Phaser from "phaser";
export class Gameover extends Phaser.Scene{
   constructor(){
        super({key:'gameOver'});
        this.boton = new Boton(this);
    } 
    preload(){
        this.load.image('perdiste','img/perdiste.png');
        this.boton.preload();
    }
    create(){
        this.add.image(400,300,'perdiste');
        this.boton.create();
    }
}
