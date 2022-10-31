import React, { Children } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


import Spinner from 'react-bootstrap/Spinner';


function Inicio({ text, Children }) {
    const length = text.length;
    const deg = 360 / length;

    return (

        <>
            <div className="body">
                
                <div className="spinning-text-wrapper ">

                    <div className="spinning-text">
                        <p>{text.split("").map((letra, i) => (
                            <span
                                key={i}
                                style={{
                                    transform: `rotate(${deg * i}deg)`
                                }}
                            > {letra}</span>
                        ))}</p>
                    </div>
                    {Children}

                </div>

                <div className="img2">
                    <img src="../img/nene3.png" ></img>
                    <img src="../img/nene.png" ></img>

                    <div className="boton1">
                        <Link to="/arkanoid"  >
                            <Button variant="secondary" size="lg" active>
                               *---Jugar---*
                            </Button>{' '}
                        </Link>
                    </div>
                    <img src="../img/nene4.png" ></img>
                    <img src="../img/nene2.png" ></img>
                </div>




            </div>






        </>

    )

}
export default Inicio