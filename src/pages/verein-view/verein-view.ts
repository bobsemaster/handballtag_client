import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VereinAddViewPage} from "../verein-add-view/verein-add-view";
import {VereinServiceProvider} from "../../providers/verein-service/verein-service";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

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

  public vereine = this.applicationData.vereine;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vereinService: VereinServiceProvider, private applicationData: ApplicationDataServiceProvider) {
    console.log("construcot");
  }

  public addVerein() {
    this.navCtrl.push(VereinAddViewPage)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VereinViewPage');
  }

  ionViewWillEnter(){
    this.reloadAllVerein();
  }

  private reloadAllVerein() {
    this.applicationData.ladeVereine().add(() => this.vereine = this.applicationData.vereine);
  }

  deleteVerein(id: number) {
    console.log("Lösche: " + id);
    this.vereinService.deleteVerein(id);
    this.reloadAllVerein();
  }
}
