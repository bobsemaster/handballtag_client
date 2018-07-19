import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";
import {GenerateSpielplanViewPage} from "../generate-spielplan-view/generate-spielplan-view";
import {Spiel} from "../../models/Spiel";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {SpielViewHelper} from "../../models/SpielViewHelper";
import {SpielDetailViewPage} from "../spiel-detail-view/spiel-detail-view";
import {Jugend, JugendEnum} from "../../models/Jugend";
import {Mannschaft} from "../../models/Mannschaft";
import {PauseHelper} from "../../models/PauseHelper";

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
  public allSpiel: Spiel[];
  public allSpielView: SpielViewHelper[];
  public allJugend: Jugend[];

  //Wenn true gruppiere spiele nach jugend sonst nach platz
  public groupJugend: boolean = true;

  private days = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController,
              private mannschaftService: MannschaftServiceProvider, private spielService: SpielServiceProvider,
              private applicationData: ApplicationDataServiceProvider) {
    if (applicationData.authenticatedUser.hasRecht("ROLE_SPIELLEITER")) {
      this.mannschaftService.getAllJugend().subscribe(allJugend => this.allJugend = allJugend)
    }
  }

  ionViewWillEnter() {
    this.reloadAllSpiel()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpielViewPage');
  }

  public formatDate(date: Date): string {
    return `${date.getUTCHours()}:${date.getMinutes()}`
  }

  generateSpielplan() {
    this.navCtrl.push(GenerateSpielplanViewPage);
  }

  private reloadAllSpiel() {
    this.spielService.getAllSpiel().subscribe(allSpiel => {
      this.allSpiel = allSpiel;

      this.groupByJugend();
    });

  }

  toggleGroupByJugend() {
    this.groupJugend = !this.groupJugend;

    if (this.groupJugend) {
      this.groupByJugend();
    } else {
      this.groupByPlatz();
    }
  }

  private groupByJugend() {
    const jugendMannschaften = new Map<number, Spiel[]>();

    this.allSpiel.forEach(spiel => {
      if (jugendMannschaften.has(spiel.heimMannschaft.jugend.hashCode())) {
        jugendMannschaften.get(spiel.heimMannschaft.jugend.hashCode()).push(spiel);
      } else {
        jugendMannschaften.set(spiel.heimMannschaft.jugend.hashCode(), [spiel]);
      }
    });
    console.log(jugendMannschaften);
    this.allSpielView = [];
    jugendMannschaften.forEach((allSpiel, key) => {
      const spielView = new SpielViewHelper();
      spielView.title = `${this.getMannschaftTyp(allSpiel[0].heimMannschaft)} ${allSpiel[0].heimMannschaft.jugend.jahrgang}`;
      spielView.allSpiel = allSpiel;
      spielView.nextSpiel = this.getNextSpielByTime(allSpiel);
      spielView.showTabelle = true;
      this.allSpielView.push(spielView);
    });
  }


  private groupByPlatz() {
    const platzMannschaften = new Map<number, Spiel[]>();

    this.allSpiel.forEach(spiel => {
      if (platzMannschaften.has(spiel.spielPlatz)) {
        platzMannschaften.get(spiel.spielPlatz).push(spiel);
      } else {
        platzMannschaften.set(spiel.spielPlatz, [spiel]);
      }
    });
    console.log(platzMannschaften);
    this.allSpielView = [];
    platzMannschaften.forEach((allSpiel, key) => {
      const spielView = new SpielViewHelper();
      spielView.title = `Spielfeld ${key}`;
      spielView.allSpiel = allSpiel;
      spielView.nextSpiel = this.getNextSpielByTime(allSpiel);
      spielView.showTabelle = false;
      this.allSpielView.push(spielView);
    })
  }

  showDetailView(spielView: SpielViewHelper) {
    this.navCtrl.push(SpielDetailViewPage, {spielView: spielView});

  }

  private getNextSpielByTime(allSpiel: Spiel[]): Spiel {
    const now = new Date();
    let nextSpiel = allSpiel[0];
    allSpiel.forEach(spiel => {
      const timeDifferenceToNextSpiel = nextSpiel.dateTime.getTime() - now.getTime();
      const timeDifferenceNew = spiel.dateTime.getTime() - now.getTime();
      if (timeDifferenceNew > 0 && timeDifferenceNew < timeDifferenceToNextSpiel) {
        nextSpiel = spiel;
      }
    });
    return nextSpiel;
  }

  getMannschaftTyp(mannschaft: Mannschaft) {
    if (mannschaft.jugend.jahrgang === JugendEnum.MINIS) {
      return '';
    }
    else return mannschaft.jugend.typ;
  }

  addPause() {
    const durationAlert = this.alertController.create({
      title: "Pause einfügen",
      subTitle: " Wähle die aus wann die Pause beginnt, wie lange sie sein soll und Welche jugenden diese Pause haben sollen.",
      inputs: [
        {
          type: 'text',
          placeholder: '21. oder 22.',
          name: 'dayOfMonth'
        },
        {
          type: 'text',
          placeholder: 'hh:mm',
          name: 'time'
        },
        {
          type: 'number',
          placeholder: 'Länge in min',
          name: 'pauseDuration'
        }
      ],
      buttons: [
        {text: 'Abbrechen'},
        {
          text: 'Jugend wählen',
          handler: data => this.pickJugend(data)
        }
      ]
    }).present();
  }

  pickJugend(timeData: any) {
    const jugendAlert = this.alertController.create({
      title: "Jugend auswählen"
    });


    this.allJugend.forEach(jugend => {
      jugendAlert.addInput({
        type: 'checkbox',
        label: `${jugend.jahrgang} ${jugend.typ}`,
        value: JSON.stringify(jugend)
      });
    });
    jugendAlert.addButton("Abbrechen");
    jugendAlert.addButton({
      text: "Abschicken",
      handler: data => {
        this.pauseAbschicken(timeData, data)
      }
    });
    jugendAlert.present();
  }

  private pauseAbschicken(timeData: any, data: any) {
    const jugenden = data.map(jugend => Jugend.fromJson(JSON.parse(jugend)));
    if (timeData.dayOfMonth !== '21' && timeData.dayOfMonth !== '22') {
      console.log('Wrong date');
      return;
    }
    const dayTimeString: string = timeData.time;
    if (!dayTimeString.match(/[012]\d:[0-6]\d/)) {
      console.log('Wrong time');
      return;
    }

    const hourOfDay = `2018-07-${timeData.dayOfMonth}T${dayTimeString}:00.000`;
    const pauseHelper = new PauseHelper();
    pauseHelper.allJugend = jugenden;
    pauseHelper.pauseDuration = timeData.pauseDuration;
    pauseHelper.pauseStartTime = hourOfDay;

    this.spielService.addPause(pauseHelper);

  }
}

