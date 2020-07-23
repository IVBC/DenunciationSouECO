import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DenunciationService} from '../../denunciations-manager/shared/services/denunciation.service';
import {Complaint} from '../shared/ complaint.model';

@Component({
  selector: 'app-denuciation-fetch',
  templateUrl: './denuciation-fetch.component.html',
  styleUrls: ['./denuciation-fetch.component.scss']
})
export class DenuciationFetchComponent implements OnInit {
  public code: string;
  public form: FormGroup;
  loading: boolean;
  private data: Complaint;


  constructor(
    public fb: FormBuilder,
    public router: Router,
    public toastrService: ToastrService,
    public denunciationService: DenunciationService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      code: [null,  [Validators.required]],
    });
  }

  onSubmit() {
    this.code = this.form.get('code').value;
    this.loadData();
  }


  private loadData() {
    this.loading = true;
    this.denunciationService.getByCode(this.code).subscribe(ans => {
      this.loading = false;
      if (ans && Object.keys(ans).length !== 0 ) {
        this.data = ans;
        this.toastrService.success(`Código: ${this.data.denunciation.code}`, 'Denúncia Encontrada!');
        this.router.navigate(['search', this.code], { state: { data: this.data } });
      } else {
        this.toastrService.error('Por favor, verifique o código da Denúncia e tente novamente.', 'Código Inválido!');
      }

    }, error => {
      this.loading = false;
      this.toastrService.error('Por favor, tente novamente mais tarde.', 'Falha na comunição com o Servidor');
    });
  }


  toHome() {
    this.router.navigate(['']);
  }
}
