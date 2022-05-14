import { Component, OnInit } from '@angular/core';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';
import { Product } from 'src/app/interfaces/Product';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products:Product[] = [];
  constructor(
    private api:APIService,
    private toasterService:ToasterService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(){
    this.products = await this.api.getAllProducts();
  }

  onProductAdded(evt){
    if(evt){
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

}
