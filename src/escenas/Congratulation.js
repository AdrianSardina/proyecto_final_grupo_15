import { Boton } from "../Componentes/BotonRestart";

export class Congratulations extends Phaser.Scene {

 constructor() {

   super({ key: 'congratulations' });
 this.restartButton = new Boton(this);
 }

 preload() {
   this.load.image("background", './img/background.png');
 this.restartButton.preload();
 }
 
 create() {
    this.add.image(400, 300, "background").setScale(2);
    this.scoreText = this.add.text(299, 188, 'Ganaste', { fontSize: '32px', fill: '#000' });
    this.restartButton.create();

 }
}