import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VerkaufServiceProvider} from "../../providers/verkauf-service/verkauf-service";
import {Verkauf} from "../../models/Verkauf";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

/**
 * Generated class for the RahmenprogrammSportartikelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rahmenprogramm-sportartikel',
  templateUrl: 'rahmenprogramm-sportartikel.html',
})
export class RahmenprogrammSportartikelPage {

  public verkauf = new Verkauf();

  constructor(public navCtrl: NavController, public navParams: NavParams, private verkaufService: VerkaufServiceProvider,
              private applicationData:ApplicationDataServiceProvider) {
    verkaufService.getVerkaufObject().subscribe(verkauf => this.verkauf = verkauf);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RahmenprogrammSportartikelPage');
  }

  toggleLosverkauf() {
    this.verkaufService.setTombolaVerkaufStatus(!this.verkauf.losverkaufGestartet);
    this.verkauf.losverkaufGestartet = !this.verkauf.losverkaufGestartet
  }

  toggleLosausgabe() {
    this.verkaufService.setTombolaPreisvergabeStatus(!this.verkauf.preisvergabeGestartet);
    this.verkauf.preisvergabeGestartet = !this.verkauf.preisvergabeGestartet
  }
}
