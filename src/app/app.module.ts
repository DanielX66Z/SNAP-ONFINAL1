import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { config } from './../config/app.config';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import * as firebase from 'firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InicioPage } from '../pages/inicio/inicio';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ProductsProvider } from '../providers/products/products';
import { CategoryProvider } from '../providers/category/category';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { CartProvider } from '../providers/cart/cart';
import { OrderProvider } from '../providers/order/order';
import { CartPage } from '../pages/cart/cart';
import { SinglePage } from '../pages/single/single';
import { IonicStorageModule } from '@ionic/storage';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CategoryPage } from '../pages/category/category';
import { ProductsPage } from '../pages/products/products';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { OrdersPage } from '../pages/orders/orders';
import { AccountPage } from '../pages/account/account';
import { CreditPage } from '../pages/credit/credit';
import { CreditProvider } from '../providers/credit/credit';
import { ListCardPage } from '../pages/list-card/list-card';
import { PasswordPage } from '../pages/password/password';
import { AddressPage } from '../pages/address/address';
import { LogoutPage } from '../pages/logout/logout';

firebase.initializeApp(config.firebasConfig);

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    HomePage,
    ListPage,
    InicioPage,
    LoginPage,
    ProductsPage,
    CategoryPage,
    CartPage,
    SinglePage,
    CheckoutPage,
    OrdersPage,
    CreditPage,
    ListCardPage,
    PasswordPage,
    AddressPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    HomePage,
    ListPage,
    InicioPage,
    LoginPage,
    ProductsPage,
    CartPage,
    SinglePage,
    CategoryPage,
    CheckoutPage,
    OrdersPage,
    CreditPage,
    ListCardPage,
    PasswordPage,
    AddressPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    ProductsProvider,
    CategoryProvider,
    AuthProvider,
    CartProvider,
    OrderProvider,
    CreditProvider
  ]
})
export class AppModule {}
