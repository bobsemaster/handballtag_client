import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";
import {UserDetails} from "../../models/UserDetails";

/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationServiceProvider {

  private formHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


  constructor(public http:HttpClient) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }

  public getAuthenticatedUser():Observable<Object>{
    return this.http.get("rest/login");
  }


  public authenticateUser(username: String, password: String): Observable<any> {
    const body: String = 'username=' + username + '&password=' + password + '&submit=Login';

    return this.http.post('rest/login', body, {headers: this.formHeaders});
  }
}
