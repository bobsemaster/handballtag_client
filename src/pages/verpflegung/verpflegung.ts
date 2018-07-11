import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Verkauf, VerkaufArtikel} from "../../models/Verkauf";
import {VerkaufServiceProvider} from "../../providers/verkauf-service/verkauf-service";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

/**
 * Generated class for the VerpflegungPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verpflegung',
  templateUrl: 'verpflegung.html',
})
export class VerpflegungPage {
  verkauf: Verkauf = new Verkauf();

  constructor(public navCtrl: NavController, public navParams: NavParams, private verkaufService: VerkaufServiceProvider,
              private applicationData: ApplicationDataServiceProvider, private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerpflegungPage');
    this.verkaufService.getVerkaufObject().subscribe(value => this.verkauf = value);
  }

  getKaffestationArtikel(): VerkaufArtikel[] {
    return this.verkauf.verkaufArtikel.filter(value => value.verkaufsplatz === 'Kaffeestation')
  }

  getGrillstationArtikel(): VerkaufArtikel[] {
    return this.verkauf.verkaufArtikel.filter(value => value.verkaufsplatz === 'Grillstation')
  }

  addVerkaufArtikel(verkaufsplatz: string) {
    this.alertController.create({
      title: 'Artikel Hinzufügen',
      inputs: [
        {
          name: 'artikelName',
          placeholder: 'artikelName'
        },
        {
          type: 'number',
          name: 'artikelPreis',
          placeholder: 'Preis'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Hinzufügen',
          handler: (data) => {
            return this.addArtikel(data, verkaufsplatz);
          }
        }
      ]
    }).present();
  }

  public artikelBearbeiten(artikel: VerkaufArtikel) {
    this.alertController.create({
      title: 'Artikel Hinzufügen',
      inputs: [
        {
          name: 'artikelName',
          placeholder: 'artikelName',
          value: artikel.artikelName
        },
        {
          type: 'number',
          name: 'artikelPreis',
          value: artikel.artikelPreis.toString(),
          placeholder: 'Preis'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Ändern',
          handler: (data) => {
            artikel.artikelName = data.artikelName;
            artikel.artikelPreis = Number.parseFloat(data.artikelPreis);
            this.verkaufService.addOrUpdateArtikel(artikel).subscribe();
          }
        }
      ]
    }).present();
  }

  private addArtikel(data: any, verkaufsplatz: string) {
    let newArtikel = new VerkaufArtikel();
    newArtikel.verkaufsplatz = verkaufsplatz;
    newArtikel.artikelPreis = Number.parseFloat(data.artikelPreis);
    newArtikel.artikelName = data.artikelName;

    this.verkaufService.addOrUpdateArtikel(newArtikel).subscribe(value => {
      this.verkauf.verkaufArtikel.push(value);
    });
  }

  public formatPrice(artikel: VerkaufArtikel): string {
    return artikel.artikelPreis.toFixed(2);
  }

  deleteArtikel(artikel: VerkaufArtikel) {
    this.alertController.create({
      title: 'Artikel Löschen',
      subTitle: `Willst du den Artikel ${artikel.artikelName} wirklich Löschen?`,
      buttons: [
        {
          text: 'Nein'
        },
        {
          text: 'Ja',
          handler: () => {
            this.verkaufService.deleteArtikel(artikel.id);
            this.verkauf.verkaufArtikel = this.verkauf.verkaufArtikel.filter(value => value.id !== artikel.id);
          }
        }
      ]
    }).present();
  }

  toggleLosverkauf() {
    this.verkaufService.setTombolaVerkaufStatus(!this.verkauf.losverkaufGestartet);
    this.verkauf.losverkaufGestartet = !this.verkauf.losverkaufGestartet
  }

  toggleLosausgabe() {
    this.verkaufService.setTombolaPreisvergabeStatus(!this.verkauf.preisvergabeGestartet);
    this.verkauf.preisvergabeGestartet = !this.verkauf.preisvergabeGestartet
  }

  toggleGrillAn() {
    this.verkaufService.setGrillStatus(!this.verkauf.grillAn);
    this.verkauf.grillAn = !this.verkauf.grillAn
  }
}
