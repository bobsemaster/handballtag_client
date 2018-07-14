import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {Mannschaft} from "../../models/Mannschaft";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Spiel} from "../../models/Spiel";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";

/**
 * Generated class for the MannschaftDetailViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mannschaft-detail-view',
  templateUrl: 'mannschaft-detail-view.html',
})
export class MannschaftDetailViewPage {
  public mannschaft: Mannschaft = this.navParams.get("mannschaft");
  public allMannschaftSpiel: Spiel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private mannschaftService: MannschaftServiceProvider,
              private applicationData: ApplicationDataServiceProvider, private alertController: AlertController, private spielService: SpielServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MannschaftDetailViewPage');
    this.mannschaftService.getAllSpielToMannschaft(this.mannschaft.id).subscribe(allSpiel => this.allMannschaftSpiel = allSpiel);
  }


  deleteMannschaft() {
    this.alertController.create({
      title: 'Mannschaft Löschen',
      subTitle: `Willst du wirklich die ${this.mannschaft.jugend.typ} ${this.mannschaft.jugend.jahrgang} ${this.mannschaft.name} von ${this.mannschaft.verein.name} löschen?`,
      buttons: [
        {text: 'Nein'},
        {
          text: 'Ja',
          handler: () => {
            this.mannschaftService.deleteMannschaft(this.mannschaft.id).add(this.closeView());
          }
        }
      ]
    }).present();
  }

  private closeView() {
    this.navCtrl.pop();
  }

  setFotoGemacht(hasFoto: boolean) {
    this.mannschaftService.setFotoGemacht(hasFoto, this.mannschaft.id).map(data => Mannschaft.fromJSON(data))
      .subscribe(mannschaft => this.mannschaft = mannschaft);
  }

  public formatDate(date: Date): string {
    const hours = date.getUTCHours().toLocaleString(undefined, {minimumIntegerDigits: 2});
    const minutes = date.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
    return `${hours}:${minutes}`
  }

  public notKoSpiel(spiel: Spiel): boolean {
    return spiel.gruppe !== "C";
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
            this.ergebnisAbschicken(data, spiel)
          }
        }
      ]
    }).present();
  }

  private ergebnisAbschicken(data: any, spiel: Spiel) {
    if (spiel.spielTyp !== "GRUPPENSPIEL" && data.toreGast === data.toreHeim) {
      this.alertController.create({
        title: "Fehler",
        message: "Nur Gruppenspiele können mit einem Unentschieden enden!",
        buttons: [{text: "Ok"}]
      }).present();
      return;
    }
    if (this.isSpielleiter()) {
      this.spielService.setSpielStandSpielleiter(data, spiel.id);
    } else {
      this.spielService.setSpielErgebnisKampfgericht(data, spiel.id);
    }
    spiel.heimTore = data.toreHeim;
    spiel.gastTore = data.toreGast;
  }
}
