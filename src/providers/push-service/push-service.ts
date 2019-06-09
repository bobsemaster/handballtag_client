import {Injectable} from '@angular/core';
import {HttpServiceProvider} from "../http-service/http-service";
import {Message} from "../../models/Message";
import {server_url} from "../../models/ServerUrl";
import * as firebaseBrowser from 'firebase/app'
import 'firebase/messaging'
import {Observable} from "rxjs";
import {Platform} from "ionic-angular";
import {PushMessagePage} from "../../pages/push-message/push-message";
import {ApplicationDataServiceProvider} from "../application-data-service/application-data-service";
import {FirebaseMessaging} from "@ionic-native/firebase-messaging";


/*
  Generated class for the PushServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushServiceProvider {

  private notificationPermissionGranted = false;
  private isMobile = this.platform.is("cordova");

  constructor(public http: HttpServiceProvider,public platform: Platform, private applicationDataProvider:ApplicationDataServiceProvider,
              private firebaseMessaging: FirebaseMessaging) {
    this.initialize();
  }


  public initialize() {
    console.log("Initializing Push service");

    if (this.isMobile) {
      this.registerMobile();
      this.firebaseMessaging.requestPermission().then(() => {
        console.log("Permission for notifications granted");
        this.notificationPermissionGranted = true;
      });
    } else {
      const messaging = firebaseBrowser.messaging();
      this.initializeFirebase(this.applicationDataProvider.serviceWorkerRegistration);
      this.registerBrowser(messaging);
    }
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
    firebaseBrowser.initializeApp(firebaseConfig);
    const messaging = firebaseBrowser.messaging();
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
  }


  private registerBrowser(messaging) {
    messaging.onMessage(payload => {
      this.showNotificationBrowser(payload);
    });
    messaging.getToken().then(token => this.registerClientToServer(token));
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        this.notificationPermissionGranted = true;
      }
    });
  }

  public registerClientToServer(token: string) {
    if (window.localStorage.getItem("fcmRegistered") !== "true") {
      window.localStorage.setItem("fcmRegistered", "true");
      this.http.post(`${server_url}/pushmessage/register`, {token: token, targetTopic: "DEFAULT"}).subscribe(value => console.log());
      console.log("registered client");
    } else {
      console.log("Already registered");
    }
  }

  public sendPushMessage(pushMessage:Message):Observable<void> {
    return this.http.post(`${server_url}/pushmessage`, pushMessage);
  }

  public getAllPushMessage(): Observable<Message[]> {
    return this.http.getTyped<Message[]>(`${server_url}/pushmessage`);
  }

  public showNotificationBrowser(payload: any) {
    console.log('[firebaseBrowser-messaging-sw.js] Received message ', payload);
    if (!this.notificationPermissionGranted) {
      return;
    }
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.content,
      icon: '/assets/icon/favicon.ico'
    };

    const notification = new Notification(notificationTitle, notificationOptions);
    notification.onclick = (event) => {
      this.applicationDataProvider.navCtrl.setRoot(PushMessagePage);
    };
  }

  public publishPushMessage(message: Message) {
    this.http.post(`${server_url}/pushmessage`, message);
  }

  private registerMobile() {
    this.firebaseMessaging.getToken().then(token => {
      console.log("Client has token:", token);
      this.registerClientToServer(token);
    });
    this.firebaseMessaging.onMessage().subscribe(value => {
      console.log("Recieved message: ", value)
    });
  }
}
