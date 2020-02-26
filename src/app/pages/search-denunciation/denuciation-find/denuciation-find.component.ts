import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Complaint } from '../shared/ complaint.model';
import { monitoring } from '../../denunciations-manager/denunciation-form/shared/monitoring.model';
import { tableManager } from '../../denunciations-manager/denunciation-form/shared/table-manager.model';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {DenunciationService} from '../../denunciations-manager/shared/services/denunciation.service';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel
} from '../../denunciations-manager/shared/components/confirmation-dialog/confirmation-dialog.component';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {ToastrService} from 'ngx-toastr';

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

  public data: Complaint;
  public tableData: tableManager[] = [];
  public textStatus: string;

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



  public colsStatus: any[];
  currentStepper: { selectedIndex: number, completed: boolean[] };

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
              private changeDetectorRef: ChangeDetectorRef, private datePipe: DatePipe, public toastrService: ToastrService, private router: Router) {

  }

  ngOnInit() {
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


    if (history.state.data) {
      this.loadData(history.state.data);
    } else {
      this.route.paramMap.subscribe(params => {
        this.code = params.get('code');
        this.requestData();
      });
    }


    //
    // this.route.paramMap.subscribe(params => {
    //   this.code = params.get('code');
    //   this.loadData();
    // });



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
    console.log(this.currentStepper);
  }

  openLink(file: any) {
    window.open(file, '_blank');
  }





  private loadData(ans) {
    if (ans) {
      this.data = ans;
      this.galleryImages = this.data.denunciation.files.map(value => ({small: value.url, medium: value.url, big: value.url }));
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
      this.setStatusStepper(this.data.statusDenunciation.state_id - 1);
    }
  }

  toolTipDescription(status: number | string) {
    const obj = this.data.historyDenunciation.find(value => this.statesById[value.state_id] === status);
    return obj.stateDenunciation.description;
  }

  private requestData() {
    this.denunciationService.getByCode(this.code).subscribe(ans => {

      if (ans) {
        this.data = ans;

        this.galleryImages = this.data.denunciation.files.map(value => ({small: value.url, medium: value.url, big: value.url }));

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
        this.setStatusStepper(this.data.statusDenunciation.state_id - 1);
      }

    });
  }
}

