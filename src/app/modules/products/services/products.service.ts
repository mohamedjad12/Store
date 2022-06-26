import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Product, ProductBody } from "../models/products";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private baseURL = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  /**
   * @param id
   * @param params
   * @returns {Products}
 */
  getProductsList(params?: any): Observable<Product[]> {
    const url = `${this.baseURL}products`;
    return this._http.get<any>(url, { params: params });
  }

  /**
   * @param id
   * @returns {Product}
 */
  getProductDetails(id: number): Observable<any> {
    const url = `${this.baseURL}products/${id}`;
    return this._http.get(url);
  }

  /**
   * @param productData
   */
  addProduct(productData: ProductBody): Observable<any> {
    const url = `${this.baseURL}products`;
    return this._http.post(url,productData);
  }

  /**
   *
   */
  getAllCategories(): Observable<any> {
    const url = `${this.baseURL}products/categories`;
    return this._http.get(url);
  }
}
