import { Component, OnInit } from '@angular/core';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {

  product:object;
  constructor(
    private actRoute:ActivatedRoute,
    private apiService:APIService,
    private toasterService:ToasterService
    ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      this.updateProduct(params['id']);
    });
  }

  async updateProduct(id){
    this.product = await this.apiService.getProductById(id);
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
