import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {PushServiceProvider} from "../../providers/push-service/push-service";
import {Observable} from "rxjs";
import {Message} from "../../models/Message";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

/**
 * Generated class for the PushMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-push-message',
  templateUrl: 'push-message.html',
})
export class PushMessagePage {

  public allMessage: Observable<Message[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pushService:PushServiceProvider,
              public applicationData: ApplicationDataServiceProvider) {
  }

  ionViewDidLoad() {
    this.reloadAllMessage();
  }

  createPushMessage() {

  }

  reloadAllMessage($event?: Refresher) {
    this.allMessage = this.pushService.getAllPushMessage();
    if ($event) {
      $event.complete();
    }
  }
}
