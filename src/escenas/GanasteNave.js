import { BotonRestartNave } from "../Componentes/BotonRestarNave";
import Phaser from "phaser";
export class GanasteNave extends Phaser.Scene{
   constructor(){
        super({key:'ganasteNave'});
        this.boton = new BotonRestartNave(this);
    } 
    preload(){
        this.load.image('ganaste','img/GanasteNave.jpg');
        this.boton.preload();
    }
    create(){
        this.add.image(400,300,'ganaste').setScale(.785);
        this.boton.create();
    }
}