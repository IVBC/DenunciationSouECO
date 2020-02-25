import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Complaint } from '../shared/ complaint.model';
import { monitoring } from '../../denunciations-manager/denunciation-form/shared/monitoring.model';
import { tableManager } from '../../denunciations-manager/denunciation-form/shared/table-manager.model';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute} from '@angular/router';
import {DenunciationService} from '../../denunciations-manager/shared/services/denunciation.service';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel
} from '../../denunciations-manager/shared/components/confirmation-dialog/confirmation-dialog.component';

interface statusSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-denuciation-find',
  templateUrl: './denuciation-find.component.html',
  styleUrls: ['./denuciation-find.component.scss'],
  // providers: [{
  //   provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  // }],

})
export class DenuciationFindComponent implements OnInit {

  @ViewChild('stepper',  { static: false }) myStepper: MatStepper;

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
    UNSEND: 1,
    SEND: 2,
    IN_PROGRESS: 3,
    FORWARDED: 4,
    DONE: 5,
  };
  public statesById = {
    1: 'UNSEND',
    2: 'SEND',
    3: 'IN_PROGRESS',
    4: 'FORWARDED',
    5: 'DONE',
  };
  public mapStatus = {
    SEND: 'Enviado',
    DONE: 'Finalizado',
    UNSEND: 'Nao Enviado',
    IN_PROGRESS: 'Em Análise',
    FORWARDED: 'Encaminhada'
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




  constructor(private fb: FormBuilder, private route: ActivatedRoute, private denunciationService: DenunciationService,
              private changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, private datePipe: DatePipe) {
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




    // this.tableData = [
    //     { status: 'SEND', description: 'asdfasdfasdfasdf', period: 'De 11/11/1111 22:22AM a 11/11/1111 22:22AM' ,  file: 'asdfasdfasdf' },
    //     { status: 'IN_PROGRESS',  description: 'asdfasdfasdfasdf', period: 'De 22/22/2222 22:22AM a 22/22/2222 22:22AM',  file: 'asdfasdfasdf' },
    //     { status: 'FORWARDED', description: 'asdfasdfasdfasdf', period: 'De 11/11/1111 22:22AM a 11/11/1111 22:22AM',   file: 'asdfasdfasdf'},
    //     { status: 'DONE', description: 'asdfasdfasdfasdf' , period: 'De 11/11/1111 22:22AM a 11/11/1111 22:22AM',    file: 'asdfasdfasdf' },
    //   ];


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
    if(this.myStepper) {
      console.log('setando o selected ndexe', step)
      this.myStepper.selectedIndex = step;
      console.log(this.myStepper);
    }
    switch (step) {
      case 0: {
        this.currentStepper = {
          selectedIndex: 0,
          completed: [true, false, false, false, false]
        };
        break;
      }
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
    console.log(this.data.denunciation.code, this.statusForm);
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

      if (ans) {
        this.data = ans;
        // this.changeDetectorRef.detectChanges();
        console.log(this.data);
        if (ans.historyDenunciation) {
          this.tableData = ans.historyDenunciation.map(value => ({
            status: value.stateDenunciation.type,
            description: value.details,
            file: value.file ? value.file.url : null,
            period: [this.datePipe.transform(new Date(value.createdAt), 'dd/MM/yy hh:mm a'),
              value.closed_at ? this.datePipe.transform(new Date(value.closed_at), 'dd/MM/yy hh:mm a') : null]
          }));
        }
        // `De ${this.datePipe.transform(new Date(value.createdAt), 'dd/MM/yy hh:mm a')}
        //              às ${this.datePipe.transform(new Date(value.closed_at), 'dd/MM/yy hh:mm a')}`
        console.log(this.data.statusDenunciation.state_id - 1);
        setTimeout(()=> {console.log(this.myStepper)}, 3000 );
        this.setStatusStepper(this.data.statusDenunciation.state_id - 1);
      }

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

  deleteStatus(rowData) {
    console.log(rowData)
    const idStatus = this.idByStates[rowData.status];
    const newStatus = this.statesById[idStatus - 1];

    const message = `Você tem certeza que deseja apagar esse Status?. O Status será redefinido para "${this.mapStatus[newStatus]}" e todas as informaçoes posteriores serão perdidas.`;

    const dialogData = new ConfirmDialogModel('Confirmação', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log(dialogResult);
        this.denunciationService.deleteStatus(this.data.denunciation.code, idStatus).subscribe(ans => {
          this.loadData();

        }, error => console.log(error));
      }
    });
  }

  toolTipDescription(status: number | string) {
    const obj = this.data.historyDenunciation.find(value => this.statesById[value.state_id] === status);
    return obj.stateDenunciation.description;
  }
}

