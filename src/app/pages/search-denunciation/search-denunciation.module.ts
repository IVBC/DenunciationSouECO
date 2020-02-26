import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDenunciationRoutingModule } from './search-denunciation-routing.module';
import { DenuciationFetchComponent } from './denuciation-fetch/denuciation-fetch.component';
import { DenuciationFindComponent } from './denuciation-find/denuciation-find.component';
import {MatStepperModule, MatStepLabel} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { Zipcode } from '../shared/pipes/zipcodePipe';
import { Phone } from '../shared/pipes/phonePipe';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';




@NgModule({
  declarations: [
    DenuciationFetchComponent,
    DenuciationFindComponent,
    Zipcode,
    Phone

  ],
    imports: [
        CommonModule,
        SearchDenunciationRoutingModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule,
        MatIconModule,
        TableModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        TabViewModule,
        NgxGalleryModule,


        // MatLabel
    ]
})
export class SearchDenunciationModule { }
