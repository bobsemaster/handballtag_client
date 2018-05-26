import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Mannschaft} from "../../models/Mannschaft";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

/*
  Generated class for the MannschaftServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MannschaftServiceProvider {
  private server_url = "/rest";


  constructor(private http: HttpClient) {
    console.log('Hello MannschaftServiceProvider Provider');
  }

  public createMannschaft(mannschaft: Mannschaft): Observable<boolean> {
    return this.http.post(this.server_url + "/mannschaft/new", mannschaft).map(() => true).catch(err => Observable.of(false))
  }

  public getAllMannschaften(): Observable<any[]> {
    return this.http.get<any[]>(this.server_url + "/mannschaft/all")
  }

  public deleteMannschaft(id: number): Subscription {
    return this.http.delete(`${this.server_url}/mannschaft/${id}`).subscribe();
  }

}
