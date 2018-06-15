import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpielViewHelper} from "../../models/SpielViewHelper";
import {Spiel} from "../../models/Spiel";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";

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
  private days = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];

  constructor(public navCtrl: NavController, public navParams: NavParams, private applicationData: ApplicationDataServiceProvider,
              private spielService: SpielServiceProvider, private alertController: AlertController) {
    this.spielView = navParams.get("spielView");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpielDetailViewPage');
  }

  public formatDate(date: Date) {
    const hours = date.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2});
    const minutes = date.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
    return `${this.days[date.getDay()]} ${hours}:${minutes}`
  }

  hasNoErgebnis(spiel: Spiel): boolean {
    return spiel.heimTore === 0 && spiel.gastTore === 0;

  }

  isSpielleiter(): boolean {
    return this.applicationData.authenticatedUser.hasRecht("ROLE_SPIELLEITER");

  }

  ergebnisEintragen(spiel: Spiel) {
    this.alertController.create({
      title: 'Ergebnis eintragen',
      message: `Ergebnis für das spiel ${spiel.heimMannschaft.name} : ${spiel.gastMannschaft.name} eintragen`,
      inputs: [
        {
          name: 'toreHeim',
          type: 'number',
          min: 0,
          max: 255,
          placeholder: 'Heim Tore'
        },
        {
          name: 'toreGast',
          type: 'number',
          min: 0,
          max: 255,
          placeholder: 'Gast Tore'
        },
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: 'Ergebnis abschicken',
          handler: data => {
            this.ergebnisAbschicken(data, spiel.id)
          }
        }
      ]
    }).present();
  }

  private ergebnisAbschicken(data: any, spielId: number) {
    if (this.isSpielleiter()) {
      this.spielService.setSpielStandSpielleiter(data, spielId);
    } else {
      this.spielService.setSpielErgebnisKampfgericht(data, spielId);
    }
  }
}
