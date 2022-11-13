export class BotonNivel2 {

    constructor(scene) {
        this.relatedScene = scene;
    }
    preload() {
        this.relatedScene.load.spritesheet('button2', 'img/BotonNivel2.png',
            { frameWidth: 297.5, frameHeight: 172 }
        );
    }
    create() {
        this.startButton = this.relatedScene.add.sprite(510, 493, 'button2').setInteractive().setScale(.51);
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
       this.startButton.on('pointerout', () => {
           this.startButton.setFrame(0);
       });
        this.startButton.on('pointerdown', () => { 
            global.nivelActual =2
            this.relatedScene.scene.start('preload');

        });
    }
}