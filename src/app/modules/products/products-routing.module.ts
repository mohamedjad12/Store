import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { AddProductComponent } from "./components/add-product/add-product.component";

const routes: Routes = [
  {
    path: 'list',
    component : ProductsListComponent
  },
  {
    path: 'add-product',
    component : AddProductComponent
  },
  {
    path: 'product/:id',
    component : ProductDetailsComponent
  },
  {
    path: 'product',
    redirectTo : 'list'
  },
  {
    path : '',
    redirectTo : 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
