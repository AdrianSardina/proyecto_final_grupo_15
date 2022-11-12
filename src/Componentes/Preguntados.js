import preguntas from "../json/preguntas.json"
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Preguntados() {

    const [preguntaActual, setPreguntaActual] = useState(0);
    const [numPregUsada, setNumPregUsada] = useState(0);
    const [puntuacion, setPuntuacion] = useState(0);
    const [capRespCorrecta, setCapRespCorrecta] = useState(preguntas[preguntaActual].correcta);
    const [capResp, setCapRest] = useState('');
    //const [preguntaUsada, setPreguntaUsada] = useState('');
    function Jugar() {
        setPreguntaActual(0);
        //  setNumPregUsada(1);

        // console.log(numPregUsada);
        console.log("la pregunta es:" + preguntas[preguntaActual].pregunta);
        /*  if (!preguntaElegida.includes(preguntaUsada)) {
             let ram = Math.floor(Math.random() * (5 - 0) + 0);
             console.log(ram);
             setPreguntaElegida(preguntas[ram].pregunta);
         } */


        //palabraMostrada.includes("-")

    }


    function Siguiente() {
        //setNumPregUsada(numPregUsada + 1);
        setPreguntaActual(preguntaActual + 1);
        // setCapRespCorrecta(preguntas[preguntaActual].correcta);
        //  console.log("la pregunta es siguiente es :" + preguntas[preguntaActual].pregunta);
    }
    function Verificar() {



        console.log(preguntaActual);
        console.log(capRespCorrecta);
        console.log(capResp);
        if (capRespCorrecta == capResp) {
            console.log("Respuesta Correcta");
        } else console.log("Respuesta Incorrecta");



    }
    useEffect(() => { setCapRespCorrecta(preguntas[preguntaActual].correcta) }), [preguntaActual];
    useEffect(() => { Verificar() }, [capResp]);
    //   useEffect(() => { Verificar() }, [capRespCorrecta]);
    //useEffect(() => {Verificar(preguntaActual)}, [capRespCorrecta]);
    return (

        <>
            <h1>El Juego de Preguntados</h1>
            <span>pregunta {preguntaActual + 1} de {preguntas.length}</span>
            <h2>La siguiente pregunta es: {preguntas[preguntaActual].pregunta}</h2>
            <Button onClick={Jugar} >Jugar</Button>
            <Button onClick={Siguiente} >Siguiente</Button>
            <br></br>
            {preguntas[preguntaActual].opciones.map((valor, i) => (
                //  <Button key={valor.op} onClick={() => Verificar(preguntaActual, valor.op)}> {valor.op} </Button>
                <Button key={i} onClick={() => setCapRest(valor.op)}> {valor.op} </Button>
            ))}

        </>



    );


}