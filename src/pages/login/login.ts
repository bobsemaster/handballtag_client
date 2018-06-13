import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AuthenticationServiceProvider} from "../../providers/authentication-service/authentication-service";
import {VereinViewPage} from "../verein-view/verein-view";
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationServiceProvider, private applicationData: ApplicationDataServiceProvider, private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.isAlreadyAuthenticated()
  }

  private isAlreadyAuthenticated() {
    this.applicationData.ladeAuthentifiziertenBenutzer().add(() => this.navigateToUserStartPage());
    // Lade alle vereine
  }

  public login(event: any): void {
    this.auth.authenticateUser(this.loginCredentials.username, this.loginCredentials.password)
      .catch((err: any, caught: any) => {
        this.alertController.create({
          title: 'Login Fehlgeschlagen',
          message: 'Username oder passwort falsch!',

        }).addButton("Ok").present();
        return [];
      })
      .subscribe(success => {
        //Wenn null zurückkommt ist die authentifizierung erfolgreich sonst kommt ein error Zurück
        //if (success == null) {
        this.isAlreadyAuthenticated();
        //}
      });
  }

  private navigateToUserStartPage() {
    const authenticatedUser = this.applicationData.authenticatedUser;
    if (authenticatedUser == null) {
      return;
    }
    if (authenticatedUser.hasRecht('ROLE_SPIELLEITER')) {
      this.applicationData.ladeVereine().add(() => this.navCtrl.setRoot(VereinViewPage));

    } else if (authenticatedUser.hasRecht('ROLE_KAMPFGERICHT')) {
      this.applicationData.ladeVereine().add(() => this.navCtrl.setRoot(VereinViewPage));
    } else {
      this.applicationData.ladeVereine().add(() => this.navCtrl.setRoot(VereinViewPage));
    }
  }
}
