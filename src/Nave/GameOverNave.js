import { BotonRestartNave } from "../Componentes/BotonRestarNave";
import Phaser from "phaser";
export class GameOverNave extends Phaser.Scene{
   constructor(){
        super({key:'gameOverNave'});
        this.boton = new BotonRestartNave(this);
    } 
    sonido = null
    preload(){
        this.load.image('derrota','img/GameOverNave.jpg');
        this.boton.preload();
    }
    create(){
        this.sonido =this.sound.add('derrota');
        this.sonido.play()
        this.add.image(400,300,'derrota').setScale(.964);
        this.boton.create();
    }
}