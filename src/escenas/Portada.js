import { Boton } from "../Componentes/BotonRestart.js";
import Phaser from "phaser";
export class Portada extends Phaser.Scene{
   constructor(){
        super({key:'portada'});
        this.botonP = new Boton (this);
    } 
    mfondo =null
    preload(){
        this.load.audio('fondo','sonidos/portadaArka.mp3');
        this.load.image('port','img/portada.jpg');
        this.botonP.preload();
    }
    create(){
        this.mfondo = this.sound.add('fondo');
        //this.mfondo.play(); No se puede parar el sonido en la otra escena y que sonando junto a la cancion de fondo
        this.add.image(400,300,'port').setScale(.6);
        this.botonP.create(this.mfondo);
    }
}