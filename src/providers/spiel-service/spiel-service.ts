import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Spiel} from "../../models/Spiel";
import {SpielCreatorInfo} from "../../models/SpielCreatorInfo";
import {Subscription} from "rxjs/Subscription";

/*
  Generated class for the SpielServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpielServiceProvider {
  private server_url = "/rest";

  constructor(private http: HttpClient) {
    console.log('Hello SpielServiceProvider Provider');
  }

  public getAllSpiel(): Observable<Spiel[]> {
    return this.http.get<any[]>(this.server_url + "/spiel/all").map(it => it.map(spiel => Spiel.fromJson(spiel)));
  }

  public generateSpielplanForJugend(spielCreatorInfo: SpielCreatorInfo): Subscription {
    return this.http.post(this.server_url + "/spiel/createspielplan", spielCreatorInfo).subscribe();
  }
}
