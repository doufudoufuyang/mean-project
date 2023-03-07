import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN = localStorage.getItem('token');
    const BEARER_TOKEN = `BEARER ${TOKEN}`;
    return next.handle(req.clone({ setHeaders: { Authorization: BEARER_TOKEN } }));
  }

  constructor() { }
}
