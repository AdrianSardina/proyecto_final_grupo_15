import React from "react";
import Button from 'react-bootstrap/Button';

class Boton extends React.Component {
    render() {
        return (
            <div className= "botones">
        <Button href="/" variant="danger">Inicio</Button>
        <Button href="/piedrapapeltijeras" variant="danger"> PiedraPapelTijeras</Button>
        <Button href="/ahorcadito" variant="danger"> Ahorcadito</Button>
        <Button href="/arkanoid" variant="danger">Arkanoid</Button>
        <Button href="/nosotros" variant="danger">Nosotros</Button>
        <Button href="/masjuegos" variant="danger">Mas Juegos</Button>
        
        </div>
        );
    }
}
export default Boton;