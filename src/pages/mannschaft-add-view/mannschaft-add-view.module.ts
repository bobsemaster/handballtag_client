import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MannschaftAddViewPage} from './mannschaft-add-view';
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {TabelleServiceProvider} from "../../providers/tabelle-service/tabelle-service";

@NgModule({
  declarations: [
    MannschaftAddViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MannschaftAddViewPage),
  ], providers: [
    TabelleServiceProvider,
    ApplicationDataServiceProvider
  ]
})
export class MannschaftAddViewPageModule {
}
