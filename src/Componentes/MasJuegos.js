import React from "react";
import Button from 'react-bootstrap/Button';


export default function Masjuegos () {
   // render() {
        return (
            <>
            <div className="masJuegos">
            <h1 className= "textomasjuegos">Te traemos algunos de nuestros mejores juegos, Seguimos trabajando para traerte más</h1>
            
            <div className="b1">
            <Button href="/piedrapapeltijeras" variant="outline-light" size="lg">Piedra, Papel o Tijeras</Button>
            </div>
            <div className="b1">
            <Button href="/ahorcadito" variant="outline-light " size="lg">Ahorcadito</Button>
            </div>
            <div className="b1">
            <Button href="/arkanoid" variant="outline-light " size="lg">Arkanoid</Button>
            </div>
            <div className="b1">
            <Button href="/nave" variant="outline-light " size="lg">War Machine</Button>
            </div>
            <div className="b1">
            <Button href="/dude" variant="outline-light " size="lg">Dude</Button>
            </div>
            <div className="b1">
            <Button href="/preguntados" variant="outline-light " size="lg">Preguntados</Button>
            </div>
            </div>
            </>
        );
    }
//}
