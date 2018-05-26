import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MannschaftAddViewPage } from './mannschaft-add-view';
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

@NgModule({
  declarations: [
    MannschaftAddViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MannschaftAddViewPage),
  ],providers:[
    ApplicationDataServiceProvider
  ]
})
export class MannschaftAddViewPageModule {}
