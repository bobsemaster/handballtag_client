import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MannschaftenViewPage} from './mannschaften-view';
import {MannschaftAddViewPageModule} from "../mannschaft-add-view/mannschaft-add-view.module";

@NgModule({
  declarations: [
    MannschaftenViewPage
  ],
  imports: [
    IonicPageModule.forChild(MannschaftenViewPage),
    MannschaftAddViewPageModule,

  ],
})
export class MannschaftenViewPageModule {
}
