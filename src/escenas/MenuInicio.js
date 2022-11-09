import Phaser from "phaser";
import { BotonNivel1 } from "../Componentes/BotonNivel1";
import { BotonNivel2 } from "../Componentes/BotonNivel2";
export class MenuInicio extends Phaser.Scene{
   constructor(){
        super({key:'menuInicio'});
        this.boton1 = new BotonNivel1 (this);
        this.boton2 = new BotonNivel2 (this);
    } 
    preload(){
        this.load.image('menu','img/menu.png');   
        this.boton1.preload();
        this.boton2.preload();
     }
    create(){
        this.add.image(400,300,'menu').setScale(.668);
        this.boton1.create();
        this.boton2.create();
    }
}