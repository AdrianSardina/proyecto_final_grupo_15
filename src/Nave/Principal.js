import Phaser, { Scene } from "phaser";
import { Nave } from "./Nave";
import listaNaveEnemigasNivel2 from "../json/listaNavesEnemigasNivel2.json"
import listaNaveEnemigasNivel1 from "../json/listaNaveEnemigasNivel1.json"
import { PowerUps } from "./PowerUps";


export class Principal extends Phaser.Scene  {
    constructor(config){
        super({ key: 'game' });
      this.config = config
      }
      balasPropias = null;
      balasEnemigas = null;
      powerUp = new PowerUps(this);
      listaPowerUps = null;
      vidas =null; 
      nave = new Nave(this);
      flotaEnemiga = null;
      nivelActual = null;
      sonidoDisparo = null;
      sonidoExplosion = null;
      sonidoChoque = null;
      puntaje = null;
      textoPuntaje =null;
      textoVidas =null;
      /* controla cuanto tiempo paso en ms desde que se ejecuto la escena. 
      Sirve para controlar acciones que se ejecuten en intervalos .*/     
      tiempoTranscurrido = null;
      proximodisparo =null;
      

      //--------------------Create---------------------//
      
    create()
    {
      
      this.add.image(400, 300, "background").setScale(2);
      this.nivelActual =1;
      this.agregarSonidos()
      this.agregarGrupos()
      this.nave.create();
      
      //Para controlar cuando uso el teclado
      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.world.setBoundsCollision(true, true, true, true);
      this.timer =0;
      this.proximodisparo =0;
        
      //textos
      this.puntaje = 0;  
      this.textoPuntaje = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#000' });
      this.textoVidas = this.add.text(500, 16, 'Vidas: '+this.nave.vidas, { fontSize: '32px', fill: '#000' });
      
      //Genera la flota enemiga
      this.generarNivelUno(listaNaveEnemigasNivel1,this.flotaEnemiga)
      //Controlo las colisiones
      this.physics.add.collider(this.balasPropias, this.flotaEnemiga,this.eliminarNave,null,this);
      this.physics.add.collider(this.nave.get(), this.flotaEnemiga,this.impactoconNave,null,this);
      this.physics.add.collider(this.nave.get(), this.balasEnemigas,this.impactoconBala,null,this);
      this.physics.add.collider(this.nave.get(), this.listaPowerUps,this.impactoconPower,null,this);
    }
//--------------------Update---------------------//
    update(time,delta)
    {
      console.log(this.flotaEnemiga.countActive());
      this.tiempoTranscurrido +=delta
     
     
      this.nave.moverNave(this.cursors)
      //Para disparar con el boton izquierdo del mouse
      if(this.input.activePointer.leftButtonDown())
      {
        
        // Revisa si paso un tiempo determinado antes de volver generar una nueva bala. Para simular la rapidez de disparo
        if (this.tiempoTranscurrido  > this.proximodisparo)   
        {
          
          // guarda un tiempo mas la rapidez, y solo se ejecutara de nuevo luego un tiempo especifico.
          this.proximodisparo = this.tiempoTranscurrido  + this.nave.rapidezDisparo; 
          this.nave.disparar(this.balasPropias,this.nave.tipoDisparo);
          this.sonidoDisparo.play()
        }
      }
      //Para eliminar las balas que hayan pasado la parte superior
      this.eliminarBalas()
      this.controlarFlota()
      if(this.flotaEnemiga.countActive()==0)
      { 
        this.nivelActual++
        switch(this.nivelActual)
        {
          
          case 2:
            this.generarNivelDos(listaNaveEnemigasNivel2,this.flotaEnemiga);
            break;
          case 3:
            
            this.scene.start('victoria');
            break;

        }
       
      }
    }
//--------------------Funciones---------------------//

    verificarDerrota()
    {
        if(this.nave.vidas ==0){
          this.scene.start('derrota');
        }
    }
    impactoconBala(nave,bala){
    //Reviso en que no sea invencible en el momento de choque.
    if(!this.nave.esInvencible)
    {
      this.nave.vidas -=1;
      this.textoVidas.setText('Vidas: ' + this.nave.vidas);
      this.verificarDerrota();
      this.nave.darInvencibilidad();

    }
    bala.disableBody(true,true)
      
  }
  impactoconNave(naveAmiga,naveEnemiga)
    {
      if(!this.nave.esInvencible)
      {
        this.nave.vidas -=1;
        this.textoVidas.setText('Vidas: ' + this.nave.vidas);
        this.verificarDerrota();
        this.sonidoChoque.play()
        this.nave.darInvencibilidad();    
      } 
        
        //Recibo el evento usado para que esa nave dispare y lo destruyo para que no genere nuevas balas  
        var a=naveEnemiga.getData('evento')
        a.destroy()
        naveEnemiga.disableBody(true,true)
      
    }

