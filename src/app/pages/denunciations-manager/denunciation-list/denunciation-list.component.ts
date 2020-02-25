import { Component, OnInit } from '@angular/core';
import { complaintList, label } from '../shared/ complaint-list.model';
import {DenunciationService} from '../shared/services/denunciation.service';
import {FilterUtils} from 'primeng/utils';
import {Router} from '@angular/router';


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
  styleUrls: ['./denunciation-list.component.scss']
})
export class DenunciationListComponent implements OnInit {
  public pt: { dateFormat: string; firstDayOfWeek: number; today: string; clear: string; dayNames: string[]; dayNamesMin: string[]; dayNamesShort: string[]; monthNamesShort: string[]; monthNames: string[]; weekHeader: string };

  constructor( public router: Router, private denunciationService: DenunciationService) { }

  public DATA: complaintList[] = [];
  public code: label[] = [];
  public type: SelectItem[] = [];
  public date: label[] = [];
  public city: SelectItem[] = [];
  public state: SelectItem[] = [];
  public status: SelectItem[] = [];
  public cols: any[];


  public textStatus: string;
  public mapStatus = {
    SEND: 'Enviado',
    DONE: 'Finalizado',
    UNSEND: 'Nao Enviado',
    IN_PROGRESS: 'Em Análise',
    FORWARDED: 'Encaminhada'
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

    this.denunciationService.getAll().subscribe(denunciations => {
      console.log(denunciations);
      this.DATA = denunciations.map(value => {
        return {
          id: value.id,
          code: value.code,
          type: value.type,
          date: value.createdAt,
          city: value.city,
          state: value.state,
          status: value.statesDenunciation[0].type
        };
      });
      console.log(this.DATA);
      this.setLabelDrop();
      console.log(this.type);

    });

    // this.DATA = [
    //   {
    //     id: 1,
    //     code: '1321316',
    //     type: 'buraco negro',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Manaus',
    //     state: 'Amazonas',
    //     status: 'SEND'
    //   },
    //   {
    //     id: 2,
    //     code: '353455543',
    //     type: 'buraco black',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Manaus',
    //     state: 'Amazonas',
    //     status: 'IN_PROGRESS'
    //   },
    //   {
    //     id: 3,
    //     code: '3453453',
    //     type: 'queimada negra',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Maués',
    //     state: 'Amazonas',
    //     status: 'FORWARDED'
    //   },
    //   {
    //     id: 4,
    //     code: '345345',
    //     type: 'black hole',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Manaus',
    //     state: 'Amazonas',
    //     status: 'DONE'
    //   },
    //   {
    //     id: 5,
    //     code: '53793783',
    //     type: 'fenda negra',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Alenquer',
    //     state: 'Para',
    //     status: 'DONE'
    //   },
    //   {
    //     id: 6,
    //     code: '53793783',
    //     type: 'teste',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Lisboa',
    //     state: 'Para',
    //     status: 'FORWARDED'
    //   },
    //   {
    //     id: 7,
    //     code: '53793783',
    //     type: 'fenda negra',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'santarem',
    //     state: 'Para',
    //     status: 'DONE'
    //   },
    //   {
    //     id: 8,
    //     code: '53793783',
    //     type: 'fenda negra',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Alenquer',
    //     state: 'Para',
    //     status: 'IN_PROGRESS'
    //
    //   },
    //   {
    //     id: 9,
    //     code: '53793783',
    //     type: 'fenda negra',
    //     date: '2020-02-01T18:06:11.608Z',
    //     city: 'Alenquer',
    //     state: 'Para',
    //     status: 'SEND'
    //
    //   },
    //
    // ];




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


    public setStatus(p) {
      if (p == 'SEND') {
        this.textStatus = 'Enviado';
        return (this.textStatus, 'send' );
      } else if (p == 'IN_PROGRESS') {
        this.textStatus = 'Em Análise';
        return (this.textStatus, 'progress' );
      } else if (p == 'DONE') {
        this.textStatus = 'Finalizado';
        return (this.textStatus, 'done' );
      } else if (p == 'FORWARDED') {
        this.textStatus = 'Encaminhado';
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


