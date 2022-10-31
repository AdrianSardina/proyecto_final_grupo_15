import React, { useState } from "react";
import { Row ,Col, Button, Container} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

export default function PiedraPapelTijeras()
{
    const imagenes = ["../img/piedra.png","../img/papel.png","../img/tijera.png","../img/pregunta.png"]
   
    //Acumuladores de puntos
    const [puntos1,setPuntos1] = useState (0); 
    const [puntos2,setPuntos2] = useState (0);
    // para mostrar el valor al azar y mostrar la imagen
    const [opcion1,setOpcion1] = useState (3); 
    const [opcion2,setOpcion2] = useState (3); 
    const jugarRonda = () =>{
       
        let n1;
        let n2;
       n1 =Math.floor(Math.random()*3)
       n2 =Math.floor(Math.random()*3)
       setOpcion1(n1);
       setOpcion2(n2);
    //    Piedra 0 - Papel 1 - Tijera 2
    if(n1 == n2)
    {
        setResultado("Empate")
    }else if((n1 == 0 && n2 == 2) || (n1 == 1 && n2 ==0)||(n1 == 2 && n2 ==1))
        {
            setPuntos1(puntos1+1);
            setResultado("Jugador 1 gano");
        }else{
            setPuntos2(puntos2 +1);
            setResultado("Jugador 2 gano");
        } 
    }

    const [resultado,setResultado] = useState ("Comenzar a jugar");
    return(
        <>
        <br></br>
        <Row className="justify-content-xl-center" style={{ backgroundColor:"#C9F7F7" }} >
            <Col xs={4}>
            <Card border='dark' style={{ width: '60%' }}>
            <Card.Header><h2>Jugador 1</h2></Card.Header>
            <Card.Img variant="top" src={imagenes[opcion1]} />
            <Card.Body>
            <h1 > Puntos:  {puntos1}</h1>
            </Card.Body>
             </Card>
            </Col>
            <br></br>
            <Col  className="justify-content-xl-center" md={{ span: 3}}> <h3 style={{border:"solid"}}> {resultado}  </h3>  </Col>
            <Col  xs={4} >
            
            <Card border='dark' style={{ width: '60%' }}>
            <Card.Header><h2>Jugador 2</h2></Card.Header>
            <Card.Img variant="top" src={imagenes[opcion2]} />
            <Card.Body>
            <h1> Puntos:  {puntos2}</h1>
            </Card.Body>
            </Card>
        </Col>
        
        </Row>
        <br></br>
        <Row className="justify-content-xl-center"style={{ backgroundColor:"#C9F2F2" }}  >
           
        <Col md={{ span: 1, offset: 4 }}> <Button variant="success" size="lg" onClick={jugarRonda}>Jugar</Button>      </Col>    
         <Col> <Link to="/">  <Button variant="danger"   size="lg" >Volver a inicio</Button> </Link>   </Col> 
        
        </Row>
        
        </>
    )
}