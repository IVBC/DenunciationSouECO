import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { complaint } from '../shared/ complaint.model';

@Component({
  selector: 'app-denuciation-find',
  templateUrl: './denuciation-find.component.html',
  styleUrls: ['./denuciation-find.component.scss'],
  // providers: [{
  //   provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  // }],

})
export class DenuciationFindComponent implements OnInit {

  public DATA: complaint[] = [];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

}

