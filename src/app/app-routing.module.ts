import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  {
    path: 'home',
    component: ProductListComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductItemDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'confirm-order',
    component: ConfirmationComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
  ProductListComponent,
  ProductItemComponent,
  ProductItemDetailComponent,
  CartComponent,
  ConfirmationComponent
];