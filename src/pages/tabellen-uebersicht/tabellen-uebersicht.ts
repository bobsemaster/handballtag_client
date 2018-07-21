import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {Mannschaft} from "../../models/Mannschaft";

/**
 * Generated class for the TabellenUebersichtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabellen-uebersicht',
  templateUrl: 'tabellen-uebersicht.html',
})
export class TabellenUebersichtPage {
  public allMannschaft: Mannschaft[] = [];
  public allMannschaftJugenden: Mannschaft[][] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private mannschaftService: MannschaftServiceProvider) {

  }

  ionViewWillLoad() {
    this.mannschaftService.getAllMannschaften().subscribe(allMannschaft => {
      this.allMannschaft = allMannschaft;
      this.fillMannschaftMap()
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabellenUebersichtPage');
  }

  private fillMannschaftMap() {
    for (const mannschaft of this.allMannschaft) {
      if (this.allMannschaftJugenden[mannschaft.jugend.toString()]) {
        this.allMannschaftJugenden[mannschaft.jugend.toString()].push(mannschaft);
      } else {
        this.allMannschaftJugenden[mannschaft.jugend.toString()] = [mannschaft];
      }
    }
  }

  getAllMannschaftJugend() {
    console.log('NgFor');
    return this.allMannschaftJugenden;
  }

  getMannschaftenByIndex(index: string): Mannschaft[] {
    if (!this.allMannschaftJugenden[index]) {
      return;
    }
    return this.allMannschaftJugenden[index].sort((a: Mannschaft, b: Mannschaft) => {
      if (a.gruppe.localeCompare(b.gruppe) === 0) {
        return a.tabellenPlatz - b.tabellenPlatz;
      }
      return a.gruppe.localeCompare(b.gruppe);
    });
  }
}
