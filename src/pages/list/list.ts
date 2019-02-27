import { Component } from '@angular/core';
import { NavController, NavParams, Events, ViewController, LoadingController } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  //variables
  categoriesRows: any;
  categories: any[];
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private categoryService: CategoryProvider,private events: Events, private productService: ProductsProvider,
    private loadingCtrl: LoadingController,private nativePageTransitions: NativePageTransitions,
    private viewCtrl: ViewController) {
    this.loadCategories();
    }

    ionViewWillEnter() {
     // this.loadCategories();
      this.viewCtrl.showBackButton(false);
    }
  
    ionViewDidLeave() {
      this.events.unsubscribe('categoriesLoaded');
    }

    loadCategories(){
  /*      let loader = this.loadingCtrl.create({
        content: 'Loading categories..'
      });
      loader.present();
      this.categoryService.getCategories();
     
        this.categories = this.categoryService.categories;
        this.categoriesRow = Array.from(Array(Math.ceil(this.categories.length/2)).keys());
        loader.dismiss();
     
    }*/
    let loader = this.loadingCtrl.create({
      content: 'Loading categories..'
    });
    loader.present();
    this.categoryService.getCategories();

   this.events.subscribe('categoryLoaded', () => {
    this.categories = this.categoryService.categories;
    this.categoriesRows = Array.from(Array(Math.ceil(this.categories.length/2)).keys());
    loader.dismiss();
     
   })
 }
 
 showProducts(categories){
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
  this.navCtrl.push(ProductsPage,{categories:categories}); 
 }

  
}
