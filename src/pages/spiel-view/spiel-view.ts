import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";
import {GenerateSpielplanViewPage} from "../generate-spielplan-view/generate-spielplan-view";
import {Spiel} from "../../models/Spiel";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Jugend} from "../../models/Jugend";
import {Mannschaft} from '../../models/Mannschaft';

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

  private days = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController,
              private mannschaftService: MannschaftServiceProvider, private spielService: SpielServiceProvider,
              private applicationData: ApplicationDataServiceProvider) {
  }

  ionViewWillEnter() {
    this.reloadAllSpiel()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpielViewPage');
  }

  public formatDate(date: Date) {
    return `${this.days[date.getDay()]} ${date.getHours()}:${date.getMinutes()}`
  }

  generateSpielplan() {
    this.navCtrl.push(GenerateSpielplanViewPage);
  }

  private reloadAllSpiel() {
    this.spielService.getAllSpiel().subscribe(allSpiel => {
      this.allSpiel = allSpiel;

      const jugendMannschaften = new Map<number, Spiel[]>();

      this.allSpiel.forEach(spiel => {
        if(jugendMannschaften.has(spiel.heimMannschaft.jugend.hashCode())){
          jugendMannschaften.get(spiel.heimMannschaft.jugend.hashCode()).push(spiel);
        } else {
          jugendMannschaften.set(spiel.heimMannschaft.jugend.hashCode(), [spiel]);
        }
      });
      console.log(jugendMannschaften);
      this.allSpielView = [];
      jugendMannschaften.forEach((allSpiel, key) => {
        const spielView = new SpielViewHelper();
        spielView.title = `${allSpiel[0].heimMannschaft.jugend.typ} ${allSpiel[0].heimMannschaft.jugend.jahrgang}`
        spielView.allSpiel = allSpiel;
        spielView.nextSpiel = allSpiel[0];
        this.allSpielView.push(spielView);
      })
    });

  }
}


class SpielViewHelper {
  public allSpiel: Spiel[];
  public title: string;
  public nextSpiel: Spiel;
}
