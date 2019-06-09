import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Page} from "ionic-angular/navigation/nav-util";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {appMenuPages} from "../../app/pages";
import {PushServiceProvider} from "../../providers/push-service/push-service";

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

  pages = appMenuPages;

  /**
   *
   * @param navCtrl
   * @param navParams
   * @param applicationDataProvider
   * @param pushService wird injected dass der service initialisiert wird und auf push benachrivhtigungen hört
   */
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private applicationDataProvider:ApplicationDataServiceProvider,pushService:PushServiceProvider) {
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
