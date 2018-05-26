import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VereinViewPage } from './verein-view';

@NgModule({
  declarations: [
    VereinViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VereinViewPage),
  ],
  entryComponents:[
    VereinViewPage
  ]
})
export class VereinViewPageModule {}
