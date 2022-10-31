export class Boton {

    constructor(scene) {
        this.relatedScene = scene;
    }
    preload() {
        this.relatedScene.load.spritesheet('button', 'img/restart.png',
            { frameWidth: 376, frameHeight: 163.5 }
        );
    }
    create() {
        this.startButton = this.relatedScene.add.sprite(400, 500, 'button').setInteractive().setScale(.4);
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
       this.startButton.on('pointerout', () => {
           this.startButton.setFrame(0);
       });
        this.startButton.on('pointerdown', () => {
            
            this.relatedScene.scene.start('game');
        });
    }
}