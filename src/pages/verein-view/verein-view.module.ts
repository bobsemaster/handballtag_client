import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VereinViewPage} from './verein-view';
import {VereinAddViewPageModule} from "../verein-add-view/verein-add-view.module";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";
import {MannschaftDetailViewPageModule} from "../mannschaft-detail-view/mannschaft-detail-view.module";

@NgModule({
  declarations: [
    VereinViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VereinViewPage),
    VereinAddViewPageModule,
    MannschaftDetailViewPageModule
  ],
  entryComponents: [
    VereinViewPage
  ],
  providers: [
    VereinServiceProvider
  ]
})
export class VereinViewPageModule {
}
