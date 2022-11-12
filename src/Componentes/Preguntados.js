import preguntas from "../json/preguntas.json"
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Preguntados() {

    const [preguntaActual, setPreguntaActual] = useState(0);
    const [numPregUsada, setNumPregUsada] = useState(0);
    const [puntuacion, setPuntuacion] = useState(0);
    const [capRespCorrecta, setCapRespCorrecta] = useState(preguntas[preguntaActual].correcta);
    const [capResp, setCapRest] = useState('');
    const [juegoHabilitado, SetJuegoHabilitado] = useState(true);
    const [resultado, setResultado] = useState("");
    const [bandera, SetBandera] = useState(true);
    //const [preguntaUsada, setPreguntaUsada] = useState('');
    function Reiniciar() {
        setPreguntaActual(0);
        setPuntuacion(0);
        console.log("la pregunta es:" + preguntas[preguntaActual].pregunta);
        SetJuegoHabilitado(true);
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
        SetJuegoHabilitado(true);
        // setCapRespCorrecta(preguntas[preguntaActual].correcta);
        //  console.log("la pregunta es siguiente es :" + preguntas[preguntaActual].pregunta);
    }
    function Verificar() {
        console.log(preguntaActual);
        console.log(capRespCorrecta);
        console.log(capResp);
        if (bandera) {
            SetBandera(false);
        }else{
            if (capRespCorrecta == capResp) {
                console.log("Respuesta Correcta");
                setPuntuacion(puntuacion + 10);
                setResultado("Respuesta Correcta");
                SetJuegoHabilitado(false);
                setTimeout(()=> {setResultado("")},2000);
                setTimeout(()=>{setPreguntaActual(preguntaActual+1)},2000);


    
            } else {
                setResultado("Respuesta Incorrecta");
                console.log("Respuesta Incorrecta");
                SetJuegoHabilitado(false);
                setTimeout(()=> {setResultado("")},2000);
                setTimeout(()=>{setPreguntaActual(preguntaActual+1)},2000);

            }
        }
       


    }
    useEffect(() => { setCapRespCorrecta(preguntas[preguntaActual].correcta) }), [preguntaActual];
    useEffect(() => { Verificar() }, [capResp]);
    useEffect(()=>{SetJuegoHabilitado(true)},[resultado]);
    //   useEffect(() => { Verificar() }, [capRespCorrecta]);
    //useEffect(() => {Verificar(preguntaActual)}, [capRespCorrecta]);
    return (

        <>
            <h1>El Juego de Preguntados</h1>
            <span>pregunta {preguntaActual + 1} de {preguntas.length}</span>
            <h3>su puntaje es:{puntuacion}</h3>
            <h3>{resultado}</h3>
            <h2>La siguiente pregunta es: {preguntas[preguntaActual].pregunta}</h2>
            <Button onClick={Reiniciar} >Reiniciar</Button>
            <Button onClick={Siguiente} >Siguiente</Button>
            <br></br>
            {preguntas[preguntaActual].opciones.map((valor, i) => (
                //  <Button key={valor.op} onClick={() => Verificar(preguntaActual, valor.op)}> {valor.op} </Button>
                <Button key={i} onClick={() => setCapRest(valor.op)} disabled={!juegoHabilitado}> {valor.op} </Button>
            ))}

        </>



    );


}