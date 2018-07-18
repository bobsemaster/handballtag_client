import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {VereinViewPage} from "../pages/verein-view/verein-view";
import {SpielViewPage} from "../pages/spiel-view/spiel-view";
import {AboutPage} from "../pages/about/about";
import {VerpflegungPage} from "../pages/verpflegung/verpflegung";
import {HasFotoPage} from "../pages/has-foto/has-foto";
import {ApplicationDataServiceProvider} from "../providers/application-data-service/application-data-service";
import {AuthenticationServiceProvider} from "../providers/authentication-service/authentication-service";
import {ModusPage} from "../pages/modus/modus";
import {StartPage} from "../pages/start/start";
import {LageplanPageModule} from "../pages/lageplan/lageplan.module";
import {LageplanPage} from '../pages/lageplan/lageplan';
import {RahmenprogrammSportartikelPage} from "../pages/rahmenprogramm-sportartikel/rahmenprogramm-sportartikel";
import {LinksPage} from "../pages/links/links";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private applicationData: ApplicationDataServiceProvider, private authentificationService: AuthenticationServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Start', component: StartPage},
      {title: 'Mannschaftsspielpläne', component: VereinViewPage},
      {title: 'Tabellen & Spielpläne', component: SpielViewPage},
      {title: 'Mannschaftsfoto', component: HasFotoPage},
      {title: 'Verpflegung', component: VerpflegungPage},
      {title: 'Rahmenprogramm & Sportartikel', component: RahmenprogrammSportartikelPage},
      {title: 'Lageplan', component: LageplanPage},
      {title: 'Modus', component: ModusPage},
      {title: 'Links', component: LinksPage},
      {title: 'Login', component: LoginPage},
      {title: 'Über', component: AboutPage}
    ];

  }

  private checkLogin() {
    this.applicationData.ladeAuthentifiziertenBenutzer().add(() => {
      // Standart User authentifizieren
      // Passwort in klartext weil der uer nur benutzt wird damit nur der client zugrif auf den server hat
      if (this.applicationData.authenticatedUser === null) {
        this.authentificationService.authenticateUser("benutzer", "GeheimesBenutzerPasswortDasKeinerRausfindenWird")
          .subscribe(value => {

            this.applicationData.ladeAuthentifiziertenBenutzer().add(() => {
              this.hideSplashScreen();
            });
          });
      } else {
        this.applicationData.ladeAuthentifiziertenBenutzer().add(() => {
          this.hideSplashScreen();
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.platform.registerBackButtonAction((event) => {
        if (this.applicationData.isOnStartpage) {
          this.platform.exitApp();
        } else if (!this.applicationData.isOnStartpage && this.nav.canGoBack() === false) {
          this.nav.setRoot(StartPage)
        } else {
          this.nav.pop();
        }
      });
      this.checkLogin();
    });
  }

  private hideSplashScreen() {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
