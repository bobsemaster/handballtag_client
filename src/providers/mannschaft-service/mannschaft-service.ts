import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Mannschaft} from "../../models/Mannschaft";
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

  public createMannschaft(mannschaft: Mannschaft): Subscription {
    return this.http.post(this.server_url + "/mannschaft/new", mannschaft).subscribe()
  }


}
