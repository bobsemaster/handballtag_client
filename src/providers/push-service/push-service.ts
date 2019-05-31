import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpServiceProvider} from "../http-service/http-service";
import {Message} from "../../models/Message";
import {server_url} from "../../models/ServerUrl";
import * as firebase from "firebase/app";
import 'firebase/messaging'
import {registerLocaleData} from "@angular/common";


/*
  Generated class for the PushServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushServiceProvider {

  constructor(public http: HttpServiceProvider) {
  }

  public initialize() {
    console.log("Initializing Push service");
    const messaging = firebase.messaging();

    messaging.onMessage(payload => {
      console.log('Message received. ', payload);
    });
    messaging.getToken().then(token => this.registerClient(token));
  }

  public registerClient(token: String) {
    if (window.localStorage.getItem("fcmRegistered") !== "true") {
      window.localStorage.setItem("fcmRegistered", "true");
      this.http.post(`${server_url}/pushmessage/${token}`, {}).subscribe(value => console.log());
      console.log("registered client");
    } else {
      console.log("Already registered");
    }
  }

  public publishPushMessage(message: Message) {
    this.http.post(`${server_url}/pushmessage`, message);
  }

}
