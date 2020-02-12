import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from '../sign/sign-in/sign-in.component';
import {SignUpComponent} from '../sign/sign-up/sign-up.component';
import {DenuciationFetchComponent} from './denuciation-fetch/denuciation-fetch.component';
import {DenuciationFindComponent} from './denuciation-find/denuciation-find.component';


const routes: Routes = [
  {
    path: '',
    component: DenuciationFetchComponent,
  },
  {
    path: ':code',
    component: DenuciationFindComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchDenunciationRoutingModule { }
