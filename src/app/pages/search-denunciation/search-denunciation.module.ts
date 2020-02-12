import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDenunciationRoutingModule } from './search-denunciation-routing.module';
import { DenuciationFetchComponent } from './denuciation-fetch/denuciation-fetch.component';
import { DenuciationFindComponent } from './denuciation-find/denuciation-find.component';


@NgModule({
  declarations: [DenuciationFetchComponent, DenuciationFindComponent],
  imports: [
    CommonModule,
    SearchDenunciationRoutingModule
  ]
})
export class SearchDenunciationModule { }
