import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Verein} from "../../models/Verein";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";

/**
 * Generated class for the VereinAddViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verein-add-view',
  templateUrl: 'verein-add-view.html',
})
export class VereinAddViewPage {
  public vereinName:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vereinService:VereinServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VereinAddViewPage');
  }

  public createVerein():void {
    const verein=new Verein(this.vereinName);
    const success = this.vereinService.createVerein(verein);
    success.subscribe(value => console.log(value));
  }
}
