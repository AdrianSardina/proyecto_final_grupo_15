import Phaser, { Scene } from "phaser";
import { Nave } from "./Nave";
import listaNaveEnemigas from "../json/listaNavesEnemigas.json"
export class Principal extends Phaser.Scene {
    constructor(){
        super({ key: 'game' });
      }
      balasPropias = null;
      balasEnemigas = null;
      score =null;
      vidas =null; 
      nave = new Nave(this);
      flotaEnemiga = null;
       
      /* controla cuanto tiempo paso en ms desde que se ejecuto la escena. 
      Sirve para controlar acciones que se ejecuten en intervalos .*/     
      tiempoTranscurrido = null;
      proximodisparo =null;
      
      preload()
    {
      this.load.image("background", './img/background.png');
      this.load.image("nave", './img/naveAmiga.png');
      this.load.image("bala", './img/bala.png');
    }
    create()
    {
      
      this.add.image(400, 300, "background").setScale(2);
     
      this.balasPropias = this.physics.add.group();
      this.flotaEnemiga = this.physics.add.group();
      this.balasEnemigas= this.physics.add.group();
      this.nave.create();
      
      //Para controlar cuando uso el teclado
      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.world.setBoundsCollision(true, true, true, true);
      this.timer =0;
      this.proximodisparo =0;
     
      
      //Genera la flota enemiga
      this.generar(listaNaveEnemigas,this.flotaEnemiga)
      this.physics.add.collider(this.balasPropias, this.flotaEnemiga,this.eliminarNave,null,this);
      this.physics.add.collider(this.nave, this.flotaEnemiga,this.eliminarNave,null,this);
    }
    update(time,delta)
    {
      this.tiempoTranscurrido +=delta
      
      
      this.nave.moverNave(this.cursors)
      //Para disparar con el boton izquierdo del mouse
      if(this.input.activePointer.leftButtonDown())
      {
        
        // Revisa si paso un tiempo determinado antes de volver generar una nueva bala. Para simular la rapidez de disparo
        if (this.tiempoTranscurrido  > this.proximodisparo)   
        {
          
          // guarda un tiempo mas la rapidez, y solo se ejecutara de nuevo luego un tiempo especifico.
          this.proximodisparo = this.tiempoTranscurrido  + 100; 
          this.nave.disparar(this.balasPropias);
        }
      }
      //Para eliminar las balas que hayan pasado la parte superior
      this.eliminarBalas()
      this.controlarFlota(this.tiempoTranscurrido,this.balasEnemigas)
    }

    eliminarNave(bala,nave)
    {
        nave.disableBody(true,true);
        bala.disableBody(true,true);
    }
 eliminarBalas()
 {
  this.balasPropias.children.iterate(function (child) {
        
    if(child.y<0) 
    {
     child.disableBody(true,true);
    }
 
 });
 }
 controlarFlota(tiempoTranscurrido, grupoBalas)
 {
  
  this.flotaEnemiga.children.iterate(function (child) {
       
    //Revisa que si la nave paso por la parte inferior del lienzo. Si asi se lo elimina
        if(child.y >800) 
        {
         child.disableBody(true,true);
        }
         //Revisa si la nave paso la parte superior del lienzo y que haya pasado un tiempo desde que disparó
        // else if(child.y>0 && child.getData('siguienteDisparo') < tiempoTranscurrido)
          // {
          // var nuevaBala = grupoBalas.create(child.x,child.y,'bala')
          // nuevaBala.setVelocityY(600);
          // child.setData('siguienteDisparo',tiempoTranscurrido + Phaser.Math.Between(1500, 2000))
          // }
    
    
 });
  }

 

 generar(lista ,grupo) {
  for (let s of lista) {   
          let nuevaNave = grupo.create(s.x,s.y,'nave').setImmovable(true);
          var timeline = this.tweens.timeline({      
            targets: nuevaNave,         
            tweens: [
            {  
                repeat:-1,
                x: s.x +400,           
                ease: 'Sine.easeInOut',
                duration: 800,
                yoyo: true,
                           
            },
            
            
            ],   
        });
        nuevaNave.setVelocityY(100);
        nuevaNave.setData('siguienteDisparo',0);
      }
     
  }

}

 
