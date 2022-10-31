import { Button} from "react-bootstrap";
import React, { useState , useEffect } from "react";
import palabras from "../json/palabras.json"
import linkImagenes from "../json/linkImagenes.json"
import Card from 'react-bootstrap/Card';


export default function Ahorcadito ()
{
    
    const [letraElegida,setLetraElegida] = useState (); //Guarda la letra seleccionada al jugar 
    const [palabraElegida,setPalabraElegida] = useState (''); //Guarda la palabra elegida de la lista para jugar
    const [palabraMostrada,setPalabraMostrada] = useState ([]); // Para Mostrar en pantalla
    const [vidas,setVidas]= useState(0);
    const [jugarHabilitado,setjugarHabilitado] = useState(false);
    const [letrasUsadas,setLetrasUsadas] = useState("")
    const [resultadoFinal,setResultadoFinal] = useState("");
    
    function Jugar()
    {    
         setVidas(5);
         setPalabraElegida(palabras[Math.floor(Math.random()*palabras.length-1)]); 
         setPalabraMostrada(Array(palabraElegida.length).fill("-")); 
         setLetrasUsadas("")
         setResultadoFinal("");
         setjugarHabilitado(true);
    }
    function RevisarLetra()
    {  
       
       if(typeof letraElegida ==="undefined")
       {
        console.log("letra elegida vacia")
       }else
       {
        if(!letrasUsadas.includes(letraElegida)) // se revisa que la letra no haya sido presionada antes
        {
            if(palabraElegida.includes(letraElegida))//Revisa si la letra pertenece a la palabra
            {
                setPalabraMostrada(CambiarArray(letraElegida,palabraMostrada,palabraElegida))
                if(!palabraMostrada.includes("-"))
                {
                    setjugarHabilitado(false);
                    setResultadoFinal("Ganaste");
                    console.log("Ganaste")
                }
            }else
            {
                console.log("la letra no esta ");    
                setVidas(vidas-1);
                if(vidas <=1)
                {
                    setjugarHabilitado(false);
                    setResultadoFinal("Perdiste, la palabra era: " +palabraElegida);
                    console.log(palabraElegida)
                    console.log("Perdiste");    
                }    
            }
            setLetrasUsadas(letrasUsadas => {
                return [letraElegida, ...letrasUsadas]
                
              })
        }else
        {
            console.log("letra ya elegida");
        }
        
       }
       
       setLetraElegida();
    }
    function CambiarArray(letra,vector,palabra) //Devuelve un vector con la letra ya encontrada
    {
        let arr =vector; //Se copia el vector actual para mantener las letras ya encontradas
        for(let i=0;i<palabra.length;i++)
        {
            if(arr[i]=="-") // Revisa los lugares donde no se encontro la letra
            {
                if(palabra[i]==letra)
                {
                    arr[i]=letra;
                }  
            }
            
        }
        
        return arr;
    }
    useEffect(() => {setPalabraMostrada(Array(palabraElegida.length).fill("-"))}, [palabraElegida]);
    useEffect(() => {RevisarLetra();}, [letraElegida]); 
    
    return(
        <div className="container">
        
            <h1 >Ahorcadito</h1>
          
      

        
        <Button onClick={Jugar} disabled={jugarHabilitado}>Jugar</Button>
        
        
        <Card bg="success" border='dark' style={{ width: '70%' }}>
            <Card.Header><h2>Intentos Restantes: {vidas}</h2></Card.Header>
            <Card.Img variant="top" src={linkImagenes[5-vidas]} />
            <Card.Body>  
                <h1>{palabraMostrada}</h1>
             <br></br>
             <h1>{resultadoFinal}</h1>
             </Card.Body>
             </Card>
       
        <br></br>
        


       
        
        {/* Botones */}
        <Button onClick={() => setLetraElegida('A')}disabled={!jugarHabilitado}>A</Button>
        <Button onClick={() => setLetraElegida('B')}disabled={!jugarHabilitado}>B</Button>
        <Button onClick={() => setLetraElegida('C')}disabled={!jugarHabilitado}>C</Button>
        <Button onClick={() => setLetraElegida('D')}disabled={!jugarHabilitado}>D</Button>
        <Button onClick={() => setLetraElegida('E')}disabled={!jugarHabilitado}>E</Button>
        <Button onClick={() => setLetraElegida('F')}disabled={!jugarHabilitado}>F</Button>
        <Button onClick={() => setLetraElegida('G')}disabled={!jugarHabilitado}>G</Button>
        <Button onClick={() => setLetraElegida('H')}disabled={!jugarHabilitado}>H</Button>
        <Button onClick={() => setLetraElegida('I')}disabled={!jugarHabilitado}>I</Button>
        <Button onClick={() => setLetraElegida('J')}disabled={!jugarHabilitado}>J</Button>
        <Button onClick={() => setLetraElegida('K')}disabled={!jugarHabilitado}>K</Button>
        <Button onClick={() => setLetraElegida('L')}disabled={!jugarHabilitado}>L</Button>
        <Button onClick={() => setLetraElegida('M')}disabled={!jugarHabilitado}>M</Button>
        <Button onClick={() => setLetraElegida('N')}disabled={!jugarHabilitado}>N</Button>
        <Button onClick={() => setLetraElegida('O')}disabled={!jugarHabilitado}>O</Button>
        <Button onClick={() => setLetraElegida('P')}disabled={!jugarHabilitado}>P</Button>
        <Button onClick={() => setLetraElegida('Q')}disabled={!jugarHabilitado}>Q</Button>
        <Button onClick={() => setLetraElegida('R')}disabled={!jugarHabilitado}>R</Button>
        <Button onClick={() => setLetraElegida('S')}disabled={!jugarHabilitado}>S</Button>
        <Button onClick={() => setLetraElegida('T')}disabled={!jugarHabilitado}>T</Button>
        <Button onClick={() => setLetraElegida('U')}disabled={!jugarHabilitado}>U</Button>
        <Button onClick={() => setLetraElegida('V')}disabled={!jugarHabilitado}>V</Button>
        <Button onClick={() => setLetraElegida('W')}disabled={!jugarHabilitado}>W</Button>
        <Button onClick={() => setLetraElegida('X')}disabled={!jugarHabilitado}>X</Button>
        <Button onClick={() => setLetraElegida('Y')}disabled={!jugarHabilitado}>Y</Button>
        <Button onClick={() => setLetraElegida('Z')}disabled={!jugarHabilitado}>Z</Button>
       
      
        </div>
        
    )
    
   
}