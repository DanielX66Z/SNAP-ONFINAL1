import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Events } from "ionic-angular";
import { c } from "@angular/core/src/render3";

//const CART_KEY = 'ordersItems';
@Injectable()
export class CreditProvider {
    firedata = firebase.database().ref("/creditCard");
    creditCard: Array<any> = [];

    constructor(public events: Events) { }

    registerCard(cardObj: any) {
        
            let cardObject = {
                user: cardObj.user,
                number: cardObj.number,
                type: cardObj.typeCard,
                nameCard: cardObj.nameCard,
                //console.log("fecha"+orderObj.dateShop)
            };
            this.firedata.push(cardObject);
      
    }

    removeCard(card) {
      
        console.log("antes de morir"+card.number);
        var numberCard=card.number;
        this.firedata.orderByChild('number').equalTo(numberCard).ref.remove();
        this.creditCard.pop();
        this.events.publish('creditLoaded');
    
}

    //agregamos una funcion que consulte todos las tarjetas
    getOrdersItems(user: string) {
        //let name:string=user.name;
        //console.log("user"+name);
        this.creditCard=[];
        console.log("user"+user);
        this.firedata.orderByChild('user').equalTo(user).once('value', (snap) => {
              this.creditCard=[];
            if (snap.val()) {
                var Orderdata = snap.val();
                for (var key in Orderdata) {
                    var x=0;
                    let singleCard = {
                      nameCard: Orderdata[key].nameCard,
                      number: Orderdata[key].number,
                      type: Orderdata[key].type,
                      user: Orderdata[key].user
                    };
                    x++;
                    console.log("cantidad de interaccion"+x);
               
                    this.creditCard.push(singleCard);

                
                // resolve(temp);
            }
        }
            this.events.publish('creditLoaded');
        });
       

    }

}