import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModusPage} from './modus';

@NgModule({
  declarations: [
    ModusPage,
  ],
  imports: [
    IonicPageModule.forChild(ModusPage),
  ],
})
export class ModusPageModule {
}
