import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Verein} from "../../models/Verein";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import {Subscription} from "rxjs/Subscription";

/*
  Generated class for the VereinServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VereinServiceProvider {
  // Wenn proxy genutzt wird darf der request nur auf /rest gehen nicht http://localhost:8080
  private server_url = "/rest";

  constructor(private http: HttpClient) {
    console.log('Hello VereinServiceProvider Provider');
  }

  public getAllVerein():Observable<any[]>{
    return this.http.get<any[]>(this.server_url + "/verein/all")//
  }

  public createVerein(verein:Verein):Observable<boolean>{
    return this.http.post(this.server_url + "/verein/new", verein).map(() => true).catch(() => Observable.of(false));
  }

  public deleteVerein(id:number):Subscription{
    return this.http.delete(`${this.server_url}/verein/delete/${id}`).subscribe();
  }

}