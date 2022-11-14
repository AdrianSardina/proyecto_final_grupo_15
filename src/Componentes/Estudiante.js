import React from "react";
export default function Estudiante(props){
    return(
        <>
        <div className="box">
                            <i className="fab fa-angular"></i>
                            <h3>{props.nombre}</h3>
                            <div className="Imagenes">
                            <img src={props.img} ></img>
                            </div>
                            <p>{props.frase}</p>
                            <p>Estudiante en la Facultad de Ingenieria de Jujuy</p>
                            <p>Carrera: Tecnicatura Universitaria en Diseño Integral de Videojuego</p>
                            <p>{props.LU}</p>
                        </div>
        
        </>
    )
}