export class PowerUps 
{
    constructor(scene) {
        this.relatedScene=scene;

    }
    create(x,y,grupo)
    {
        this.powerUp =grupo.create(x,y,'powerUp').setImmovable(true);
        this.powerUp.setVelocityY(70);
    } 

    // Cambia el tipo de disparo y su rapidez  que se elige al azar
    cambiarTipoDisparo(nave){
        var random;
        //Se le asigna un numero al azar hasta que sea distinto al tipo de disparo actual
        do{
            random =Math.floor(Math.random() * (4 - 1) + 1) // 1 - 3 
        }while(random ==nave.tipoDisparo)

        switch(random)
        {
         case 1:
            nave.tipoDisparo =1;
            nave.rapidezDisparo =150;
         break;
         case 2:
            nave.tipoDisparo =2;
            nave.rapidezDisparo = 500;
         break;
         case 3:
            nave.tipoDisparo =3;
            nave.rapidezDisparo =250;       
         break;
        }
    }
}