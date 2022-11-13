import React from "react";
import Estudiante from "./Estudiante";
import estudiantes from "../json/listaNosotros.json"
export default function Nosotros(props)  {
    
        return (
            // {pelicula.map((peli,i) =>
            //     <Pelicula
            //       key = {i}
            //       img={peli.img}
            //       titulo = {peli.titulo}
            //       descripcion = {peli.descripcion}
            //       duracion = {peli.duracion}
            //       actores = {peli.actores}  
            //     ></Pelicula>)}
            <div >
                <body className="fondo">

                    <header className="header">

                        <h1 className="title">Grupo15</h1>

                    </header>

                    <div className="box-container">

                     {estudiantes.map((est,i) =>
                <Estudiante
                   key = {i}
                   img={est.img}
                   nombre = {est.nombre}
                   frase = {est.frase}
                   LU = {est.LU}
                    
                ></Estudiante>)}
                        
                   </div>

                </body>
            </div>
        )

    
}

