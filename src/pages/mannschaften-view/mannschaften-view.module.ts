import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MannschaftenViewPage } from './mannschaften-view';

@NgModule({
  declarations: [
    MannschaftenViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MannschaftenViewPage),
  ],
})
export class MannschaftenViewPageModule {}
