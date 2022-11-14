import { BotonRestartNave } from "../Componentes/BotonRestarNave";
import Phaser from "phaser";
export class GanasteNave extends Phaser.Scene{
   constructor(){
        super({key:'ganasteNave'});
        this.boton = new BotonRestartNave(this);
    } 
    sonido = null
    preload(){
        this.load.image('ganaste','img/GanasteNave.jpg');
        
        this.boton.preload();
    }
    create(){
        this.sonido =this.sound.add('victoria');
        this.sonido.play()
        this.add.image(400,300,'ganaste').setScale(.785);
        this.boton.create();
    }
}