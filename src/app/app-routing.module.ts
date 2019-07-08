import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入会被路由的组件


const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
