import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MannschaftenViewPage} from './mannschaften-view';
import {MannschaftAddViewPageModule} from "../mannschaft-add-view/mannschaft-add-view.module";
import {ImportDirectivesModule} from "../../directives/import-directives.module";

@NgModule({
  declarations: [
    MannschaftenViewPage
  ],
  imports: [
    IonicPageModule.forChild(MannschaftenViewPage),
    MannschaftAddViewPageModule,
    ImportDirectivesModule
  ],
})
export class MannschaftenViewPageModule {}
