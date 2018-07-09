import {Injectable} from '@angular/core';
import {HttpServiceProvider} from "../http-service/http-service";
import {Verkauf, VerkaufArtikel} from "../../models/Verkauf";
import {Observable} from "rxjs/Observable";
import {server_url} from "../../models/ServerUrl";
import {Pair} from "../../models/Pair";
import {Subscription} from "rxjs/Subscription";

/*
  Generated class for the VerkaufServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VerkaufServiceProvider {

  constructor(public http: HttpServiceProvider) {
    console.log('Hello VerkaufServiceProvider Provider');
  }

  public getVerkaufObject(): Observable<Verkauf> {
    return this.http.get(server_url + '/verkauf/all').map(value => Verkauf.fromJson(value));
  }

  public getTombolaInfo(): Observable<Pair<boolean, boolean>> {
    return this.http.get(server_url + '/verkauf/tombola').map(value => Pair.fromJson(value));
  }

  public getGrillStatus(): Observable<boolean> {
    return this.http.get(server_url + '/verkauf/grill');
  }

  public setGrillStatus(newStatus): Subscription {
    return this.http.get(`${server_url}/verkauf/grill/${newStatus}`).subscribe();
  }

  public setTombolaVerkaufStatus(newStatus): Subscription {
    return this.http.get(`${server_url}/verkauf/tombola/verkauf/${newStatus}`).subscribe();
  }

  public setTombolaPreisvergabeStatus(newStatus): Subscription {
    return this.http.get(`${server_url}/verkauf/tombola/preisvergabe/${newStatus}`).subscribe();
  }

  public addOrUpdateArtikel(artikel: VerkaufArtikel): Subscription {
    return this.http.post(server_url + '/verkauf/artikel', artikel).subscribe();
  }

}
