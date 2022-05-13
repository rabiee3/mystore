import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products:Product[] = [];
  constructor(private api:APIService) { }

  ngOnInit(): void {
    this.products = this.api.getAllProducts();
  }

}
