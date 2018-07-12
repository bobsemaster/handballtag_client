import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Verein} from "../../models/Verein";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

/**
 * Generated class for the VereinAddViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verein-add-view',
  templateUrl: 'verein-add-view.html',
})
export class VereinAddViewPage {
  public vereinName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vereinService: VereinServiceProvider, private alert: AlertController, private applicationData: ApplicationDataServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VereinAddViewPage');
  }

  public createVerein(): void {
    const verein = new Verein(this.vereinName);
    const success = this.vereinService.createVerein(verein);
    success.subscribe(success => {
      if (success) {
        this.navCtrl.pop()
      } else {
        if (this.vereinName == undefined) {
          this.vereinName = '<name darf nicht leer sein>';
        }
        this.alert.create({
          title: 'Error',
          subTitle: `Der verein mit dem namen '${this.vereinName}' existiert bereits!`,
          buttons: ['Ok']
        }).present();
      }
    });
  }
}
