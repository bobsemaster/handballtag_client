import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MannschaftDetailViewPage} from './mannschaft-detail-view';

@NgModule({
  declarations: [
    MannschaftDetailViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MannschaftDetailViewPage),
  ],
})
export class MannschaftDetailViewPageModule {
}
