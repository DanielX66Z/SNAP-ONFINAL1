import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase'
import { CreditProvider } from '../../providers/credit/credit';
/**
 * Generated class for the ListCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-card',
  templateUrl: 'list-card.html',
})
export class ListCardPage {
  creditRows: any;
  credit: any[];
  customerName : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider, private cardService: CreditProvider,
    private events: Events,private toastController : ToastController) {
     // this.getCards();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCardPage');
    this.authService
    .getuserdetails()
    .then((response: any) => {
      this.customerName = response.name;
      this.getCards();
    })
    .catch(err => {
      console.log("err", err);
    });
  }

  getCards(){
    
     var user=firebase.auth().currentUser;
      
    if(user){
        //aqui enviamos los datos del usuario
        //si esta autenticado
       // console.log("usuario"+this.customerName);
  
        this.cardService.getOrdersItems(this.customerName);
        this.events.subscribe("creditLoaded",()=>{
          this.credit=this.cardService.creditCard;
          this.creditRows = Array.from(Array(Math.ceil(this.credit.length / 2)).keys());
  
        })
        //this.navCtrl.push(OrdersPage)
        //this.ordersItems=this.orderService.getOrdersItems(user);
      }else{
        const toast=this.toastController.create({
          message: 'Need to be logged in to see data ',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(()=>{
  
        });
        toast.present();
        
      }
      
    
  }

  eliminar(card : any){
    console.log("valor a eliminar"+card);
    this.cardService.removeCard(card);
    this.events.subscribe("creditReload",()=>{
      this.getCards();
    });
  }
}
