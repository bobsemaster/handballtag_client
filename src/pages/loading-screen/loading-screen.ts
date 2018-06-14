import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {AuthenticationServiceProvider} from "../../providers/authentication-service/authentication-service";
import {VereinViewPage} from "../verein-view/verein-view";

/**
 * Generated class for the LoadingScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading-screen',
  templateUrl: 'loading-screen.html',
})
export class LoadingScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private applicationData: ApplicationDataServiceProvider,
              private authenticationService: AuthenticationServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('Authenticating standart user');
    this.checkLogin();
  }

  private checkLogin() {
    this.applicationData.ladeAuthentifiziertenBenutzer().add(() => {

      // Standart User authentifizieren
      // Passwort in klartext weil der uer nur benutzt wird damit nur der client zugrif auf den server hat
      if (this.applicationData.authenticatedUser === null) {
        this.authenticationService.authenticateUser("benutzer", "GeheimesBenutzerPasswortDasKeinerRausfindenWird")
          .subscribe(value => {

            this.applicationData.ladeAuthentifiziertenBenutzer().add(() => this.navCtrl.setRoot(VereinViewPage));
          });
      } else {
        this.applicationData.ladeAuthentifiziertenBenutzer().add(() => this.navCtrl.setRoot(VereinViewPage));
      }
    });
  }

}
