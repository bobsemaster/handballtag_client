import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationServiceProvider} from "../authentication-service/authentication-service";
import {VereinServiceProvider} from "../verein-service/verein-service";
import {Verein} from "../../models/Verein";
import {UserDetails} from "../../models/UserDetails";
import {Subscription} from "rxjs/Subscription";
import {MannschaftServiceProvider} from "../mannschaft-service/mannschaft-service";
import {NavController} from "ionic-angular";

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
  public standartUserLoaded = false;
  public isOnStartpage = true;
  public navCtrl: NavController;

  constructor(private http: HttpClient, private authService: AuthenticationServiceProvider, private vereinService: VereinServiceProvider, private mannschaftService: MannschaftServiceProvider) {

  }



  public setNewView(view:any){
    this.navCtrl.setRoot(view);
  }

  public popView(){
    this.navCtrl.pop();
  }

/*  public ladeStandartBenutzer(): Subscription {
    // Standart User authentifizieren
    // Passwort in klartext weil der uer nur benutzt wird damit nur der client zugrif auf den server hat
    return this.authService.authenticateUser("benutzer", "GeheimesBenutzerPasswortDasKeinerRausfindenWird")
      .subscribe(value => {

        this.ladeAuthentifiziertenBenutzer().add(() => this.standartUserLoaded = true);
      });
  }*/

  public ladeAuthentifiziertenBenutzer(): Subscription {
    return this.authService.getAuthenticatedUser().subscribe(user => this.authenticatedUser = user);
  }

  public ladeVereine(): Subscription {
    return this.vereinService.getAllVerein().subscribe(value => {
      this.vereine = value
    });
  }

  public ladeMannschaften(): Subscription {
    return this.mannschaftService.getAllMannschaften().subscribe(value => {
      this.mannschaften = value
    });
  }


}
