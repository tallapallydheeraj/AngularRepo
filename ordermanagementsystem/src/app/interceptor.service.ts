import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth:DataService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(req.url.includes('/authenticate'))
      return next.handle(req);
    let tokenizedreq= req.clone({
      setHeaders:{
        Authorization : 'Bearer '+this.auth.getToken()
      }
    })
    console.log("jwt"+tokenizedreq)
    return next.handle(tokenizedreq)
  }
}
