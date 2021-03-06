import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit,OnChanges {

  @Input() product:Product;
  @Output() productAdded = new EventEmitter<any>();
  @Input() isDetailed:boolean = false;
  
  imagePath;
  selectedQuantity:number = 1;
  constructor(
    private _sanitizer: DomSanitizer, 
    private router:Router,
    private cartService:CartService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.product){
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.product.img);
    }
  }

  navigateToProduct(id) {
    this.router.navigateByUrl(`product-details/${id}`);
  }

  addToCart(item){
    this.cartService.addToCart(item,this.selectedQuantity);
    this.productAdded.emit(true);
  }

}
