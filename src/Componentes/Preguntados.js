import preguntas from "../json/preguntas.json"
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Preguntados() {

    const [preguntaActual, setPreguntaActual] = useState(0);
    const [mostrarPreg, setMostrarPreg] = useState(preguntas[preguntaActual].pregunta);
    const [respCorrectamente, setRespCorrectamente] = useState(0);
    const [capRespCorrecta, setCapRespCorrecta] = useState(preguntas[preguntaActual].correcta);
    const [capResp, setCapRest] = useState("");
    const [juegoHabilitado, SetJuegoHabilitado] = useState(false);
    const [botSiguiente, setBotSiguiente] = useState(false);
    const [botJugar, setBotJugar] = useState(true);
    const [botJugarMen, setBotJugarMen] = useState("Jugar");
    const [resultado, setResultado] = useState("");
    const [bandera, SetBandera] = useState(true);
    const [tiempoRestante, setTiempoRestante] = useState(0);
    function Jugar() {
        setPreguntaActual(1);
        setRespCorrectamente(0);
        SetJuegoHabilitado(true);
        setBotJugar(false);
        setBotJugarMen("Reiniciar");
        console.log("la pregunta es:" + mostrarPreg);
        console.log(preguntaActual);
        setTiempoRestante(5);

    }


    function Siguiente() {
        setResultado("");
        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual(preguntaActual + 1);
            SetJuegoHabilitado(true);
            setBotSiguiente(false);
            setMostrarPreg(preguntas[preguntaActual].pregunta);
            console.log(mostrarPreg);
            setTiempoRestante(5);
        }

    }
    function Verificar() {
        console.log(preguntaActual);
        console.log(capRespCorrecta);
        console.log(capResp);
        if (bandera) {
            SetBandera(false);
        } else {
            if (capRespCorrecta == capResp) {
                console.log("Respuesta Correcta");
                setRespCorrectamente(respCorrectamente + 1);
                setResultado("Respuesta Correcta");

                console.log(juegoHabilitado);


            } else {
                setResultado("Respuesta Incorrecta");
                console.log("Respuesta Incorrecta");

                console.log(juegoHabilitado);

            }
            SetJuegoHabilitado(false);
            setBotSiguiente(true);
            setTiempoRestante("");
        }
        if (preguntaActual == preguntas.length - 1) {
            setBotSiguiente(false);
            setBotJugar(true);
            setTimeout(() => { setResultado("") }, 2000);
            setMostrarPreg("Presiona Reiniciar");
        }




    }
    useEffect(() => { setCapRespCorrecta(preguntas[preguntaActual].correcta) }, [preguntaActual]);
    useEffect(() => { setMostrarPreg(preguntas[preguntaActual].pregunta) }, [preguntaActual]);
    useEffect(() => { Verificar() }, [capResp]);
    useEffect(() => {
        const intervalo = setInterval(() => {
            if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
            if (tiempoRestante == 0) {
                SetJuegoHabilitado(false);

                if (!botJugar) {
                    if ((resultado !== "Respuesta Correcta") && (resultado !== "Respuesta Incorrecta")) {
                        setResultado("No Alcanzaste a Responder, Que lastima");
                        setBotSiguiente(true);
                        console.log(preguntaActual);
                        console.log(preguntas.length - 1);
                        if (preguntaActual >= preguntas.length - 1) {
                            console.log("entro al if");
                            setBotSiguiente(false);
                            setBotJugar(true);
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
            {/* {preguntas[preguntaActual].opciones.map((valor, i) => (
                <Button key={i} onClick={() => setCapRest(valor.op)} disabled={!juegoHabilitado}> {valor.op} </Button>
            ))} */}
            <Button onClick={() => setCapRest(preguntas[preguntaActual].op1)} disabled={!juegoHabilitado} >{preguntas[preguntaActual].op1}</Button>
            <Button onClick={() => setCapRest(preguntas[preguntaActual].op2)} disabled={!juegoHabilitado}>{preguntas[preguntaActual].op2}</Button>
            <Button onClick={() => setCapRest(preguntas[preguntaActual].op3)} disabled={!juegoHabilitado}>{preguntas[preguntaActual].op3}</Button>
        </>



    );


}