import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { CheckoutPage } from "../checkout/checkout";
import { HomePage } from "../home/home";


@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public authService: AuthProvider,
    private loadingCtrl: LoadingController,private alertCtrl: AlertController) {}

  ionViewDidLoad() {}

  login() {

    let loader = this.loadingCtrl.create({
      content: 'Authenticating..'
    });
    loader.present();
    let loginParams = {
      email:this.email,
      password:this.password
    }

    this.authService.login(loginParams).then((res)=>{
      loader.dismiss();
      this.navCtrl.push(CheckoutPage);
    }).catch((err)=>{
      loader.dismiss();
      this.presentAlert(err.message);
    });


  }

  showRegisterPage() {
    this.navCtrl.push("RegisterPage");
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Auth Error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }

  returnHome(){
    //retornaremos a la pagina principal
    
    this.navCtrl.setRoot(HomePage);  
   
  }

 /* initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.Platform.registerBackButtonAction(function(event){
        console.log('Prevent Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file 
}     */  

}
