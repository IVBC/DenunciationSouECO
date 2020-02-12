import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciationsManagerRoutingModule } from './denunciations-manager-routing.module';
import { DenunciationListComponent } from './denunciation-list/denunciation-list.component';
import { DenunciationFormComponent } from './denunciation-form/denunciation-form.component';


@NgModule({
  declarations: [DenunciationListComponent, DenunciationFormComponent],
  imports: [
    CommonModule,
    DenunciationsManagerRoutingModule
  ]
})
export class DenunciationsManagerModule { }
