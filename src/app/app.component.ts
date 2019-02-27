import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from "firebase";
import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { CategoryProvider } from '../providers/category/category';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';
import { ListPage } from '../pages/list/list';
import { CheckoutPage } from '../pages/checkout/checkout';
import { OrdersPage } from '../pages/orders/orders';
import { AccountPage } from '../pages/account/account';
import { CreditPage } from '../pages/credit/credit';
import { ListCardPage } from '../pages/list-card/list-card';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicioPage;

  pages: Array<{title: string, component: any}>;
  pagesSecon: Array<{title: string, component: any}>;
  categories: any[];

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen, private categoryService: CategoryProvider, private events:Events,
    public app: App,public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage  },
      { title: 'My Cart', component: CartPage },
      { title: 'Categories', component: ListPage}
     ]; 

    this.pagesSecon=[
      { title: 'Settings', component: AccountPage},
      { title: 'My Orders', component: CheckoutPage },
      { title: 'Purchase History', component: OrdersPage},
      { title: 'Credit Card', component: CreditPage},
      { title: 'List credit cards', component: ListCardPage},
    ];

    this.getCategories();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.platform.registerBackButtonAction(()=>{
      //obtenemos la vista activa
      let nav=this.app.getActiveNav()[0];
      let activeView=nav.getActive();
      console.log(activeView.name);
      // Checks if can go back before show up the alert
      if(activeView.name==HomePage){
        if(nav.canGoBack()){
          nav.pop();
        }
        else{
          const alert=this.alertCtrl.create({
            title: "Close app?",
            message: "Are you sure?",
            buttons: [{
              text : "Cancel",
              role: "cancel",
              handler: () => {
                 this.nav.setRoot(HomePage);
              }
            }, {
              text : "Close app?",
              handler: () => {
                
                //this.logout();
                this.platform.exitApp();
              }
            }]
          });
          alert.present();
        }
      }

    }    
    )
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //console.log("pagina actual "+this.pages.map(a=>a.title[2]));
 
    //console.log("pagina actual"+page.component.name);
    var y:string=this.nav.getActive().name;
    console.log("pagina actual"+y);

    var x:string=page.component.name;
    if(y=='HomePage' && x!='HomePage' ){
    this.nav.setRoot(page.component);
    }
    else{
      if(y!=='HomePage'){
        this.nav.setRoot(page.component);
      }
    }
    
  }

  secondPage(pagesSecon){
    var user = firebase.auth().currentUser;
    var y:string=pagesSecon.component.name;
    console.log("usuario"+user);
    console.log("pagina actual"+y);
    if (user){
      if(y=='LoginPage'){
      this.nav.push(AccountPage);
      }
      else{
        this.nav.push(pagesSecon.component);
     }
    }else{

         this.nav.push(pagesSecon.component);

    }
//     this.navCtrl.setRoot(LoginPage);
 //   this.nav.push(pagesSecon.component);
  }

  goToCategory(category){
    this.nav.push('CategoryPage',{category:category})
 }

 getCategories(){
   this.categoryService.getCategories();

   this.events.subscribe('categoryLoaded', () => {
     this.categories = this.categoryService.categories;
     
   })
 }
}
