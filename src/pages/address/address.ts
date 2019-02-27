import { Component } from '@angular/core';
import { AuthProvider } from "../../providers/auth/auth";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  address1: any;
  address2: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    this.authService
      .getuserdetails()
      .then((response: any) => {
        this.address1 = response.addresses[0];
        this.address2 = response.addresses[1];
       
      }) 
      .catch(err => {
        console.log("err", err); 
      });
    console.log('ionViewDidLoad AccountPage')
  }

}
