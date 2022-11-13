import { useEffect,useState } from "react";
import Phaser from "phaser";
import React from "react";
import { Preload } from "./Preload";
import { Principal } from "./Principal";
import { MenuInicio } from "../escenas/MenuInicio";
import {GanasteNave} from "./GanasteNave";
import {GameOverNave} from "./GameOverNave";


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
        const Escenas =[Preload,MenuInicio,Principal,GanasteNave,GameOverNave]

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

    
        };

          //arranca el juego
          var game = new Phaser.Game(config);
          
           game.global = {
            nivelactual: 2,
            score : 0,
            sound : false
           }
          //Trigger cuando el juego esta completamente listo
         game.events.on("LISTO",setListo)
    
          //Para que no se duplique el lienzo
          return () =>{
          setListo(false);
          game.destroy(true);
         
        }

    },[listo]);

  
    
}