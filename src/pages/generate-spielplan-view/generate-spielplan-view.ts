import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {SpielServiceProvider} from "../../providers/spiel-service/spiel-service";
import {SpielCreatorInfo} from "../../models/SpielCreatorInfo";
import {Jugend} from "../../models/Jugend";

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
  public turnierBeginnDatum: string;
  public turnierbeginnTime: string;
  public sechsMannschaftenGruppe: boolean = false;

  private allJugend: Jugend[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController,
              private mannschaftService: MannschaftServiceProvider, private spielService: SpielServiceProvider) {
    this.mannschaftService.getAllJugend().subscribe(allJugend => this.allJugend = allJugend)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateSpielplanViewPage');
  }

  generateSpielplan() {
    const spielCreatorInfo = new SpielCreatorInfo();
    spielCreatorInfo.pauseDuration = this.pauseZeit;
    spielCreatorInfo.spielDuration = this.spielzeit;
    spielCreatorInfo.sechsMannschaftenGruppe = this.sechsMannschaftenGruppe;
    spielCreatorInfo.turnierBeginn = `${this.turnierBeginnDatum}T${this.turnierbeginnTime}`;


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
        this.submitGenerateSpielplan(data, spielCreatorInfo)
      }
    });
    jugendAlert.present();


  }

  private submitGenerateSpielplan(data: any[], spielCreatorInfo: SpielCreatorInfo) {
    const jugenden = data.map(jugend => Jugend.fromJson(JSON.parse(jugend)));
    const allSpielplanInfo = [];
    jugenden.forEach(jugend => {
      // Vorsichtshalber objekt kopieren, dass nicht die jugend über referenzen geändert erden kann
      const info: SpielCreatorInfo = Object.assign({}, spielCreatorInfo);
      info.jugend = jugend;
      allSpielplanInfo.push(info);
    });
    this.spielService.generateMultipleSpielplan(allSpielplanInfo);
    this.navCtrl.pop();
  }
}
