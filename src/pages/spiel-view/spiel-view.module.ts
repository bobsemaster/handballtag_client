import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SpielViewPage} from './spiel-view';
import {GenerateSpielplanViewPageModule} from "../generate-spielplan-view/generate-spielplan-view.module";
import {SpielDetailViewPageModule} from "../spiel-detail-view/spiel-detail-view.module";

@NgModule({
  declarations: [
    SpielViewPage,
  ],
  imports: [
    SpielDetailViewPageModule,
    GenerateSpielplanViewPageModule,
    IonicPageModule.forChild(SpielViewPage),
  ],
})
export class SpielViewPageModule {
}
