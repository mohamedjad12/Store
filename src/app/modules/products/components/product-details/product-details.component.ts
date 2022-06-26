import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "../../models/products";
import { ProductsService } from "../../services/products.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:any;
  dataLoad = false;
  productData:Product = {};
  subscription:Subscription = new Subscription();

  constructor(
    private router:Router,
    private _products:ProductsService,
    private spinner: NgxSpinnerService,
    private activateRouter:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];
    if(this.id){
      this.getData();
    } else {
      this.router.navigate(['products/list']);
    }
  }

  getData(){
    this.spinner.show();
    this.subscription.add(
      this._products.getProductDetails(this.id).subscribe(res => {
        this.dataLoad = true;
        this.spinner.hide();
        this.productData = res;
      },error => {
        this.spinner.hide();
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
