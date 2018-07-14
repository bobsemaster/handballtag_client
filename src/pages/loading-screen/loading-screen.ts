import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";
import {AuthenticationServiceProvider} from "../../providers/authentication-service/authentication-service";
import {VereinViewPage} from "../verein-view/verein-view";
import Timer = NodeJS.Timer;

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
  private mobileInterval: Timer;


  constructor(public navCtrl: NavController, public navParams: NavParams, private applicationData: ApplicationDataServiceProvider,
              private authenticationService: AuthenticationServiceProvider, private platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('Authenticating standart user');
    //this.checkLogin();
    if (this.platform.is("cordova")) {
      //this.mobileInterval = setInterval(() => this.checkLogin(), 100);
    }else {
    }
  }

  checkLogin() {
    try {
      this.applicationData.ladeAuthentifiziertenBenutzer().add(() => {
        // Standart User authentifizieren
        // Passwort in klartext weil der uer nur benutzt wird damit nur der client zugrif auf den server hat
        if (this.applicationData.authenticatedUser === null) {
          this.authenticationService.authenticateUser("benutzer", "GeheimesBenutzerPasswortDasKeinerRausfindenWird")
            .subscribe(value => {

              this.applicationData.ladeAuthentifiziertenBenutzer().add(() => this.navCtrl.setRoot(VereinViewPage));
            });
        } else {
          this.applicationData.ladeAuthentifiziertenBenutzer().add(() => {
            return this.navCtrl.setRoot(VereinViewPage);
          });
        }
      });

    } catch (e) {
      console.log(e.toLocaleString());
      console.log("Http library Probably not loaded");
      return;
    }
    console.log("Lib geladen erfolgreich standartuser authentifiziert");
    if (this.mobileInterval !== undefined) {
      clearInterval(this.mobileInterval);
    }
  }

}
