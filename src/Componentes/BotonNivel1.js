export class BotonNivel1 {

    constructor(scene) {
        this.relatedScene = scene;
    }
    preload() {
        this.relatedScene.load.spritesheet('button1', 'img/BotonNivel1.png',
            { frameWidth: 298.5, frameHeight: 202 }
        );
    }
    create() {
        this.startButton = this.relatedScene.add.sprite(300, 500, 'button1').setInteractive().setScale(.5);
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
       this.startButton.on('pointerout', () => {
           this.startButton.setFrame(0);
       });
        this.startButton.on('pointerdown', () => {
           this.relatedScene.game.global.nivelactual =1
            this.relatedScene.scene.start('gameNave');
        });
    }
}