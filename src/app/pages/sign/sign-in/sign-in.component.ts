import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router,
              public toastrService: ToastrService
              ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }
  loginUser() {
    console.log(this.signinForm.value);
    this.authService.signIn(this.signinForm.value).subscribe((ans) => {
      console.log(this.authService);
    }, error => {
      if (error.code === 401) {
        this.toastrService.error('Por favor, verifique o seu email e senha e tente novamente.', 'Falha na autenticação');
      } else {
        this.toastrService.error('Por favor, verifique o seu email e senha e tente novamente.', 'Falha na autenticação');
      }
      console.log(error)
    });

  }
}
