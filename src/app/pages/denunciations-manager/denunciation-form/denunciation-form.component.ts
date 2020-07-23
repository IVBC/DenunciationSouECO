import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Complaint} from '../../search-denunciation/shared/ complaint.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {monitoring} from './shared/monitoring.model';
import {tableManager} from './shared/table-manager.model';
import {DenunciationService} from '../shared/services/denunciation.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ConfirmationDialogComponent, ConfirmDialogModel} from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {MatStepper} from '@angular/material/stepper';
import {ToastrService} from 'ngx-toastr';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';

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
    SEND: 'Recebida',
    DONE: 'Finalizado',
    UNSEND: 'Não Enviada',
    IN_PROGRESS: 'Em Análise',
    FORWARDED: 'Encaminhado'
  };


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public cols: any[];
  public colsStatus: any[];
  currentStepper: { selectedIndex: number, completed: boolean[] };
  isValidSelect: boolean;
  statusForm: FormGroup;
  private code: string;

  currentAction: string;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  public fileName: string;
  loadingStepper = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public loading: boolean = false;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private denunciationService: DenunciationService,
              private changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, private datePipe: DatePipe, public toastrService: ToastrService) {
  }

  ngOnInit() {
    this.buildForm();
    this.setFileValidators();
    this.galleryOptions = [
      {thumbnails: false},
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'http://localhost:3333/files/c4d6a3048faa0b74002fd1b53d899f14.jpeg',
        medium: 'http://localhost:3333/files/c4d6a3048faa0b74002fd1b53d899f14.jpeg',
        big: 'http://localhost:3333/files/c4d6a3048faa0b74002fd1b53d899f14.jpeg'
      },
      {
        small: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        medium: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        big: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
      },
      {
        small: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        medium: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        big: 'https://preview.ibb.co/mwsA6R/img7.jpg'
      },{
        small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
      },
    ];

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


    this.route.paramMap.subscribe(params => {
      this.code = params.get('id');
      this.loadData();
    });


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
      {field: 'status', header: 'Status'},
      {field: 'description', header: 'Descrição'},
      {field: 'period', header: 'Período'},
      {field: 'file', header: 'Protocolo'},
    ];


    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  buildForm() {
    this.statusForm = this.fb.group({
      state_id: [null, [Validators.required]],
      details: [null, [Validators.required, Validators.minLength(20)]],
      file: [null]
    });
  }


  setFileValidators() {
    const fileControl = this.statusForm.get('file');
    this.statusForm.get('state_id').valueChanges
      .subscribe(stateId => {

        if (stateId === 5) {
          fileControl.setValidators([Validators.required]);
        } else {
          fileControl.setValidators(null);
        }
        fileControl.updateValueAndValidity();
      });
  }


  public setStatus(p) {
    if (p == 'UNSEND') {
      this.textStatus = 'Não Enviada';
      return 'unsend';
    } else if (p == 'SEND') {
      this.textStatus = 'Recebida';
      return 'send';
    } else if (p == 'IN_PROGRESS') {
      this.textStatus = 'Em Análise';
      return 'progress';
    } else if (p == 'DONE') {
      this.textStatus = 'Finalizado';
      return 'done';
    } else if (p == 'FORWARDED') {
      this.textStatus = 'Encaminhado';
      return 'forwarded';
    }
  }


  analyzeOption(option) {
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
      this.statusForm.reset();
      this.currentAction = 'new';
      this.selectedStatus = this.status[this.data.historyDenunciation.length];
      this.analyzeOption(this.selectedStatus);
    }

    this.displayModal = true;
  }

  private setStatusStepper(step: number) {

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
    this.loadingStepper = false;
    setTimeout(() => {
      this.loadingStepper = true;
    }, 100);
  }

  openLink(file: any) {
    window.open(file, '_blank');
  }

  onSubmit() {
    this.loading = true;

    this.denunciationService.updateStatus(this.data.denunciation.code, this.statusForm).subscribe(ans => {
        this.loading = false;
        this.toastrService.success('Status Atualizado com sucesso !');
        this.loadData();
        this.displayModal = false;
      },
      error => {
        this.loading = false;
        this.toastrService.error('Erro ao atualizar o Status. Por favor, tente novamente.', 'Falha na comunicação com o Servidor.');
      }
    );

  }

  uploadFile($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.fileName = file.name;
    this.statusForm.patchValue({
      file
    });
    this.statusForm.get('file').updateValueAndValidity();
  }

  private loadData() {
    this.denunciationService.getByCode(this.code).subscribe(ans => {

      if (ans) {
        this.data = ans;
        this.data.denunciation.city = this.data.denunciation.city.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
        this.data.denunciation.state =  this.data.denunciation.state.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());

        this.galleryImages = this.data.denunciation.files.map(value => ({small: value.url, medium: value.url, big: value.url }));

        // this.changeDetectorRef.detectChanges();
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
    const findStatus = this.data.historyDenunciation.find(value => value.stateDenunciation.type === this.selectedStatus.value);
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
    const idStatus = this.idByStates[rowData.status];
    const newStatus = this.statesById[idStatus - 1];

    const message = `Você tem certeza que deseja apagar o status de "${this.mapStatus[rowData.status]}"? O Status será redefinido para o anterior, ou seja, "${this.mapStatus[newStatus]}" e todas as informaçoes posteriores serão perdidas.`;

    const dialogData = new ConfirmDialogModel('Confirmação', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.denunciationService.deleteStatus(this.data.denunciation.code, idStatus).subscribe(ans => {
          this.toastrService.success('O Status foi removido e atualizado com sucesso!');
          this.loadData();

        }, error => {
          this.toastrService.error('Nao foi possível remover o Status. Por favor, tente novamente.', 'Falha na comunição com o Servidor');
        });
      }
    });
  }

  toolTipDescription(status: number | string) {
    const obj = this.data.historyDenunciation.find(value => this.statesById[value.state_id] === status);
    return obj.stateDenunciation.description;
  }
}
