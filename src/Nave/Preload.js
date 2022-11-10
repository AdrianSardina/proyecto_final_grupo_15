export class Preload extends Phaser.Scene{
    preload()
    {
        this.load.image("background", './img/background.png');
        this.load.image("nave", './img/naveAmiga.png');
        this.load.image("naveEnemiga", './img/naveEnemiga.png');
        this.load.image("bala", './img/bala.png');
    }
    create()
    {
        this.scene.start('game') 
    }
}