export class Nave {
    constructor(scene) {
    this.relatedScene = scene;
    this.vidas = 3;
    this.velocidad =850;
    this.rapidezDisparo =200;
    this.esInvencible =false;
    this.tiempoInvencibilidad =3000;
    }
    create() {
    this.nave = this.relatedScene.physics.add.image(385, 750, 'nave').setImmovable(true);
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
    //Para evitar que pierda muchas vidas en un corto tiempo.
    darInvencibilidad()
    {
      this.nave.setAlpha(0.4); // Esto hace mas transparente al objeto mientra se acerca a 0
      this.esInvencible =true;
      var eventoInvincibilidad =  this.relatedScene.time.addEvent({
        
        delay: this.tiempoInvencibilidad,
        callback: () => {
          
         
          this.esInvencible =false;
          this.nave.setAlpha(1);
        },
        loop: false,
    })
    }
  }