import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LageplanPage} from './lageplan';

@NgModule({
  declarations: [
    LageplanPage,
  ],
  imports: [
    IonicPageModule.forChild(LageplanPage),
  ],
})
export class LageplanPageModule {}
