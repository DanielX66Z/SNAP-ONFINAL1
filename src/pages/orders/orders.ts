import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import firebase from 'firebase'
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  ordersItems: any[] = [];
  totalAmount: number = 0;
  isOrderItemLoaded: boolean = false;
  isEmptyOrder: boolean = true;
  customerName: any;
  ordersRows: any;
  orders: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private orderService: OrderProvider, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private events : Events,private authService: AuthProvider) {
   //   this.getOrders();
  }

  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
   // if (!user) this.navCtrl.setRoot(LoginPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.authService
    .getuserdetails()
    .then((response: any) => {
      this.customerName = response.name;
      this.getOrders();
    })
    .catch(err => {
      console.log("err", err);
    });
   
  }

  //funcion que traera todo el historial de ordenes
 

   getOrders(){
    var user=firebase.auth().currentUser;
  if(user.email!=null){
      //aqui enviamos los datos del usuario
      //si esta autenticado
     // console.log("usuario"+this.customerName);

      this.orderService.getOrdersItems(this.customerName);
      this.events.subscribe("ordersLoaded",()=>{
        this.orders=this.orderService.orders;
        this.ordersRows = Array.from(Array(Math.ceil(this.orders.length / 2)).keys());

      })
      //this.navCtrl.push(OrdersPage)
      //this.ordersItems=this.orderService.getOrdersItems(user);
    }else{
      const toast=this.toastCtrl.create({
        message: 'Need to be logged in to see data ',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(()=>{

      });
      toast.present();
      
    }
    
  }

  //funcion para cargar ordenes
/*  getOrders(){
    let loader = this.loadingCtrl.create({
      content: "wait please.."
    });
    loader.present();
    this.orderService.getOrdersItems().then(
      val=> {
        this.ordersItems=val;
        if(this.ordersItems.length>0){
          this.ordersItems.forEach((v, indx) => {
            this.totalAmount += parseInt(v.totalPrice);
          });
          this.isEmptyOrder = false;
        }
        this.isOrderItemLoaded = true;
        loader.dismiss();

      })

    .catch(err => {});
  } */

  //funcion para eliminar ordern
  //falta opcion  para editar las cantidades
  

}
