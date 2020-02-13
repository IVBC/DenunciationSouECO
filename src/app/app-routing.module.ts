import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/sign/sign.module').then(m => m.SignModule)
  },
  {
    path: 'denunciations',
    loadChildren: () => import('./pages/denunciations-manager/denunciations-manager.module').then(m => m.DenunciationsManagerModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search-denunciation/search-denunciation.module').then(m => m.SearchDenunciationModule)
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
