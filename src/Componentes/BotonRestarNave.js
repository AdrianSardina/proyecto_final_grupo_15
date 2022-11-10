export class BotonRestartNave {

    constructor(scene) {
        this.relatedScene = scene;
    }
    preload() {
        this.relatedScene.load.spritesheet('buttonN', 'img/Menuboton.png',
            { frameWidth: 528, frameHeight: 162.5 }
        );
    }
    create() {
        this.startButton = this.relatedScene.add.sprite(400, 500, 'buttonN').setInteractive().setScale(.4);
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
       this.startButton.on('pointerout', () => {
           this.startButton.setFrame(0);
       });
        this.startButton.on('pointerdown', () => {
            
            this.relatedScene.scene.start('menuInicio');
        });
    }
}