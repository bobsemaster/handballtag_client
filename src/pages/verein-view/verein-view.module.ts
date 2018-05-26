import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VereinViewPage} from './verein-view';
import {VereinAddViewPageModule} from "../verein-add-view/verein-add-view.module";

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
  ]
})
export class VereinViewPageModule {}
