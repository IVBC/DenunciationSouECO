import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { complaintList, label } from '../shared/ complaint-list.model';
import {DenunciationService} from '../shared/services/denunciation.service';
import {FilterUtils} from 'primeng/utils';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../shared/utils/format-date';


export interface SelectItem {
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}



@Component({
  selector: 'app-denunciation-list',
  templateUrl: './denunciation-list.component.html',
  styleUrls: ['./denunciation-list.component.scss'],
  providers: [

    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class DenunciationListComponent implements OnInit {
  public pt: { dateFormat: string; firstDayOfWeek: number; today: string; clear: string; dayNames: string[]; dayNamesMin: string[]; dayNamesShort: string[]; monthNamesShort: string[]; monthNames: string[]; weekHeader: string };

  constructor( public router: Router, private denunciationService: DenunciationService) { }


  dateCalendar = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  public DATA: complaintList[] = [];
  public code: label[] = [];
  public type: SelectItem[] = [];
  public date: label[] = [];
  public city: SelectItem[] = [];
  public state: SelectItem[] = [];
  public status: SelectItem[] = [];
  public cols: any[];

  public alert: {status: boolean, type?: 'EMPTY' | 'ERROR_REQUEST'};
  public loading: boolean = false;

  public textStatus: string;
  public mapStatus = {
    SEND: 'RECEBIDA',
    DONE: 'FINALIZADA',
    UNSEND: 'NÃO ENVIADA',
    IN_PROGRESS: 'EM ANÁLISE',
    FORWARDED: 'ENCAMINHADA'
  };

    // onYearChange(event, dt) {
    //     if (this.yearTimeout) {
    //         clearTimeout(this.yearTimeout);
    //     }

    //     this.yearTimeout = setTimeout(() => {
    //         dt.filter(event.value, 'year', 'gt');
    //     }, 250);
    // }
  dateSeach: any;
  en: any;

  ngOnInit() {
    this.alert = {status: false};
    FilterUtils['custom'] = (value: Date, filter: Date): boolean => {
      console.log(value, filter)
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return (value.getDate() == filter.getDate() && value.getMonth() == filter.getMonth() && value.getFullYear() === filter.getFullYear());
    }

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };

    this.requestData();

    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'type', header: 'Tipo' },
      { field: 'date', header: 'Data' },
      { field: 'city', header: 'Cidade' },
      { field: 'state', header: 'Estado' },
      { field: 'status', header: 'Status' },
      { field: 'action', header: 'Ações' },
    ];

    }

    setLabelDrop() {
      const types = [ ... new Set(this.DATA.map(x => x.type))];
      this.type = types.map(x => ({ label: x, value: x}));
      this.type.unshift({ label: 'Todos', value: null });

      const cities = [ ... new Set(this.DATA.map(x => x.city))];
      this.city = cities.map(x => ({ label: x, value: x}));
      this.city.unshift({ label: 'Todos', value: null });

      const states = [ ... new Set(this.DATA.map(x => x.state))];
      this.state = states.map(x => ({ label: x, value: x}));
      this.state.unshift({ label: 'Todos', value: null });

      const status = [ ... new Set(this.DATA.map(x => x.status))];
      this.status = status.map(x => ({ label: this.mapStatus[x], value: x}));
      this.status.unshift({ label: 'Todos', value: null });

      //
      // for (let i = 0; i < this.DATA.length; i++ ) {
      //   this.date.push({label: this.DATA[i].date.toISOString()});
      // }
      console.log('varialve type', this.type);

    }

    public requestData(){
      this.loading = true;
      this.denunciationService.getAll().subscribe(denunciations => {
        this.loading = false;
        console.log(denunciations);
        if (denunciations.length) {
          this.alert = {status: false};
          this.DATA = denunciations.map(value => {
            return {
              id: value.id,
              code: value.code,
              type: value.type.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()),
              date: value.createdAt,
              city: value.city.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()),
              state: value.state.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()),
              status: value.statesDenunciation[0].type
            };
          });
          this.setLabelDrop();
        } else {
          this.alert = {status: true, type: 'EMPTY'};
        }
      }, error => {
        this.loading = false;
        this.alert = {status: true, type: 'ERROR_REQUEST'}
        // console.log('ERRRRRRRRRORR REQUEST', this.alert);
      });
    }




    public setStatus(p) {
      if (p == 'SEND') {
        this.textStatus = 'RECEBIDA';
        return (this.textStatus, 'send' );
      } else if (p == 'IN_PROGRESS') {
        this.textStatus = 'EM ANÁLISE';
        return (this.textStatus, 'progress' );
      } else if (p == 'DONE') {
        this.textStatus = 'FINALIZADA';
        return (this.textStatus, 'done' );
      } else if (p == 'FORWARDED') {
        this.textStatus = 'ENCAMINHADA';
        return (this.textStatus, 'forwarded' );
      }
    }

  onSelectDateFilter($event: any, col, dt) {
    console.log($event, dt);
    console.log(this.dateSeach)
    dt.filter(this.dateSeach, col.field, 'custom')
  }

  onClearClick(col, dt) {
    console.log(col, dt);
    dt.filter(null, col.field, col.filterMatchMode);

  }

  viewDenunciation(code) {
    console.log(code);
    this.router.navigate(['denunciations/' + code]);
  }
}


