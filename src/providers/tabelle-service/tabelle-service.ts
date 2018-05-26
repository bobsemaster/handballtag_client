import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Tabelle} from "../../models/Tabelle";
import {Observable} from "rxjs/Observable";
import {Jugend} from "../../models/Jugend";
import {Subscription} from "rxjs/Subscription";

/*
  Generated class for the TabelleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TabelleServiceProvider {
  private server_url = "/rest";

  constructor(private http: HttpClient) {
    console.log('Hello TabelleServiceProvider Provider');
  }

  public getTabelleToJugend(jugend: Jugend): Observable<Tabelle> {
    return this.http.post(this.server_url + "/tabelle/jugend", jugend).map(value=> Tabelle.fromJson(value))
  }

  public createTabelle(tabelle:Tabelle):Subscription{
    return this.http.post(this.server_url + "/tabelle/new", tabelle).subscribe();
  }
}
