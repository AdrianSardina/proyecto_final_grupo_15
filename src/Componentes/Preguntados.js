import preguntas from "../json/preguntas.json"
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Preguntados() {

    const [preguntaActual, setPreguntaActual] = useState(0);//guarda la posicion de la pregunta dentor del array
    const [mostrarPreg, setMostrarPreg] = useState(preguntas[preguntaActual].pregunta);//guarda la pregunta que se muestra
    const [respCorrectamente, setRespCorrectamente] = useState(0);//cantidad de respuesta respondidas correctamente
    const [capRespCorrecta, setCapRespCorrecta] = useState(preguntas[preguntaActual].correcta);//guarda la respuesta correcta de la pregunta actual 
    const [capResp, setCapRest] = useState("");//guarda la respuesta que elijio el usuario
    const [juegoHabilitado, SetJuegoHabilitado] = useState(false);//sirve para deshabilitar los botones con las respuestas
    const [botSiguiente, setBotSiguiente] = useState(false);//hablita/desabilita el boton siguiente
    const [botJugar, setBotJugar] = useState(true);//hablita/desabilita el boton jugar
    const [botJugarMen, setBotJugarMen] = useState("Jugar");//guarda el texto del boton, cambia entre JUGAR y REINICIAR
    const [resultado, setResultado] = useState("");//guarda el mensaje que muestra al ver si esta bien o mal la respuesta
    const [bandera, SetBandera] = useState(true);//se utiliza solo al inicio para comprobar que no haga una compapracion
    const [tiempoRestante, setTiempoRestante] = useState(0);// guarda el tiempo
    const[finJuego,setFinJuego]=useState(true);
    // funcion que setea todo los estados para jugar desde el comienzo
    function Jugar() {
        setPreguntaActual(1);
        setRespCorrectamente(0);
        SetJuegoHabilitado(true);
        setBotJugar(false);
        setBotJugarMen("Reiniciar");
        setTiempoRestante(5);
        setResultado(" ");
        setFinJuego(true);
    }

//funcion que sirve para pasar de preguntas
    function Siguiente() {
        setResultado("");
        if (preguntaActual < preguntas.length - 1) {  //se compara si aun hay preguntas por delante
            setPreguntaActual(preguntaActual + 1); 
            SetJuegoHabilitado(true);
            setBotSiguiente(false);
            setMostrarPreg(preguntas[preguntaActual].pregunta);
            setTiempoRestante(5);
        } 

    }
//funcion verificar, compara la respues correcta con la respuesta que selecciono el jugador
    function Verificar() {
        if (bandera) { //if que consulta la bandera para que cuando se inicie el juego no haga ninguna comparacion hasta que se seleccione la respuessta 
            SetBandera(false);//se cambia el valor
        } else {
            if (capRespCorrecta == capResp) {//compara si se respondio correctamente
                setRespCorrectamente(respCorrectamente + 1);
                setResultado("Respuesta Correcta");//se setee el msj de respuesta correcta
            } else {
                setResultado("Respuesta Incorrecta");//se setee el msj de respuesta Incorrecta
            }
            SetJuegoHabilitado(false);//se deshabilita los botones de las respuesta
            setBotSiguiente(true);//se habilita el boton de siguiente para poder seguir
            setTiempoRestante("");//el tiempo reinicia
            if(preguntaActual +1 == preguntas.length){setFinJuego(false);}
        }
    } 
    /*funcion que verifica que se haya acabado el juego */
    function MostrarReiniciar(){
        if (!finJuego) {
            setBotSiguiente(false);
            setBotJugar(true);
            setTimeout(() => { setTiempoRestante("") }, 999);
            setTimeout(() => { setResultado("") }, 1000);//sirve para ejecutar despues de un tiemp
            setMostrarPreg("Presiona Reiniciar");
        }
    }
    useEffect(() => { setResultado("") }, [preguntaActual]);
    useEffect(() => { setCapRespCorrecta(preguntas[preguntaActual].correcta) }, [preguntaActual]);//si se cambia de pregunta se setea la respuesta correcta para poder comparar
    useEffect(() => { setMostrarPreg(preguntas[preguntaActual].pregunta) }, [preguntaActual]);//si se cambia de pregunta se setea la pregunta para mostrar
    useEffect(() => { Verificar() }, [capResp]);//al seleccionar una respuesta se ejecuta la funcion verificar
    useEffect(() => { MostrarReiniciar() }, [finJuego]);

    /*useEfeect que sirve para poder controlar el tiempo y disminuirlo */
    useEffect(() => {
        const intervalo = setInterval(() => {
            if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
            if (tiempoRestante == 0) {
                SetJuegoHabilitado(false);
                if (!botJugar) {
                    if ((resultado !== "Respuesta Correcta") && (resultado !== "Respuesta Incorrecta")) {
                        setResultado("No Alcanzaste a Responder, Que lastima");
                        setBotSiguiente(true);
                        if (preguntaActual >= preguntas.length - 1) {
                            setBotSiguiente(false);
                            setBotJugar(true);
                            setFinJuego(false);
                        }
                    }
                }
            }
        }, 1000);
        return () => clearInterval(intervalo);
    }, [tiempoRestante]);
    return (

        <>
            <h1>El Juego de Preguntados</h1>
            <span>pregunta {preguntaActual} de {preguntas.length - 1}</span>
            <br></br>
            <span>tiempo Restante: {tiempoRestante}</span>
            <h3>Respondido Correctamente: {respCorrectamente}</h3>
            <h3>{resultado}</h3>
            <h2>{mostrarPreg}</h2>
            <Button onClick={Jugar} disabled={!botJugar}> {botJugarMen} </Button>
            <Button onClick={Siguiente} disabled={!botSiguiente} >Siguiente</Button>
            <br></br>
            <Button onClick={() => setCapRest(preguntas[preguntaActual].op1)} disabled={!juegoHabilitado} >{preguntas[preguntaActual].op1}</Button>
            <Button onClick={() => setCapRest(preguntas[preguntaActual].op2)} disabled={!juegoHabilitado}>{preguntas[preguntaActual].op2}</Button>
            <Button onClick={() => setCapRest(preguntas[preguntaActual].op3)} disabled={!juegoHabilitado}>{preguntas[preguntaActual].op3}</Button>
        </>



    );


}