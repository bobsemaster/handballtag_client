import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationServiceProvider} from "../authentication-service/authentication-service";
import {VereinServiceProvider} from "../verein-service/verein-service";
import {Verein} from "../../models/Verein";
import {UserDetails} from "../../models/UserDetails";
import {Subscription} from "rxjs/Subscription";
import {MannschaftServiceProvider} from "../mannschaft-service/mannschaft-service";

/*
  Generated class for the ApplicationDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApplicationDataServiceProvider {
  public vereine: Verein[] = null;
  public mannschaften = [];
  public authenticatedUser: UserDetails = null;

  constructor(private http: HttpClient, private authService: AuthenticationServiceProvider, private vereinService: VereinServiceProvider, private mannschaftService:MannschaftServiceProvider) {
  }

  public ladeAuthentifiziertenBenutzer():Subscription {
    return this.authService.getAuthenticatedUser().subscribe(user => this.authenticatedUser = user);
  }

  public ladeVereine():Subscription{
    return this.vereinService.getAllVerein().subscribe(value => {
      this.vereine = value
    });
  }

  public ladeMannschaften():Subscription{
    return this.mannschaftService.getAllMannschaften().subscribe(value => {
      this.mannschaften = value
    });
  }


}
