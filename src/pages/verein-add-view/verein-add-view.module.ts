import {NgModule} from '@angular/core';
import {AlertController, IonicPageModule} from 'ionic-angular';
import {VereinAddViewPage} from './verein-add-view';
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";

@NgModule({
  declarations: [
    VereinAddViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VereinAddViewPage),
  ],
  providers:[
    VereinServiceProvider,
    AlertController,
  ]
})
export class VereinAddViewPageModule {}
