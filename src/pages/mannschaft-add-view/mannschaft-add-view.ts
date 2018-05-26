import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Jugend, JugendEnum, JugendGender} from "../../models/Jugend";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Verein} from "../../models/Verein";
import {Mannschaft} from "../../models/Mannschaft";
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";

/**
 * Generated class for the MannschaftAddViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mannschaft-add-view',
  templateUrl: 'mannschaft-add-view.html',
})
export class MannschaftAddViewPage {

  public typ: JugendGender;
  public jahrgang: JugendEnum;
  public name: String;
  public vereinId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public applicationData: ApplicationDataServiceProvider, private mannschaftService: MannschaftServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MannschaftAddViewPage');
  }

  public createMannschaft() {
    const mannschaft = new Mannschaft();
    mannschaft.verein = this.getVereinByID(this.vereinId);
    mannschaft.jugend = new Jugend();
    mannschaft.jugend.typ = this.typ;
    mannschaft.jugend.jahrgang = this.jahrgang;

  }

  private getVereinByID(id: number): Verein {
    for (let verein of this.applicationData.vereine) {
      if (verein.id == id) {
        return verein;
      }
    }
    return null;
  }
}
