import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftAddViewPage} from "../mannschaft-add-view/mannschaft-add-view";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Mannschaft} from "../../models/Mannschaft";
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";

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
  public mannschaften: Mannschaft[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private applicationData: ApplicationDataServiceProvider, private mannschaftService: MannschaftServiceProvider, private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MannschaftenViewPage');
  }

  ionViewWillEnter() {
    this.reloadAllMannschaft();
  }

  private reloadAllMannschaft() {
    this.applicationData.ladeMannschaften().add(() => this.mannschaften = this.applicationData.mannschaften);
  }

  public addMannschaft() {
    this.navCtrl.push(MannschaftAddViewPage)
  }

  public deleteMannschaft(mannschaft: Mannschaft) {
    this.alert.create({
      title: 'Verein Löschen',
      subTitle: `Willst du wirklich die ${mannschaft.jugend.typ} ${mannschaft.jugend.jahrgang} ${mannschaft.name} von ${mannschaft.verein.name} löschen?`,
      buttons: [
        {text: 'Nein'},
        {
          text: 'Ja',
          handler: () => {
            this.mannschaftService.deleteMannschaft(mannschaft.id).add(() => this.reloadAllMannschaft());
          }
        }
      ]
    }).present();
  }
}
