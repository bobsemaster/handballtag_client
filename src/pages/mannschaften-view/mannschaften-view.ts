import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MannschaftAddViewPage} from "../mannschaft-add-view/mannschaft-add-view";

/**
 * Generated class for the MannschaftenViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mannschaften-view',
  templateUrl: 'mannschaften-view.html',
})
export class MannschaftenViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MannschaftenViewPage');
  }

  public addMannschaft() {
    this.navCtrl.push(MannschaftAddViewPage)
  }
}
