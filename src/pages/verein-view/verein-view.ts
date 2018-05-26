import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VereinAddViewPage} from "../verein-add-view/verein-add-view";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";

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



  constructor(public navCtrl: NavController, public navParams: NavParams, private vereinService:VereinServiceProvider) {
  }

  public addVerein(){
    this.navCtrl.push(VereinAddViewPage)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VereinViewPage');
  }

}
