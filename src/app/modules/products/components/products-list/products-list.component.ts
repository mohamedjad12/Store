import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Product } from "../../models/products";
import { ProductsService } from "../../services/products.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productsList:Product[] = [];
  params = {
    limit : 10
  }
  subscription:Subscription = new Subscription();

  constructor(
    private _products:ProductsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(){
    this.spinner.show();
    this.subscription.add(
      this._products.getProductsList(this.params).subscribe(res => {
        this.spinner.hide();
        this.productsList = res;
      },error => {
        this.spinner.hide();
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
