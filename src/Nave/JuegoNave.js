import { useEffect,useState } from "react";
import Phaser from "phaser";
import React from "react";
import { Preload } from "./Preload";
import { Principal } from "./Principal";



export default function JuegoNave() {


    const [listo,setListo] = useState(false);
    useEffect (() =>{    
        var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 700,
        physics: {
            default: 'arcade',
            arcade: {
           //    gravity: { y: 300 }
            }
        },


        scene:[Principal]


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