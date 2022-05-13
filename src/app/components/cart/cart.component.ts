import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/CartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: any[] = [];
  imagePath;
  totalPrice:number;

  fullname:string;
  address:string;
  creditcard:string;

  constructor(
    private cartService: CartService,
    private _sanitizer: DomSanitizer,
    private router:Router
  ) {}

  refreshCartData(){
    this.cartData = this.cartService.getCartItems().map((x) => {
      return {
        id:x.id,
        name:x.name,
        price:x.price,
        quantity:x.quantity,
        img: this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.img)
      };
    });

  }

  ngOnInit(): void {
    this.cartData = [];
    this.totalPrice = 0;
    this.refreshCartData();
    this.calculateTotal();
  }

  calculateTotal(){
    let total:number = 0;
    this.cartData.forEach(x=>{
      total += (parseFloat(x.price.toString()) * parseInt(x.quantity.toString()));
    });
    this.totalPrice = total;
  }

  changeQuantity(evt,id){
    this.cartService.changeQuantity(evt.target.value,id);
    this.refreshCartData();
    this.calculateTotal();
  }

  confirmPurchase(){
    if(this.fullname && this.address && this.creditcard && this.cartData.length > 0){
      this.router.navigateByUrl(`confirm-order`,{ state: { 
        fullname:this.fullname , 
        address: this.address,
        creditcard: this.creditcard,
        amountorder: this.totalPrice,
      } });
    }
  }
}
