import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DenunciationListComponent} from '../denunciations-manager/denunciation-list/denunciation-list.component';
import {DenunciationFormComponent} from '../denunciations-manager/denunciation-form/denunciation-form.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'create',
    component: SignUpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule { }
