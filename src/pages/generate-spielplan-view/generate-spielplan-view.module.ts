import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GenerateSpielplanViewPage} from './generate-spielplan-view';

@NgModule({
  declarations: [
    GenerateSpielplanViewPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateSpielplanViewPage),
  ],
})
export class GenerateSpielplanViewPageModule {
}
