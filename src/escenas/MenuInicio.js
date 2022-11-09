import Phaser from "phaser";
export class MenuInicio extends Phaser.Scene{
   constructor(){
        super({key:'menuInicio'});
    } 
    preload(){
        this.load.image('menu','img/menu.jpg');   
     }
    create(){
        this.add.image(400,300,'menu').setScale(.67);
    }
}