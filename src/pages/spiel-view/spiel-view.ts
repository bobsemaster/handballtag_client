import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";
import {GenerateSpielplanViewPage} from "../generate-spielplan-view/generate-spielplan-view";

/**
 * Generated class for the SpielViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spiel-view',
  templateUrl: 'spiel-view.html',
})
export class SpielViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController, private mannschaftService: MannschaftServiceProvider,
              private spielService: SpielServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpielViewPage');
  }

  generateSpielplan() {
    this.navCtrl.push(GenerateSpielplanViewPage);
  }
}
