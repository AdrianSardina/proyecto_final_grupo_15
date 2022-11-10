import { useEffect,useState } from "react";
import Phaser from "phaser";
import React from "react";
import { Preload } from "./Preload";
import { Principal } from "./Principal";
import { Victoria} from "./Victoria.js";
import { Derrota } from "./Derrota";


export default function JuegoNave() {


    const [listo,setListo] = useState(false);
    useEffect (() =>{   
        var Configuracion =
        {
            scale:{
              //  autoCenter :Phaser.Scale.CENTER_HORIZONTALLY,
                width: 1000,
                height: 800, 
            },
            nivelactual:1,
        } 
        const Escenas =[Preload,Principal,Derrota,Victoria]
        const crearEscenas = Scene => new Scene(Configuracion)
        const iniciarEscena = () => Escenas.map(crearEscenas)
        var config = {
        type: Phaser.AUTO,
        ...Configuracion,
        physics: {
            default: 'arcade',
            arcade: {
           //    gravity: { y: 300 }
            }
        },


        scene:iniciarEscena()

        // scene: {
        //     preload: preload,
        //     create: create
        // }
        };

          //arranca el juego
          var game = new Phaser.Game(config);
          //Trigger cuando el juego esta completamente listo
         game.events.on("LISTO",setListo)
    
          //Para que no se duplique el lienzo
          return () =>{
          setListo(false);
          game.destroy(true);
         
        }

    },[listo]);

  
    
}