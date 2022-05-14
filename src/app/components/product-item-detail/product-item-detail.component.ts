import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {

  product:object;
  productId:number;
  constructor(
    private actRoute:ActivatedRoute,
    private apiService:APIService
    ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.product = this.apiService.getProductById(this.productId);
    });
  }

}
