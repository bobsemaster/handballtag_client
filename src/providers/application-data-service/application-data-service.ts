import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationServiceProvider} from "../authentication-service/authentication-service";
import {VereinServiceProvider} from "../verein-service/verein-service";
import {Verein} from "../../models/Verein";
import {UserDetails} from "../../models/UserDetails";
import {Subscription} from "rxjs/Subscription";

/*
  Generated class for the ApplicationDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApplicationDataServiceProvider {
  public vereine: Verein[] = null;
  public authenticatedUser: UserDetails = null;

  constructor(private http: HttpClient, private authService: AuthenticationServiceProvider, private vereinService: VereinServiceProvider) {
  }

  public ladeAuthentifiziertenBenutzer():Subscription {
    return this.authService.getAuthenticatedUser().subscribe(user => this.authenticatedUser = UserDetails.fromJson(user));
  }

  public ladeVereine():Subscription{
    return this.vereinService.getAllVerein().subscribe(value => {
      this.vereine = value.map(verein => Verein.fromJSON(verein));
      console.log(this.vereine);
    });
  }


}