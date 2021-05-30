import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },

  { path: '**', redirectTo: '' }

];
const mainRoutes: Routes = [
  { path: 'ar', children: routes },
  { path: 'en', children: routes },
  { path: '', redirectTo: 'en', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(mainRoutes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
