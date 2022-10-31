import React from 'react';
import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import Escena from './components/Escena';

export default function App() {
    const [listo, setListo] = useState(false);

    useEffect(() => {
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 800 }
                }
            },
            scene: [Escena]
            //scene: {
            //   preload: preload,
            //    create: create
            // }
        };
        //Arranca el juego
        var game = new Phaser.Game(config);
        //triger cuando el juego esta completamente listo   
        game.events.on("LISTO", setListo)
        //si no pongo esto, se acumulan duplicado de lienzo
        return () => {
            setListo(false);
            game.destroy(true);
        }
    }, [listo]);


}

