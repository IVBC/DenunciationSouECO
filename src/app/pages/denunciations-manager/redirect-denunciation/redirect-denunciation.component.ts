import { Component, OnInit } from '@angular/core';
import { SecondaryRecipient, PrimaryRecipient } from '../shared/Models/Recipients-model';
import { RedirectDenunciationService } from '../shared/services/redirect-denunciation.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  recipientForm: FormGroup;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;


  denunciation_type_options: DenunciationType[];
  public displayEmailPrimary = true;
  public loadingPrimaryEmail = true;
  displayDialog: boolean;
  selectedOptionTypeDenunciation: any;

  public isModeEditForm = false;
  public primaryRecipient: PrimaryRecipient;
  public secondaryRecipients: SecondaryRecipient[];
  selectedDenunciation: DenunciationType;
  recipient: SecondaryRecipient = {};
  selectedDirection: SecondaryRecipient;
  // newCar: boolean;
  // public denunciationData: SecondaryRecipient;
  cols: any[];
  private loadingSecondaryRecipients: boolean;
  private loadingDeleteRecipients = false;
  private loadingAddRecipient: boolean;

  constructor(
    private redirectDenunciation: RedirectDenunciationService,
    public toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

      this.requestPrimaryEmail();
      this.requestSecondaryEmails();
      this.buildRecipientForm();



      this.cols = [
          { field: 'name', header: 'Nome' },
          { field: 'email', header: 'Email' },
          { field: 'denunciation_type', header: 'Denúncia' },
          { field: 'city', header: 'Cidade' },
          { field: 'state', header: 'Estado' },
          { field: 'country', header: 'País' },
          { field: 'include_primary', header: 'Incluir email principal' },
      ];

      this.denunciation_type_options = [
        {name: 'Lixo' , value: 'lixo' },
        {name: 'Água' , value: 'água' },
        {name: 'Tráfico de animais silvestres', value: 'tráfico de animais silvestres'},
        {name: 'Queimadas' , value: 'queimadas' },
        {name: 'Desmatamentos'  , value: 'desmatamentos' },
        {name: 'Pesca predatória' , value: 'pesca predatória' },
        {name: 'Resíduos perigosos' , value: 'resíduos perigosos' },
        {name: 'Outros' , value: 'outros' },
      ];


      // this.primaryEmail =  {
      //   id: 1,
      //   name: 'Tribunal de Contas do Estado do Amazonas - TCE',
      //   email: 'Tribunaldecontas@gmail.com',
      //   denunciation_type: 'outros',
      //   include_primary: false,
      //   state: 'amazonas',
      //   city: 'manaus',
      //   country: 'brasil',
      //   is_primary: true,
      //   updatedAt: '2020-06-02T05:48:19.658Z',
      //   createdAt: '2020-06-02T05:48:19.658Z'
      //   };

      // this.secondaryRecipients = [
      //     {
      //       id: 4,
      //       name: 'Teste Destino 4',
      //       email: 'destino4@gmail.com',
      //       denunciation_type: 'Lixo',
      //       country: 'brasil',
      //       state: 'amazonas',
      //       city: 'manaus',
      //       include_primary: false
      //     },
      //     {
      //       id: 3,
      //       name: 'Teste Destino 3',
      //       email: 'destino3@gmail.com',
      //       denunciation_type: 'Água',
      //       country: 'brasil',
      //       state: 'amazonas',
      //       city: 'manaus',
      //       include_primary: true
      //     },
      //     {
      //       id: 2,
      //       name: 'Teste Destino 2',
      //       email: 'destino2@gmail.com',
      //       denunciation_type: 'Queimadas',
      //       country: 'brasil',
      //       state: 'amazonas',
      //       city: 'manaus',
      //       include_primary: false
      //     },
      //     {
      //       id: 1,
      //       name: 'outro lugar',
      //       email: 'lugar2outrosdsaguas@gmail.com',
      //       denunciation_type: 'Pesca predatória',
      //       country: 'brasil',
      //       state: 'amazonas',
      //       city: 'manaus',
      //       include_primary: false
      //     }
      //   ];

  }

  showDialogToAdd() {
      console.log(this.recipientForm)

      this.isModeEditForm = false;
      this.selectedDirection = {};
      this.recipientForm.reset();
      this.recipientForm.controls.include_primary.setValue(false);
      this.displayDialog = true;

  }

  editEmail() {
    this.displayEmailPrimary = false;
  }

  updateEmail() {
    this.loadingPrimaryEmail = true;
    this.redirectDenunciation.updateRecipientPrimary(this.primaryRecipient.email).subscribe(response => {
      console.log('response', response);
      this.primaryRecipient = response;
      this.loadingPrimaryEmail = false;

    }, error => {
      this.loadingPrimaryEmail = false;
    });
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
    this.recipientForm.patchValue({... this.selectedDirection });
    this.recipientForm.controls.denunciation_type.setValue(this.denunciation_type_options.find(opt => opt.value.toLowerCase() === this.recipientForm.controls.denunciation_type.value.toLowerCase()));
    this.isModeEditForm = true;

    // this.newCar = false;
      // this.selectedDirection = this.cloneCar(event.);
    this.displayDialog = true;

  }

  // cloneCar(recipient: SecondaryRecipient): SecondaryRecipient {
  //     let car = {};
  //     for (let prop in recipient) {
  //         car[prop] = recipient[prop];
  //     }
  //     return car;
  // }


  private requestPrimaryEmail() {
    this.loadingPrimaryEmail = true;
    this.redirectDenunciation.getRecipientPrimary().subscribe((response) => {
      console.log('response', response);
      this.primaryRecipient = response;
      this.loadingPrimaryEmail = false;
    }, error => {
      console.log(error);
      this.loadingPrimaryEmail = false;
    });
  }

  private requestSecondaryEmails() {
      this.loadingSecondaryRecipients = true;
      this.redirectDenunciation.getAllSecondaryRecipients().subscribe(response => {
        console.log(response);
        this.secondaryRecipients = response;
        this.secondaryRecipients = this.secondaryRecipients.map(sec => ({
          ... sec,
            city: sec.city.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()),
            state: sec.state.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()),
            country: sec.country.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()),
            denunciation_type: sec.denunciation_type.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())
        }));
        this.loadingSecondaryRecipients = false;
      }, error => {
        console.log(error);
        this.loadingSecondaryRecipients = false;
      });
  }

  removeRecipient() {
    console.log(this.selectedDirection);


    this.loadingDeleteRecipients = true;
    this.redirectDenunciation.removeSecondaryRecipients(this.selectedDirection.id).subscribe(() => {
      this.toastrService.success('Destinatário removido com sucesso');
      this.requestSecondaryEmails();
      this.loadingDeleteRecipients = false;
      this.displayDialog = false;
    }, error => {
      console.log(error);
      this.toastrService.error('Falha ao remover o destinatário. Por favor, tente novamente.', 'Falha na comunicação com o Servidor.');
      this.loadingDeleteRecipients = false;
    });

  }

  saveRecipient() {
    this.loadingAddRecipient = true;
    const newRecipient = {
      ... this.recipientForm.value,
      denunciation_type: this.recipientForm.controls.denunciation_type.value.value
    }
    console.log(newRecipient);
    if (!this.isModeEditForm) {
      this.redirectDenunciation.newRecipientSecondary(newRecipient).subscribe(() => {
        this.toastrService.success(`Destinário ${this.selectedDirection.name} cadastrado com sucesso!`);
        this.requestSecondaryEmails();
        this.loadingAddRecipient = false;
        this.displayDialog = false;

      }, error => {
        this.toastrService.error('Falha ao cadastrar o novo destinatário. Por favor, tente novamente.', 'Falha na comunicação com o Servidor.');
        this.loadingAddRecipient = false;
      });
    } else {
      this.redirectDenunciation.updateRecipientSecondary(newRecipient).subscribe(() => {
        this.toastrService.success(`Destinário ${this.selectedDirection.name} editado com sucesso!`);
        this.requestSecondaryEmails();
        this.loadingAddRecipient = false;
        this.displayDialog = false;

      }, error => {
        this.toastrService.error('Falha ao editar o destinatário. Por favor, tente novamente.', 'Falha na comunicação com o Servidor.');
        this.loadingAddRecipient = false;
      });
    }

  }

  private buildRecipientForm() {
      this.recipientForm = this.formBuilder.group({
        id: [null],
        name: [null, [Validators.required, Validators.minLength(6)]],
        email: [null, [Validators.required, Validators.email]],
        denunciation_type:  [null, [Validators.required]],
        city:  [null, [Validators.required]],
        state:  [null, [Validators.required]],
        country:  [null, [Validators.required]],
        include_primary: [false]
      });
  }
}
