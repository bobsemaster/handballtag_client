import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {VereinAddViewPage} from "../verein-add-view/verein-add-view";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Verein} from "../../models/Verein";
import {Mannschaft} from "../../models/Mannschaft";

/**
 * Generated class for the VereinViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verein-view',
  templateUrl: 'verein-view.html',
})
export class VereinViewPage {

  public vereine: Verein[] = this.applicationData.vereine;
  public mannschaften: Mannschaft[] = this.applicationData.mannschaften;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vereinService: VereinServiceProvider, private applicationData: ApplicationDataServiceProvider, private alert: AlertController) {
    console.log("construcot");
  }

  public addVerein() {
    this.navCtrl.push(VereinAddViewPage)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VereinViewPage');
  }

  ionViewWillEnter() {
    this.reloadAllVerein();
  }

  private reloadAllVerein() {
    this.applicationData.ladeVereine().add(() => this.vereine = this.applicationData.vereine);
    this.applicationData.ladeMannschaften().add(() => this.mannschaften = this.applicationData.mannschaften);
  }

  public getMannschaftenToVerein(verein: Verein): Mannschaft[] {
    return this.mannschaften.filter(value => value.verein.id == verein.id)
  }

  deleteVerein(verein: Verein) {
    this.alert.create({
      title: 'Verein Löschen',
      subTitle: `Willst du den Verein wirklich ${verein.name} löschen? Dabei werden auch alle Mannschaften die zum Verein gehören gelöscht!`,
      buttons: [
        {text: 'Nein'},
        {
          text: 'Ja',
          handler: () => {
            this.vereinService.deleteVerein(verein.id).add(() => this.reloadAllVerein());
          }
        }
      ]
    }).present();
  }
}
