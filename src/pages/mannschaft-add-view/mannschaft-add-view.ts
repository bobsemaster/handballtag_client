import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Jugend, JugendEnum, JugendGender} from "../../models/Jugend";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Verein} from "../../models/Verein";
import {Mannschaft} from "../../models/Mannschaft";
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {TabelleServiceProvider} from "../../providers/tabelle-service/tabelle-service";
import {Tabelle} from "../../models/Tabelle";
import {Observable} from "rxjs/Observable";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public applicationData: ApplicationDataServiceProvider, private mannschaftService: MannschaftServiceProvider, private tabelleService: TabelleServiceProvider) {

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
    mannschaft.name = this.name;

    // Check ob tabelle zur mannschaft schon existert sonst muss diese hier erstellt werden
    this.tabelleService.getTabelleToJugend(mannschaft.jugend).subscribe(value => {
      if (value == null) {
        const tabelle = new Tabelle();
        tabelle.jugend = mannschaft.jugend;
        this.tabelleService.createTabelle(tabelle).add(() => this.wasCreateSuccessful(this.mannschaftService.createMannschaft(mannschaft)));
      } else {
        this.wasCreateSuccessful(this.mannschaftService.createMannschaft(mannschaft));
      }
    });
  }

  private wasCreateSuccessful(observable:Observable<boolean>){
    observable.subscribe(success => {
      if(success){
        this.navCtrl.pop()
      } else {

      }
    })
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
