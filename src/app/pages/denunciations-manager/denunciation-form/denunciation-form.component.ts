import { Component, OnInit } from '@angular/core';
import { complaint } from '../../search-denunciation/shared/ complaint.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { monitoring } from './shared/monitoring.model';

interface statusSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-denunciation-form',
  templateUrl: './denunciation-form.component.html',
  styleUrls: ['./denunciation-form.component.scss']
})
export class DenunciationFormComponent implements OnInit {

  public DATA: complaint[] = [];
  public tableData: monitoring[] = [];
  public textStatus: string;
  public viewDescript: boolean = false;
  public viewUpload: boolean = false;
  public status: statusSelect[] = [
    {value: 'SEND', viewValue: 'Enviado'},
    {value: 'IN_PROGRESS', viewValue: 'Em Análise'},
    {value: 'FORWARDED', viewValue: 'Encaminhado'},
    {value: 'DONE', viewValue: 'Finalizado'}
  ];;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public cols: any[];
  public colsStatus: any[];



  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.DATA = [
      {
        "denunciation": {
          "id": 1,
          "code": "6081b495",
          "anonymous": false,
          "urban": true,
          "type": "buraco negro",
          "description": "queimada,asdfasdfasd sdfgsdfg sdfg s dfgkjsbdkjfbgsn df sjdfkgos df sdfjglsdk sdfksgdfksdf çs dfhsdfçsd h sdfçlsdfksdf asdfasdfas asdfasdfadfsdf ff sger sdgadfd afdgd adfg  derrubada de floresta virgem e poluição do lago.",
          "longitude": "234",
          "latitude": "434234",
          "reference": "atras de casa",
          "state": "Amazonas",
          "city": "Manaus",
          "zipcode": "69042077",
          "number": "123A",
          "district": "Lirio do Vale",
          "street": "canopus",
          "timestamp": "2020-02-01T18:06:11.608Z",
          "closed_at": null,
          "files": [
            {
              "url": "http://localhost:3333/files/138f7b7b12d52bd08f79fc30c99766b9.png",
              "name": "icons8-brake-warning-100.png",
              "path": "138f7b7b12d52bd08f79fc30c99766b9.png",
              "size": 4660,
              "key": null,
              "id_file": 1
            },
            {
              "url": "http://localhost:3333/files/b66259893a813b802ccfed486201a3f0.jpeg",
              "name": "fa1d8ba0-ec38-4c39-990c-f623f561ee40.jpeg",
              "path": "b66259893a813b802ccfed486201a3f0.jpeg",
              "size": 117846,
              "key": null,
              "id_file": 2
            }
          ],
          "user": {
            "id": 1,
            "name": "Fabio jones alvorada",
            "email": "app.ecocidadao@gmail.com",
            "contact": "92321970",
            "department": "TCE",
            "administrator": true
          }
        },
        "statusDenunciation": {
          "id": 2,
          "details": "Your denunciation was successfully sent, soon it will be forwarded to the responsible organ. Wait, please.",
          "closed_at": null,
          "createdAt": "2020-02-08T04:23:16.422Z",
          "state_id": 2,
          "file": null
        }

      }];
      console.log(this.DATA[0]);




      this.tableData = [
        { status: 'SEND', dateinit: 'Status', dateend: 'asdfasdfasd' },
        { status: 'IN_PROGRESS', dateinit: 'Status', dateend: 'asdfasdfasd' },
        { status: 'FORWARDED', dateinit: 'Status', dateend: 'asdfasdfasd' },
        { status: 'DONE', dateinit: 'Status', dateend: 'asdfasdfasd' },

      ];


      this.colsStatus = [
        { field: 'status', header: 'Status' },
        { field: 'dateinit', header: 'Período' },

      ];





    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }


  public setStatus(p){
    if(p == 'SEND'){
      this.textStatus = 'Enviado';
      return (this.textStatus, 'send' )
    }else if(p == 'IN_PROGRESS'){
      this.textStatus = 'Em Análise';
      return (this.textStatus, 'progress' )
    }else if(p == 'DONE'){
      this.textStatus = 'Finalizado';
      return (this.textStatus, 'done' )
    }else if(p == 'FORWARDED'){
      this.textStatus = 'Encaminhado';
      return (this.textStatus, 'forwarded' )
    }
  }


  analyzeOption(option){
    if(option == 'DONE'){
      this.viewDescript = true;
      this.viewUpload = true;
      return (this.viewDescript, this.viewUpload);
    }else if(option == 'FORWARDED'){
      this.viewDescript = true;
      this.viewUpload = false;
      return (this.viewDescript, this.viewUpload);
    }
  }

}
