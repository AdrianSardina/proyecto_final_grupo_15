export class Nave {
    constructor(scene) {
    this.relatedScene = scene;
    this.vidas = 3;
    this.velocidad =850;
    this.rapidezDisparo =200;
    }
    create() {
    this.nave = this.relatedScene.physics.add.image(385, 750, 'nave');
    this.nave.setCollideWorldBounds(true);
   
    }
    get(){ 
    return this.nave;
    }
    //Para mover la nave
    moverNave(cursor)
    {
        if (cursor.left.isDown) {
            this.nave.setVelocityX(-this.velocidad);
   
          }
          else if (cursor.right.isDown) {
            this.nave.setVelocityX(this.velocidad);   
          }
          else {this.nave.setVelocityX(0);            
          }
    }
    disparar(balas)
        {
      var bala =balas.create(this.nave.x,this.nave.y,'bala');
           bala.setVelocityY(-700)
         }
    
       
  }