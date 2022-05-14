import { Component, OnInit } from '@angular/core';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {

  constructor(private toasterService:ToasterService) { }

  ngOnInit(): void {
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
