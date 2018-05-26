import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";
import {UserDetails} from "../../models/UserDetails";
import {serve} from "@ionic/app-scripts";

/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationServiceProvider {
  // Wenn proxy genutzt wird darf der request nur auf /rest gehen nicht http://localhost:8080
  private server_url = "/rest";

  private formHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


  constructor(public http:HttpClient) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }

  public getAuthenticatedUser():Observable<Object>{
    console.log("get auth user!");
    return this.http.get(this.server_url + "/login");
  }


  public authenticateUser(username: String, password: String): Observable<any> {
    const body: String = 'username=' + username + '&password=' + password + '&submit=Login';
    console.log("loggin in");
    return this.http.post( this.server_url + '/login', body, {headers: this.formHeaders});
  }
}
