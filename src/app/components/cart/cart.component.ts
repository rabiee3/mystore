import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';
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
    private router:Router,
    private toasterService:ToasterService
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

      if(this.cartData.length <= 0){
        this.toasterService.popAsync({
          type: 'warning',
          title: 'Please add items to your cart',
          body: '',
          timeout: 2000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        });
        return;
      }

      if(!this.fullname || this.fullname.length < 3){
        this.toasterService.popAsync({
          type: 'error',
          title: 'Name must minimum of 3 chars',
          body: '',
          timeout: 2000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        });
        return;
      }

      if(!this.address || this.address.length < 6){
        this.toasterService.popAsync({
          type: 'error',
          title: 'Address must minimum of 6 chars',
          body: '',
          timeout: 2000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        });
        return;
      }

      var reg = /^\d+$/;
      if(!this.creditcard || this.creditcard.length < 13 || !reg.test(this.creditcard)){
        this.toasterService.popAsync({
          type: 'error',
          title: 'Credit card must be a 13 digit number',
          body: '',
          timeout: 2000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        });
        return;
      }

      this.router.navigateByUrl(`confirm-order`,{ state: { 
        fullname:this.fullname , 
        address: this.address,
        creditcard: this.creditcard,
        amountorder: this.totalPrice,
      } });
    
  }

  removeFromCart(evt){
    this.cartService.removeFromCart(evt);
    this.refreshCartData();
    this.calculateTotal();

    const toast: Toast = {
      type: 'error',
      title: 'Item(s) Removed From Cart',
      body: '',
      timeout: 2000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
    }
}
