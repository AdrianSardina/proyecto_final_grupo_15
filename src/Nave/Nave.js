export class Nave {
    constructor(scene) {
    this.relatedScene = scene;
    this.vidas = 3;
    this.velocidad =850;
    this.rapidezDisparo =200;
    this.esInvencible =false;
    this.tiempoInvencibilidad =3000;
    this.tipoDisparo = 1;
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
    disparar(balas,tipo)
        { switch(tipo)
          {
            case 1://Unico Disparo
              var bala =balas.create(this.nave.x,this.nave.y,'bala');
              bala.setVelocityY(-700)
              break;
            case 2://Triple Disparo
           
              var bala =balas.create(this.nave.x,this.nave.y,'bala');
                  bala.setVelocityY(-700)
              var bala =balas.create(this.nave.x,this.nave.y,'bala');
                  bala.setVelocity(700*Math.sin(Math.PI/6),-700)
                  bala.rotation +=Math.sin(Math.PI/6);
              var bala =balas.create(this.nave.x,this.nave.y,'bala');
                  bala.setVelocity(-700*Math.sin(Math.PI/6),-700)
                  bala.rotation +=-Math.sin(Math.PI/6);
              break;
            case 3: //Doble Disparo
              var bala =balas.create(this.nave.x-20,this.nave.y,'bala');
                  bala.setVelocityY(-700)
              var bala =balas.create(this.nave.x+20,this.nave.y,'bala');
                  bala.setVelocityY(-700)
              break;
             
          }
       
           
      
         }
    //Para evitar que pierda muchas vidas en un corto tiempo.
    darInvencibilidad()
    {
      this.nave.setAlpha(0.4); // Esto hace mas transparente al objeto mientra se acerca a 0
      this.esInvencible =true;

      //
      var eventoInvincibilidad =  this.relatedScene.time.addEvent({
        
        delay: this.tiempoInvencibilidad, // es el tiempo que tardara para que se ejecute lo que esta dentro del callback
        callback: () => {
          
         
          this.esInvencible =false;
          this.nave.setAlpha(1);
        },
        loop: false, // indica si el evento se repetira
    })
    }
  }