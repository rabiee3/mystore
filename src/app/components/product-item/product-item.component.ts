import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;
  imagePath;
  selectedQuantity:number = 1;
  constructor(
    private _sanitizer: DomSanitizer, 
    private router:Router,
    private cartService:CartService,
    private toasterService:ToasterService) { }

  ngOnInit(): void {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    + this.product.img);
  }

  navigateToProduct(id) {
    this.router.navigateByUrl(`product-details/${id}`);
  }

  addToCart(item){
    this.cartService.addToCart(item,this.selectedQuantity);
    const toast: Toast = {
        type: 'success',
        title: 'Item(s) Added To Cart',
        body: '',
        timeout: 2000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
