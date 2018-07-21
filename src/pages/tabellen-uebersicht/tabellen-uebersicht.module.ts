import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabellenUebersichtPage } from './tabellen-uebersicht';

@NgModule({
  declarations: [
    TabellenUebersichtPage,
  ],
  imports: [
    IonicPageModule.forChild(TabellenUebersichtPage),
  ],
})
export class TabellenUebersichtPageModule {}
