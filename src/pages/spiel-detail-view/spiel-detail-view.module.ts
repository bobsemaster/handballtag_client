import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SpielDetailViewPage} from './spiel-detail-view';

@NgModule({
  declarations: [
    SpielDetailViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SpielDetailViewPage),
  ],
})
export class SpielDetailViewPageModule {
}
