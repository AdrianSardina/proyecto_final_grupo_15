import Phaser, { Scene } from "phaser";
import {Levels} from "../Componentes/Levels";
class Escena extends Phaser.Scene {
  constructor(){
    super({ key: 'game' });
  }
  
  score=null;  
  platform = null;
  Bricks = null;
  levels = null;
  currentLevel = null;
  mfondo1 = null;
  brickImpactSample = null;
  derrotaSample = null;
  victoriaSample = null;
    resetBallposition()
    {
        this.ball.setData('glue', true);
        this.ball.x = this.platform.x;
        this.ball.y=540;
        this.ball.setVelocityY(0);
    }
    brickImpact(player,brick)
    {
      this.brickImpactSample.play();
    brick.disableBody(true,true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    }
    preload() {
      
        this.load.audio('mfondo1','./sonidos/mfondo 1 .mp3');
        this.load.audio('brickImpact','./sonidos/romper.mp3');
        this.load.audio('derrota','./sonidos/derrota.mp3');
        this.load.audio('victoria','./sonidos/victoria.mp3');
        this.load.image("background", './img/background 1.jpg');
        this.load.image('platform', './img/platform.png');
        this.load.image("gameover", "img/gameover.png");
        this.load.image('ball', 'img/ball.png');
        this.load.image('greenBrick','../img/Recurso 4.png')
        this.load.image('orangeBrick','../img/Recurso 2.png')
        this.load.image('blueBrick','../img/Recurso 3.png')
        this.load.image('yellowBrick','../img/Recurso 10.png')
        this.load.image('pinkBrick','../img/Recurso 8.png')

    }

    create() {
      
        this.levels = new Levels(this);
        this.mfondo1 = this.sound.add('mfondo1');
        this.brickImpactSample = this.sound.add('brickImpact');
        this.derrotaSample = this.sound.add('derrota');
        this.victoriaSample = this.sound.add('victoria');
        
        this.mfondo1.play();
        this.currentLevel =1;
        this.score=0;
        this.add.image(400, 300, "background").setScale(2);
        this.gameoverImage = this.add.image(400, 90, "gameover");
        this.gameoverImage.visible = false;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.platform = this.physics.add.image(400, 560, 'platform').setImmovable();;
        this.platform.body.allowGravity = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.platform.setCollideWorldBounds(true);


        //this.ball = this.physics.add.image(400, 30, 'ball');
        this.ball = this.physics.add.image(400, 540, 'ball');
        this.ball.setData('glue', true);

        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        //this.ball.setVelocity(100, 10)

        this.Bricks= this.levels.CreateLevelOne();    
        this.physics.add.collider(this.ball, this.Bricks, this.brickImpact, null, this);

        this.physics.world.setBoundsCollision(true, true, true, false);
        // this.physics.add.collider(this.ball, this.platform);
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);


    }
    update() {
        if (this.cursors.left.isDown) {
          this.platform.setVelocityX(-500);
          if(this.ball.getData('glue')) {
            this.ball.setVelocityX(-500);
          }
        }
        else if (this.cursors.right.isDown) {
          this.platform.setVelocityX(500);
          if (this.ball.getData('glue')) {
            this.ball.setVelocityX(500);
          }
        }
        else {
          this.platform.setVelocityX(0);
          if (this.ball.getData('glue')) {
            this.ball.setVelocityX(0);
          }
        }
        if (this.ball.y > 600) {
          console.log('fin');
          this.gameoverImage.visible = true;
          this.scene.pause();
          this.mfondo1.stop()
          this.derrotaSample.play();
          this.scene.start('gameOver');
        }
        if (this.cursors.space.isDown) {
          if (this.ball.getData('glue')) {

            this.ball.setVelocity(-75, -300);
            this.ball.setData('glue', false);
          }
        }
        if(this.Bricks.countActive() == 0)
        {
          this.currentLevel++;
          switch (this.currentLevel) {
            case 2: //termino el nivel uno
              this.Bricks = this.levels.CreateLevelTwo();
              this.physics.add.collider(this.ball, this.Bricks,this.brickImpact,null,this);
              this.resetBallposition();
              break;
            case 3: // termino el nivel dos
            this.mfondo1.stop()
            this.victoriaSample.play();
              this.scene.start('congratulations')
              break;
            
          }
            
        }  
      }
    

    platformImpact(ball, platform) {
        let relativeImpact = ball.x - platform.x;

        if (relativeImpact > 0) {
            console.log('derecha!');
            ball.setVelocityX(10 * relativeImpact);
        } else if (relativeImpact < 0) {
            console.log('izquierda!');
            ball.setVelocityX(10 * relativeImpact);
        } else {
            console.log('centro!!');
            ball.setVelocityX(Phaser.Math.Between(-10, 10))
        }
    }


}



export default Escena;