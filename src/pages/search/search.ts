import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { FormControl } from '@angular/forms';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
    //para la busqueda
    searchItem : string="";
    items : any;
    searchControl : FormControl;
    searching: any= false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private productService: ProductsProvider) {
  //inicializamos la busqueda
  this.searchItem=this.navParams.get("searchQuery");
  this.searchControl=new FormControl();

  }

  ionViewDidLoad() {
    this.setFilteredItem();

    console.log('ionViewDidLoad SearchPage');
  }

  setFilteredItem(){
    //agregamos una pantalla auxiliar para el filtro
   this.items=this.productService.filterItems(this.searchItem);
    //console.log(this.items);
  }

}
