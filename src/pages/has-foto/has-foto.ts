import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {Mannschaft} from "../../models/Mannschaft";
import {JugendEnum} from "../../models/Jugend";

/**
 * Generated class for the HasFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-has-foto',
  templateUrl: 'has-foto.html',
})
export class HasFotoPage {
  private allMannschaftOhneFoto: Mannschaft[];
  public allMannschaftOhneFotoFiltered: Mannschaft[];
  public filter: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private mannschaftService: MannschaftServiceProvider) {
    mannschaftService.getAllMannschaften().subscribe(allMannschaft => {
      this.allMannschaftOhneFoto = allMannschaft.filter(mannschaft => mannschaft.hasFoto === false);
      this.allMannschaftOhneFotoFiltered = this.allMannschaftOhneFoto;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HasFotoPage');
  }

  filterMannschaften(event: any) {
    this.allMannschaftOhneFotoFiltered = this.allMannschaftOhneFoto.filter(value => this.mannschaftFilter(value))
  }

  private mannschaftFilter(mannschaft: Mannschaft): boolean {
    const mannschaftString = `${mannschaft.name} ${mannschaft.jugend.jahrgang} ${mannschaft.jugend.typ}`.toLowerCase();
    return mannschaftString.includes(this.filter.toLowerCase());

  }

  getMannschaftTyp(mannschaft: Mannschaft) {
    if (mannschaft.jugend.jahrgang === JugendEnum.MINIS) {
      return '';
    }
    else return mannschaft.jugend.typ;
  }
}