    impactoconPower(nave,power)
    {
     this.powerUp.cambiarTipoDisparo(this.nave)
     power.disableBody(true,true);
    }
    
    //Elimina una nave que fue disparada por el jugador
    eliminarNave(bala,nave)
    {   this.game.global.score += 10;
        this.textoPuntaje.setText('Score: ' + this.puntaje);
        if(Phaser.Math.RND.between(0, 99)<=19){
          this.powerUp.create(nave.x,nave.y,this.listaPowerUps)
        }
        
        nave.disableBody(true,true);
        
        var a=nave.getData('evento')
        a.destroy()
        bala.disableBody(true,true);
        this.sonidoExplosion.play();
        
    }
 //Elimina las balas que se pasaron de la parte superior
    eliminarBalas()
    {
     this.balasPropias.children.iterate(function (child) {
        
    if(child.y<0) 
    {
     child.disableBody(true,true);
    }
 
 });
 }
 controlarFlota()
    {

  this.flotaEnemiga.children.iterate(function (child) {
       
    //Revisa que si la nave paso por la parte inferior del lienzo. Si es asi se lo elimina
        if(child.y >800) 
        {
         child.disableBody(true,true);
        }     
     
    });
    
    }

 

 generarNivelDos(lista ,grupo) {
  for (let s of lista) {   
          let nuevaNave = grupo.create(s.x,s.y,'naveEnemiga').setImmovable(true);
          //Se usa para dar el movimiento de seno
          var timeline = this.tweens.timeline({      
            targets: nuevaNave,         
            tweens: [
            {  
                repeat:-1,
                x: s.x +400,           
                ease: 'Sine.easeInOut',
                duration: 700,
                yoyo: true,
                           
            },
            
            
            ],   
        });
         
        //Se declara un evento que dispara una una bala cada intervalo (determinado por "delay")
      var eventoDeDisparo =  this.time.addEvent({
        
          delay: Phaser.Math.Between(800, 1200),
          callback: () => {
            
            //Reviso que la nave se vea en el lienzo
            if(nuevaNave.y >=0)
            {
              //Creo la nueva bala y le asigno una velocidad
              var nuevaBala = this.balasEnemigas.create(nuevaNave.x,nuevaNave.y,'bala')
              nuevaBala.setVelocityY(400);
            }
           
          },
          loop: true,
      })
     
    //aqui guardo el evento con el setData para luego destruilo con su nave sea eliminada
       nuevaNave.setData('evento',eventoDeDisparo)

        nuevaNave.setVelocityY(150);
        nuevaNave.setData('siguienteDisparo',0);
      }
     
  }
  generarNivelUno(lista ,grupo) {
    for (let s of lista) {   
            let nuevaNave = grupo.create(s.x,s.y,'naveEnemiga').setImmovable(true);
            //Se usa para dar el movimiento de seno
            
           
          //Se declara un evento que dispara una una bala cada intervalo (determinado por "delay")
        var eventoDeDisparo =  this.time.addEvent({
          
            delay: Phaser.Math.Between(1200, 1500),
            callback: () => {
              
              //Reviso que la nave se vea en el lienzo
              if(nuevaNave.y >=0)
              {
                //Creo la nueva bala y le asigno una velocidad
                var nuevaBala = this.balasEnemigas.create(nuevaNave.x,nuevaNave.y,'bala')
                nuevaBala.setVelocityY(500);
              }
             
            },
            loop: true,
        })
       
      //aqui guardo el evento con el setData para luego destruilo con su nave sea eliminada
          nuevaNave.setData('evento',eventoDeDisparo)
  
          nuevaNave.setVelocityY(150);
          nuevaNave.setData('siguienteDisparo',0);
        }
       
    }
    agregarSonidos(){
      this.sonidoDisparo = this.sound.add('disparo');
      this.sonidoExplosion = this.sound.add('explosion');
      this.sonidoChoque = this.sound.add('choque');
    }
    agregarGrupos(){
      this.balasPropias = this.physics.add.group();
      this.flotaEnemiga = this.physics.add.group();
      this.balasEnemigas= this.physics.add.group();
      this.listaPowerUps= this.physics.add.group();
    }
}

 
