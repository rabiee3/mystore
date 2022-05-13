import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/CartItem';
import { Product } from '../interfaces/Product';
import { APIService } from './api.service';

@Injectable()
export class CartService {
    private cartData:CartItem[] = [];

    constructor(private apiService:APIService){}

    addToCart(item:Product,quantity:number){
        let itemFound = this.cartData.find(x=>x.id === item.id);
        if(itemFound){
            itemFound.quantity += parseInt(quantity.toString());
        }else{
            let result = this.apiService.getProductById(item.id);
            this.cartData.push({
                id:result.id,
                quantity:parseInt(quantity.toString()),
                img:item.img,
                price:item.price,
                name:item.name
            });
        }
    }

    removeFromCart(item:CartItem){
        this.cartData = this.cartData.filter(x=>x.id !== item.id);
    }

    changeQuantity(value:number,id:number){
        let itemFound = this.cartData.find(x=>x.id === id);
        itemFound.quantity = parseInt(value.toString());
    }

    getCartItems(){
        return this.cartData;
    }
}