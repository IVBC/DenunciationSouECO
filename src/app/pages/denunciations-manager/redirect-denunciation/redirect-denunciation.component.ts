import { Component, OnInit } from '@angular/core';
import { Recipient, Primary } from '../shared/Models/Recipients-model';
import {RedirectDenunciationService} from '../shared/services/redirect-denunciation.service';

export interface DenunciationType {
  name?: string;
  value?: string;
}

@Component({
  selector: 'app-redirect-denunciation',
  templateUrl: './redirect-denunciation.component.html',
  styleUrls: ['./redirect-denunciation.component.scss']
})
export class RedirectDenunciationComponent implements OnInit {

  denunciation_type: DenunciationType[];
  public displayEmailPrimary: boolean = true;
  displayDialog: boolean;
  public primaryEmail: Primary;
  public data: Recipient[];
  selectedDenunciation: DenunciationType;
  recipient: Recipient = {};
  selectedDirection: Recipient;
  // newCar: boolean;
  // public denunciationData: Recipient;
  cols: any[];

  constructor(private redirectDenunciation: RedirectDenunciationService) { }

  ngOnInit() {
      // this.redirectDenunciation.getAll().then(cars => this.cars = cars);

      this.cols = [
          { field: 'name', header: 'Nome' },
          { field: 'email', header: 'Email' },
          { field: 'denunciation_type', header: 'Denúncia' },
          { field: 'city', header: 'Cidade' },
          { field: 'state', header: 'Estado' },
          { field: 'country', header: 'País' },
          { field: 'include_primary', header: 'Primário' },
      ];

      this.denunciation_type = [
        {name: "Lixo" , value: "Lixo" },
        {name: "Água" , value: "Água" },
        {name: "Queimadas" , value: "Queimadas" },
        {name: "Desmatamentos"  , value: "Desmatamentos" },
        {name: "Pesca predatória" , value: "Pesca predatória" },
        {name: "Resíduos perigosos" , value: "Resíduos perigosos" },
        {name: "Outros" , value: "Outros" },
      ]
    

      this.primaryEmail =  {
        "id": 1,
        "name": "Tribunal de Contas do Estado do Amazonas - TCE",
        "email": "Tribunaldecontas@gmail.com",
        "denunciation_type": "outros",
        "include_primary": false,
        "state": "amazonas",
        "city": "manaus",
        "country": "brasil",
        "is_primary": true,
        "updatedAt": "2020-06-02T05:48:19.658Z",
        "createdAt": "2020-06-02T05:48:19.658Z"
        }

        this.data = [
          {
            "id": 4,
            "name": "Teste Destino 4",
            "email": "destino4@gmail.com",
            "denunciation_type": "Lixo",
            "country": "brasil",
            "state": "amazonas",
            "city": "manaus",
            "include_primary": false
          },
          {
            "id": 3,
            "name": "Teste Destino 3",
            "email": "destino3@gmail.com",
            "denunciation_type": "Água",
            "country": "brasil",
            "state": "amazonas",
            "city": "manaus",
            "include_primary": true
          },
          {
            "id": 2,
            "name": "Teste Destino 2",
            "email": "destino2@gmail.com",
            "denunciation_type": "Queimadas",
            "country": "brasil",
            "state": "amazonas",
            "city": "manaus",
            "include_primary": false
          },
          {
            "id": 1,
            "name": "outro lugar",
            "email": "lugar2outrosdsaguas@gmail.com",
            "denunciation_type": "Pesca predatória",
            "country": "brasil",
            "state": "amazonas",
            "city": "manaus",
            "include_primary": false
          }
        ]
    
  }

  showDialogToAdd() {
      // this.newCar = true;
      this.selectedDirection = {};
      this.displayDialog = true;

  }

  editEmail(){
    this.displayEmailPrimary = false;
  }

  updateEmail(){
    this.displayEmailPrimary = true;
  }

  // save() {
  //     let cars = [...this.cars];
  //     if (this.newCar)
  //         cars.push(this.car);
  //     else
  //         cars[this.cars.indexOf(this.selectedCar)] = this.car;

  //     this.cars = cars;
  //     this.car = null;
  //     this.displayDialog = false;
  // }

  // delete() {
  //     let index = this.cars.indexOf(this.selectedCar);
  //     this.cars = this.cars.filter((val, i) => i != index);
  //     this.car = null;
  //     this.displayDialog = false;
  // }

  onRowSelect(event) {
    console.log(this.selectedDirection);
      // this.newCar = false;
      // this.selectedDirection = this.cloneCar(event.data);
      this.displayDialog = true;
     
  }

  // cloneCar(recipient: Recipient): Recipient {
  //     let car = {};
  //     for (let prop in recipient) {
  //         car[prop] = recipient[prop];
  //     }
  //     return car;
  // }

}
