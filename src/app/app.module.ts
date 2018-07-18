import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthenticationServiceProvider} from '../providers/authentication-service/authentication-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {VereinViewPageModule} from "../pages/verein-view/verein-view.module";
import {VereinServiceProvider} from '../providers/verein-service/verein-service';
import {ApplicationDataServiceProvider} from '../providers/application-data-service/application-data-service';
import {MannschaftenViewPageModule} from "../pages/mannschaften-view/mannschaften-view.module";
import {MannschaftServiceProvider} from '../providers/mannschaft-service/mannschaft-service';
import {SpielServiceProvider} from '../providers/spiel-service/spiel-service';
import {SpielViewPageModule} from "../pages/spiel-view/spiel-view.module";

import {HTTP} from "@ionic-native/http";
import {HttpServiceProvider} from '../providers/http-service/http-service';
import {LoadingScreenPage} from "../pages/loading-screen/loading-screen";
import {LoginModule} from "../pages/login/login.module";
import {LoadingScreenPageModule} from "../pages/loading-screen/loading-screen.module";
import {AboutPageModule} from "../pages/about/about.module";
import {VerkaufServiceProvider} from '../providers/verkauf-service/verkauf-service';
import {VerpflegungPageModule} from "../pages/verpflegung/verpflegung.module";
import {HasFotoPageModule} from "../pages/has-foto/has-foto.module";
import {ModusPageModule} from "../pages/modus/modus.module";
import {StartPageModule} from "../pages/start/start.module";
import {StartPage} from "../pages/start/start";

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    VereinViewPageModule,
    MannschaftenViewPageModule,
    LoginModule,
    LoadingScreenPageModule,
    SpielViewPageModule,
    VerpflegungPageModule,
    HasFotoPageModule,
    AboutPageModule,
    ModusPageModule,
    StartPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoadingScreenPage,
    StartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,

    AuthenticationServiceProvider,
    VereinServiceProvider,
    ApplicationDataServiceProvider,
    MannschaftServiceProvider,
    SpielServiceProvider,
    HTTP,
    HttpServiceProvider,
    VerkaufServiceProvider,
  ],

})
export class AppModule {
}
