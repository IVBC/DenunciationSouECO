import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DenunciationListComponent} from './denunciation-list/denunciation-list.component';
import {DenunciationFormComponent} from './denunciation-form/denunciation-form.component';


const routes: Routes = [
  {
    path: '',
    component: DenunciationListComponent,
  },
  {
    path: ':id',
    component: DenunciationFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciationsManagerRoutingModule { }
