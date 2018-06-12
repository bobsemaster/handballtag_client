import {
  HttpClient,
  HttpHandler,
  HttpHeaderResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AlertController, Platform} from "ionic-angular";
import {HTTP} from "@ionic-native/http";
import "rxjs/add/observable/fromPromise";

/*
  Generated class for the HttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
// https://stackoverflow.com/questions/47304912/angular-4-setting-withcredentials-on-every-request-cors-cookie
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    // Auf ios Ńativen http Client benutzen, da sonst unsere Cookies nicht funktionieren
    request = request.clone({
      withCredentials: true
    });
    if (this.platform.is('mobile')) {
      console.log(`calling ${request.method} ${request.url}`);
      return Observable.fromPromise(this.handleNativeRequest(request));
    } else {

      return next.handle(request);


    }
  }

  private handleNativeRequest(request: HttpRequest<any>): Promise<any> {


    switch (request.method.toUpperCase()) {
      case "GET":
        return this.httpIOS.get(request.url, {}, this.getHeadersObject(request.headers, request.url));
      case "POST":
        return this.httpIOS.post(request.url, this.generateBody(request), this.getHeadersObject(request.headers, request.url));
      case "PUT":
        return this.httpIOS.put(request.url, this.generateBody(request), this.getHeadersObject(request.headers, request.url));
      case "DELETE":
        return this.httpIOS.delete(request.url, request.params, this.getHeadersObject(request.headers, request.url));
      default:
        // Alert um zu wissen welcher fall nicht behandelt wurde
        this.alertController.create({
          title: "FEHLER!",
          message: `Ein feheler ist bei einem Netzwerk Aufruf aufgetreten bitte melde dich bei dem Entwickler.\nFehelercode: ${request.method}`
        }).addButton("OK").present();
        return;
    }
  }

  constructor(private http: HttpClient, private httpIOS: HTTP, private platform: Platform, private alertController: AlertController) {
    console.log('Hello HttpInterceptorProvider Provider');
  }

  private getHeadersObject(headers: HttpHeaders, url: string): any {
    if (headers.keys().length === 0) {
      console.log("empty headers");
      return {};
    }
    const object = {};

    for (const header of headers.keys()) {
      object[header] = headers.get(header)
    }
    return object;
  }


  private generateBody(request: HttpRequest<any>) {
    // Wenn urlencoded muss der body string in ein json umgewandelt werden, damit native http ihn wieder serialisieren kann sonst fehler :(
    if (request.headers.has("Content-Type") && request.headers.get("Content-Type") === "application/x-www-form-urlencoded") {
      const body = {};
      const bodyString: string = request.body;
      const allKeyValuePair = bodyString.split("&");
      for (const keyValuePair of allKeyValuePair) {
        const keyValuePairSplit = keyValuePair.split("=");
        body[keyValuePairSplit[0]] = keyValuePairSplit[1];
      }
      return body;
    }
    return request.body;
  }
}
