import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignModule { }
