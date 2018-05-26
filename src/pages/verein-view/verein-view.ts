import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {VereinAddViewPage} from "../verein-add-view/verein-add-view";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Verein} from "../../models/Verein";

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

  public vereine = this.applicationData.vereine;

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
  }

  deleteVerein(verein: Verein) {
    this.alert.create({
      title: 'Verein Löschen',
      subTitle: `Willst du den Verein wirklich ${verein.name} löschen?`,
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
