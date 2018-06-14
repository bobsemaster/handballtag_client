import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpielViewHelper} from "../../models/SpielViewHelper";

/**
 * Generated class for the SpielDetailViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spiel-detail-view',
  templateUrl: 'spiel-detail-view.html',
})
export class SpielDetailViewPage {

  public spielView: SpielViewHelper;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.spielView = navParams.get("spielView");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpielDetailViewPage');
  }

}
