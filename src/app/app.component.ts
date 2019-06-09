import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import 'firebase/messaging'
import {ApplicationDataServiceProvider} from "../providers/application-data-service/application-data-service";
import {AuthenticationServiceProvider} from "../providers/authentication-service/authentication-service";
import {StartPage} from "../pages/start/start";
import {appMenuPages} from "./pages";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private isMobile = this.platform.is("cordova");

  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private applicationData: ApplicationDataServiceProvider, private authentificationService: AuthenticationServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = appMenuPages;

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
      if ('serviceWorker' in navigator && !this.isMobile) {
        navigator.serviceWorker.register('service-worker.js')
          .then((registration) => {
            this.applicationData.serviceWorkerRegistration = registration;
            return console.log('service worker installed');
          })
          .catch(err => console.error('Error', err));
      }
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
