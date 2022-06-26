import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path : '**',
    redirectTo : 'products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
