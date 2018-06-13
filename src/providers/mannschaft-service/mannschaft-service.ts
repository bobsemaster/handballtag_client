import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Mannschaft} from "../../models/Mannschaft";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Jugend} from "../../models/Jugend";
import {server_url} from "../../models/ServerUrl";
import {Spiel} from "../../models/Spiel";
import {HttpServiceProvider} from "../http-service/http-service";

/*
  Generated class for the MannschaftServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MannschaftServiceProvider {


  constructor(private http: HttpServiceProvider) {
    console.log('Hello MannschaftServiceProvider Provider');
  }

  public createMannschaft(mannschaft: Mannschaft): Observable<boolean> {
    return this.http.post(server_url + "/mannschaft/new", mannschaft).map(() => true).catch(err => Observable.of(false))
  }

  public getAllMannschaften(): Observable<Mannschaft[]> {
    return this.http.get(server_url + "/mannschaft/all").map(allMannschaft => allMannschaft.map(mannschaft => Mannschaft.fromJSON(mannschaft)));
  }

  public getAllSpielToMannschaft(id: number):Observable<Spiel[]> {
    return this.http.get(`${server_url}/${id}/spiele`).map(it => it.map(spiel => Spiel.fromJson(spiel)));
  }

  public deleteMannschaft(id: number): Subscription {
    return this.http.delete(`${server_url}/mannschaft/${id}`).subscribe();
  }

  public getAllJugend(): Observable<Jugend[]> {
    return this.http.get(server_url + "/mannschaft/jugend/all").map(allJugend => allJugend.map(jugend => Jugend.fromJson(jugend)));
  }

}
