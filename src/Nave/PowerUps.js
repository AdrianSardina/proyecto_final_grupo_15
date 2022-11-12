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
    cambiarTipoDisparo(nave){
        var random
        do{
            random =Math.floor(Math.random() * (3 - 1) + 1)
        }while(random ==nave.tipoDisparo)
        switch(random)
        {
       case 1:
        nave.tipoDisparo =1;
        
       break;
       case 2:
        nave.tipoDisparo =2;
       break;
        case 3:
         nave.tipoDisparo =3;
        
        break;
        }
    }
}