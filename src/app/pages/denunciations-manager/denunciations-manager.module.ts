import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciationsManagerRoutingModule } from './denunciations-manager-routing.module';
import { DenunciationListComponent } from './denunciation-list/denunciation-list.component';
import { DenunciationFormComponent } from './denunciation-form/denunciation-form.component';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { DenunciationsManagerComponent } from './denunciations-manager.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CalendarModule} from 'primeng/calendar';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {CheckboxModule} from 'primeng/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { UserDialogComponent } from './shared/components/user-dialog/user-dialog.component';
import { RedirectDenunciationComponent } from './redirect-denunciation/redirect-denunciation.component';


@NgModule({
  declarations: [DenunciationListComponent, DenunciationFormComponent, DenunciationsManagerComponent, ConfirmationDialogComponent, UserDialogComponent, RedirectDenunciationComponent],
  imports: [
    CommonModule,
    DenunciationsManagerRoutingModule,
    TableModule,
    DialogModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    CodeHighlighterModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    CalendarModule,
    MatTooltipModule,
    MatDatepickerModule,
    NgxGalleryModule,
    TriStateCheckboxModule,
    InputSwitchModule,
    CheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmationDialogComponent],
})
export class DenunciationsManagerModule { }
