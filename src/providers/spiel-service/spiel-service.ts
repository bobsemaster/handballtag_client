import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Spiel} from "../../models/Spiel";
import {SpielCreatorInfo} from "../../models/SpielCreatorInfo";
import {Subscription} from "rxjs/Subscription";
import {server_url} from "../../models/ServerUrl";
import {HttpServiceProvider} from "../http-service/http-service";
import {SpielErgebnis} from "../../models/SpielErgebnis";
import {PauseHelper} from "../../models/PauseHelper";
import {PlatzVerschiebenHelper} from "../../models/PlatzVerschiebenHelper";
import {subscriptionLogsToBeFn} from "rxjs/testing/TestScheduler";


/*
  Generated class for the SpielServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpielServiceProvider {

  constructor(private http: HttpServiceProvider) {
    console.log('Hello SpielServiceProvider Provider');
  }

  public getAllSpiel(): Observable<Spiel[]> {
    return this.http.get(server_url + "/spiel/all").map(it => it.map(spiel => Spiel.fromJson(spiel)));
  }

  public generateSpielplanForJugend(spielCreatorInfo: SpielCreatorInfo): Subscription {
    return this.http.post(server_url + "/spiel/createspielplan/one", spielCreatorInfo).subscribe();
  }

  public generateMultipleSpielplan(allSpielcreatorInfo: SpielCreatorInfo[]): Subscription {
    return this.http.post(server_url + "/spiel/createspielplan/multiple", allSpielcreatorInfo).subscribe()
  }

  public setSpielErgebnisKampfgericht(ergebnis: SpielErgebnis, id: number): Subscription {
    return this.http.post(`${server_url}/spiel/${id}/ergebnis`, ergebnis).subscribe();
  }

  public setSpielStandSpielleiter(ergebnis: SpielErgebnis, id: number): Subscription {
    return this.http.post(`${server_url}/spiel/${id}/spielstand`, ergebnis).subscribe();
  }

  public addPause(pauseHelper: PauseHelper):Subscription {
    return this.http.post(server_url + '/spiel/pause', pauseHelper).subscribe();
  }

  public platzVerschieben(platzVerschiebenHelper: PlatzVerschiebenHelper): Subscription {
    return this.http.post(server_url + '/spiel/platz/verschieben', platzVerschiebenHelper).subscribe();
  }
}
