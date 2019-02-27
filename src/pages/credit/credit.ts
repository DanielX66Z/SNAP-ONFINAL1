import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CreditProvider } from '../../providers/credit/credit';
import firebase from "firebase";
import { LoginPage } from '../login/login';

/**
 * Generated class for the CreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {
  numberCard : string;
  nameCard: string;
  typeCard : string;
  customerName: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService : AuthProvider, public creditService : CreditProvider,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.authService
      .getuserdetails()
      .then((response: any) => {
        this.customerName = response.name;
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (!user) this.navCtrl.setRoot(LoginPage);
  }

  ionViewCanEnter() {}

  register(){
   /* let loader = this.loadingCtrl.create({
      content: "Processing credit card register.."
    });
    loader.present();*/
    var user = firebase.auth().currentUser;
    if (user) {
      let cardObj = {
        nameCard: this.nameCard,
        number: this.numberCard,
        typeCard: this.typeCard,
        user: this.customerName
      };
      this.creditService.registerCard(cardObj);
        this.presentToast();
        //loader.dismiss();
        //this.navCtrl.pop();
        //toast para mostrar mensaje de confirmacion de compra testin despues se cambiara
        //falta agregar validaciones de procesamiento y caida de red
          
     
    } else {
      //loader.dismiss();
    }
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'register correct',
      duration: 8000,
      position: 'top'

    });
    toast.present();
  }

}
