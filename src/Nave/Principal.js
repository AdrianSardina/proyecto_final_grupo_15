import Phaser, { Scene } from "phaser";
import { Nave } from "./Nave";
import listaNaveEnemigas from "../json/listaNavesEnemigas.json"
export class Principal extends Phaser.Scene  {
    constructor(){
        super({ key: 'game' });
      }
      balasPropias = null;
      balasEnemigas = null;
      
      vidas =null; 
      nave = new Nave(this);
      flotaEnemiga = null;
      puntaje = null;
      textoPuntaje =null;
      textoVidas =null;
      /* controla cuanto tiempo paso en ms desde que se ejecuto la escena. 
      Sirve para controlar acciones que se ejecuten en intervalos .*/     
      tiempoTranscurrido = null;
      proximodisparo =null;
      
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
        const pepe =0
      //textos
      this.puntaje = 0;
      
      this.textoPuntaje = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#000' });
      this.textoVidas = this.add.text(500, 16, 'Vidas: '+this.nave.vidas, { fontSize: '32px', fill: '#000' });
      
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
          this.proximodisparo = this.tiempoTranscurrido  + this.nave.rapidezDisparo; 
          this.nave.disparar(this.balasPropias);
        }
      }
      //Para eliminar las balas que hayan pasado la parte superior
      this.eliminarBalas()
      this.controlarFlota(this.tiempoTranscurrido,this.balasEnemigas)
    }


    eliminarNave(bala,nave)
    {   this.puntaje += 10;
        this.textoPuntaje.setText('Score: ' + this.puntaje);
        nave.disableBody(true,true);
        var a=nave.getData('evento')
        a.destroy()
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
          //Se usa para dar el movimiento de seno
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
        
        //Se declara un evento que dispara una una bala cada intervalo (determinado por "delay")
      var eventoDeDisparo =  this.time.addEvent({
          delay: Phaser.Math.Between(1000, 1500),
          callback: () => {
            
            if(nuevaNave.y >=0)
            {
              //Creo la nueva bala y le asigno una velocidad
              var nuevaBala = this.balasEnemigas.create(nuevaNave.x,nuevaNave.y,'bala')
              nuevaBala.setVelocityY(600);
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

}

 
