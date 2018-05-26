import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VereinAddViewPage} from './verein-add-view';

@NgModule({
  declarations: [
    VereinAddViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VereinAddViewPage),
  ],
})
export class VereinAddViewPageModule {}
