import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";
import {UserDetails} from "../../models/UserDetails";
import {server_url} from "../../models/ServerUrl";
import {HttpServiceProvider} from "../http-service/http-service";

/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationServiceProvider {
  // Wenn proxy genutzt wird darf der request nur auf /rest gehen nicht http://localhost:8080


  constructor(public http: HttpServiceProvider) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }

  public getAuthenticatedUser(): Observable<UserDetails> {
    console.log("get auth user!");
    return this.http.get(server_url + "/login").map(user => UserDetails.fromJson(user));
  }


  public authenticateUser(username: String, password: String) {
    // Vorsicht username und passwort werden nicht escaped d.h. zeichen & und = nicht möglich sonst werden mehr parameter geschickt
    window.localStorage.setItem("authenticatedUser", `${username}:${password}`);
    const body: Object = {username: username, password: password, submit: 'Login'};
    console.log("loggin in");
    return this.http.post(server_url + '/login', body, {'Content-Type': 'application/x-www-form-urlencoded'})
  }
}
