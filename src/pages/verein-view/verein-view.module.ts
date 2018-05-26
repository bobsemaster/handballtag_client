import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VereinViewPage} from './verein-view';
import {VereinAddViewPageModule} from "../verein-add-view/verein-add-view.module";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";

@NgModule({
  declarations: [
    VereinViewPage
  ],
  imports: [
    IonicPageModule.forChild(VereinViewPage),
    VereinAddViewPageModule
  ],
  entryComponents:[
    VereinViewPage
  ],
  providers:[
    VereinServiceProvider
  ]
})
export class VereinViewPageModule {}
