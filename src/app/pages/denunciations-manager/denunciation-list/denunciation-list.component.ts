import { Component, OnInit } from '@angular/core';
import { complaintList, label } from '../shared/ complaint-list.model';
import {DenunciationService} from '../shared/services/denunciation.service';



@Component({
  selector: 'app-denunciation-list',
  templateUrl: './denunciation-list.component.html',
  styleUrls: ['./denunciation-list.component.scss']
})
export class DenunciationListComponent implements OnInit {

  public DATA: complaintList[] = [];
  public code: label[] = [];
  public type: label[] = [];
  public date: label[] = [];
  public city: label[] = [];
  public state: label[] = [];
  public status: label[] = [];
  public cols: any[];

  public textStatus: string;


  constructor(  private denunciationService: DenunciationService) { }

  ngOnInit() {

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
      const types = [ ... new Set(this.DATA.map(x => x.type))]
      this.type = types.map(x => ({ label: x}));

      const cities = [ ... new Set(this.DATA.map(x => x.city))]
      this.city = cities.map(x => ({ label: x}));

      const states = [ ... new Set(this.DATA.map(x => x.state))]
      this.state = states.map(x => ({ label: x}));

      const status = [ ... new Set(this.DATA.map(x => x.status))]
      this.status = status.map(x => ({ label: x}));
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

    // onYearChange(event, dt) {
    //     if (this.yearTimeout) {
    //         clearTimeout(this.yearTimeout);
    //     }

    //     this.yearTimeout = setTimeout(() => {
    //         dt.filter(event.value, 'year', 'gt');
    //     }, 250);
    // }
}


