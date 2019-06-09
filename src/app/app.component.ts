import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app'
import 'firebase/messaging'
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
import {LageplanPage} from '../pages/lageplan/lageplan';
import {RahmenprogrammSportartikelPage} from "../pages/rahmenprogramm-sportartikel/rahmenprogramm-sportartikel";
import {LinksPage} from "../pages/links/links";
import {PushServiceProvider} from "../providers/push-service/push-service";
import {PushMessagePage} from "../pages/push-message/push-message";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private applicationData: ApplicationDataServiceProvider, private authentificationService: AuthenticationServiceProvider,
              private pushMessageProvider: PushServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Start', component: StartPage},
      {title: 'News', component: PushMessagePage},
      {title: 'Mannschaftsspielpläne', component: VereinViewPage},
      {title: 'Tabellen & Spielpläne', component: SpielViewPage},
      {title: 'Mannschaftsfoto', component: HasFotoPage},
      {title: 'Verpflegung', component: VerpflegungPage},
      {title: 'Rahmenprogramm', component: RahmenprogrammSportartikelPage},
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
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
          .then((registration) => {
            this.initializeFirebase(registration);
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

  private initializeFirebase(registration: ServiceWorkerRegistration) {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBCwhWd9u8Kn4vLjm-Vifpof6rtS2xPluY",
      authDomain: "kubernetes-241709.firebaseapp.com",
      databaseURL: "https://kubernetes-241709.firebaseio.com",
      projectId: "kubernetes-241709",
      storageBucket: "kubernetes-241709.appspot.com",
      messagingSenderId: "776794448809",
      appId: "1:776794448809:web:1b2f40c40999a9f7"
    };


    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BFaFCZqct4osMzhj4nh_5zs_FtPIWTJtzkkegyWQSO_W92QBVEsSpuQQbEIBfNwJxcyDDELHz2gC-wfiI-QK6I8");
    messaging.useServiceWorker(registration);

    messaging.onTokenRefresh(function() {
      messaging.getToken().then(function(refreshedToken) {
        console.log('Token refreshed.');
      }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });


    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        console.log("Has token: ", currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
    });
    this.pushMessageProvider.initialize();
  }

}
