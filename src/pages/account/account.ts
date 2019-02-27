import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { ModalController } from 'ionic-angular';
import { PasswordPage } from '../password/password';
import { AddressPage } from '../address/address';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import firebase from "firebase";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',

})
export class AccountPage {
  customerName: any;
  customerAddress: any; 
  customerAddress2: any;
  customerEmail: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthProvider, public modalController: ModalController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
   var user = firebase.auth().currentUser;
    if (!user) {
      
         this.navCtrl.setRoot(LoginPage);
    }
   

  this.authService
      .getuserdetails()
      .then((response: any) => {
        this.customerName = response.name;
        this.customerAddress = response.addresses[0];
        this.customerAddress2 = response.addresses[1];
        this.customerEmail = response.email;
      }) 
      .catch(err => {
        console.log("err", err);
      });
    console.log('ionViewDidLoad AccountPage');
  }

 

  changePassword() { 
   
   
      this.navCtrl.push(PasswordPage);
     
  }

  manageAddresses() { 
   
   
      this.navCtrl.push(AddressPage);
     
  }
  
  updateUser(){  
   var userObj = {
          name: this.customerName,
          email: this.customerEmail,
          addresses: [this.customerAddress,this.customerAddress2]
        };


   this.authService
      .updateUser(userObj); 
      this.presentToast();

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: `Profile has been updated succesfully`,
       duration: 3500,
    });

    toast.present();
  }
} 

 


  


