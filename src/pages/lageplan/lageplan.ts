import {Component, HostListener} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

/**
 * Generated class for the LageplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lageplan',
  templateUrl: 'lageplan.html',
})
export class LageplanPage {

  public screenWidth: number;
  public screenHeight: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private platform:Platform) {
    this.screenWidth = platform.width();
    this.screenHeight = platform.height();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LageplanPage');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = this.platform.width();
    this.screenHeight = this.platform.height();
  }

}
