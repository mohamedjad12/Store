import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

import { ProductsService } from "../../services/products.service";
import { MessagesService } from "src/app/shared/services/messages.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  categoriesList = [];
  subscription:Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private messages: MessagesService,
    private _products:ProductsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadFrom();
    this.getCategoriesList();
  }

  getCategoriesList(){
    this.spinner.show();
    this.subscription.add(
      this._products.getAllCategories().subscribe(res => {
        this.categoriesList = res;
        this.spinner.hide();
      },error => {
        this.spinner.hide();
      })
    )
  }

  loadFrom() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
      category: [null, Validators.required],
    })
  }

  save() {
    this.form.markAllAsTouched();
    this.submitted = true;
    if (this.form.invalid) {
      return
    }
    const body = this.form.value;
    this.spinner.show();
    this.subscription.add(
      this._products.addProduct(body).subscribe(res => {
        this.spinner.hide();
        this.messages.openSnackBar('Product Added successfully', 'Success');
      },error => {
        this.spinner.hide();
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
