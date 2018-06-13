import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {Mannschaft} from "../../models/Mannschaft";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private mannschaftService: MannschaftServiceProvider,
              private applicationData: ApplicationDataServiceProvider, private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MannschaftDetailViewPage');
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
}
