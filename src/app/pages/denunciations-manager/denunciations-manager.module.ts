import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciationsManagerRoutingModule } from './denunciations-manager-routing.module';
import { DenunciationListComponent } from './denunciation-list/denunciation-list.component';
import { DenunciationFormComponent } from './denunciation-form/denunciation-form.component';
import { TableModule } from "primeng/table";
import { SliderModule } from "primeng/slider";
import { DialogModule } from "primeng/dialog";
import { MultiSelectModule } from "primeng/multiselect";
import { ContextMenuModule } from "primeng/contextmenu";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';

@NgModule({
  declarations: [DenunciationListComponent, DenunciationFormComponent],
  imports: [
    CommonModule,
    DenunciationsManagerRoutingModule,
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
		CodeHighlighterModule
  ]
})
export class DenunciationsManagerModule { }
