import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SpielViewPage} from "../spiel-view/spiel-view";
import {ModusPage} from "../modus/modus";
import {VereinViewPage} from "../verein-view/verein-view";
import {HasFotoPage} from "../has-foto/has-foto";
import {VerpflegungPage} from "../verpflegung/verpflegung";
import {AboutPage} from "../about/about";
import {Page} from "ionic-angular/navigation/nav-util";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {LageplanPage} from "../lageplan/lageplan";
import {RahmenprogrammSportartikelPage} from "../rahmenprogramm-sportartikel/rahmenprogramm-sportartikel";
import {LinksPage} from "../links/links";
import {TabellenUebersichtPage} from "../tabellen-uebersicht/tabellen-uebersicht";

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  pages = [
    {title: 'Mannschaftsspielpläne', component: VereinViewPage},
    {title: 'Tabellen & Spielpläne', component: SpielViewPage},
    {title: 'Mannschaftsfoto', component: HasFotoPage},
    {title: 'Verpflegung', component: VerpflegungPage},
    {title: 'Rahmenprogramm', component: RahmenprogrammSportartikelPage},
    {title: 'Lageplan', component: LageplanPage},
    {title: 'Modus', component: ModusPage},
    {title: 'Links', component: LinksPage},
    {title: 'Login', component: LoginPage},
    {title: 'Über', component: AboutPage},
    {title: 'Alle Tabellen', component: TabellenUebersichtPage}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private applicationDataProvider:ApplicationDataServiceProvider) {
    this.applicationDataProvider.navCtrl = navCtrl;
  }

  public openPage(page:Page){
    this.navCtrl.setRoot(page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  ionViewWillLeave(){
    this.applicationDataProvider.isOnStartpage = false;
  }

  ionViewWillEnter() {
    this.applicationDataProvider.isOnStartpage = true;
  }

}
