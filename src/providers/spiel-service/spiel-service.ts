import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Spiel} from "../../models/Spiel";
import {SpielCreatorInfo} from "../../models/SpielCreatorInfo";
import {Subscription} from "rxjs/Subscription";
import {server_url} from "../../models/ServerUrl";

/*
  Generated class for the SpielServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpielServiceProvider {

  constructor(private http: HttpClient) {
    console.log('Hello SpielServiceProvider Provider');
  }

  public getAllSpiel(): Observable<Spiel[]> {
    return this.http.get<any[]>(server_url + "/spiel/all").map(it => it.map(spiel => Spiel.fromJson(spiel)));
  }

  public generateSpielplanForJugend(spielCreatorInfo: SpielCreatorInfo): Subscription {
    return this.http.post(server_url + "/spiel/createspielplan", spielCreatorInfo).subscribe();
  }
}