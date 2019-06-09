import {Injectable} from '@angular/core';
import {HttpServiceProvider} from "../http-service/http-service";
import {Message} from "../../models/Message";
import {server_url} from "../../models/ServerUrl";
import * as firebase from "firebase/app";
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
  }


  public initialize() {
    console.log("Initializing Push service");
    const messaging = firebase.messaging();

    if (this.isMobile) {
      this.registerMobile()
    } else {
      this.registerBrowser(messaging);
    }
  }

  private registerBrowser(messaging) {
    messaging.onMessage(payload => {
      this.showNotificationBrowser(payload);
    });
    messaging.getToken().then(token => this.registerClient(token));
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        this.notificationPermissionGranted = true;
      }
    });
  }

  public registerClient(token: string) {
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
    this.firebaseMessaging.getToken().then(token => this.registerClient(token));
  }
}
