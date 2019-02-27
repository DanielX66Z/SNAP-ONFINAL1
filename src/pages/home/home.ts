import { CartPage } from './../cart/cart';
import { CartProvider } from './../../providers/cart/cart';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, ViewController, List, Content, ToastController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ProductsProvider } from '../../providers/products/products';
import { SinglePage } from '../single/single';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { OrdersPage } from '../orders/orders';
import firebase from 'firebase';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  /*para la animacion para el carro bastardo */
  animations: [
    trigger('cartBadge', [
      state('idle', style({
        opacity: '1', 
        transform: 'scale(1)'
      })),
      state('adding', style({
        opacity: '1',
        transform: 'scale(1.3)'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        style({ transform: 'translateX(200%)' }),
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('addButton', [
      state('idle', style({
        opacity: '1'
      })),
      state('adding', style({
        opacity: '1',
        fontWeight: 'bold'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        style({ transform: 'translateX(200%)' }),
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HomePage {
  //Declaramos un elemento tipo lista para limpiar la vista cuando se cancele la busqueda
  @ViewChild(List) list: List;
  @ViewChild(Content) content: Content;
  isLoading = false;
  //variables que cargara lista de productos y cargara las imagenes
  promoSliders: any[];
  products: any[];
  productRows: any;
  promoImagesLoaded: boolean = false;
  //para la busqueda
  searchItem: string = "";
  cantidad: number =0;
  items: any;
  searchControl: FormControl;
  searching: any = false;
  //variables para el carro bastardo
  cartItems: any[];
  cartBadgeCart: string = 'idle'; //estado del carrito


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider, private loadingCtrl: LoadingController,
    private events: Events, private nativePageTransitions: NativePageTransitions,
    private viewCtrl: ViewController, private cartService: CartProvider,public toastCtrl: ToastController) {

    this.loadPromo();
    this.loadProducts();
    //no se que eso preguntar ????
    this.searchControl = new FormControl();
    this.getItemsCart();
  }

  update() {
    this.content.resize();
  }

  //carga inicial donde mostrara productos y promociones
  ionViewWillEnter() {
    // this.loadPromo();
    // this.loadProducts();
    this.viewCtrl.showBackButton(false);
  }

  ionViewDidLeave() {
    this.events.unsubscribe('promoLoaded');
  }

  ionViewWillLeave() {

    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };

    this.nativePageTransitions.slide(options)
      .then(() => {

      })
      .catch((err) => {

      });

  }



  ionViewDidLoad() {
    //se usara un observable con el fin de no mostrar
    //todos los resultados al instante con el fin de dar
    //al cliente un tiempo para mostrar los resultados posibles
    this.setFilteredItem();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItem();
    });

  }

  onSearchInput() {
    this.searching = true;
  }

  loadPromo() {
    this.isLoading = true;
    let loader = this.loadingCtrl.create({
      content: 'Loading Promos..'
    });
    loader.present();
    this.productService.getPromoSlider();

    this.events.subscribe('promoLoaded', () => {
      this.promoSliders = this.productService.promos;
      if (this.promoSliders.length > 0) {
        this.promoImagesLoaded = true;
      }
      loader.dismiss();
    })
  }

  loadProducts() {
    this.productService.getProducts();
    this.events.subscribe('productsLoaded', () => {
      this.products = this.productService.products;
      this.productRows = Array.from(Array(Math.ceil(this.products.length / 2)).keys());

    })
  }

  showDetails(product) {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(SinglePage, { product: product });
  }

  //para busqueda
  setFilteredItem() {
    //agregamos una pantalla auxiliar para el filtro
    /* if(this.searchItem.length>0){
       this.navCtrl.push(SearchPage,{"searchQuery": this.searchItem });
     }*/
    this.items = this.productService.filterItems(this.searchItem);
    //console.log(this.items);
  }

  onCancel() {
    this.items = null;
    //console.log("entro al evento de cancelar");
    //this.list.closeSlidingItems();
  }

  //para buscar por producto
  busarProducto(product) {
    this.navCtrl.push(SinglePage, { product: product });
  }

  //obtener los items en el carro
  getItemsCart() {
   // this.cartItems=this.cartService.getCartItems();
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
    })
//   this.getCantidadProducto(this.cartItems);
  }

  getCantidadProducto(cartItems){
    //console.log(cartItems);
    for(let item of cartItems){
      this.cantidad=item.count;
    }
   // console.log("cantida"+this.cantidad);
    return this.cantidad;
  }

  //consultar carro de compra
  consultShopingCart(){
    this.navCtrl.push(CartPage);
  }
 
  logout(){
  firebase.auth().signOut().then(function() {

   
}, function(error) {
  // An error happened.
}); 
this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: `You have logged out`,
       duration: 3500,
    });

    toast.present();
  }

  //obtenemos la informacion de ordenes del cliente
  
 

}
