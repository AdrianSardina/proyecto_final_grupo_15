export class Preload extends Phaser.Scene{
    constructor(config){
        super({ key: 'preload' });
      this.config = config
      }
    preload()
    {
        this.load.audio('disparo','./sonidos/disparo.ogg');
        this.load.audio('derrota','./sonidos/derrota.ogg');
        this.load.audio('victoria','./sonidos/victoria.ogg');
        this.load.audio('explosion','./sonidos/explosion.ogg');
        this.load.audio('choque','./sonidos/choque.ogg');
        this.load.audio('victoria','./sonidos/victoria.ogg');
        this.load.audio('derrota','./sonidos/derrota.ogg');
        this.load.image("background", './img/background.png');
        this.load.image("nave", './img/naveAmiga.png');
        this.load.image("naveEnemiga", './img/naveEnemiga.png');
        this.load.image("bala", './img/bala.png');
        this.load.image("powerUp", './img/powerUp.png');
    }
    create()
    {      
        this.scene.start('menuInicio') 
    }
}