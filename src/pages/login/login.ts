import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthenticationServiceProvider} from "../../providers/authentication-service/authentication-service";
import {VereinViewPage} from "../verein-view/verein-view";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginCredentials = {username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(event: any): void {
    this.auth.authenticateUser(this.loginCredentials.username, this.loginCredentials.password).subscribe(success => {
      //Wenn null zurückkommt ist die authentifizierung erfolgreich sonst kommt ein error Zurück
      if(success == null){
        this.navCtrl.setRoot(VereinViewPage);
      }
    });
  }

}
