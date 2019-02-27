import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

@Injectable()
export class ProductsProvider{
    //obtenemos datos de las tablas promociones y productos
    promoRef = firebase.database().ref("promotions");
    productRef = firebase.database().ref("products");
    promos: Array<any> = [];
    products:Array<any> =[];
    constructor(public events: Events) {
  
    }

    getPromoSlider() {
        this.promoRef.once('value', (snap) => {
          this.promos = [];
          if (snap.val()) {
            var tempPromo = snap.val();
            for (var key in tempPromo) {
              let singlePromo = {
                id: key,
                name: tempPromo[key].thumb
              };
    
              this.promos.push(singlePromo);
            }
          }
          this.events.publish('promoLoaded');
        });
      }


      getProductByCategory(categoryId){
        console.log("error "+categoryId);
        console.log("error "+categoryId.id);
        //console.log("valor snaop "+snap.id);
        //let sirve para declarar variables basicas
        //x tendra el id de la categoria
        //orderByChild tendra de parametro el id de la categoria
        let  x: string=categoryId.id;
        this.productRef.orderByChild('category_id').equalTo(x).once('value',(snap)=>{
        //this.productRef.orderByChild('category_id').equalTo(categoryId).once('value',(snap)=>{
          this.products = [];
          if (snap.val()) {
            var tempProducts = snap.val();
            for (var key in tempProducts) {
              let singleProduct = {
                id:key,
                category_id: tempProducts[key].category_id,
                name: tempProducts[key].name,
                images:tempProducts[key].images,
                price:tempProducts[key].price,
                rating:tempProducts[key].rating,
                sale_price:tempProducts[key].sale_price,
                short_description:tempProducts[key].short_description,
                thumb:tempProducts[key].thumb
              };
    
              this.products.push(singleProduct);
            }
          }
          this.events.publish('productsLoaded');
        })
      }
    
      getProducts() {
        this.productRef.once('value', (snap) => {
          this.products = [];
          if (snap.val()) {
            var tempProducts = snap.val();
            for (var key in tempProducts) {
              let singleProduct = {
                id:key,
                category_id: tempProducts[key].category_id,
                name: tempProducts[key].name,
                images:tempProducts[key].images,
                price:tempProducts[key].price,
                rating:tempProducts[key].rating,
                sale_price:tempProducts[key].sale_price,
                short_description:tempProducts[key].short_description,
                thumb:tempProducts[key].thumb
              };
    
              this.products.push(singleProduct);
            }
          }
          this.events.publish('productsLoaded');
        });
      }
    
      filterItems(searchTerm){
 
        return this.products.filter((item) => {
        //    console.log("posible producto "+item.name.toLowerCase().includes(searchTerm.toLowerCase()));
             return item.name.toLowerCase().includes(searchTerm.toLowerCase());
         });  
  
     }
    
}
 
