import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events, ViewController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { SinglePage } from '../single/single';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  //variables
  productsRows: any;
  products: any[];
  category: any;
  //para la busqueda
  searchItem: string = "";
  items: any;
  searchControl: FormControl;
  searching: any = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider,
    private nativePageTransitions: NativePageTransitions, private viewCtrl: ViewController,
    private loadingCtrl: LoadingController, private events: Events) {

    this.category = navParams.get("categories");
    //console.log("entror en producto " + this.category);
    //console.log("entror en producto " + this.category);

    this.loadProducts();
    //no se que eso preguntar ????
    this.searchControl=new FormControl();
    /* if(this.navParams.get("product")){
     //guadamos en memoria el producto falta limpiar las variable a cerrar 
     //sesion
     window.localStorage.setItem('selectedProduct', JSON.stringify(this.navParams.get("product")));
     */
  }

  ionViewWillEnter() {
    //   this.viewCtrl.showBackButton(false);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    //se usara un observable con el fin de no mostrar
    //todos los resultados al instante con el fin de dar
    //al cliente un tiempo para mostrar los resultados posibles
    this.setFilteredItem();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching= false;
      this.setFilteredItem();
    });
  }

  loadProducts() {
    let loader = this.loadingCtrl.create({
      content: 'Loading products..'
    });
    loader.present();
    //this.categoryService.categoriesRef
    this.productService.getProductByCategory(this.category);

    this.events.subscribe('productsLoaded', () => {
      this.products = this.productService.products;
      this.productsRows = Array.from(Array(Math.ceil(this.products.length / 2)).keys());
      loader.dismiss();

    })
  }

  showProductDetail(product) {
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
  setFilteredItem(){
    //agregamos una pantalla auxiliar para el filtro
   /* if(this.searchItem.length>0){
      this.navCtrl.push(SearchPage,{"searchQuery": this.searchItem });
    }*/
    //console.log("item a buscar"+this.searchItem);
    this.items=this.productService.filterItems(this.searchItem);
    //console.log(this.items);
  }
 //limpiara la lista y cerrar la lista de busqueda
  onCancel(){
    this.items=null;
    console.log("entro al evento de cancelar");
    //this.list.closeSlidingItems();
  }

  onSearchInput(){
    this.searching=true;
  }

   //para buscar por producto
   busarProducto(product){
    this.navCtrl.push(SinglePage,{product:product});
  }
}
