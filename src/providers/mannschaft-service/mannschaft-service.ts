import {Injectable} from '@angular/core';
import {Mannschaft} from "../../models/Mannschaft";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Jugend} from "../../models/Jugend";
import {server_url} from "../../models/ServerUrl";
import {Spiel} from "../../models/Spiel";
import {HttpServiceProvider} from "../http-service/http-service";
import {Pair} from "../../models/Pair";

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

  public getAllSpielToMannschaft(id: number): Observable<Spiel[]> {
    return this.http.get(`${server_url}/mannschaft/${id}/spiele`).map(allSpiel => allSpiel.map(spiel => Spiel.fromJson(spiel)));
  }

  public deleteMannschaft(id: number): Subscription {
    return this.http.delete(`${server_url}/mannschaft/${id}`).subscribe();
  }

  public getAllJugend(): Observable<Jugend[]> {
    return this.http.get(server_url + "/mannschaft/jugend/all").map(allJugend => allJugend.map(jugend => Jugend.fromJson(jugend)));
  }

  public setFotoGemacht(hasFoto: boolean, id: number): Observable<any> {
    return this.http.get(`${server_url}/mannschaft/${id}/${hasFoto}`);
  }

  public getAllMannschaftToJugend(jugend: Jugend): Observable<Mannschaft[]> {
    return this.http.post(server_url + '/mannschaft/all/jugend', jugend)
      .map(allMannschaft => allMannschaft.map(mannschaft => Mannschaft.fromJSON(mannschaft)));
  }

  public changeGruppeOfMannschaft(mannschaft: Mannschaft, neueGruppe: string): Subscription {
    return this.http.get(`${server_url}/mannschaft/${mannschaft.id}/gruppe/${neueGruppe}`).subscribe();
  }

  public setMannschaftSpielPlanIndex(mannschaft: Mannschaft, newIndex: number) {
    return this.http.get(`${server_url}/mannschaft/${mannschaft.id}/spielplan/${newIndex}`).subscribe();
  }

  public setSpielplanIndex(id: number, index: number): Subscription {
    return this.http.get(`${server_url}/mannschaft/${id}/spielplan/${index}`).subscribe();
  }

  public changeTabellenplatz(allMannschaft: Pair<number, number>[]): Subscription {
    return this.http.post(server_url + '/mannschaft/tabellenplatz/neu', allMannschaft).subscribe();
  }

}
