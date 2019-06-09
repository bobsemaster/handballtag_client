import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Page} from "ionic-angular/navigation/nav-util";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {appMenuPages} from "../../app/pages";

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
