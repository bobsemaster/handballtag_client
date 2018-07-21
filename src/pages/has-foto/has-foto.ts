import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {Mannschaft} from "../../models/Mannschaft";
import {JugendEnum} from "../../models/Jugend";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private mannschaftService: MannschaftServiceProvider,
              public applicationData: ApplicationDataServiceProvider, private alertController: AlertController) {
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

  fotoGemacht(mannschaft: Mannschaft) {
    this.alertController.create({
      title: 'Foto gemacht',
      subTitle: `Hat die ${mannschaft.jugend.typ} ${mannschaft.jugend.jahrgang} ${mannschaft.name} wirklich ein Mannschaftsfoto gemacht?`,
      buttons: [
        {
          text: 'Nein',
        },
        {
          text: 'Ja',
          handler: () => this.setFotoGemacht(mannschaft)
        }
      ]
    }).present();
  }

  private setFotoGemacht(mannschaft: Mannschaft) {
    mannschaft.hasFoto = true;
    this.filter = '';
    this.allMannschaftOhneFoto = this.allMannschaftOhneFoto.filter(value => value.hasFoto === false);
    this.allMannschaftOhneFotoFiltered = this.allMannschaftOhneFoto;
    this.mannschaftService.setFotoGemacht(true, mannschaft.id).subscribe();
  }
}
