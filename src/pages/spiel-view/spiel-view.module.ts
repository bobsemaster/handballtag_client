import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SpielViewPage} from './spiel-view';
import {GenerateSpielplanViewPageModule} from "../generate-spielplan-view/generate-spielplan-view.module";

@NgModule({
  declarations: [
    SpielViewPage,
  ],
  imports: [
    GenerateSpielplanViewPageModule,
    IonicPageModule.forChild(SpielViewPage),
  ],
})
export class SpielViewPageModule {}
