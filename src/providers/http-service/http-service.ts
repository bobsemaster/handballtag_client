import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HTTP} from "@ionic-native/http";
import {Platform} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";

/*
  !!!! Kann zurzeit Urlencoded nur in post benutzen !!!!

  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  private isMobile = this.platform.is("cordova");

  constructor(private httpAngular: HttpClient, private httpNative: HTTP, private platform: Platform) {
    console.log('Hello HttpServiceProvider Provider');
  }

  /**
   * Mit get eine Resource holen
   * @param {string} url
   * @param {Object} parameters aufbau {parametername:"parameterwert"}
   * @param {Object} headers aufbau {headername:"headerwert"}
   */
  public get(url: string, parameters?: Object, headers?: Object): Observable<any> {
    if (this.isMobile) {
      return Observable.fromPromise(this.httpNative.get(url, parameters, headers)).map(data => this.tryMapJson(data.data));
    }
    return this.httpAngular.get(url, {headers: this.getAngularHeaders(headers), withCredentials: true})
  }

  public  getTyped<T>(url: string, parameters?: Object, headers?: Object): Observable<T> {
    if (this.isMobile) {
      return Observable.fromPromise(this.httpNative.get(url, parameters, headers)).map(data => this.tryMapJson(data.data));
    }
    return this.httpAngular.get<T>(url, {headers: this.getAngularHeaders(headers), withCredentials: true})
  }

  public post(url: string, body: Object, headers?: Object): Observable<any> {

    if (this.isMobile) {
      // Standart daten sind json nur bei login nicht
      if (headers === undefined) {
        headers = {
          'Content-Type': 'application/json'
        };
        this.httpNative.setDataSerializer('json');
      }
      return Observable.fromPromise(this.httpNative.post(url, body, headers)).map(data => this.tryMapJson(data.data))
    }


    const angularHeaders = this.getAngularHeaders(headers);
    if (angularHeaders.has('Content-Type') && angularHeaders.get('Content-Type') === 'application/x-www-form-urlencoded') {
      body = this.urlencodeJson(body);
    }
    return this.httpAngular.post(url, body, {headers: angularHeaders, withCredentials: true});
  }

  public put(url: string, body: Object, headers?: Object): Observable<any> {
    if (this.isMobile) {
      if (headers === undefined) {
        headers = {
          'Content-Type': 'application/json'
        };
        this.httpNative.setDataSerializer('json');
      }
      return Observable.fromPromise(this.httpNative.put(url, body, headers)).map(data => this.tryMapJson(data.data));
    }
    return this.httpAngular.put(url, body, {headers: this.getAngularHeaders(headers), withCredentials: true})
  }

  public delete(url: string, parameters?: Object, headers?: Object): Observable<any> {
    if (this.isMobile) {
      if (headers === undefined) {
        headers = {
          'Content-Type': 'application/json'
        };
        this.httpNative.setDataSerializer('json');
      }
      return Observable.fromPromise(this.httpNative.delete(url, parameters, headers)).map(data => this.tryMapJson(data.data));
    }
    return this.httpAngular.delete(url, {headers: this.getAngularHeaders(headers), withCredentials: true});
  }

  private tryMapJson(data: string): any {
    if (data === "") {
      return null;
    } else {
      return JSON.parse(data);
    }
  }

  private getAngularHeaders(headers: any | undefined): HttpHeaders {
    return new HttpHeaders(headers);
  }

  private urlencodeJson(object: Object): any {
    const keys = Object.keys(object);
    let urlencoded = "";
    for (const key of keys) {
      urlencoded += `${key}=${object[key]}&`;
    }
    return urlencoded.substring(0, urlencoded.length - 1);
  }
}
