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
  public loading: boolean;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router,
              public toastrService: ToastrService,
              ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
    this.loading = false;
  }
  loginUser() {

    this.loading = true;
    this.authService.signIn(this.signinForm.value).subscribe((ans) => {
      this.loading = false;
      const name  = this.authService.currentUser.name;
      this.toastrService.success('Bem Vindo ' + name + '!');
      this.router.navigate(['denunciations']);
    }, error => {
      this.loading = false;
      if (error.status === 401) {
        this.toastrService.error('O email e senha inserido não corresponde a nenhuma conta. Tente novamente.', 'Falha na autenticação');
      } else {
        this.toastrService.error('Por favor, tente mais tarde.', 'Falha na Comunicaçao com o Servidor');
      }
      console.log(error)
    });

  }

  toHome() {
    this.router.navigate(['']);
  }
}
