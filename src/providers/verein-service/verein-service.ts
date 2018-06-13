import {Injectable} from '@angular/core';
import {Verein} from "../../models/Verein";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import {Subscription} from "rxjs/Subscription";
import {Mannschaft} from "../../models/Mannschaft";
import {server_url} from "../../models/ServerUrl";
import {HttpServiceProvider} from "../http-service/http-service";

/*
  Generated class for the VereinServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VereinServiceProvider {
  // Wenn proxy genutzt wird darf der request nur auf /rest gehen nicht http://localhost:8080

  constructor(private http: HttpServiceProvider) {
    console.log('Hello VereinServiceProvider Provider');
  }

  public getAllVerein(): Observable<Verein[]> {
    return this.http.get(server_url + "/verein/all").map(allVerein => allVerein.map(verein => Verein.fromJSON(verein)));
  }

  public createVerein(verein: Verein): Observable<boolean> {
    return this.http.post(server_url + "/verein/new", verein).map(() => true).catch(() => Observable.of(false));
  }

  public deleteVerein(id: number): Subscription {
    return this.http.delete(`${server_url}/verein/delete/${id}`).subscribe();
  }

  public getAllMannschaftenToVerein(id: number): Observable<Mannschaft[]> {
    return this.http.get(`${server_url}/verein/${id}/mannschaften`)
      .map(allMannschaft => allMannschaft.map(mannschaft => Mannschaft.fromJSON(mannschaft)));
  }

}
