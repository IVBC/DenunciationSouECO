import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Complaint} from '../../search-denunciation/shared/ complaint.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { monitoring } from './shared/monitoring.model';
import { tableManager } from './shared/table-manager.model';
import {DenunciationService} from '../shared/services/denunciation.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

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

  public data: Complaint;
  public tableData: tableManager[] = [];
  public selectedStatus: statusSelect;
  public textStatus: string;
  // public viewDescript: boolean = false;
  public viewUpload = false;
  public displayModal: boolean;
  public status: statusSelect[] = [
    {value: 'UNSEND', viewValue: 'Não Enviada'},
    {value: 'SEND', viewValue: 'Recebida'},
    {value: 'IN_PROGRESS', viewValue: 'Em Análise'},
    {value: 'FORWARDED', viewValue: 'Encaminhado'},
    {value: 'DONE', viewValue: 'Finalizado'}
  ];

  public idByStates = {
    IN_PROGRESS: 3,
    FORWARDED: 4,
    DONE: 5,
  };


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public cols: any[];
  public colsStatus: any[];
  currentStepper: {selectedIndex: number, completed: boolean[]};
  isValidSelect: boolean;
  statusForm: FormGroup;
  private code: string;

  currentAction: string;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  public fileName: string;




  constructor(private fb: FormBuilder, private route: ActivatedRoute, private denunciationService: DenunciationService, private changeDetectorRef: ChangeDetectorRef) {
    this.statusForm = this.fb.group({
      state_id: [null, [Validators.required]],
      details: [null, [Validators.required, Validators.minLength(10)]],
      file: [null]
    });

  }

  ngOnInit() {
    /* Status de Enviado
    * this.currentStepper = {
      selectedIndex: 1,
      completed: [true, false, false, false, false]
    }
    *  */
    /* Status em ANALISE
    * this.currentStepper = {
      selectedIndex: 2,
      completed: [true, true, false, false, false]
    }
    * */

    /* Status de Encaminhado
     this.currentStepper = {
      selectedIndex: 3,
      completed: [true, true, true, false, false]
    }
    * */
    /* Status de Finalizado
    * this.currentStepper = {
      selectedIndex: 4,
      completed: [true, true, true, true, false]
    }
    * */


    this.route.paramMap.subscribe( params => {
      this.code = params.get('id');
      this.loadData();
    })


    // this.data = {
    //     denunciation: {
    //       id: 1,
    //       code: '6081b495',
    //       anonymous: false,
    //       urban: true,
    //       type: 'buraco negro',
    //       description: 'queimada,asdfasdfasd sdfgsdfg sdfg s dfgkjsbdkjfbgsn df sjdfkgos df sdfjglsdk sdfksgdfksdf çs dfhsdfçsd h sdfçlsdfksdf asdfasdfas asdfasdfadfsdf ff sger sdgadfd afdgd adfg  derrubada de floresta virgem e poluição do lago.',
    //       longitude: '234',
    //       latitude: '434234',
    //       reference: 'atras de casa',
    //       state: 'Amazonas',
    //       city: 'Manaus',
    //       zipcode: '69042077',
    //       number: '123A',
    //       district: 'Lirio do Vale',
    //       street: 'canopus',
    //       timestamp: '2020-02-01T18:06:11.608Z',
    //       closed_at: null,
    //       files: [
    //         {
    //           url: 'http://localhost:3333/files/138f7b7b12d52bd08f79fc30c99766b9.png',
    //           name: 'icons8-brake-warning-100.png',
    //           path: '138f7b7b12d52bd08f79fc30c99766b9.png',
    //           size: 4660,
    //           key: null,
    //           id_file: 1
    //         },
    //         {
    //           url: 'http://localhost:3333/files/b66259893a813b802ccfed486201a3f0.jpeg',
    //           name: 'fa1d8ba0-ec38-4c39-990c-f623f561ee40.jpeg',
    //           path: 'b66259893a813b802ccfed486201a3f0.jpeg',
    //           size: 117846,
    //           key: null,
    //           id_file: 2
    //         }
    //       ],
    //       user: {
    //         id: 1,
    //         name: 'Fabio jones alvorada',
    //         email: 'app.ecocidadao@gmail.com',
    //         contact: '92321970',
    //         department: 'TCE',
    //         administrator: true
    //       }
    //     },
    //     statusDenunciation: {
    //       id: 2,
    //       details: 'Your denunciation was successfully sent, soon it will be forwarded to the responsible organ. Wait, please.',
    //       closed_at: null,
    //       createdAt: '2020-02-08T04:23:16.422Z',
    //       state_id: 2,
    //       file: null
    //     }
    //
    //   };




    this.tableData = [
        { status: 'SEND', description: 'asdfasdfasdfasdf', period: 'De 11/11/1111 22:22AM a 11/11/1111 22:22AM' ,  file: 'asdfasdfasdf' },
        { status: 'IN_PROGRESS',  description: 'asdfasdfasdfasdf', period: 'De 22/22/2222 22:22AM a 22/22/2222 22:22AM',  file: 'asdfasdfasdf' },
        { status: 'FORWARDED', description: 'asdfasdfasdfasdf', period: 'De 11/11/1111 22:22AM a 11/11/1111 22:22AM',   file: 'asdfasdfasdf'},
        { status: 'DONE', description: 'asdfasdfasdfasdf' , period: 'De 11/11/1111 22:22AM a 11/11/1111 22:22AM',    file: 'asdfasdfasdf' },

      ];


    this.colsStatus = [
        { field: 'status', header: 'Status' },
        { field: 'description', header: 'Descrição' },
        { field: 'period', header: 'Período' },
        { field: 'file', header: 'Protocolo' },

      ];





    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }


  public setStatus(p) {
    if(p == 'UNSEND') {
      this.textStatus = 'Não Enviada';
      return  'unsend';
    } else if (p == 'SEND') {
      this.textStatus = 'Recebida';
      return  'send';
    } else if (p == 'IN_PROGRESS') {
      this.textStatus = 'Em Análise';
      return  'progress';
    } else if (p == 'DONE') {
      this.textStatus = 'Finalizado';
      return 'done';
    } else if (p == 'FORWARDED') {
      this.textStatus = 'Encaminhado';
      return 'forwarded';
    }
  }


  analyzeOption(option) {
    console.log(option);
    if (this.currentAction === 'edit' || this.data.statusDenunciation.state_id === 5 || this.idByStates[option.value] === this.data.statusDenunciation.state_id + 1) {
      if (option.value == 'DONE') {
        // this.viewDescript = true;
        this.viewUpload = true;
      } else {
        this.viewUpload = false;
      }
      this.isValidSelect = true;
      this.statusForm.patchValue({
        state_id: this.idByStates[option.value]
      });
      if (this.currentAction === 'new') {
        this.statusForm.patchValue({
          details: ''
        });
      }
    } else {
      this.isValidSelect = false;
      this.statusForm.patchValue({
        state_id: null
      });
    }

  }

  showBasicDialog(rowData: any) {
    console.log(rowData);
    if (rowData) {
      this.currentAction = 'edit';
      this.statusForm.patchValue({
        state_id: this.idByStates[rowData.status],
        details: rowData.description
      });
      this.selectedStatus = this.status.find(value => {
        return value.value === rowData.status;
      });
      this.analyzeOption(this.selectedStatus);
    } else {
      this.currentAction = 'new';
      this.selectedStatus = this.status[this.data.historyDenunciation.length];
      this.analyzeOption(this.selectedStatus);
    }

    this.displayModal = true;
  }

  private setStatusStepper(step: number) {
    switch (step) {
      case 1: {
        this.currentStepper = {
          selectedIndex: 1,
          completed: [true, false, false, false, false]
        };
        break;
      }
      case 2: {
        this.currentStepper = {
          selectedIndex: 2,
          completed: [true, true, false, false, false]
        };
        break;
      }
      case 3: {
        this.currentStepper = {
          selectedIndex: 3,
          completed: [true, true, true, false, false]
        };
        break;
      }
      case 4: {
        this.currentStepper = {
          selectedIndex: 4,
          completed: [true, true, true, true, false]
        };
        break;
      }
    }
  }

  openLink(file: any) {
    window.open(file, '_blank');
  }

  onSubmit() {
    this.denunciationService.updateStatus(this.data.denunciation.code, this.statusForm ).subscribe(ans => {
      console.log(ans);
      this.loadData();
    },
      error => {
      console.log(error);
      }
      );
    this.displayModal = false;
  }

  uploadFile($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file)
    this.fileName = file.name;
    this.statusForm.patchValue({
      file
    });
    this.statusForm.get('file').updateValueAndValidity();
    console.log(this.statusForm);
  }

  private loadData() {
    this.denunciationService.getByCode(this.code).subscribe(ans => {
      console.log(ans);
      if (ans) {
        this.data = ans;
        this.changeDetectorRef.detectChanges();
        if (ans.historyDenunciation) {
          this.tableData = ans.historyDenunciation.map(value => ({
            status: value.stateDenunciation.type,
            description: value.details,
            file: value.file ? value.file.url : null,
            period: 'de  12/22/22 23:22 PM as 14/22/22 24:22 PM' })
          );
        }
      }

      this.setStatusStepper(this.data.statusDenunciation.state_id - 1);
    });
  }

  cancelSubmit() {
    this.displayModal = false;
    this.fileName = null;
    this.statusForm.reset();
    this.selectedStatus = null;
    this.isValidSelect = false;
  }

  onSelect(seila) {
    const findStatus = this.data.historyDenunciation.find(value => value.stateDenunciation.type === this.selectedStatus.value );
    console.log(findStatus)
    if (findStatus) {
      this.statusForm.patchValue({
        state_id: this.idByStates[this.selectedStatus.value],
        details: findStatus.details,
      });
      if (findStatus.state_id === 5) {
        this.fileName = findStatus.file.name;
      } else {
        this.fileName = null;
      }
      this.isValidSelect = true;
    } else {
      this.analyzeOption(this.selectedStatus);
    }
  }
}
