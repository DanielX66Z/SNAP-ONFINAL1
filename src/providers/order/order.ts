import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Events } from "ionic-angular";

//const CART_KEY = 'ordersItems';
@Injectable()
export class OrderProvider {
  firedata = firebase.database().ref("/orders");
  orderDetails = firebase.database().ref("/ordersdetails");
  orders:Array<any> =[];

  constructor(public events: Events) { }//public storage: Storage) {}

  placeOrder(orderObj: any) {
    var promise = new Promise((resolve, reject) => {
      let orderRef = this.makeid(10)
      let orderObject = {
        orderRef: orderRef,
        customerName: orderObj.name || '',
        dateShop: orderObj.dateShop.toDateString(),
        ShippingAmt: orderObj.shipping,
        OrderAmt: orderObj.orderAmount,
        totalAmount: orderObj.amount,
       //console.log("fecha"+orderObj.dateShop)
      };
    /*  for(var x in orderObject){
        console.log("objetos"+Object.keys(orderObject));
      }*/
      //console.log('orderObject',orderObject);
      this.firedata.push(orderObject).then(() => {
        orderObj.orders.forEach((v, indx) => {
          //console.log(v);
          this.orderDetails.push({
            orderRef: orderRef,
            productName: v.name,
            Qty: v.count,
            amount: v.totalPrice,
           // dateShop: v.dateShop
          }).then(() => {
            resolve(true);
          })
        });
      })

    });
    return promise;
  }

  makeid(lenght: number) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < lenght; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  //agregamos una funcion que consulte todos las ordenes que se esten procesando
  getOrdersItems(user: string) {
     //let name:string=user.name;
     //console.log("user"+name);
     this.firedata.orderByChild('customerName').equalTo(user).once('value',(snap)=>{
      //  this.orders=[];
      
      if(snap.val()){
      var Orderdata=snap.val();
     // let temp=[];
  //    console.log(Orderdata);
     for(var key in Orderdata){
        this.orders.push(Orderdata[key]);
        
      }
     // resolve(temp);
    }
    this.events.publish('ordersLoaded');

    });

 }

}
