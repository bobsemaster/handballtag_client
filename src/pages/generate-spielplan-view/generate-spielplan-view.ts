import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";

/**
 * Generated class for the GenerateSpielplanViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generate-spielplan-view',
  templateUrl: 'generate-spielplan-view.html',
})
export class GenerateSpielplanViewPage {
  public spielzeit: number;
  public pauseZeit: number;
  public turnierBeginnDatum: Date;
  public turnierbeginnTime:Date;
  public sechsMannschaftenGruppe:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController,
              private mannschaftSercvice: MannschaftServiceProvider, private spielService: SpielServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateSpielplanViewPage');
  }

  generateSpielplan() {

  }

}
