import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DenunciationListComponent} from './denunciation-list/denunciation-list.component';
import {DenunciationFormComponent} from './denunciation-form/denunciation-form.component';
import {AuthGuard} from '../../shared/auth.guard';
import {DenunciationsManagerComponent} from './denunciations-manager.component';


const routes: Routes = [
  {
    path: '',
    component: DenunciationsManagerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DenunciationListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: DenunciationFormComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciationsManagerRoutingModule { }
