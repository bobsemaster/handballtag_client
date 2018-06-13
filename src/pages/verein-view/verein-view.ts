import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {VereinAddViewPage} from "../verein-add-view/verein-add-view";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {Verein} from "../../models/Verein";
import {Mannschaft} from "../../models/Mannschaft";
import {Jugend} from "../../models/Jugend";
import {MannschaftServiceProvider} from "../../providers/mannschaft-service/mannschaft-service";
import {MannschaftDetailViewPage} from "../mannschaft-detail-view/mannschaft-detail-view";

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
  public vereinFilter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vereinService: VereinServiceProvider,
              private applicationData: ApplicationDataServiceProvider, private alert: AlertController, private mannschaftService: MannschaftServiceProvider) {
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

  private reloadAllVerein(callback: () => void = () => {
  }) {
    this.applicationData.ladeVereine().add(() => this.vereine = this.applicationData.vereine);
    this.applicationData.ladeMannschaften().add(() => {
      callback();
      return this.mannschaften = this.applicationData.mannschaften;
    });
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

  onFilterInput($event: any) {
    console.log("Filtering now " + this.vereinFilter);
    this.vereine = this.applicationData.vereine.filter(verein => verein.name.toLowerCase().includes(this.vereinFilter.toLowerCase()));
  }


  createMannschaftenForJugenden($event: any, verein: Verein) {
    const alert = this.alert.create({
      title: 'Mannschaften erstellen',
    });
    // Unschön
    alert.addInput({
      type: 'checkbox',
      label: 'Minis',
      value: '{"typ":"GEMISCHT","jahrgang":"MINIS"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Männlich E-Jugend',
      value: '{"typ":"MAENNLICH","jahrgang":"EJUGEND"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Weiblich E-Jugend',
      value: '{"typ":"WEIBLICH","jahrgang":"EJUGEND"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Männlich D-Jugend',
      value: '{"typ":"MAENNLICH","jahrgang":"DJUGEND"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Weiblich D-Jugend',
      value: '{"typ":"WEIBLICH","jahrgang":"DJUGEND"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Männlich C-Jugend',
      value: '{"typ":"MAENNLICH","jahrgang":"CJUGEND"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Weiblich C-Jugend',
      value: '{"typ":"WEIBLICH","jahrgang":"CJUGEND"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Männlich B-Jugend',
      value: '{"typ":"MAENNLICH","jahrgang":"BJUGEND"}'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Weiblich B-Jugend',
      value: '{"typ":"WEIBLICH","jahrgang":"BJUGEND"}'
    });

    alert.addButton("Abbrechen");
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.createMannschaften(data, verein);
      }
    });
    alert.present();
  }

  private createMannschaften(data: any, verein: Verein) {
    for (const jugendJson of data) {
      const jugend: Jugend = Jugend.fromJson(JSON.parse(jugendJson));
      const mannschaft: Mannschaft = new Mannschaft();
      mannschaft.jugend = jugend;
      mannschaft.verein = verein;
      mannschaft.name = verein.name;

      this.mannschaftService.createMannschaft(mannschaft).subscribe();
    }
    this.reloadAllVerein();
  }

  doRefresh(refresher: Refresher) {
    this.reloadAllVerein(() => {
      refresher.complete();
    });

  }

  showMannschaft(mannschaft) {
    this.navCtrl.push(MannschaftDetailViewPage, {mannschaft: mannschaft})
  }
}
