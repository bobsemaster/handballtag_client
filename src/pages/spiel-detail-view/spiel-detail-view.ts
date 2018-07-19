import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpielViewHelper} from "../../models/SpielViewHelper";
import {Spiel} from "../../models/Spiel";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";
import {Mannschaft} from "../../models/Mannschaft";
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {PlatzVerschiebenHelper} from "../../models/PlatzVerschiebenHelper";

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
  public allMannschaftGruppeA: Mannschaft[];
  public allMannschaftGruppeB: Mannschaft[];
  public allMannschaftTabelle: Mannschaft[];
  public hasTwoGroups: boolean;
  private days = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];

  constructor(public navCtrl: NavController, public navParams: NavParams, private applicationData: ApplicationDataServiceProvider,
              private spielService: SpielServiceProvider, private mannschaftService: MannschaftServiceProvider, private alertController: AlertController) {
    this.spielView = navParams.get("spielView");
    this.refreshMannschaften();
  }

  private refreshMannschaften() {
    this.mannschaftService.getAllMannschaftToJugend(this.spielView.nextSpiel.heimMannschaft.jugend).subscribe(mannschaften => {
      this.allMannschaftTabelle = mannschaften.filter(value => value.verein.name !== 'placeholder');
      this.getGruppenMannschaften();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpielDetailViewPage');
  }

  public getDay(date: Date): string {
    return this.days[date.getDay()];
  }

  public formatDate(date: Date): string {
    const hours = date.getUTCHours().toLocaleString('de-DE', {minimumIntegerDigits: 2});
    const minutes = date.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
    return `${hours}:${minutes}`
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
      this.spielService.setSpielStandSpielleiter(data, spiel.id).add(this.refreshMannschaften());
    } else {
      this.spielService.setSpielErgebnisKampfgericht(data, spiel.id).add(this.refreshMannschaften);
    }
    spiel.heimTore = data.toreHeim;
    spiel.gastTore = data.toreGast;
  }

  notKoSpiel(spiel: Spiel): boolean {
    return spiel.gruppe !== "C";
  }

  private getGruppenMannschaften() {
    if (this.allMannschaftTabelle.filter(value => value.gruppe === "B").length > 0) {
      this.hasTwoGroups = true;
      this.allMannschaftGruppeA = this.allMannschaftTabelle.filter(value => value.gruppe === "A")
      // a - b, da bei null gleich und sonst nur geschaut wird ob der wert größer oder kleiner null ist
        .sort((a, b) => a.spielplanIndex - b.spielplanIndex);
      this.allMannschaftGruppeB = this.allMannschaftTabelle.filter(value => value.gruppe === "B")
        .sort((a, b) => a.spielplanIndex - b.spielplanIndex);
    }
  }

  changeGroup(mannschaft: Mannschaft, neueGruppe: string) {
    mannschaft.gruppe = neueGruppe;
    this.mannschaftService.changeGruppeOfMannschaft(mannschaft, neueGruppe);
    this.getGruppenMannschaften();
  }

  setIndexUp(mannschaft: Mannschaft, allMannschaft: Mannschaft[]) {
    const index = allMannschaft.indexOf(mannschaft);
    if (index === 0) return;

    const newSpielplanIndex = allMannschaft[index - 1].spielplanIndex - 1;
    mannschaft.spielplanIndex = newSpielplanIndex;
    allMannschaft.sort((a, b) => a.spielplanIndex - b.spielplanIndex);
    this.mannschaftService.setMannschaftSpielPlanIndex(mannschaft, newSpielplanIndex);
  }

  setIndexDown(mannschaft: Mannschaft, allMannschaft: Mannschaft[]) {
    const index = allMannschaft.indexOf(mannschaft);
    if (index === allMannschaft.length - 1) return;

    const newSpielplanIndex = allMannschaft[index + 1].spielplanIndex + 1;
    mannschaft.spielplanIndex = newSpielplanIndex;
    allMannschaft.sort((a, b) => a.spielplanIndex - b.spielplanIndex);
    this.mannschaftService.setMannschaftSpielPlanIndex(mannschaft, newSpielplanIndex);
  }

  changeSpielfeld(spiel: Spiel) {
    this.alertController.create({
      title: 'Platz ändern',
      subTitle: `Platz für das spiel ${spiel.heimMannschaft.name}:${spiel.gastMannschaft.name} ändern`,
      inputs: [
        {
          type: 'number',
          placeholder: 'neuer Platz',
          name: 'newPlatz'
        },
        {
          type: 'number',
          placeholder: 'Pausezeit in min',
          name: 'pauseDuration'
        }
      ],
      buttons: [
        {text: 'Abbrechen'},
        {
          text: 'Ändern',
          handler: data => this.changeSpielfeldSend(spiel, data)
        }
      ]
    }).present();
  }

  changeSpielfeldSend(spiel: Spiel, data: any) {
    const platzVerschiebenHelper = new PlatzVerschiebenHelper();
    platzVerschiebenHelper.pauseDuration = data.pauseDuration;
    platzVerschiebenHelper.spielId = spiel.id;
    const newPlatz = data.newPlatz;
    if (newPlatz < 1 || newPlatz > 5) {
      console.log(`Fehler platz ${newPlatz} gibt es nicht`);

      return;
    }
    platzVerschiebenHelper.newPlatz = newPlatz;

    this.spielService.platzVerschieben(platzVerschiebenHelper);
  }
}
